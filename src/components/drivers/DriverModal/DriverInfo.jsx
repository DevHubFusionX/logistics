import { User, Award, Truck, Star } from 'lucide-react'

const getPerformanceColor = (score) => {
  if (score >= 95) return 'text-green-600'
  if (score >= 90) return 'text-blue-600'
  if (score >= 85) return 'text-yellow-600'
  return 'text-orange-600'
}

export default function DriverInfo({ driver }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-gray-200 rounded-lg">
            <User className="w-5 h-5 text-gray-700" />
          </div>
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Email:</span>
            <p className="font-medium">{driver.email}</p>
          </div>
          <div>
            <span className="text-gray-500">Phone:</span>
            <p className="font-medium">{driver.phone}</p>
          </div>
          <div>
            <span className="text-gray-500">License Number:</span>
            <p className="font-medium">{driver.licenseNumber}</p>
          </div>
          <div>
            <span className="text-gray-500">License Expiry:</span>
            <p className="font-medium">{driver.licenseExpiry}</p>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Address:</span>
            <p className="font-medium">{driver.address}</p>
          </div>
          <div>
            <span className="text-gray-500">Emergency Contact:</span>
            <p className="font-medium">{driver.emergencyContact}</p>
          </div>
          <div>
            <span className="text-gray-500">Join Date:</span>
            <p className="font-medium">{driver.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Award className="w-5 h-5 text-blue-600" />
          </div>
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Performance Score:</span>
            <p className={`text-2xl font-bold ${getPerformanceColor(driver.performanceScore)}`}>
              {driver.performanceScore}%
            </p>
          </div>
          <div>
            <span className="text-gray-500">Rating:</span>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">{driver.rating}</span>
            </div>
          </div>
          <div>
            <span className="text-gray-500">Total Deliveries:</span>
            <p className="text-xl font-bold">{driver.totalDeliveries}</p>
          </div>
          <div>
            <span className="text-gray-500">On-Time Rate:</span>
            <p className="text-xl font-bold text-green-600">{driver.onTimeRate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <Truck className="w-5 h-5 text-green-600" />
          </div>
          Assignment
        </h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500">Assigned Truck:</span>
            <p className="font-medium text-lg">{driver.assignedTruck || 'Unassigned'}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Assign Truck
            </button>
            {driver.assignedTruck && (
              <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
                Unassign Truck
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
