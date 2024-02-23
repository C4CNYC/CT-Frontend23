import * as Yup from 'yup'

import { AssignmentTypes } from '@/redux/enums/assignment-types.enum'

export const CreateQuestSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  type: Yup.mixed<AssignmentTypes>().oneOf(Object.values(AssignmentTypes)).required('Select type'),
  course: Yup.string().when('type', {
    is: AssignmentTypes.COURSE,
    then: Yup.string().required('Select course'),
    otherwise: Yup.string(),
  }),
  startDate: Yup.date()
    .required('Start date is required')
    .nullable(true)
    .typeError('Start date must be a valid date'),
  dueDate: Yup.date()
    .required('Due date is required')
    .nullable(true)
    .when('startDate', (startDate, schema) => {
      const startDateIsValid = startDate && !isNaN(new Date(startDate).getTime())
      return startDateIsValid
        ? schema.min(startDate, 'Due date must be later than start date')
        : schema.nullable(true)
    }),
  closeDate: Yup.date()
    .required('Close date is required')
    .nullable(true)
    .when('dueDate', (dueDate, schema) => {
      const dueDateIsValid = dueDate && !isNaN(new Date(dueDate).getTime())
      return dueDateIsValid
        ? schema.min(dueDate, 'Close date must be later than due date')
        : schema.nullable(true)
    }),
  active: Yup.boolean().required('Choose status'),
})
