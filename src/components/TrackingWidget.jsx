import { useState } from 'react'
import { Search, Package, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function TrackingWidget() {
  const [trackingId, setTrackingId] = useState('')
  const [trackingResult, setTrackingResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = (e) => {
    e.preventDefault()
    if (!trackingId.trim()) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        id: trackingId,
        status: 'In Transit',
        location: 'Chicago Distribution Center',
        destination: 'New York, NY',
        estimatedDelivery: 'Tomorrow, 2:30 PM',
        progress: 75
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Track Your Shipment
            </h2>
            <p className="text-xl text-gray-600">
              Enter your tracking ID to get real-time updates on your package location and delivery status.
            </p>
          </div>

          {/* Tracking Form */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 mb-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking ID (e.g., DX789123456)"
                  className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-sky-500 hover:bg-sky-400 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Track Package
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-sky-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tracking ID: {trackingResult.id}</h3>
                  <p className="text-gray-600">Package Status</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{trackingResult.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-sky-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${trackingResult.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{trackingResult.status}</p>
                    <p className="text-sm text-gray-600">Current Status</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{trackingResult.location}</p>
                    <p className="text-sm text-gray-600">Current Location</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{trackingResult.estimatedDelivery}</p>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                  </div>
                </div>
              </div>

              {/* Destination Info */}
              <div className="mt-6 p-4 bg-sky-50 rounded-lg">
                <p className="text-sm text-gray-600">Destination</p>
                <p className="font-semibold text-gray-900">{trackingResult.destination}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}