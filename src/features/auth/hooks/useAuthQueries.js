import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import authService from '../services/authService'
import { useAuthStore } from '../../../stores/authStore'
import { queryClient } from '../../../lib/queryClient'
import toast from 'react-hot-toast'

export const authKeys = {
    profile: ['auth', 'profile'],
}

/**
 * Hook to fetch current user profile
 */
export function useProfileQuery() {
    const { user, logout, getIsAdmin } = useAuthStore()
    const isAdmin = getIsAdmin()

    return useQuery({
        queryKey: [...authKeys.profile, user?.id],
        queryFn: async () => {
            // httpClient already handles 401 globally — don't call logout()
            // here as well, that causes double-logout races mid-session
            const response = isAdmin
                ? await authService.getAdminProfile()
                : await authService.getProfile()
            return response.data?.data || response.data || response
        },
        staleTime: 5 * 60 * 1000,  // 5 minutes — avoids hammering API on every render
        gcTime:    5 * 60 * 1000,
        enabled: !!user,
        retry: false                // don't retry auth errors
    })
}

/**
 * Hook for user login mutation
 * All post-login logic (verified check, toast, redirect) is handled in the component.
 */
export function useLoginMutation() {
    return useMutation({
        mutationFn: (credentials) => authService.login(credentials),
        onSuccess: () => {
            // Clear any cached data from a previous session before setting new auth
            queryClient.clear()
        }
    })
}

/**
 * Hook for admin login mutation
 */
export function useAdminLoginMutation() {
    const { setAuth } = useAuthStore()

    return useMutation({
        mutationFn: (credentials) => authService.adminLogin(credentials),
        onSuccess: (response) => {
            queryClient.clear()
            const payload = response.data?.data
            if (payload?.token) {
                const user = payload.user || payload.admin
                setAuth(user, payload.token)
                toast.success('Admin access granted!')
            }
        }
    })
}

/**
 * Hook for manager login mutation
 */
export function useManagerLoginMutation() {
    const { setAuth } = useAuthStore()

    return useMutation({
        mutationFn: (credentials) => authService.managerLogin(credentials),
        onSuccess: (response) => {
            queryClient.clear()
            const payload = response.data?.data
            if (payload?.token) {
                const user = payload.user || payload.admin || payload.manager || { ...payload }
                if (user.token) delete user.token
                setAuth(user, payload.token)
                toast.success('Manager access granted!')
            }
        }
    })
}

/**
 * Hook for registration mutation.
 * Sign-up returns a token but verified=false.
 * We do NOT call setAuth — instead redirect to verify-email.
 * The user must verify their email before they can log in.
 */
export function useRegisterMutation() {
  return useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: () => {
      queryClient.clear()
    }
  })
}

/**
 * Hook to update user profile
 */
export function useUpdateProfileMutation() {
    const queryClient = useQueryClient()
    const { updateUser } = useAuthStore()

    return useMutation({
        mutationFn: (data) => authService.updateProfile(data),
        onSuccess: (response) => {
            const updatedUser = response.data?.user || response.data?.data || response.data
            if (updatedUser) {
                updateUser(updatedUser)
            }
            toast.success('Profile updated!')
            queryClient.invalidateQueries({ queryKey: authKeys.profile })
        },
        onError: (error) => {
            toast.error(error.message || 'Update failed')
        }
    })
}
