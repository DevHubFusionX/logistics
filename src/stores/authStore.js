import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { queryClient } from '../lib/queryClient'

const roleMap = {
  'user': 'Customer',
  'customer': 'Customer',
  'admin': 'Super Admin',
  'super_admin': 'Super Admin',
  'manager': 'Admin Manager',
  'admin_manager': 'Admin Manager',
  'admin manager': 'Admin Manager',
  'dispatcher': 'Dispatcher',
  'driver': 'Driver'
}

const normalizeUser = (user) => {
  if (!user) return null
  const rawRole = (user.role || '').toLowerCase().trim()
  return {
    ...user,
    role: roleMap[rawRole] || user.role || 'Customer'
  }
}

// Token lives in both sessionStorage (tab-scoped) and localStorage (persistent).
// Session duration is controlled by sessionExpiresAt in the store, not by
// where the token is stored. This ensures the Authorization header is always
// available even across modals, reloads, and Paystack redirects.
export const TOKEN_KEY = 'dara_token'

const tokenStorage = {
  get: () => {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || null
  },
  set: (token, rememberMe) => {
    // Always write to both storages so the token is reliably available
    // in all browser contexts (modals, page transitions, Paystack redirects).
    // Session lifetime (8h vs 7d) is enforced via sessionExpiresAt.
    sessionStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(TOKEN_KEY, token)
    if (!rememberMe) {
      // For non-remember-me sessions, tag localStorage entry with a short-lived
      // marker so we know to clear it when the auth session expires.
      localStorage.setItem(TOKEN_KEY + '_session_only', '1')
    } else {
      localStorage.removeItem(TOKEN_KEY + '_session_only')
    }
  },
  clear: () => {
    sessionStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_KEY + '_session_only')
  }
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      sessionExpiresAt: null,
      rememberMe: false,

      // Derived — reads from storage directly, not state
      get token() {
        return tokenStorage.get()
      },

      setAuth: (user, token, rememberMe = false) => {
        // rememberMe=true  → 7 days
        // rememberMe=false → 8 hours (reasonable work session)
        const expiresIn = rememberMe
          ? 7 * 24 * 60 * 60 * 1000
          : 8 * 60 * 60 * 1000

        tokenStorage.set(token, rememberMe)

        set({
          user: normalizeUser(user),
          isAuthenticated: true,
          isLoading: false,
          sessionExpiresAt: Date.now() + expiresIn,
          rememberMe
        })
      },

      logout: () => {
        tokenStorage.clear()
        queryClient.clear() // wipe all cached data from previous session
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          sessionExpiresAt: null,
          rememberMe: false
        })
      },

      setLoading: (isLoading) => set({ isLoading }),

      updateUser: (userData) => set((state) => ({
        user: state.user
          ? normalizeUser({ ...state.user, ...userData })
          : normalizeUser(userData)
      })),

      checkSession: () => {
        const { sessionExpiresAt } = get()
        const token = tokenStorage.get()

        if (!token) {
          get().logout()
          return false
        }

        if (sessionExpiresAt && Date.now() > sessionExpiresAt) {
          get().logout()
          return false
        }

        return true
      },

      // Extend session on activity (call this on user interactions)
      extendSession: () => {
        const { rememberMe, isAuthenticated } = get()
        if (!isAuthenticated) return
        const expiresIn = rememberMe
          ? 7 * 24 * 60 * 60 * 1000
          : 8 * 60 * 60 * 1000
        set({ sessionExpiresAt: Date.now() + expiresIn })
      },

      // Role selectors
      getIsAdmin: () => {
        const user = get().user
        return ['Super Admin', 'Dispatcher', 'Admin Manager'].includes(user?.role)
      },
      getIsSuperAdmin: () => get().user?.role === 'Super Admin',
      getIsManager:    () => get().user?.role === 'Admin Manager',
    }),
    {
      name: 'dara-auth-store',
      // Only persist non-sensitive UI state to localStorage
      // The token is handled separately via tokenStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionExpiresAt: state.sessionExpiresAt,
        rememberMe: state.rememberMe
        // token intentionally excluded — managed by tokenStorage
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const token = tokenStorage.get()
          const sessionOnly = localStorage.getItem(TOKEN_KEY + '_session_only')

          // If this was a session-only login and the session has expired, clear the token
          if (sessionOnly && state.sessionExpiresAt && Date.now() > state.sessionExpiresAt) {
            tokenStorage.clear()
            state.user = null
            state.isAuthenticated = false
            state.sessionExpiresAt = null
          } else if (!token) {
            // Token gone but localStorage had user info — clear everything
            state.user = null
            state.isAuthenticated = false
            state.sessionExpiresAt = null
          }
          state.isLoading = false
        }
      }
    }
  )
)
