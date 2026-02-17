import React, { useEffect, createContext, useContext, useMemo } from 'react'
import { useAuthStore } from '../stores/authStore'

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
    login: store.setAuth, // Note: Components now use mutations, but we keep this for compat
    logout: store.logout,
    setUser: store.updateUser,
    updateUserRole: (role) => store.updateUser({ role }),
    hasPermission: (allowedRoles) => {
      if (!allowedRoles || allowedRoles.length === 0) return true
      const rawRole = store.user?.role || 'Customer'
      // Legacy support for 'user' string if not yet normalized in store
      const userRole = rawRole === 'user' ? 'Customer' : rawRole
      return allowedRoles.includes(userRole)
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
    if (!isValid && user) {
      logout()
    }

    // Set loading to false once checked
    useAuthStore.setState({ isLoading: false })

    // Optional: Periodic session check
    const interval = setInterval(() => {
      checkSession()
    }, 60000) // Every minute

    return () => clearInterval(interval)
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
