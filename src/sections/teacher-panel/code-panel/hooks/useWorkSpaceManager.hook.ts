import { useAtom } from "jotai";
import { codeAtom, ICodeContent, SupportedLang } from "../atoms/code.atom";

interface IWorkSpaceManager {
  code: ICodeContent;
  onChangeCode: (value: string) => void;
  updateLanguage: (language: SupportedLang) => void;
}

export const useWorkSpaceManager = (): IWorkSpaceManager => {
  const [code, setCode] = useAtom(codeAtom);
  return {
    code,
    onChangeCode: (code) => {
      setCode((pre) => ({ ...pre, code }));
    },
    updateLanguage: (language) => {
      setCode((prev) => ({ ...prev, language }));
    },
  };
};
