import { atom } from "jotai";

export type SupportedLang = "html" | "javascript";

export const onlineStudentsAtom = atom<Record<string, boolean>>({});
