import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// utils
import { localStorageAvailable } from "@utils";

//
import { defaultLang } from "./config-lang";
//
import arLocales from "./langs/ar";
import cnLocales from "./langs/cn";
import enLocales from "./langs/en";
import esLocales from "./langs/es";
import frLocales from "./langs/fr";
import ptLocales from "./langs/pt";
import vnLocales from "./langs/vn";

// ----------------------------------------------------------------------

let lng = defaultLang.value;

const storageAvailable = localStorageAvailable();

if (storageAvailable) {
  lng = localStorage.getItem("i18nextLng") ?? defaultLang.value;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      fr: { translations: frLocales },
      vn: { translations: vnLocales },
      cn: { translations: cnLocales },
      ar: { translations: arLocales },
      es: { translations: esLocales },
      pt: { translations: ptLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    keySeparator: ".",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
