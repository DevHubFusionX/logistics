import en from './en.json'

const translations = { en }
let currentLocale = 'en'

export const t = (key) => {
  const keys = key.split('.')
  let value = translations[currentLocale]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

export const setLocale = (locale) => {
  if (translations[locale]) {
    currentLocale = locale
  }
}

export const getLocale = () => currentLocale
