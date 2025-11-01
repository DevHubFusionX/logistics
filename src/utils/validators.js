export const isValidEmail = (email) => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidPhone = (phone) => 
  /^[0-9]{10,11}$/.test(phone?.replace(/\D/g, ''))

export const isStrongPassword = (password) => {
  if (password.length < 8) return false
  if (!/[A-Z]/.test(password)) return false
  if (!/[a-z]/.test(password)) return false
  if (!/[0-9]/.test(password)) return false
  return true
}

export const getPasswordStrength = (password) => {
  if (!password) return { level: 0, label: 'None' }
  
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  const levels = [
    { level: 0, label: 'None' },
    { level: 1, label: 'Weak' },
    { level: 2, label: 'Fair' },
    { level: 3, label: 'Good' },
    { level: 4, label: 'Strong' },
    { level: 5, label: 'Very Strong' }
  ]
  
  return levels[strength]
}

export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isEmpty = (value) => 
  value === null || value === undefined || value === '' || 
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0)
