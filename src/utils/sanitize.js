// XSS Prevention Utilities
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export const sanitizeUrl = (url) => {
  if (!url) return ''
  const allowedProtocols = ['http:', 'https:']
  try {
    const parsed = new URL(url, window.location.origin)
    if (!allowedProtocols.includes(parsed.protocol)) {
      return ''
    }
    return parsed.href
  } catch {
    return ''
  }
}

export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj
  const sanitized = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeObject(value)
    } else {
      sanitized[key] = value
    }
  }
  return sanitized
}
