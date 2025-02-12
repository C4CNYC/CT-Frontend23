import * as Yup from 'yup'

import { AssignmentTypes } from '@/redux/enums/assignment-types.enum'

export const CreateQuestSchema = Yup.object().shape({
  name: Yup.string(),
  type: Yup.mixed<AssignmentTypes>().oneOf(Object.values(AssignmentTypes)).required('Select type'),
  course: Yup.string()
    .when('type', {
      is: AssignmentTypes.COURSE,
      then: Yup.string(),
      otherwise: Yup.string().nullable(true),
    })
    .required('Select course'),
  startDate: Yup.date().nullable(true).typeError('Start date must be a valid date'),
  dueDate: Yup.date()
    .nullable(true)
    .when('startDate', (startDate, schema) => {
      const startDateIsValid = startDate && !isNaN(new Date(startDate).getTime())
      return startDateIsValid
        ? schema.min(startDate, 'Due date must be later than start date')
        : schema.nullable(true)
    }),
  closeDate: Yup.date()
    .nullable(true)
    .when('dueDate', (dueDate, schema) => {
      const dueDateIsValid = dueDate && !isNaN(new Date(dueDate).getTime())
      return dueDateIsValid
        ? schema.min(dueDate, 'Close date must be later than due date')
        : schema.nullable(true)
    }),
  active: Yup.boolean(),
})
