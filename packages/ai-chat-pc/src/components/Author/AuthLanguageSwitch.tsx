import { GlobalOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useTranslation } from 'react-i18next'

import { useLocaleStore } from '@pc/store'

export default function AuthLanguageSwitch() {
  const { t } = useTranslation()
  const { locale, changeLocale } = useLocaleStore()

  const handleLanguageSwitch = () => {
    const newLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'
    changeLocale(newLocale)
  }

  return (
    <div className="flex justify-end">
      <Button type="text" onClick={handleLanguageSwitch} className="flex items-center">
        <Space>
          <GlobalOutlined />
          {locale === 'zh-CN' ? t('locale.zhCN') : t('locale.enUS')}
        </Space>
      </Button>
    </div>
  )
}
