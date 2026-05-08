import { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import driverService from '../../services/driverService'

// Import split components
import PersonalInfoStep from './AddDriverModal/PersonalInfoStep'
import GuarantorStep from './AddDriverModal/GuarantorStep'
import EmploymentStep from './AddDriverModal/EmploymentStep'
import DocumentsStep from './AddDriverModal/DocumentsStep'
import BankDetailsStep from './AddDriverModal/BankDetailsStep'

const STEPS = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Guarantor' },
  { id: 3, title: 'Employment' },
  { id: 4, title: 'Documents' },
  { id: 5, title: 'Bank Details' }
]

export default function AddDriverModal({ isOpen, onClose, onRefresh, driver = null }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    residentialAddress: '',
    nextOfKin: '',
    dateOfBirth: '',
    nationality: '',
    guarantorName: '',
    guarantorPhoneNumber: '',
    guarantorAddress: '',
    yearsOfDrivingExperience: '',
    previousCompany: [],
    ninSlip: null,
    driversLicense: null,
    passportPhoto: null,
    truckDrivingCertification: null,
    medicalFitnessCertificate: null,
    drugTestReport: null,
    bankName: '',
    accountName: '',
    accountNumber: ''
  })

  const isEditMode = !!driver

  useEffect(() => {
    if (driver && isOpen) {
      setFormData({
        firstName: driver.firstName || '',
        lastName: driver.lastName || '',
        phoneNumber: driver.phoneNumber || driver.phone || '',
        email: driver.email || '',
        residentialAddress: driver.residentialAddress || driver.address || '',
        nextOfKin: driver.nextOfKin || driver.emergencyContact || '',
        dateOfBirth: driver.dateOfBirth ? new Date(driver.dateOfBirth).toISOString().split('T')[0] : '',
        nationality: driver.nationality || '',
        guarantorName: driver.guarantorName || '',
        guarantorPhoneNumber: driver.guarantorPhoneNumber || '',
        guarantorAddress: driver.guarantorAddress || '',
        yearsOfDrivingExperience: driver.yearsOfDrivingExperience || '',
        previousCompany: Array.isArray(driver.previousCompany) ? driver.previousCompany : (driver.previousCompany ? [driver.previousCompany] : []),
        ninSlip: null, // Files are usually not pre-filled for security
        driversLicense: null,
        passportPhoto: null,
        truckDrivingCertification: null,
        medicalFitnessCertificate: null,
        drugTestReport: null,
        bankName: driver.bankName || '',
        accountName: driver.accountName || '',
        accountNumber: driver.accountNumber || ''
      })
      setCurrentStep(1)
    } else if (isOpen) {
      // Reset form for new driver
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        residentialAddress: '',
        nextOfKin: '',
        dateOfBirth: '',
        nationality: '',
        guarantorName: '',
        guarantorPhoneNumber: '',
        guarantorAddress: '',
        yearsOfDrivingExperience: '',
        previousCompany: [],
        ninSlip: null,
        driversLicense: null,
        passportPhoto: null,
        truckDrivingCertification: null,
        medicalFitnessCertificate: null,
        drugTestReport: null,
        bankName: '',
        accountName: '',
        accountNumber: ''
      })
      setCurrentStep(1)
    }
  }, [driver, isOpen])

  if (!isOpen) return null

  const handleUpdateField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentStep !== STEPS.length) {
      nextStep()
      return
    }

    setIsSubmitting(true)
    try {
      const data = new FormData()

      // Append all fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          if (Array.isArray(formData[key])) {
            // Handle arrays (e.g., previousCompany)
            if (formData[key].length > 0) {
              // If API expects string, just send first one. Based on spec, let's try string first
              data.append(key, formData[key][0])
            }
          } else {
            data.append(key, formData[key])
          }
        }
      })

      if (isEditMode) {
        await driverService.updateDriver(driver.id || driver._id, data)
        toast.success('Driver updated successfully')
      } else {
        await driverService.createDriver(data)
        toast.success('Driver created successfully')
      }
      onClose()
      if (onRefresh) onRefresh()
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} driver:`, error)
      toast.error(error.message || `Failed to ${isEditMode ? 'update' : 'create'} driver`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} onChange={handleUpdateField} />
      case 2:
        return <GuarantorStep formData={formData} onChange={handleUpdateField} />
      case 3:
        return <EmploymentStep formData={formData} onChange={handleUpdateField} />
      case 4:
        return <DocumentsStep formData={formData} onChange={handleUpdateField} />
      case 5:
        return <BankDetailsStep formData={formData} onChange={handleUpdateField} />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{isEditMode ? 'Edit Driver' : 'Add New Driver'}</h2>
            <p className="text-sm text-gray-500">Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 py-4 border-b bg-white">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-100 -z-10" />
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep >= step.id
                    ? 'bg-blue-600 text-white ring-4 ring-blue-50 shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}
                >
                  {step.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="add-driver-form" onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50/50 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${currentStep === 1
              ? 'opacity-0 pointer-events-none'
              : 'text-gray-600 hover:bg-gray-200 border border-gray-200 bg-white'
              }`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 font-semibold hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              form="add-driver-form"
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : currentStep === STEPS.length ? (
                isEditMode ? 'Update Driver' : 'Create Driver'
              ) : (
                <>
                  Next <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
