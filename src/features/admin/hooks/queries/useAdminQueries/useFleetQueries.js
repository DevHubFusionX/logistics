import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryClient'
import fleetService from '@/features/admin/services/fleetService'
import toast from 'react-hot-toast'

const safeFormatDate = (dateVal) => {
    if (!dateVal) return 'N/A'
    const date = new Date(dateVal)
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString()
}

export const normalizeTruck = (truck) => {
    if (!truck) return null

    const rejectionReason = truck.rejectionReason || truck.reason || ''
    const isRejected = !!(truck.isRejected || rejectionReason)
    let status = truck.status && typeof truck.status === 'string'
        ? truck.status
        : isRejected ? 'rejected' : truck.isApproved ? 'approved' : 'pending'

    if (import.meta.env.DEV) {
        console.debug('[normalizeTruck]', { _id: truck._id, isApproved: truck.isApproved, isRejected: truck.isRejected, rawStatus: truck.status, derivedStatus: status })
    }

    return {
        ...truck,
        id: truck._id,
        plateNumber: String(truck.plateNumber || '').trim(),
        make: String(truck.make || '').trim(),
        model: String(truck.model || '').trim(),
        vehicleType: String(truck.vehicleType || '').trim(),
        chassisNumber: String(truck.chassisNumber || '').trim(),
        engineNumber: String(truck.engineNumber || '').trim(),
        truckCapacity: String(truck.truckCapacity || '').trim(),
        yearOfManufacture: truck.yearOfManufacture || 'N/A',
        insuranceType: truck.insuranceType || 'N/A',
        temperatureRange: String(truck.temperatureRange || '').trim(),
        reeferUnitBrand: String(truck.reeferUnitBrand || '').trim(),
        reeferUnitModel: String(truck.reeferUnitModel || '').trim(),
        lastMaintenanceDate: safeFormatDate(truck.lastMaintenanceDate),
        telematicsProvider: String(truck.telematicsProvider || '').trim(),
        trackerSimNumber: truck.trackerSimNumber || '',
        status,
        rejectionReason,
        createdAt: truck.createdAt,
        driverId: truck.driver || null,
        // Documents
        vehicleRegistrationUrl: truck.vehicleRegistration?.url,
        proofOfOwnershipUrl: truck.proofOfOwnership?.url,
        insuranceDocumentUrl: truck.insuranceDocument?.url,
        temperatureCalibrationCertificateUrl: truck.temperatureCalibrationCertificate?.url,
        // Photos
        frontPhotoUrl: truck.front?.url,
        backPhotoUrl: truck.back?.url,
        interiorPhotoUrl: truck.interior?.url,
        tiresPhotoUrl: truck.tires?.url,
        // Safety
        fireExtinguisherAvailable: truck.fireExtinguisherAvailable || false,
        reflectiveSafetyGear: truck.reflectiveSafetyGear || false,
        emergencyKit: truck.emergencyKit || false,
        spareTire: truck.spareTire || false,
        // Tracking
        gpsTrackingInstalled: truck.gpsTrackingInstalled || false,
        realTimeTrackingEnabled: truck.realTimeTrackingEnabled || false,
        coldChainComplianceStatus: truck.coldChainComplianceStatus || false,
    }
}

export function useFleetQuery(params = {}) {
    return useQuery({
        queryKey: queryKeys.admin.fleet(params),
        queryFn: async () => {
            const response = await fleetService.getTrucks(params)
            const apiData = response.data?.data
            const rawTrucks = apiData?.records || []
            const pagination = apiData?.pagination || {}
            return {
                records: rawTrucks.filter(Boolean).map(normalizeTruck).filter(Boolean),
                total: pagination.totalRecords || 0,
                pagination
            }
        },
        staleTime: 3 * 60 * 1000,
    })
}

export function useFleetMutations() {
    const queryClient = useQueryClient()

    const createVehicle = useMutation({
        mutationFn: (data) => fleetService.createTruck(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.fleet() })
            toast.success('Vehicle added successfully')
        },
        onError: (error) => toast.error(error.message || 'Failed to add vehicle')
    })

    const approveTruck = useMutation({
        mutationFn: (id) => fleetService.approveTruck(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.fleet() })
            toast.success('Truck approved successfully')
        },
        onError: (error) => toast.error(error.message || 'Failed to approve truck')
    })

    const rejectTruck = useMutation({
        mutationFn: ({ id, reason }) => fleetService.rejectTruck(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.admin.fleet() })
            toast.success('Truck rejected successfully')
        },
        onError: (error) => {
            console.error('[rejectTruck] Error:', error)
            toast.error(error.message || 'Failed to reject truck')
        }
    })

    // NOTE: updateVehicle and assignDriverToTruck are removed —
    // the backend has no PATCH /admin/trucks/:id (general update) endpoint.
    // Driver assignment is managed at the booking level via PATCH /admin/bookings/truck/:id.

    return { createVehicle, approveTruck, rejectTruck }
}
