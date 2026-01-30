import httpClient from './httpClient'

/**
 * Service to manage pricing rules and configurations from the backend.
 * Uses the backend API for database-powered pricing management.
 */
const pricingService = {
    // Get all pricing configurations from database
    getGlobalRules: async () => {
        const response = await httpClient.request('/pricing')
        // Transform array to object format for backward compatibility
        const configs = response.data || response || []

        // Convert array of configs to a structured object
        const configMap = {}
        configs.forEach(config => {
            configMap[config.service_type] = {
                id: config.id,
                serviceType: config.service_type,
                basePrice: config.base_price,
                pricePerKg: config.price_per_kg,
                pricePerKm: config.price_per_km,
                isActive: config.is_active,
                updatedAt: config.updated_at
            }
        })

        return {
            data: {
                configs: configs.map(c => ({
                    id: c.id,
                    serviceType: c.service_type,
                    basePrice: c.base_price,
                    pricePerKg: c.price_per_kg,
                    pricePerKm: c.price_per_km,
                    isActive: c.is_active,
                    createdAt: c.created_at,
                    updatedAt: c.updated_at
                })),
                currency: 'NGN',
                lastUpdatedAt: configs[0]?.updated_at || new Date().toISOString()
            }
        }
    },

    // Update a specific pricing configuration
    updatePricingConfig: async (id, data) => {
        return httpClient.request(`/pricing/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
    },

    // Calculate price using backend
    calculatePrice: async (serviceType, weight, distance) => {
        return httpClient.request('/pricing/calculate', {
            method: 'POST',
            body: JSON.stringify({ serviceType, weight, distance })
        })
    },

    // Client overrides (stored locally for now, can be extended to backend)
    getClientOverrides: () => {
        const stored = localStorage.getItem('clientPricingOverrides')
        return Promise.resolve({
            data: stored ? JSON.parse(stored) : []
        })
    },

    addClientOverride: (clientData) => {
        const stored = localStorage.getItem('clientPricingOverrides')
        const overrides = stored ? JSON.parse(stored) : []
        const newOverride = {
            id: `client-${Date.now()}`,
            ...clientData,
            createdAt: new Date().toISOString()
        }
        overrides.push(newOverride)
        localStorage.setItem('clientPricingOverrides', JSON.stringify(overrides))
        return Promise.resolve({ data: newOverride })
    },

    updateClientOverride: (id, clientData) => {
        const stored = localStorage.getItem('clientPricingOverrides')
        const overrides = stored ? JSON.parse(stored) : []
        const index = overrides.findIndex(o => o.id === id)
        if (index !== -1) {
            overrides[index] = { ...overrides[index], ...clientData }
            localStorage.setItem('clientPricingOverrides', JSON.stringify(overrides))
            return Promise.resolve({ data: overrides[index] })
        }
        return Promise.reject(new Error('Override not found'))
    },

    deleteClientOverride: (id) => {
        const stored = localStorage.getItem('clientPricingOverrides')
        const overrides = stored ? JSON.parse(stored) : []
        const filtered = overrides.filter(o => o.id !== id)
        localStorage.setItem('clientPricingOverrides', JSON.stringify(filtered))
        return Promise.resolve({ data: { success: true } })
    },

    getAuditLog: () => {
        const stored = localStorage.getItem('pricingAuditLog')
        return Promise.resolve({
            data: stored ? JSON.parse(stored) : []
        })
    }
}

export default pricingService
