import { atom } from "jotai";

interface IHelpMsgAtom {
  message: string;
  sent: boolean | null;
}

export const helpMsgAtom = atom<IHelpMsgAtom>({ message: "", sent: false });
