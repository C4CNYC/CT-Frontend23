import { useTranslation } from "react-i18next";

import { Localization } from "@mui/material/locale";

import { useSettingsContext } from "@components";
import { localStorageAvailable } from "@utils";

import { allLangs, defaultLang } from "./config-lang";

export interface Lang {
  label: string;
  value: string;
  systemValue: Localization;
  icon: string;
}

interface IUseLocals {
  onChangeLang: (value: string) => Promise<void>;
  translate: (text: any, options?: any) => unknown;
  currentLang: Lang;
  allLangs: Lang[];
}

// ----------------------------------------------------------------------

export function useLocales(): IUseLocals {
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
    } catch (e: any) {}
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => translate(text, options),
    currentLang,
    allLangs,
  };
}
