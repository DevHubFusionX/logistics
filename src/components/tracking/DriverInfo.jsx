import { User, Star, Truck, Phone, MessageCircle } from 'lucide-react'

export default function DriverInfo({ driver }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Your Driver</h3>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {driver.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{driver.name}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>{driver.rating}</span>
            </div>
            <span>•</span>
            <span>{driver.trips} trips</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-gray-600">Vehicle</p>
            <p className="font-semibold text-gray-900">{driver.vehicle} • {driver.plate}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-gray-600">Contact</p>
            <p className="font-semibold text-gray-900">{driver.phone}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href={`tel:${driver.phone}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
        >
          <Phone className="w-4 h-4" />
          Call Driver
        </a>
        <a
          href={`sms:${driver.phone}`}
          className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-gray-600" />
        </a>
      </div>
    </div>
  )
}
