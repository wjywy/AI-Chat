import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useUserStore } from '@pc/store/useUserStore'

interface WithPermissionProps {
  children: React.ReactNode
  redirectPath?: string
  saveLocation?: boolean
}

export const WithPermission: React.FC<WithPermissionProps> = ({
  children,
  redirectPath = '/login',
  saveLocation = false
}) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectPath}
        state={saveLocation ? { from: location.pathname } : undefined}
        replace
      />
    )
  }

  return <>{children}</>
}
