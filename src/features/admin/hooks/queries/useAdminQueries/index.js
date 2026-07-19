export { useCustomersQuery, useClientShipmentsQuery, useClientMutations } from './useClientQueries'
export { useDriversQuery, useDriverQuery, useDriverTripsQuery, useDriverMutations, normalizeDriver } from './useDriverQueries'
export { useFleetQuery, useFleetMutations, normalizeTruck } from './useFleetQueries'
export { useTripsQuery, useTripMutations } from './useTripQueries'
export { useManagerMutations, useManagersQuery, usePricingRulesQuery, useClientOverridesQuery, usePricingAuditQuery, usePricingMutations } from './usePricingQueries'
export { useMoneyAnalyticsQuery, useOrderAnalyticsQuery, useTruckAnalyticsQuery, useReportsQuery } from './useAnalyticsQueries'

// Composite hook — aggregates all admin mutation hooks into one object.
// Only includes mutations that have real backend endpoints.
import { useClientMutations } from './useClientQueries'
import { useDriverMutations } from './useDriverQueries'
import { useFleetMutations } from './useFleetQueries'
import { useTripMutations } from './useTripQueries'
import { useManagerMutations } from './usePricingQueries'

export function useAdminMutations() {
    const { updateClient }                               = useClientMutations()
    const { updateDriver, verifyDriver, rejectDriver }   = useDriverMutations()
    const { createVehicle, approveTruck, rejectTruck }   = useFleetMutations()
    const { createTrip, assignTripDriver, startTripMutation, completeTripMutation, cancelTripMutation } = useTripMutations()
    const { createManager, deleteManager }               = useManagerMutations()

    return {
        // Client
        updateClient,
        // Driver
        updateDriver,
        verifyDriver,
        rejectDriver,
        // Fleet / Trucks
        createVehicle,
        approveTruck,
        rejectTruck,
        // Trips
        createTrip,
        assignTripDriver,
        startTripMutation,
        completeTripMutation,
        cancelTripMutation,
        // Admin management
        createManager,
        deleteManager,
    }
}
