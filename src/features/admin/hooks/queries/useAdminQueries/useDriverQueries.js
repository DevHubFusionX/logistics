import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryClient'
import driverService from '@/features/admin/services/driverService'
import tripService from '@/features/admin/services/tripService'
import httpClient from '@/services/httpClient'
import toast from 'react-hot-toast'

export const normalizeDriver = (driver) => {
  if (!driver) return null
  return {
    ...driver,
    id: driver._id || driver.id,
    name: driver.name || `${driver.firstName || ''} ${driver.lastName || ''}`.trim() || driver.email || 'Unnamed Driver',
    email: driver.email || '',
    phone: driver.phoneNumber || driver.phone || '',
    address: driver.residentialAddress || driver.address || 'Not specified',
    emergencyContact: driver.nextOfKin || 'Not specified',
    joinDate: driver.createdAt ? new Date(driver.createdAt).toLocaleDateString() : 'N/A',
    licenseNumber: driver.nin || 'N/A',
    // Document URLs — backend stores as { url, publicId } objects
    ninSlipUrl: driver.ninSlip?.url,
    driversLicenseUrl: driver.driversLicense?.url,
    passportPhotoUrl: driver.passportPhoto?.url,
    medicalCertUrl: driver.medicalFitnessCertificate?.url,
    truckDrivingCertUrl: driver.truckDrivingCertification?.url,
    drugTestReportUrl: driver.drugTestReport?.url,
    // Status — backend only has isVerified and isActive booleans
    isVerified: driver.isVerified || false,
    isActive: driver.isActive !== false, // default true per model
    status: driver.isActive !== false ? 'active' : 'inactive',
    verificationStatus: driver.isVerified ? 'verified' : 'unverified',
  }
}

export function useDriversQuery(params = {}) {
  return useQuery({
    queryKey: queryKeys.admin.drivers(params),
    queryFn: async () => {
      const response = await driverService.getDrivers(params)
      const { records } = httpClient.extractList(response)
      return records.filter(Boolean).map(normalizeDriver).filter(Boolean)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useDriverQuery(driverId) {
  return useQuery({
    queryKey: ['admin', 'driver', driverId],
    queryFn: async () => {
      const response = await driverService.getDriver(driverId)
      const driver = httpClient.extractData(response)
      return driver ? normalizeDriver(driver) : null
    },
    enabled: !!driverId,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Fetch trips assigned to a specific driver.
 * The backend has no GET /trips/drivers/:id endpoint — we fetch all admin trips
 * (GET /trips/admins) and filter client-side by driver ID.
 */
export function useDriverTripsQuery(driverId, params = {}) {
  return useQuery({
    queryKey: ['admin', 'driver-trips', driverId, params],
    queryFn: async () => {
      const response = await tripService.getTrips({ limit: 100, ...params })
      const apiData = response.data?.data || response.data
      const allTrips = apiData?.records || apiData?.trips || []
      // Filter trips where the assigned driver matches
      const driverTrips = driverId
        ? allTrips.filter(trip => {
            const tripDriverId = typeof trip.driver === 'object'
              ? (trip.driver?._id || trip.driver?.id)
              : trip.driver
            return tripDriverId === driverId
          })
        : []
      return {
        records: driverTrips,
        pagination: apiData?.pagination || {}
      }
    },
    enabled: !!driverId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useDriverMutations() {
  const queryClient = useQueryClient()

  const updateDriver = useMutation({
    mutationFn: ({ id, data }) => driverService.updateDriver(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.drivers() })
      queryClient.invalidateQueries({ queryKey: ['admin', 'driver', id] })
      toast.success('Driver updated successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to update driver'),
  })

  const verifyDriver = useMutation({
    mutationFn: (id) => driverService.verifyDriver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.drivers() })
      toast.success('Driver verified successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to verify driver'),
  })

  const rejectDriver = useMutation({
    mutationFn: ({ id, reason }) => driverService.rejectDriver(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.drivers() })
      toast.success('Driver rejected successfully')
    },
    onError: (error) => toast.error(error.message || 'Failed to reject driver'),
  })

  return { updateDriver, verifyDriver, rejectDriver }
}
