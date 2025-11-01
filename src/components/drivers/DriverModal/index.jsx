import { X } from 'lucide-react'
import DriverInfo from './DriverInfo'
import DriverTrips from './DriverTrips'
import DriverDocuments from './DriverDocuments'
import DriverCompliance from './DriverCompliance'

export default function DriverModal({ driver, activeTab, onTabChange, onClose }) {
  if (!driver) return null

  const tabs = ['info', 'trips', 'documents', 'compliance']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{driver.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{driver.id}</p>
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
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab
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
          {activeTab === 'info' && <DriverInfo driver={driver} />}
          {activeTab === 'trips' && <DriverTrips driver={driver} />}
          {activeTab === 'documents' && <DriverDocuments driver={driver} />}
          {activeTab === 'compliance' && <DriverCompliance driver={driver} />}
        </div>
      </div>
    </div>
  )
}
