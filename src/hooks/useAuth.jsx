import React, { useState, useEffect, createContext, useContext, useMemo } from 'react'
import authService from '../services/authService'

// Split into two contexts to prevent unnecessary re-renders
const AuthStateContext = createContext()
const AuthActionsContext = createContext()

const roleMap = {
  'user': 'Customer',
  'admin': 'Super Admin',
  'SUPER_ADMIN': 'Super Admin',
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
      adminLogin: () => { },
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
    try {
      const savedUser = localStorage.getItem('user')
      if (savedUser && savedUser !== 'undefined') {
        return JSON.parse(savedUser)
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error)
      localStorage.removeItem('user')
    }
    return null
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
          // Determine which profile endpoint to call based on existing local state if available
          const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
          const isAdmin = savedUser?.role === 'Super Admin' || savedUser?.role === 'admin' || savedUser?.role === 'SUPER_ADMIN'

          const response = isAdmin
            ? await authService.getAdminProfile()
            : await authService.getProfile()

          // API might return { data: { admin } } or { data: { user } } or { data: { data: { user/admin } } }
          const apiBody = response.data
          const userData = apiBody?.data?.user || apiBody?.data?.admin || apiBody?.data || apiBody

          if (userData) {
            setUser(normalizeUser(userData))
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err)
          // If profile fetch fails (e.g. 401 for admin on /user/), 
          // we keep the local state if it exists, or clear it if it's a real auth failure
          if (err.status === 401 && user) {
            console.log('Restoring user session from local state')
          } else {
            localStorage.clear()
            setUser(null)
          }
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = async (credentials) => {
    const response = await authService.login(credentials)
    // API returns { data: { error, message, data: { user/admin, token } } }
    const payload = response.data?.data
    if (payload?.token) {
      setUser(normalizeUser(payload.user || payload.admin))
    }
    return response
  }

  const adminLogin = async (credentials) => {
    const response = await authService.adminLogin(credentials)
    // API returns { data: { error, message, data: { user/admin, token } } }
    const payload = response.data?.data
    if (payload?.token) {
      setUser(normalizeUser(payload.user || payload.admin))
    }
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    // API returns { data: { error, message, data: { user, token } } }
    const payload = response.data?.data
    if (payload?.token) {
      setUser(normalizeUser(payload.user))
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
      adminLogin,
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
