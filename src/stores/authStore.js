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

// Token lives in sessionStorage by default (cleared on tab/browser close)
// When rememberMe=true we also write it to localStorage so it survives restarts
const TOKEN_KEY = 'dara_token'

const tokenStorage = {
  get: () => {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || null
  },
  set: (token, rememberMe) => {
    sessionStorage.setItem(TOKEN_KEY, token)
    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  clear: () => {
    sessionStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_KEY)
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
          : 8 * 60 * 65 * 1000
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
          // After rehydration, verify the token still exists in storage
          const token = tokenStorage.get()
          if (!token) {
            // Token gone (sessionStorage cleared) but localStorage had user info
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
