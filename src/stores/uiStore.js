import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * UI State Store
 * 
 * Manages global UI state like sidebar, modals, themes, and preferences
 */
export const useUIStore = create(
    persist(
        (set) => ({
            // Sidebar state
            sidebarOpen: true,
            sidebarCollapsed: false,

            // Theme
            theme: 'light',

            // Active modal
            activeModal: null,
            modalData: null,

            // Loading states
            globalLoading: false,

            // Notifications
            notifications: [],

            // Actions
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            collapseSidebar: (collapsed) => set({ sidebarCollapsed: collapsed }),
            setTheme: (theme) => set({ theme }),

            openModal: (modalName, data = null) => set({ activeModal: modalName, modalData: data }),
            closeModal: () => set({ activeModal: null, modalData: null }),

            setGlobalLoading: (loading) => set({ globalLoading: loading }),

            addNotification: (notification) => set((state) => ({
                notifications: [...state.notifications, { ...notification, id: Date.now() }]
            })),
            removeNotification: (id) => set((state) => ({
                notifications: state.notifications.filter(n => n.id !== id)
            })),
            clearNotifications: () => set({ notifications: [] }),
        }),
        {
            name: 'dara-ui-storage',
            partialize: (state) => ({
                sidebarCollapsed: state.sidebarCollapsed,
                theme: state.theme,
            }),
        }
    )
)

/**
 * Filter State Store
 * 
 * Manages filter states across different views
 */
export const useFilterStore = create((set) => ({
    filters: {
        bookings: {},
        shipments: {},
        payments: {},
        fleet: {},
    },

    setFilter: (entity, filterData) => set((state) => ({
        filters: {
            ...state.filters,
            [entity]: { ...state.filters[entity], ...filterData }
        }
    })),

    clearFilter: (entity) => set((state) => ({
        filters: {
            ...state.filters,
            [entity]: {}
        }
    })),

    clearAllFilters: () => set({
        filters: {
            bookings: {},
            shipments: {},
            payments: {},
            fleet: {},
        }
    }),
}))
