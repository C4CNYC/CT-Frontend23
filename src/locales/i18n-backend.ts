export const i18nBackend = {
  loadPath: '/assets/lang/{{lng}}.json',
  crossDomain: false,
  withCredentials: false,
  overrideMimeType: false,
  requestOptions: {
    mode: 'cors',
    credentials: 'same-origin',
    cache: 'default',
  },
  reloadInterval: false,
}
