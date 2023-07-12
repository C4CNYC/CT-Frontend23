import { createContext } from "react";

import { BaseResponseInterface } from "@utils";
import { AuthUserType } from "src/auth/types";
import {
  ILesson,
  ILessonContent,
} from "src/redux/interfaces/content.interface";

import { SupportedLang } from "../work-space";

interface ICodePanelContext {
  onSubmitChalange: (lessonContentId: string) => void;
  onSubmitLesson: () => void;
  lesson?: ILesson & BaseResponseInterface;
  data: Array<ILessonContent & BaseResponseInterface>;
  user: AuthUserType | null;
  isFetching?: boolean;
  publicPage?: boolean;
  code: string;
  language: SupportedLang;
  onChangeLanguage: (lang: SupportedLang) => void;
  onChangeCode: (code: string) => void;
}

export const CodePanelContext = createContext<ICodePanelContext>({
  onSubmitChalange: function (lessonContentId: string): void {
    throw new Error(
      "pls provide 'onSubmitChalange' function to context 'CodePanelContext'"
    );
  },
  onSubmitLesson: function (): void {
    throw new Error(
      "pls provide 'onSubmitLesson' function to context 'CodePanelContext'"
    );
  },
  data: [],
  user: null,
  isFetching: false,
  publicPage: false,
  code: "",
  language: "html",
  onChangeLanguage: () => {
    throw new Error("pls provide onChangeLanguage to WorkSpaceContext");
  },
  onChangeCode: () => {
    throw new Error("pls provide onChangeCode to WorkSpaceContext");
  },
});
