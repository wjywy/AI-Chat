import React from 'react'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import useLocaleStore, { type LocaleType } from '@pc/store/useLocaleStore'
import { useTranslation } from 'react-i18next'

const LanguageSwitch: React.FC = () => {
  const { locale, changeLocale } = useLocaleStore()
  const { t } = useTranslation()

  const handleChange = (e: RadioChangeEvent) => {
    const value = e.target.value as LocaleType
    changeLocale(value)
  }

  return (
    <Radio.Group value={locale} onChange={handleChange}>
      <Radio.Button value="en-US">{t('locale.enUS')}</Radio.Button>
      <Radio.Button value="zh-CN">{t('locale.zhCN')}</Radio.Button>
    </Radio.Group>
  )
}

export default LanguageSwitch
