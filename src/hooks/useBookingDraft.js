import { useState, useEffect, useCallback } from 'react'
import { saveDraft, loadDraft, clearDraft, hasDraft, getDraftAge } from '../utils/bookingDraft'

export const useBookingDraft = (initialFormData) => {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [lastSaved, setLastSaved] = useState(null)
  const [draftAvailable, setDraftAvailable] = useState(false)

  useEffect(() => {
    setDraftAvailable(hasDraft())
  }, [])

  const save = useCallback((formData) => {
    if (saveDraft(formData)) {
      setLastSaved(Date.now())
      return true
    }
    return false
  }, [])

  const load = useCallback(() => {
    const draft = loadDraft()
    if (draft) {
      setDraftAvailable(false)
    }
    return draft
  }, [])

  const clear = useCallback(() => {
    if (clearDraft()) {
      setDraftAvailable(false)
      setLastSaved(null)
      return true
    }
    return false
  }, [])

  const autoSave = useCallback((formData) => {
    if (autoSaveEnabled) {
      return save(formData)
    }
    return false
  }, [autoSaveEnabled, save])

  return {
    save,
    load,
    clear,
    autoSave,
    lastSaved,
    draftAvailable,
    autoSaveEnabled,
    setAutoSaveEnabled,
    draftAge: getDraftAge()
  }
}
