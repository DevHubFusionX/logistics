import { useState } from 'react'
import { X, Truck, Shield, Activity, FileText, Check, AlertTriangle, Loader2 } from 'lucide-react'
import VehicleInfoTab from './TruckDetailModal/VehicleInfoTab'
import SafetyTab from './TruckDetailModal/SafetyTab'
import DocumentsTab from './TruckDetailModal/DocumentsTab'
import { useAdminMutations } from '@/features/admin/hooks/queries/useAdminQueries'

export default function TruckDetailModal({ truck, driverMap = {}, availableDrivers = [], onClose }) {
  const [activeTab, setActiveTab] = useState('info')
  const [isRejecting, setIsRejecting] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  const { approveTruck, rejectTruck } = useAdminMutations()

  if (!truck) return null

  const isPending = truck.status === 'pending' || !truck.isApproved
  const isActionLoading = approveTruck.isPending || rejectTruck.isPending

  const tabs = [
    { id: 'info', label: 'Vehicle Info', icon: Activity },
    { id: 'safety', label: 'Safety Checklist', icon: Shield },
    { id: 'documents', label: 'Documents & Photos', icon: FileText }
  ]

  // Safe mapping of documents using fallback for both raw and normalized API responses
  const documents = [
    { 
      label: 'Vehicle Registration', 
      type: 'Registration', 
      url: truck.vehicleRegistration?.url || truck.vehicleRegistrationUrl 
    },
    { 
      label: 'Proof of Ownership', 
      type: 'Ownership', 
      url: truck.proofOfOwnership?.url || truck.proofOfOwnershipUrl 
    },
    { 
      label: 'Insurance Document', 
      type: 'Insurance', 
      url: truck.insuranceDocument?.url || truck.insuranceDocumentUrl 
    },
    { 
      label: 'Road Worthiness Certificate', 
      type: 'Permit', 
      url: (typeof truck.roadWorthinessCertificate === 'object' ? truck.roadWorthinessCertificate?.url : null) || truck.roadWorthinessCertificateUrl 
    },
    { 
      label: 'Temperature Calibration Certificate', 
      type: 'Calibration', 
      url: truck.temperatureCalibrationCertificate?.url || truck.temperatureCalibrationCertificateUrl 
    },
    { 
      label: 'Front View', 
      type: 'Photo', 
      url: truck.front?.url || truck.frontPhotoUrl 
    },
    { 
      label: 'Back View', 
      type: 'Photo', 
      url: truck.back?.url || truck.backPhotoUrl 
    },
    { 
      label: 'Interior View', 
      type: 'Photo', 
      url: truck.interior?.url || truck.interiorPhotoUrl 
    },
    { 
      label: 'Tires View', 
      type: 'Photo', 
      url: truck.tires?.url || truck.tiresPhotoUrl 
    }
  ]

  const handleApprove = () => {
    approveTruck.mutate(truck._id || truck.id, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const handleReject = () => {
    if (!rejectReason.trim()) return
    rejectTruck.mutate(
      { id: truck._id || truck.id, reason: rejectReason },
      {
        onSuccess: () => {
          setIsRejecting(false)
          setRejectReason('')
          onClose()
        }
      }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-all duration-300" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Modern Header Banner */}
        <div className="relative p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shrink-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/10 rounded-full -ml-16 -mb-16 blur-2xl pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold tracking-tight text-white">{truck.plateNumber || 'N/A'}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    truck.status === 'approved' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : truck.status === 'rejected'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {truck.status || 'Pending'}
                  </span>
                </div>
                <p className="text-slate-300/80 text-xs mt-1 flex items-center gap-1.5">
                  <span className="font-semibold text-sky-300">{truck.make} {truck.model}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-500" />
                  <span>{truck.vehicleType}</span>
                </p>
              </div>
            </div>
            
            <button 
              onClick={onClose} 
              className="p-2 bg-white/5 hover:bg-white/15 rounded-lg transition-all border border-white/10 hover:border-white/20 active:scale-95 shadow-lg"
            >
              <X className="w-5 h-5 text-slate-300 hover:text-white" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-1 mt-6 p-1 bg-black/20 backdrop-blur-md rounded-xl border border-white/5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === id
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto bg-slate-50/50 flex-grow">
          {activeTab === 'info' && <VehicleInfoTab truck={truck} driverMap={driverMap} availableDrivers={availableDrivers} />}
          {activeTab === 'safety' && <SafetyTab truck={truck} />}
          {activeTab === 'documents' && <DocumentsTab documents={documents} />}
        </div>

        {/* Action Panel for Pending Verification */}
        {isPending && (
          <div className="px-6 py-4 bg-amber-50 border-t border-amber-100 flex flex-col gap-3 shrink-0">
            {isRejecting ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-800 text-sm font-semibold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Specify Rejection Reason</span>
                </div>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Incomplete or expired documents. Please re-upload your insurance cover."
                  className="w-full p-3 text-sm bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsRejecting(false)
                      setRejectReason('')
                    }}
                    className="px-4 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={!rejectReason.trim() || isActionLoading}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 disabled:opacity-50 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    {isActionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Confirm Rejection
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span className="text-xs text-amber-800 font-medium">This truck is pending verification. Please review all details and documents.</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsRejecting(true)}
                    className="px-4 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-all"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={isActionLoading}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    {isActionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <Check className="w-3.5 h-3.5" />
                    Approve Vehicle
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-150 flex items-center justify-between shrink-0">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            ID: {truck._id || truck.id}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
