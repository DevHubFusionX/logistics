import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { Package, MapPin, Camera, CheckCircle, Navigation, Phone, Clock } from 'lucide-react'
import { useToast } from '../components/ui/advanced'

const mockJob = {
  id: 'BK-1705234567',
  status: 'in_transit',
  customer: {
    name: 'John Doe',
    phone: '+234-xxx-xxxx',
    email: 'john@example.com'
  },
  pickup: {
    address: '123 Main St, Lagos',
    date: '2025-01-16 09:00:00',
    completed: true,
    timestamp: '2025-01-16 09:15:00'
  },
  delivery: {
    address: '456 Oak Ave, Abuja',
    estimatedTime: '2025-01-18 14:00:00',
    completed: false
  },
  cargo: {
    weight: 100,
    type: 'general',
    description: 'General cargo - handle with care'
  },
  payment: {
    amount: 302.40,
    status: 'prepaid',
    commission: 45.36
  }
}

export default function DriverApp() {
  const [job, setJob] = useState(mockJob)
  const [showCamera, setShowCamera] = useState(false)
  const [photos, setPhotos] = useState([])
  const { showToast, ToastContainer } = useToast()

  const handleStartTrip = () => {
    showToast.success('Trip started', 'GPS tracking activated')
  }

  const handleArrivePickup = () => {
    showToast.info('Arrived at pickup', 'Customer notified')
  }

  const handleCompletePickup = () => {
    if (photos.length < 2) {
      showToast.error('Photos required', 'Please take at least 2 photos')
      return
    }
    setJob({ ...job, status: 'picked_up', pickup: { ...job.pickup, completed: true } })
    showToast.success('Pickup completed', 'Customer notified - In transit')
  }

  const handleArriveDelivery = () => {
    showToast.info('Arrived at delivery', 'Customer notified')
  }

  const handleCompleteDelivery = () => {
    setJob({ ...job, status: 'delivered', delivery: { ...job.delivery, completed: true } })
    showToast.success('Delivery completed', 'Job finished - Payment processed')
  }

  const handleTakePhoto = () => {
    setPhotos([...photos, `photo_${Date.now()}.jpg`])
    showToast.success('Photo captured', `${photos.length + 1} photos taken`)
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Driver App"
        subtitle="Manage your delivery jobs"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Current Job</p>
                <p className="text-2xl font-bold text-gray-900">{job.id}</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                job.status === 'delivered' ? 'bg-green-100 text-green-700' :
                job.status === 'in_transit' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {job.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Payment</p>
                <p className="text-xl font-bold text-gray-900">${job.payment.amount}</p>
                <p className="text-xs text-green-600 mt-1">Your commission: ${job.payment.commission}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Cargo</p>
                <p className="text-xl font-bold text-gray-900">{job.cargo.weight} kg</p>
                <p className="text-xs text-gray-600 mt-1 capitalize">{job.cargo.type}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Pickup Location</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{job.pickup.address}</p>
                  <p className="text-sm text-gray-600 mt-1">Scheduled: {job.pickup.date}</p>
                  {job.pickup.completed && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Completed at {job.pickup.timestamp}
                    </p>
                  )}
                </div>
              </div>

              {!job.pickup.completed && (
                <div className="flex gap-2">
                  <button
                    onClick={handleStartTrip}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <Navigation className="w-5 h-5" />
                    Start Trip
                  </button>
                  <button
                    onClick={handleArrivePickup}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <MapPin className="w-5 h-5" />
                    Arrived
                  </button>
                </div>
              )}
            </div>
          </div>

          {!job.pickup.completed && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Pickup Documentation</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Cargo Photos ({photos.length}/4)</p>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {photos.map((photo, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <Camera className="w-6 h-6 text-gray-400" />
                      </div>
                    ))}
                    {photos.length < 4 && (
                      <button
                        onClick={handleTakePhoto}
                        className="aspect-square bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                      >
                        <Camera className="w-6 h-6 text-blue-600" />
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCompletePickup}
                  disabled={photos.length < 2}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5" />
                  Complete Pickup
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Delivery Location</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{job.delivery.address}</p>
                  <p className="text-sm text-gray-600 mt-1">ETA: {job.delivery.estimatedTime}</p>
                  {job.delivery.completed && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Delivered successfully
                    </p>
                  )}
                </div>
              </div>

              {job.pickup.completed && !job.delivery.completed && (
                <div className="flex gap-2">
                  <button
                    onClick={handleArriveDelivery}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                  >
                    <MapPin className="w-5 h-5" />
                    Arrived at Delivery
                  </button>
                  <button
                    onClick={handleCompleteDelivery}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Complete Delivery
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Customer Contact</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{job.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{job.customer.phone}</p>
              </div>
              <a
                href={`tel:${job.customer.phone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <Phone className="w-5 h-5" />
                Call Customer
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-left">
                Report Issue
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-left">
                Request Support
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-left">
                View Route
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
