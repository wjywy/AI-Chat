import React from 'react'
import PopupContainer from './PopupContainer'
import './styles.css' // 导入页面样式

/**
 * Popup页面入口组件
 */
export function Popup() {
  return (
    <div className="popup-root">
      {/* 
        使用PopupContainer作为主容器
        所有的业务逻辑都在Container中处理
      */}
      <PopupContainer />
    </div>
  )
}

export default Popup
