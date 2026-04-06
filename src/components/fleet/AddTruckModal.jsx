import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Loader2, Truck } from 'lucide-react'
import { useDriversQuery, useAdminMutations } from '../../hooks/queries/useAdminQueries'
import { useToast } from '../ui/advanced'

import VehicleInfoStep from './AddTruckModal/VehicleInfoStep'
import CapacityCoolingStep from './AddTruckModal/CapacityCoolingStep'
import RegistrationInsuranceStep from './AddTruckModal/RegistrationInsuranceStep'
import TrackingSafetyStep from './AddTruckModal/TrackingSafetyStep'
import PhotosStep from './AddTruckModal/PhotosStep'

const STEPS = [
  'Vehicle Info',
  'Capacity & Cooling',
  'Registration & Insurance',
  'Tracking & Safety',
  'Documents & Photos'
]

const initialFormData = {
  // Step 1: Vehicle Info
  driverId: '',
  vehicleType: '',
  plateNumber: '',
  chassisNumber: '',
  engineNumber: '',
  make: '',
  model: '',
  yearOfManufacture: '',
  truckCapacity: '',
  // Step 2: Capacity & Cooling
  temperatureRange: '',
  reeferUnitBrand: '',
  reeferUnitModel: '',
  lastMaintenanceDate: '',
  coldChainComplianceStatus: false,
  // Step 3: Registration & Insurance
  roadWorthinessCertificate: '',
  insuranceType: '',
  hackneyPermit: '',
  // Step 4: Tracking & Safety
  gpsTrackingInstalled: false,
  trackerSimNumber: '',
  telematicsProvider: '',
  realTimeTrackingEnabled: false,
  fireExtinguisherAvailable: false,
  reflectiveSafetyGear: false,
  emergencyKit: false,
  spareTire: false,
}

const initialFileData = {
  vehicleRegistration: null,
  proofOfOwnership: null,
  insuranceDocument: null,
  temperatureCalibrationCertificate: null,
  front: null,
  back: null,
  interior: null,
  tires: null,
}

export default function AddTruckModal({ isOpen, onClose, onRefresh, assignedDriverIds = new Set() }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(initialFormData)
  const [files, setFiles] = useState(initialFileData)
  const { showToast, ToastContainer } = useToast()
  const { createVehicle } = useAdminMutations()
  const isSubmitting = createVehicle.isLoading

  const { data: drivers = [] } = useDriversQuery()

  // Only show drivers that are not already assigned to a truck
  const availableDrivers = drivers.filter(d => !assignedDriverIds.has(d.id))

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target
    if (fileList && fileList[0]) {
      setFiles(prev => ({ ...prev, [name]: fileList[0] }))
    }
  }

  const handleSubmit = async () => {
    const fd = new FormData()

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        fd.append(key, String(value))
      }
    })

    // Append files
    Object.entries(files).forEach(([key, file]) => {
      if (file) fd.append(key, file)
    })

    createVehicle.mutate(fd, {
      onSuccess: () => {
        setFormData(initialFormData)
        setFiles(initialFileData)
        setCurrentStep(0)
        onClose()
      }
    })
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1)
    else handleSubmit()
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: return (
        <VehicleInfoStep
          formData={formData}
          handleChange={handleChange}
          drivers={drivers}
          availableDrivers={availableDrivers}
        />
      )
      case 1: return <CapacityCoolingStep formData={formData} handleChange={handleChange} />
      case 2: return (
        <RegistrationInsuranceStep
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />
      )
      case 3: return <TrackingSafetyStep formData={formData} handleChange={handleChange} />
      case 4: return <PhotosStep files={files} handleFileChange={handleFileChange} />
      default: return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add New Truck</h2>
                <p className="text-xs text-gray-500">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-1 mt-4">
            {STEPS.map((step, index) => (
              <div key={step} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between rounded-b-xl">
          <button
            type="button"
            onClick={currentStep === 0 ? onClose : handleBack}
            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
            ) : currentStep === STEPS.length - 1 ? (
              'Create Truck'
            ) : (
              <>Next <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
