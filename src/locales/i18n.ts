import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { localStorageAvailable } from '@/utils'

import { defaultLang } from './config-lang'
import { i18nBackend } from './i18n-backend'

//
// import arLocales from "./langs/ar";
// import cnLocales from "./langs/cn";
// import esLocales from "./langs/es";
// import frLocales from "./langs/fr";
// import ptLocales from "./langs/pt";
// import vnLocales from "./langs/vn";

let lng = defaultLang.value

const storageAvailable = localStorageAvailable()

if (storageAvailable) {
  lng = localStorage.getItem('i18nextLng') ?? defaultLang.value
}

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: { ...i18nBackend },
    lng,
    fallbackLng: defaultLang.value,
    keySeparator: '.',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
