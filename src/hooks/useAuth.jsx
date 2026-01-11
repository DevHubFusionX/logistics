import { useState, useEffect, createContext, useContext } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    return { user: null, loading: false, login: () => {}, register: () => {}, logout: () => {}, hasPermission: () => true, setUser: () => {} }
  }
  return context
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
          if (response.data?.user) {
            setUser(response.data.user)
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
      setUser(response.data.user)
    }
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    if (response.data?.token) {
      setUser(response.data.user)
    } else if (import.meta.env.DEV) {
      const mockUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'Customer'
      }
      setUser(mockUser)
      return { data: { token: 'mock-token', user: mockUser } }
    }
    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const hasPermission = (allowedRoles) => {
    if (!allowedRoles || allowedRoles.length === 0) return true
    const userRole = user?.role || 'Customer'
    return allowedRoles.includes(userRole)
  }

  const updateUserRole = (newRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole }
      setUser(updatedUser)
    }
  }

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    loading,
    hasPermission,
    updateUserRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}