import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import authService from '../../services/authService'
import { useAuthStore } from '../../stores/authStore'
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
            try {
                const response = isAdmin
                    ? await authService.getAdminProfile()
                    : await authService.getProfile()

                // API returns { data: { error, message, data: { user fields... } } }
                return response.data?.data || response.data || response
            } catch (error) {
                if (error.status === 401) {
                    logout()
                }
                throw error
            }
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
        enabled: !!user
    })
}

/**
 * Hook for user login mutation
 */
export function useLoginMutation() {
    const { setAuth } = useAuthStore()

    return useMutation({
        mutationFn: (credentials) => authService.login(credentials),
        onSuccess: (response) => {
            const payload = response.data?.data
            if (payload?.token) {
                const user = payload.user || payload.admin
                setAuth(user, payload.token)
                toast.success('Login successful!')
            }
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
            const payload = response.data?.data
            if (payload?.token) {
                // Determine user object (backend may return user, admin, manager or flat fields)
                const user = payload.user || payload.admin || payload.manager || { ...payload }
                if (user.token) delete user.token // Clean up if flat
                
                setAuth(user, payload.token)
                toast.success('Manager access granted!')
            }
        }
    })
}

/**
 * Hook for registration mutation
 */
export function useRegisterMutation() {
    const { setAuth } = useAuthStore()

    return useMutation({
        mutationFn: (userData) => authService.register(userData),
        onSuccess: (response) => {
            const payload = response.data?.data
            if (payload?.token) {
                setAuth(payload.user, payload.token)
                toast.success('Account created successfully!')
            }
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
