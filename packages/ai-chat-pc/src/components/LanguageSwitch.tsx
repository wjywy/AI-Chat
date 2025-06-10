import { GlobalOutlined, DownOutlined } from '@ant-design/icons'
import { type MenuProps, Dropdown, Button, Space } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLocaleStore, type LocaleType } from '@pc/store'

const LanguageSwitch: React.FC = () => {
  const { locale, changeLocale } = useLocaleStore()
  const { t } = useTranslation()

  const handleMenuClick = (key: string) => {
    changeLocale(key as LocaleType)
  }

  const items: MenuProps['items'] = [
    {
      key: 'zh-CN',
      label: <Space>{t('locale.zhCN')}</Space>
    },
    {
      key: 'en-US',
      label: <Space>{t('locale.enUS')}</Space>
    }
  ]

  return (
    <Dropdown
      menu={{
        items,
        selectedKeys: [locale],
        onClick: ({ key }) => handleMenuClick(key)
      }}
      trigger={['click']}>
      <Button type="text" className="flex items-center">
        <Space>
          <GlobalOutlined />
          {locale === 'zh-CN' ? t('locale.zhCN') : t('locale.enUS')}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}

export default LanguageSwitch
