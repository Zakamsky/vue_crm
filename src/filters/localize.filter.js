import store from '../store'

const locales = {
  'ru-RU': {
    profileTitle: 'Профиль'
  },
  'en-US': {
    profileTitle: 'Profile'
  },
}

export default function localizeFilter(key){
  const locale = store.getters.info.locale || ru-RU
  return locales[locale][key] || `[LOCALIZE EROR]: key ${key} not found`
}
