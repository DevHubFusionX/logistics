// Development tools for testing and debugging

// Set a mock user for testing
export const setMockUser = (role = 'Customer') => {
  const mockUser = {
    id: 'mock-user-id',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    role: role,
    isVerified: true
  }
  localStorage.setItem('user', JSON.stringify(mockUser))
  localStorage.setItem('token', 'mock-token')
  console.log(`Mock user set with role: ${role}`)
  window.location.reload()
}

// Clear all auth data
export const clearAuth = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  console.log('Auth data cleared')
  window.location.reload()
}

// Global functions for browser console
if (typeof window !== 'undefined') {
  window.devTools = {
    setMockUser,
    clearAuth,
    setRole: (role) => setMockUser(role)
  }
  
  // Auto-enable in development
  if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
    console.log('🛠️ Dev Tools Available:')
    console.log('- devTools.setMockUser(role) - Set mock user with role')
    console.log('- devTools.clearAuth() - Clear all auth data')
  }
}