import React from 'react'
import { BulbOutlined, BulbFilled } from '@ant-design/icons'
import { FloatButton, Tooltip } from 'antd'
import useThemeStore from '@pc/store/useThemeStore'
import { useTranslation } from 'react-i18next'

interface ThemeToggleProps {
  position?: {
    right?: number
    bottom?: number
    left?: number
    top?: number
  }
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ position = { right: 24, bottom: 24 } }) => {
  const { theme, toggleTheme } = useThemeStore()
  const { t } = useTranslation()

  const isDark = theme === 'dark'

  return (
    <Tooltip title={isDark ? t('theme.switchToLight') : t('theme.switchToDark')} placement="left">
      <FloatButton
        icon={isDark ? <BulbOutlined /> : <BulbFilled />}
        onClick={toggleTheme}
        style={position}
        type={isDark ? 'default' : 'primary'}
      />
    </Tooltip>
  )
}

export default ThemeToggle
