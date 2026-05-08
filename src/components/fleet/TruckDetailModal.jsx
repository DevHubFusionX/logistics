import { useState } from 'react'
import { X, Truck, Shield, Activity, FileText } from 'lucide-react'
import VehicleInfoTab from './TruckDetailModal/VehicleInfoTab'
import SafetyTab from './TruckDetailModal/SafetyTab'
import DocumentsTab from './TruckDetailModal/DocumentsTab'

export default function TruckDetailModal({ truck, driverMap = {}, onClose }) {
  const [activeTab, setActiveTab] = useState('info')

  if (!truck) return null

  const tabs = [
    { id: 'info', label: 'Vehicle Info', icon: Activity },
    { id: 'safety', label: 'Safety checklist', icon: Shield },
    { id: 'documents', label: 'Documents/Photos', icon: FileText }
  ]

  const documents = [
    { label: 'Vehicle Registration', type: 'Registration', url: truck.vehicleRegistration?.url },
    { label: 'Proof of Ownership', type: 'Ownership', url: truck.proofOfOwnership?.url },
    { label: 'Insurance Document', type: 'Insurance', url: truck.insuranceDocument?.url },
    { label: 'Road Worthiness', type: 'Permit', url: truck.roadWorthinessCert?.url },
    { label: 'Carrier Permit', type: 'Permit', url: truck.carrierPermit?.url },
    { label: 'Front View', type: 'Photo', url: truck.frontPhoto?.url },
    { label: 'Back View', type: 'Photo', url: truck.backPhoto?.url },
    { label: 'Interior View', type: 'Photo', url: truck.interiorPhoto?.url },
    { label: 'Tires View', type: 'Photo', url: truck.tiresPhoto?.url }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-500" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white shrink-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full -ml-16 -mb-16 blur-2xl pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl group hover:scale-105 transition-transform">
                <Truck className="w-8 h-8 text-blue-300" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black tracking-tight">{truck.plateNumber}</h2>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white shadow-lg ${truck.status === 'approved' ? 'text-green-600' : 'text-orange-600'}`}>
                    {truck.status}
                  </span>
                </div>
                <p className="text-blue-100/70 text-sm font-medium mt-1 flex items-center gap-2 italic">
                  <span>{truck.make} {truck.model}</span>
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  <span>{truck.vehicleType}</span>
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 hover:border-white/30 active:scale-95 shadow-lg group">
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <nav className="flex gap-2 mt-8 p-1.5 bg-black/20 backdrop-blur-md rounded-2xl border border-white/5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeTab === id
                    ? 'bg-blue-600 text-white shadow-xl scale-[1.02] ring-1 ring-white/20'
                    : 'text-blue-100/50 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto bg-gray-50/50 flex-grow scroll-smooth">
          {activeTab === 'info' && <VehicleInfoTab truck={truck} driverMap={driverMap} />}
          {activeTab === 'safety' && <SafetyTab truck={truck} />}
          {activeTab === 'documents' && <DocumentsTab documents={documents} />}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between shrink-0">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fleet Asset Identity: {truck._id}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
