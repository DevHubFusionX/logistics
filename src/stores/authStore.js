import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} role
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} [companyName]
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user
 * @property {string|null} token
 * @property {boolean} isAuthenticated
 * @property {boolean} isLoading
 * @property {number|null} sessionExpiresAt
 * @property {boolean} rememberMe
 * 
 * @property {function(User, string, boolean): void} setAuth
 * @property {function(): void} logout
 * @property {function(boolean): void} setLoading
 * @property {function(User): void} updateUser
 * @property {function(): boolean} checkSession
 */

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

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: true,
            sessionExpiresAt: null,
            rememberMe: false,

            setAuth: (user, token, rememberMe = false) => {
                const expiresIn = 24 * 60 * 60 * 1000 // 24 hours
                const expiresAt = Date.now() + expiresIn

                set({
                    user: normalizeUser(user),
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                    sessionExpiresAt: expiresAt,
                    rememberMe
                })
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    sessionExpiresAt: null
                })
                // Clear any specific session data if needed
            },

            setLoading: (isLoading) => set({ isLoading }),

            updateUser: (userData) => set((state) => ({
                user: state.user ? normalizeUser({ ...state.user, ...userData }) : normalizeUser(userData)
            })),

            checkSession: () => {
                const { sessionExpiresAt, token } = get()
                if (!token) return false

                if (sessionExpiresAt && Date.now() > sessionExpiresAt) {
                    get().logout()
                    return false
                }
                return true
            },

            // Role Selectors
            getIsAdmin: () => {
                const user = get().user
                const adminRoles = ['Super Admin', 'Dispatcher', 'Admin Manager']
                return adminRoles.includes(user?.role)
            },
            getIsSuperAdmin: () => {
                const user = get().user
                return user?.role === 'Super Admin'
            },
            getIsManager: () => {
                const user = get().user
                return user?.role === 'Admin Manager'
            }
        }),
        {
            name: 'dara-auth-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                sessionExpiresAt: state.sessionExpiresAt,
                rememberMe: state.rememberMe
            })
        }
    )
)
