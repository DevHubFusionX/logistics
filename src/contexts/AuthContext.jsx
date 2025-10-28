import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@daralogistics.com',
    role: 'Super Admin'
  })

  const hasPermission = (allowedRoles) => {
    if (!allowedRoles || allowedRoles.length === 0) return true
    return allowedRoles.includes(user.role)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}
