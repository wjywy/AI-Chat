import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

// 使用一个全局变量记录上一次路径，避免状态更新导致的重复渲染
let prevPath = ''

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const nodeRef = useRef(null)

  // 计算当前应该使用的过渡类型
  const getTransitionType = () => {
    if (prevPath === '/login' && location.pathname === '/create-account') {
      return 'slide' // 向左滑动
    }
    if (prevPath === '/create-account' && location.pathname === '/login') {
      return 'slideReverse' // 向右滑动
    }
    // 默认向左滑动
    return 'slide'
  }

  // 计算当前动画类型
  const transitionType = getTransitionType()

  // 在渲染后更新全局路径变量(不触发重渲染)
  if (location.pathname !== prevPath) {
    setTimeout(() => {
      prevPath = location.pathname
    }, 500)
  }

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames={`page-${transitionType}`}
        unmountOnExit>
        <div
          ref={nodeRef}
          className={`page page-${transitionType}`}
          style={{ position: 'absolute', width: '100%', overflow: 'hidden' }}>
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export function AnimatedLayout() {
  return (
    <PageTransition>
      <Outlet />
    </PageTransition>
  )
}
