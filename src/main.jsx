import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { queryClient } from './lib/queryClient'
import './index.css'
import App from './App.jsx'

// ── Token migration (runs once on startup) ────────────────────────────────────
// Before this fix, tokens were only written to sessionStorage when "Remember Me"
// was not checked. Copy any existing sessionStorage token to localStorage so
// existing logged-in users don't need to log out to fix the payment 401 error.
;(function migrateToken() {
  const TOKEN_KEY = 'dara_token'
  const fromSession = sessionStorage.getItem(TOKEN_KEY)
  const inLocal = localStorage.getItem(TOKEN_KEY)
  if (fromSession && !inLocal) {
    localStorage.setItem(TOKEN_KEY, fromSession)
    // Mark as session-only so it gets cleared when the session expires
    if (!localStorage.getItem(TOKEN_KEY + '_session_only')) {
      localStorage.setItem(TOKEN_KEY + '_session_only', '1')
    }
  }
})()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
