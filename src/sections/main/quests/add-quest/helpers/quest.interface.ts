import { BaseResponseInterface } from "@utils";
import { AssignmentTypes } from "src/redux/enums/assignment-types.enum";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";

export interface FormQuestProps {
  type: AssignmentTypes;
  course: string;
  classes?: string[] | [];
  students?: string[] | [];
  name: string;
  description?: string;
  startDate: string;
  dueDate: string;
  closeDate: string;
  active: boolean;
}

export interface IAddQuest {
  assignment?: IAssignment & BaseResponseInterface;
}
