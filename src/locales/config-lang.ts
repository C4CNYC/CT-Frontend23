import { enUS, frFR, ptPT, esES, arEG, trTR } from '@mui/material/locale'

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Portuguese',
    value: 'pt',
    systemValue: ptPT,
    icon: '/assets/icons/flags/ic_flag_pt.svg',
  },
  {
    label: 'Spanish',
    value: 'es',
    systemValue: esES,
    icon: '/assets/icons/flags/ic_flag_es.svg',
  },
  {
    label: 'Arabic (Egypt)',
    value: 'ar',
    systemValue: arEG,
    icon: '/assets/icons/flags/ic_flag_sa.svg',
  },
  {
    label: 'Türkçe ',
    value: 'tr',
    systemValue: trTR,
    icon: '/assets/icons/flags/ic_flag_tr.svg',
  },
]

export const defaultLang = allLangs[0] // English
