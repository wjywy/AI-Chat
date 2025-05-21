import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '@pc/locales'
import dayjs from 'dayjs'

// antd国际化语言包
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

export type LocaleType = 'zh-CN' | 'en-US'

const localeMap = {
  'zh-CN': zhCN,
  'en-US': enUS
}

interface LocaleState {
  locale: LocaleType
  antdLocale: typeof zhCN | typeof enUS
  changeLocale: (locale: LocaleType) => void
}

const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: (i18n.language as LocaleType) || 'zh-CN',
      antdLocale: i18n.language === 'zh-CN' ? zhCN : enUS,
      changeLocale: (locale: LocaleType) => {
        // 切换 i18next 语言
        i18n.changeLanguage(locale)

        // 切换 dayjs 语言
        dayjs.locale(locale === 'zh-CN' ? 'zh-cn' : 'en')

        // 更新状态
        set({
          locale,
          antdLocale: localeMap[locale]
        })
      }
    }),
    {
      name: 'app-locale'
    }
  )
)

export default useLocaleStore
