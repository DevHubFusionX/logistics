import React, { useState, useEffect, createContext, useContext, useMemo } from 'react'
import authService from '../services/authService'

// Split into two contexts to prevent unnecessary re-renders
const AuthStateContext = createContext()
const AuthActionsContext = createContext()

const roleMap = {
  'user': 'Customer',
  'admin': 'Super Admin',
  'driver': 'Driver'
}

const normalizeUser = (user) => {
  if (!user) return null
  return {
    ...user,
    role: roleMap[user.role] || user.role || 'Customer'
  }
}

// Hook to access auth state (user, loading)
export const useAuthState = () => {
  const context = useContext(AuthStateContext)
  if (!context) {
    return { user: null, loading: false }
  }
  return context
}

// Hook to access auth actions (login, logout, etc)
export const useAuthActions = () => {
  const context = useContext(AuthActionsContext)
  if (!context) {
    return {
      login: () => { },
      register: () => { },
      logout: () => { },
      hasPermission: () => true,
      updateProfile: () => { },
      updateUserRole: () => { },
      setUser: () => { }
    }
  }
  return context
}

// Combined hook for backwards compatibility
export const useAuth = () => {
  const state = useAuthState()
  const actions = useAuthActions()
  return { ...state, ...actions }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [loading, setLoading] = useState(true)

  // Persist user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await authService.getProfile()
          if (response.data) {
            setUser(normalizeUser(response.data))
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err)
          localStorage.clear()
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = async (credentials) => {
    const response = await authService.login(credentials)
    if (response.data?.token) {
      setUser(normalizeUser(response.data.user))
    }
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    if (response.data?.token) {
      setUser(normalizeUser(response.data.user))
    }
    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/auth/login'
  }

  const hasPermission = (allowedRoles) => {
    if (!allowedRoles || allowedRoles.length === 0) return true
    const userRole = user?.role || 'user'
    return allowedRoles.includes(userRole)
  }

  const updateProfile = async (profileData) => {
    const response = await authService.updateProfile(profileData)
    if (response.data?.user) {
      setUser(prev => normalizeUser({ ...prev, ...response.data.user }))
    }
    return response
  }

  const updateUserRole = (newRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole }
      setUser(updatedUser)
    }
  }

  // Memoize state and actions to prevent unnecessary re-renders
  const stateValue = useMemo(
    () => ({ user, loading }),
    [user, loading]
  )

  const actionsValue = useMemo(
    () => ({
      setUser,
      login,
      register,
      logout,
      hasPermission,
      updateUserRole,
      updateProfile
    }),
    [user] // Actions depend on user state
  )

  return (
    <AuthStateContext.Provider value={stateValue}>
      <AuthActionsContext.Provider value={actionsValue}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  )
}