import { useState, useEffect, createContext, useContext } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (token) {
        try {
          const response = await authService.getProfile()
          if (response.data?.user) {
            setUser(response.data.user)
            localStorage.setItem('user', JSON.stringify(response.data.user))
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
    }
    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}