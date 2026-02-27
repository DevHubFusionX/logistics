import { X, User } from 'lucide-react'
import DriverInfo from './DriverInfo'
import DriverTrips from './DriverTrips'
import DriverDocuments from './DriverDocuments'
import DriverCompliance from './DriverCompliance'

export default function DriverModal({ driver, assignedTruck, activeTab, onTabChange, onClose }) {
  if (!driver) return null

  const tabs = ['info', 'documents', 'compliance', 'trips']

  const passportUrl = driver.passportPhoto?.url || driver.passportPhotoUrl

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden flex-shrink-0 ring-2 ring-blue-100">
                {passportUrl ? (
                  <img src={passportUrl} alt={driver.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">{driver.name}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {driver.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{driver.email} · {driver.phone}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border-b border-gray-200 p-1 mx-6 mt-4">
          <nav className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 space-y-6">
          {activeTab === 'info' && <DriverInfo driver={driver} assignedTruck={assignedTruck} />}
          {activeTab === 'trips' && <DriverTrips driver={driver} />}
          {activeTab === 'documents' && <DriverDocuments driver={driver} />}
          {activeTab === 'compliance' && <DriverCompliance driver={driver} />}
        </div>
      </div>
    </div>
  )
}
