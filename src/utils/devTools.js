// Development tools for testing and debugging

// Enable/disable role switcher
export const toggleRoleSwitcher = () => {
  const current = localStorage.getItem('showRoleSwitcher') === 'true'
  localStorage.setItem('showRoleSwitcher', (!current).toString())
  localStorage.setItem('roleSwitcherVisible', 'true')
  console.log(`Role Switcher ${!current ? 'enabled' : 'disabled'}`)
  window.location.reload()
}

// Show role switcher (if accidentally closed)
export const showRoleSwitcher = () => {
  localStorage.setItem('showRoleSwitcher', 'true')
  localStorage.setItem('roleSwitcherVisible', 'true')
  console.log('Role Switcher enabled')
  window.location.reload()
}

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
  localStorage.removeItem('showRoleSwitcher')
  localStorage.removeItem('roleSwitcherVisible')
  localStorage.removeItem('roleSwitcherPosition')
  console.log('Auth data cleared')
  window.location.reload()
}

// Global functions for browser console
if (typeof window !== 'undefined') {
  window.devTools = {
    toggleRoleSwitcher,
    showRoleSwitcher,
    setMockUser,
    clearAuth,
    enableRoleSwitcher: () => showRoleSwitcher(),
    setRole: (role) => setMockUser(role)
  }
  
  // Keyboard shortcut to show role switcher (Ctrl+Shift+R)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
      e.preventDefault()
      showRoleSwitcher()
    }
  })
  
  // Auto-enable in development
  if (import.meta.env.DEV) {
    console.log('🛠️ Dev Tools Available:')
    console.log('- devTools.showRoleSwitcher() - Show role switcher')
    console.log('- devTools.setMockUser(role) - Set mock user with role')
    console.log('- devTools.clearAuth() - Clear all auth data')
    console.log('- Ctrl+Shift+R - Show role switcher (keyboard shortcut)')
    
    // Auto-enable role switcher in dev mode
    if (!localStorage.getItem('showRoleSwitcher')) {
      localStorage.setItem('showRoleSwitcher', 'true')
    }
  }
}