import type { ILesson, ILessonContent } from "../../../redux/interfaces/content.interface"
import type { BaseResponseInterface } from "@utils"
import type { AuthUserType } from "../../../auth/types"

export type SupportedLang = "html" | "javascript";

export interface WorkSpaceProps {
  isFetching?: boolean;
  lesson?: ILesson & BaseResponseInterface;
  data: Array<ILessonContent & BaseResponseInterface>;
  user: AuthUserType;
  code: string;
  language: SupportedLang;
  onChangeCode: (code: string) => void;
  onSubmitChalange: (lessonContentId: string) => Promise<void>;
  onSubmitLesson: () => Promise<void>;
  lastLessonCode?: string;
}
