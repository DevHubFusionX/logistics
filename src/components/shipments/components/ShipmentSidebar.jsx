import { X, MapPin, Package, User, Phone, Mail, FileText, Camera, Clock, DollarSign, AlertTriangle } from 'lucide-react'

export default function ShipmentSidebar({ shipment, isOpen, onClose }) {
  if (!isOpen || !shipment) return null

  const trackingEvents = [
    { time: '14:30', date: 'Today', event: 'Out for delivery', location: 'Lagos Distribution Center', status: 'current' },
    { time: '09:15', date: 'Today', event: 'Departed facility', location: 'Kano Warehouse', status: 'completed' },
    { time: '18:45', date: 'Yesterday', event: 'Arrived at facility', location: 'Kano Warehouse', status: 'completed' },
    { time: '12:30', date: 'Yesterday', event: 'Picked up', location: 'Customer Location', status: 'completed' }
  ]

  const documents = [
    { name: 'Bill of Lading', type: 'PDF', size: '245 KB' },
    { name: 'Proof of Delivery', type: 'PDF', size: '180 KB' },
    { name: 'Invoice', type: 'PDF', size: '120 KB' },
    { name: 'Customs Declaration', type: 'PDF', size: '95 KB' }
  ]

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl border-l border-gray-200 z-50 overflow-y-auto">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{shipment.id}</h2>
            <p className="text-sm text-gray-500 truncate">{shipment.customer}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Basic Info */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Shipment Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 break-words">{shipment.origin} → {shipment.destination}</p>
                <p className="text-xs text-gray-500">Route</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{shipment.weight} • {shipment.volume}</p>
                <p className="text-xs text-gray-500">Weight & Volume</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{shipment.driver}</p>
                <p className="text-xs text-gray-500">Assigned Driver</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-900">+234 809 123 4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-900 break-all">contact@customer.com</span>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Tracking History</h3>
          <div className="space-y-4">
            {trackingEvents.map((event, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    event.status === 'current' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  {index < trackingEvents.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mt-1"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{event.event}</p>
                    <span className="text-xs text-gray-500 flex-shrink-0">{event.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{event.location}</p>
                  <p className="text-xs text-gray-400">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Documents</h3>
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex-shrink-0">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Cost Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Freight Cost</span>
              <span className="text-sm font-medium text-gray-900">₦15,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fuel Surcharge</span>
              <span className="text-sm font-medium text-gray-900">₦2,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Insurance</span>
              <span className="text-sm font-medium text-gray-900">₦1,200</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">Total</span>
                <span className="text-sm font-bold text-gray-900">₦18,700</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Update Status
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            Reassign Driver
          </button>
          <button className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors">
            Report Issue
          </button>
        </div>
      </div>
    </div>
  )
}