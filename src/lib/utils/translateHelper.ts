import { useLocales } from "src/locales";

export const useTranslate = () => {
  const { translate } = useLocales();
  const translateSrt = (text: string, ...arg: any) => {
    return `${translate(text, ...arg)}`;
  };
  return translateSrt;
};
