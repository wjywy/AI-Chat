import dayjs from 'dayjs'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enUS from './en-US'
import zhCN from './zh-CN'

import 'dayjs/locale/zh-cn'

const resources = {
  'en-US': {
    translation: enUS
  },
  'zh-CN': {
    translation: zhCN
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    }
  })

const currentLanguage = i18n.language
dayjs.locale(currentLanguage === 'zh-CN' ? 'zh-cn' : 'en')

export default i18n
