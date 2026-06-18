import React, { useEffect, useMemo } from 'react'
import { useAuthStore } from '../../../stores/authStore'

/**
 * Hook for auth state — reads directly from Zustand store.
 */
export const useAuthState = () => {
  const { user, isLoading, isAuthenticated } = useAuthStore()
  return { user, loading: isLoading, isAuthenticated }
}

/**
 * Hook for auth actions and role checks.
 */
export const useAuthActions = () => {
  const store = useAuthStore()

  return {
    login: store.setAuth,
    logout: store.logout,
    setUser: store.updateUser,
    isAdmin: store.getIsAdmin(),
    isSuperAdmin: store.getIsSuperAdmin(),
    isManager: store.getIsManager(),
    isCustomer: store.user?.role === 'Customer',
    updateUserRole: (role) => store.updateUser({ role }),
    hasPermission: (allowedRoles) => {
      if (!allowedRoles || allowedRoles.length === 0) return true
      const userRole = store.user?.role || 'Customer'
      return allowedRoles.some(
        (role) => role.toLowerCase() === userRole.toLowerCase()
      )
    }
  }
}

/**
 * Combined hook — the primary way to access auth throughout the app.
 */
export const useAuth = () => {
  const state = useAuthState()
  const actions = useAuthActions()
  return { ...state, ...actions }
}

/**
 * AuthProvider — manages the Zustand session lifecycle (checks, activity
 * extension, cleanup).  No longer wraps children in React Context because
 * all consumers read from the Zustand store directly via useAuth().
 */
export const AuthProvider = ({ children }) => {
  const { checkSession, logout, isLoading, user } = useAuthStore()

  useEffect(() => {
    // Initial session validity check
    const isValid = checkSession()
    if (!isValid && user) logout()
    useAuthStore.setState({ isLoading: false })

    // Periodic session check every 5 minutes
    const intervalId = setInterval(() => checkSession(), 5 * 60 * 1000)

    // Extend session on user activity (debounced 2 s)
    const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'touchstart', 'scroll']
    let activityTimer
    const onActivity = () => {
      clearTimeout(activityTimer)
      activityTimer = setTimeout(
        () => useAuthStore.getState().extendSession(),
        2000
      )
    }
    ACTIVITY_EVENTS.forEach((e) =>
      window.addEventListener(e, onActivity, { passive: true })
    )

    return () => {
      clearInterval(intervalId)
      clearTimeout(activityTimer)
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, onActivity))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return children
}
