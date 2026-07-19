import httpClient from '@/services/httpClient'

/**
 * Pricing Service
 *
 * The backend only exposes price calculation via:
 *   GET /bookings/prices/:city/:truckSize        — user pricing
 *   GET /admin/bookings/prices/:city/:truckSize  — admin pricing
 *
 * Allowed cities: 'Abuja', 'Warri', 'Benin City', 'Enugu', 'Port Harcourt'
 * Allowed truckSizes: 5, 10, 15 (tons)
 *
 * NOTE: There is no /pricing/ management endpoint on the backend.
 * The getGlobalRules, updatePricingConfig, client overrides, and audit log
 * methods have been removed.
 */
const pricingService = {
  // GET /bookings/prices/:city/:truckSize or /admin/bookings/prices/:city/:truckSize
  calculatePrice: async (city, truckSize, isAdmin = false) => {
    const path = isAdmin ? '/admin/bookings/prices' : '/bookings/prices'
    return httpClient.request(
      `${path}/${encodeURIComponent(city)}/${encodeURIComponent(truckSize)}`
    )
  },
}

export default pricingService
