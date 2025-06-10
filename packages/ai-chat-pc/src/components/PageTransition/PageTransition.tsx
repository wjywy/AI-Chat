import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import type { ReactNode } from 'react'

import '@pc/styles/transition.css'

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const nodeRef = useRef(null)

  // 只在登录和注册页面之间切换时使用动画
  const shouldAnimate = location.pathname === '/login' || location.pathname === '/create-account'
  const isLoginToRegister = location.pathname === '/create-account'

  if (!shouldAnimate) {
    return <>{children}</>
  }

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames={isLoginToRegister ? 'page-slide' : 'page-slideReverse'}
        unmountOnExit>
        <div ref={nodeRef} className="page">
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}
