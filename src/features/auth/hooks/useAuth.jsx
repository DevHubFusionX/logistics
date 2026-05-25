import React, { useEffect, createContext, useContext, useMemo } from 'react'
import { useAuthStore } from '../../../stores/authStore'

// Keep the context for backwards compatibility if needed, 
// but most consumers should just use the store directly later.
const AuthStateContext = createContext()
const AuthActionsContext = createContext()

/**
 * Backwards compatible hook for auth state
 */
export const useAuthState = () => {
  const { user, isLoading, isAuthenticated } = useAuthStore()
  return { user, loading: isLoading, isAuthenticated }
}

/**
 * Backwards compatible hook for auth actions
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
      
      // Case-insensitive inclusion check
      return allowedRoles.some(role => 
        role.toLowerCase() === userRole.toLowerCase()
      )
    }
  }
}

/**
 * Combined hook for backwards compatibility
 */
export const useAuth = () => {
  const state = useAuthState()
  const actions = useAuthActions()
  return { ...state, ...actions }
}

/**
 * AuthProvider that manages the Zustand store lifecycle
 */
export const AuthProvider = ({ children }) => {
  const { checkSession, logout, isLoading, user } = useAuthStore()

  useEffect(() => {
    // Initial session check
    const isValid = checkSession()
    if (!isValid && user) logout()
    useAuthStore.setState({ isLoading: false })

    // Periodic session check every 5 minutes (not every 60s)
    const interval = setInterval(() => checkSession(), 5 * 60 * 1000)

    // Extend session on user activity
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll']
    let activityTimer
    const onActivity = () => {
      clearTimeout(activityTimer)
      activityTimer = setTimeout(() => {
        useAuthStore.getState().extendSession()
      }, 2000) // debounce 2s
    }
    events.forEach(e => window.addEventListener(e, onActivity, { passive: true }))

    return () => {
      clearInterval(interval)
      clearTimeout(activityTimer)
      events.forEach(e => window.removeEventListener(e, onActivity))
    }
  }, [])

  // Provider values for legacy consumers
  const stateValue = useMemo(() => ({ user, loading: isLoading }), [user, isLoading])
  const actionsValue = useMemo(() => ({
    logout,
    setUser: (u) => useAuthStore.getState().updateUser(u),
  }), [])

  return (
    <AuthStateContext.Provider value={stateValue}>
      <AuthActionsContext.Provider value={actionsValue}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  )
}
