import { create } from 'zustand'

const useUiStore = create((set) => ({
    sidebarCollapsed: false,
    sidebarOpen: false,

    toggleSidebar: () => set((state) => ({
        sidebarCollapsed: !state.sidebarCollapsed
    })),

    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

    toggleMobileSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen
    })),

    setMobileSidebar: (open) => set({ sidebarOpen: open }),

    closeAllSidebars: () => set({
        sidebarCollapsed: false,
        sidebarOpen: false
    }),
}))

export default useUiStore
