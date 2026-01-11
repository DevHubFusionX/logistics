import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Persist user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const register = async (userData) => {
    const response = await authService.register(userData)
    if (response.data?.user) {
      setUser(response.data.user)
    }
    return response
  }

  const login = async (credentials) => {
    const response = await authService.login(credentials)
    if (response.data?.user) {
      setUser(response.data.user)
    }
    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const hasPermission = (allowedRoles) => {
    if (!user) return false
    if (!allowedRoles || allowedRoles.length === 0) return true
    return allowedRoles.includes(user.role)
  }

  const updateUserRole = (newRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole }
      setUser(updatedUser)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      register, 
      login, 
      logout, 
      hasPermission, 
      updateUserRole 
    }}>
      {children}
    </AuthContext.Provider>
  )
}
