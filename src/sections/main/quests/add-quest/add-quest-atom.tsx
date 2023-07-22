import { add } from "date-fns";
import { atom } from "jotai";

import { ISkill } from "src/redux/interfaces/content.interface";
import { IStudent } from "src/redux/services/interfaces/user.interface";

interface IAddQuestAtom {
  startDate: string;
  dueDate: string;
  closeDate: string;
  assingmentSkills?: ISkill[] | [];
  assignmentId?: string;
  students?: string[] | [];
}

export const addQuestAtom = atom<IAddQuestAtom>({
  startDate: new Date().toString(),
  dueDate: add(new Date(), { days: 7 }).toString(),
  closeDate: add(new Date(), { days: 10 }).toString(),
});
