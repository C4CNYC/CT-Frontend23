import { atom } from "jotai";

interface IHelpMsgAtom {
  message: string;
  sent: boolean | null;
}


// TODO-PH remove it after integration chat
export const helpMsgAtom = atom<IHelpMsgAtom>({ message: "", sent: false });
