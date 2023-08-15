import * as Yup from "yup";

import { AssignmentTypes } from "src/redux/enums/assignment-types.enum";

export const CreateQuestSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.mixed<AssignmentTypes>()
    .oneOf(Object.values(AssignmentTypes))
    .required("Select type"),
  course: Yup.string().when("type", {
    is: AssignmentTypes.COURSE,
    then: Yup.string().required("Select course"),
    otherwise: Yup.string(),
  }),
  startDate: Yup.date(),
  dueDate: Yup.date().when("startDate", (startDate, schema) => {
    return schema.min(startDate, "Due date must be later than start date");
  }),
  closeDate: Yup.date().when("dueDate", (startDate, schema) => {
    return schema.min(startDate, "Close date must be later than start date");
  }),
  active: Yup.boolean().required("Choose status"),
});
