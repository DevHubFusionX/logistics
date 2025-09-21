export default function TrackingDemo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Real-Time Package Tracking
            </h2>
            <p className="text-xl text-gray-600">
              Monitor your shipments with precision GPS tracking, automated notifications, and predictive delivery windows.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-700">Live GPS coordinates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-gray-700">Automated status updates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-gray-700">Delivery time predictions</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-6 text-white">
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-1">Tracking ID: DX789123</div>
              <div className="text-lg font-semibold">Electronics Package</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">In Transit</div>
                  <div className="text-xs text-gray-400">Chicago, IL → New York, NY</div>
                </div>
                <div className="text-xs text-gray-400">2h ago</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Departed Facility</div>
                  <div className="text-xs text-gray-400">Chicago Distribution Center</div>
                </div>
                <div className="text-xs text-gray-400">4h ago</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Package Received</div>
                  <div className="text-xs text-gray-400">Origin Facility</div>
                </div>
                <div className="text-xs text-gray-400">1d ago</div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Estimated Delivery</div>
              <div className="text-lg font-semibold text-green-400">Tomorrow, 2:30 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}