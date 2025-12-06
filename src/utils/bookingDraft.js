import { securityService } from '../services'

const DRAFT_KEY = 'booking_draft'
const DRAFT_EXPIRY_HOURS = 24

export const saveDraft = (formData) => {
  try {
    securityService.saveDraft(DRAFT_KEY, formData)
    return true
  } catch (error) {
    console.error('Failed to save draft:', error)
    return false
  }
}

export const loadDraft = () => {
  try {
    return securityService.loadDraft(DRAFT_KEY, DRAFT_EXPIRY_HOURS * 60 * 60 * 1000)
  } catch (error) {
    console.error('Failed to load draft:', error)
    return null
  }
}

export const clearDraft = () => {
  try {
    securityService.clearDraft(DRAFT_KEY)
    return true
  } catch (error) {
    console.error('Failed to clear draft:', error)
    return false
  }
}

export const hasDraft = () => {
  const draft = loadDraft()
  return draft !== null
}

export const getDraftAge = () => {
  try {
    const timestamp = localStorage.getItem(`draft_${DRAFT_KEY}_ts`)
    if (!timestamp) return null
    
    const age = Date.now() - parseInt(timestamp)
    const hours = Math.floor(age / (60 * 60 * 1000))
    const minutes = Math.floor((age % (60 * 60 * 1000)) / (60 * 1000))
    
    return { hours, minutes, timestamp: parseInt(timestamp) }
  } catch (error) {
    return null
  }
}
