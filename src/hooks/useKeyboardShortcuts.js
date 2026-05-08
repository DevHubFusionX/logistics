import { useEffect, useCallback } from 'react'

export default function useKeyboardShortcuts(shortcuts = {}) {
  const handleKeyDown = useCallback((event) => {
    // Don't trigger shortcuts when typing in inputs
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return
    }
    
    const key = event.key.toLowerCase()
    const combo = []
    
    if (event.ctrlKey || event.metaKey) combo.push('ctrl')
    if (event.shiftKey) combo.push('shift')
    if (event.altKey) combo.push('alt')
    combo.push(key)
    
    const shortcutKey = combo.join('+')
    
    // Handle single key shortcuts
    if (shortcuts[key]) {
      event.preventDefault()
      shortcuts[key]()
      return
    }
    
    // Handle combination shortcuts
    if (shortcuts[shortcutKey]) {
      event.preventDefault()
      shortcuts[shortcutKey]()
    }
  }, [shortcuts])
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// Common shortcuts for logistics app
export const useLogisticsShortcuts = ({
  onNewShipment,
  onSearch,
  onRefresh,
  onExport
}) => {
  return useKeyboardShortcuts({
    'n': onNewShipment,
    '/': onSearch,
    'r': onRefresh,
    'ctrl+e': onExport,
    'f5': onRefresh
  })
}