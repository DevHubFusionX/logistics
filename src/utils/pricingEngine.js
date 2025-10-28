// Centralized pricing calculation engine
// Used by both admin pricing management and client booking flow

// Global pricing rules - can be updated by admin
let globalPricingRules = {
  baseRatePerKg: 2.50,
  serviceMultipliers: {
    standard: 1.0,
    express: 1.5,
    overnight: 2.0
  },
  insuranceRate: 0.02,
  handlingFee: 25,
  taxRate: 0.08,
  currency: 'USD',
  lastUpdatedBy: 'admin@daraexpress.com',
  lastUpdatedAt: '2025-01-15 14:30'
}

// Client-specific overrides - can be managed by admin
let clientOverrides = {
  'adebayo-industries': {
    name: 'Adebayo Industries',
    baseRatePerKg: 2.20,
    discount: 0.10,
    currency: 'USD'
  },
  'kano-distribution': {
    name: 'Kano Distribution Ltd',
    baseRatePerKg: 2.30,
    discount: 0.05,
    currency: 'USD'
  }
}

export const defaultPricingRules = globalPricingRules

export function calculateQuote(bookingData, clientId = null) {
  // Check for client-specific pricing
  const clientOverride = clientId ? clientOverrides[clientId] : null
  const baseRate = clientOverride?.baseRatePerKg || globalPricingRules.baseRatePerKg
  
  const weight = parseFloat(bookingData.weight)
  const basePrice = weight * baseRate
  
  const serviceMultiplier = globalPricingRules.serviceMultipliers[bookingData.serviceType] || 1.0
  const insurance = basePrice * globalPricingRules.insuranceRate
  const handling = globalPricingRules.handlingFee
  
  let subtotal = (basePrice * serviceMultiplier) + insurance + handling
  
  // Calculate discount amount before applying
  const discountAmount = clientOverride?.discount ? subtotal * clientOverride.discount : 0
  
  // Apply client discount if exists
  if (discountAmount > 0) {
    subtotal = subtotal - discountAmount
  }
  
  const tax = subtotal * globalPricingRules.taxRate
  const total = subtotal + tax
  
  return {
    basePrice: basePrice.toFixed(2),
    serviceMultiplier,
    insurance: insurance.toFixed(2),
    handling: handling.toFixed(2),
    discount: discountAmount.toFixed(2),
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
    currency: globalPricingRules.currency,
    appliedRate: baseRate,
    hasClientOverride: !!clientOverride,
    clientName: clientOverride?.name || null,
    discountPercentage: clientOverride?.discount ? (clientOverride.discount * 100).toFixed(0) : '0'
  }
}

export function getPricingRules() {
  return { ...globalPricingRules }
}

export function updatePricingRules(newRules, user = 'admin@daraexpress.com') {
  // In production, this would call an API
  const oldRules = { ...globalPricingRules }
  globalPricingRules = {
    ...globalPricingRules,
    ...newRules,
    lastUpdatedBy: user,
    lastUpdatedAt: new Date().toLocaleString()
  }
  
  // Log the change for audit
  logPricingChange(user, 'Updated pricing rules', oldRules, globalPricingRules)
  
  return { ...globalPricingRules }
}

export function getClientOverrides() {
  return Object.entries(clientOverrides).map(([id, data]) => ({
    id,
    ...data
  }))
}

export function addClientOverride(clientData) {
  const id = clientData.name.toLowerCase().replace(/\s+/g, '-')
  clientOverrides[id] = clientData
  return { id, ...clientData }
}

export function updateClientOverride(clientId, clientData) {
  if (clientOverrides[clientId]) {
    clientOverrides[clientId] = { ...clientOverrides[clientId], ...clientData }
    return { id: clientId, ...clientOverrides[clientId] }
  }
  return null
}

export function deleteClientOverride(clientId) {
  if (clientOverrides[clientId]) {
    delete clientOverrides[clientId]
    return true
  }
  return false
}

// Audit log storage
let auditLog = []

function logPricingChange(user, action, oldValue, newValue) {
  auditLog.unshift({
    id: Date.now(),
    user,
    action,
    oldValue: JSON.stringify(oldValue),
    newValue: JSON.stringify(newValue),
    timestamp: new Date().toLocaleString(),
    role: user.includes('admin') ? 'Super Admin' : 'Finance Officer'
  })
  // Keep only last 100 entries
  if (auditLog.length > 100) auditLog = auditLog.slice(0, 100)
}

export function getAuditLog() {
  return [...auditLog]
}
