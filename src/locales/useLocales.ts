import { useTranslation } from "react-i18next";
// utils
import localStorageAvailable from "../utils/localStorageAvailable";
// components
import { useSettingsContext } from "../components/settings";
//
import { Localization } from "@mui/material/locale";
import { allLangs, defaultLang } from "./config-lang";

export interface Lang {
  label: string;
  value: string;
  systemValue: Localization;
  icon: string;
}

interface IUseLocals {
  onChangeLang: (value: string) => Promise<void>;
  translate: (text: any, options?: any) => string;
  currentLang: Lang;
  allLangs: Lang[];
}

// ----------------------------------------------------------------------

export default function useLocales(): IUseLocals {
  const { i18n, t: translate } = useTranslation();

  const { onChangeDirectionByLang } = useSettingsContext();

  const storageAvailable = localStorageAvailable();

  const langStorage = storageAvailable
    ? localStorage.getItem("i18nextLng")
    : "";

  const currentLang =
    allLangs.find((_lang) => _lang.value === langStorage) ?? defaultLang;

  const handleChangeLanguage = async (newlang: string): Promise<void> => {
    try {
      await i18n.changeLanguage(newlang);
      onChangeDirectionByLang(newlang);
    } catch (e) {
      console.log("i18n something went wrong");
    }
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) =>
      JSON.stringify(translate(text, options)),
    currentLang,
    allLangs,
  };
}
