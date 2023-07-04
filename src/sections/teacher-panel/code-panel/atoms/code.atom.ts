import { atomWithStorage } from "jotai/utils";

export type SupportedLang = "html" | "javascript";

export interface ICodeContent {
  code: string;
  language: SupportedLang;
}

export const codeAtom = atomWithStorage<ICodeContent>("CODE_ATOM", {
  code: "",
  language: "html",
});
