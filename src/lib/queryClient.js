import { QueryClient } from '@tanstack/react-query'

/**
 * TanStack Query Client Configuration
 * 
 * Global settings for data fetching, caching, and synchronization
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Stale time: how long data is considered fresh (5 minutes)
            staleTime: 5 * 60 * 1000,

            // Cache time: how long inactive data stays in cache (10 minutes)
            gcTime: 10 * 60 * 1000, // formerly cacheTime

            // Retry failed requests 3 times with exponential backoff
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

            // Refetch on window focus for fresh data
            refetchOnWindowFocus: true,

            // Don't refetch on reconnect (to avoid excessive requests)
            refetchOnReconnect: false,

            // Don't refetch on mount for most queries
            refetchOnMount: false,
        },
        mutations: {
            // Retry mutations once on failure
            retry: 1,

            // Global error handler for mutations
            onError: (error) => {
                console.error('Mutation error:', error)
            },
        },
    },
})

// Query key factory for consistent cache keys
export const queryKeys = {
    // Auth
    auth: {
        profile: ['auth', 'profile'],
        permissions: ['auth', 'permissions'],
    },

    // Bookings
    bookings: {
        all: ['bookings'],
        list: (filters) => ['bookings', 'list', filters],
        detail: (id) => ['bookings', 'detail', id],
        stats: ['bookings', 'stats'],
    },

    // Shipments
    shipments: {
        all: ['shipments'],
        list: (filters) => ['shipments', 'list', filters],
        detail: (id) => ['shipments', 'detail', id],
        tracking: (id) => ['shipments', 'tracking', id],
    },

    // Fleet
    fleet: {
        all: ['fleet'],
        list: () => ['fleet', 'list'],
        detail: (id) => ['fleet', 'detail', id],
        maintenance: ['fleet', 'maintenance'],
    },

    // Drivers
    drivers: {
        all: ['drivers'],
        list: () => ['drivers', 'list'],
        detail: (id) => ['drivers', 'detail', id],
        schedule: (id) => ['drivers', 'schedule', id],
    },

    // Customers
    customers: {
        all: ['customers'],
        list: () => ['customers', 'list'],
        detail: (id) => ['customers', 'detail', id],
    },

    // Payments
    payments: {
        all: ['payments'],
        list: (filters) => ['payments', 'list', filters],
        detail: (id) => ['payments', 'detail', id],
        history: ['payments', 'history'],
    },

    // Analytics
    analytics: {
        dashboard: ['analytics', 'dashboard'],
        reports: (type) => ['analytics', 'reports', type],
        metrics: ['analytics', 'metrics'],
    },

    // Temperature
    temperature: {
        all: ['temperature'],
        list: (filters) => ['temperature', 'list', filters],
        alerts: ['temperature', 'alerts'],
        compliance: ['temperature', 'compliance'],
    },

    // Admin Specific
    admin: {
        customers: (params) => ['admin', 'customers', params],
        drivers: (params) => ['admin', 'drivers', params],
        fleet: (params) => ['admin', 'fleet', params],
        pricing: (params) => ['admin', 'pricing', params],
        dashboardSummary: (params) => ['admin', 'summary', params],
    }
}
