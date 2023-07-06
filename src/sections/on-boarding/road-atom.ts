import { atom } from "jotai";

export const roadAtom = atom<Record<string, boolean>>({ sessionWay: true });
