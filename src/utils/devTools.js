// Development tools for testing and debugging
// SECURITY: Only available in development mode

if (import.meta.env.DEV) {
  // Set a mock user for testing
  const setMockUser = (role = 'Customer') => {
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
    window.location.reload()
  }

  // Clear all auth data
  const clearAuth = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.reload()
  }

  // Global functions for browser console (DEV only)
  window.devTools = {
    setMockUser,
    clearAuth,
    setRole: (role) => setMockUser(role)
  }

}