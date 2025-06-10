import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Button, Modal, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { userService } from '@pc/services/userService'
import { useUserStore } from '@pc/store/useUserStore'

import type { MenuProps } from 'antd/lib'

export function UserAvatar() {
  const { isAuthenticated, user } = useUserStore()
  const navigate = useNavigate()
  const [confirmVisible, setConfirmVisible] = useState(false)

  // 登录处理
  const handleLogin = () => {
    navigate('/login')
  }

  // 退出登录处理
  const handleLogout = () => {
    setConfirmVisible(true)
  }

  // 确认退出
  const confirmLogout = () => {
    userService.logout()
    message.success('退出登录成功')
    setConfirmVisible(false)
    navigate('/login')
  }

  // 下拉菜单项
  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置'
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    }
  ]

  // 已登录状态 - 显示头像和下拉菜单
  if (isAuthenticated && user) {
    return (
      <>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Avatar
            size="small"
            src={user.avatar}
            icon={!user.avatar ? <UserOutlined /> : null}
            className="bg-emerald-500 cursor-pointer"
          />
        </Dropdown>

        {/* 退出确认对话框 */}
        <Modal
          title="确认退出"
          open={confirmVisible}
          onOk={confirmLogout}
          onCancel={() => setConfirmVisible(false)}
          okText="确认"
          cancelText="取消">
          <p>确定要退出登录吗？</p>
        </Modal>
      </>
    )
  }

  // 未登录状态 - 显示登录按钮
  return (
    <Button
      type="primary"
      size="small"
      icon={<UserOutlined />}
      onClick={handleLogin}
      className="bg-emerald-500 hover:bg-emerald-600">
      登录
    </Button>
  )
}
