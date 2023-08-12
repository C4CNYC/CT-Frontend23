import * as Yup from "yup";

import { AssigmentTypes } from "src/redux/services/enums/assignment-types.enum";

export const CreateQuestSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.mixed<AssigmentTypes>()
    .oneOf(Object.values(AssigmentTypes))
    .required("Select type"),
  course: Yup.string().when("type", {
    is: AssigmentTypes.COURSE,
    then: Yup.string().required("Select course"),
    otherwise: Yup.string(),
  }),
  startDate: Yup.string(),
  dueDate: Yup.string(),
  closeDate: Yup.string(),
  active: Yup.boolean().required("Choose status"),
});
