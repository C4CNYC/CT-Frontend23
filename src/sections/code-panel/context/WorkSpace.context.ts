import { createContext } from "react";

import { SupportedLang } from "../work-space";

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
