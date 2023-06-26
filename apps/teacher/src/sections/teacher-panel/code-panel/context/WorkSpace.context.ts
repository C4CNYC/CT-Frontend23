import { createContext } from "react";

export type SupportedLang = "html" | "javascript";

interface IWorkSpaceContext {
  code: string;
  language: SupportedLang;
  onChangeLanguage: (lang: SupportedLang) => void;
  onChangeCode: (code: string) => void;
}

export const WorkSpaceContext = createContext<IWorkSpaceContext>({
  code: "",
  language: "html",
  onChangeLanguage: () => {
    throw new Error("pls provide onChangeLanguage to WorkSpaceContext");
  },
  onChangeCode: () => {
    throw new Error("pls provide onChangeCode to WorkSpaceContext");
  },
});
