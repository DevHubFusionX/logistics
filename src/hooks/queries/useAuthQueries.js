import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import authService from '../../services/authService'
import { useAuthActions } from '../useAuth'
import toast from 'react-hot-toast'

export const authKeys = {
    profile: ['auth', 'profile'],
}

export function useProfileQuery() {
    return useQuery({
        queryKey: authKeys.profile,
        queryFn: async () => {
            const response = await authService.getProfile()
            return response.data || response
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    })
}

export function useUpdateProfileMutation() {
    const queryClient = useQueryClient()
    const { setUser } = useAuthActions()

    return useMutation({
        mutationFn: (data) => authService.updateProfile(data),
        onSuccess: (response) => {
            const updatedUser = response.data?.user || response.data || response
            if (updatedUser) {
                // Sync context state if needed, though Query will handle cache
                setUser(prev => ({ ...prev, ...updatedUser }))
            }
            toast.success('Profile updated successfully!')
            queryClient.invalidateQueries({ queryKey: authKeys.profile })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to update profile')
        }
    })
}
