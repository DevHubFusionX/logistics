import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { Thermometer, AlertTriangle, CheckCircle, TrendingDown, TrendingUp, Package, Clock } from 'lucide-react'

export default function MyTemperature() {
  const [filter, setFilter] = useState('all')

  const shipments = [
    {
      id: 'SH-1001',
      trackingId: 'TR-5001',
      cargoType: 'Frozen Foods',
      route: 'Lagos → Abuja',
      currentTemp: -18,
      targetTemp: -20,
      status: 'normal',
      lastUpdate: '2 mins ago',
      alerts: 0
    },
    {
      id: 'SH-1002',
      trackingId: 'TR-5002',
      cargoType: 'Pharmaceuticals',
      route: 'Kano → Port Harcourt',
      currentTemp: 6,
      targetTemp: 4,
      status: 'warning',
      lastUpdate: '5 mins ago',
      alerts: 1
    },
    {
      id: 'SH-1003',
      trackingId: 'TR-5003',
      cargoType: 'Dairy Products',
      route: 'Abuja → Lagos',
      currentTemp: 12,
      targetTemp: 4,
      status: 'critical',
      lastUpdate: '1 min ago',
      alerts: 3
    }
  ]

  const filteredShipments = filter === 'all' 
    ? shipments 
    : shipments.filter(s => s.status === filter)

  const normalCount = shipments.filter(s => s.status === 'normal').length
  const warningCount = shipments.filter(s => s.status === 'warning').length
  const criticalCount = shipments.filter(s => s.status === 'critical').length

  const getStatusBadge = (status) => {
    const badges = {
      normal: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      critical: 'bg-red-100 text-red-700'
    }
    return badges[status]
  }

  const getStatusIcon = (status) => {
    if (status === 'normal') return <CheckCircle className="w-5 h-5 text-green-600" />
    if (status === 'warning') return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    return <AlertTriangle className="w-5 h-5 text-red-600" />
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Temperature Monitoring"
        subtitle="Real-time temperature tracking for your cold chain shipments"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600">Normal</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{normalCount}</p>
          <p className="text-sm text-gray-600 mt-1">Within range</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600">Warning</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{warningCount}</p>
          <p className="text-sm text-gray-600 mt-1">Needs attention</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xs font-medium text-red-600">Critical</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{criticalCount}</p>
          <p className="text-sm text-gray-600 mt-1">Immediate action</p>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'normal', 'warning', 'critical'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors font-medium capitalize ${
              filter === status
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredShipments.map(shipment => (
          <div key={shipment.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{shipment.id}</h3>
                  <p className="text-sm text-gray-600">{shipment.cargoType}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(shipment.status)}`}>
                {shipment.status.toUpperCase()}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600">Current Temperature</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">{shipment.currentTemp}°C</p>
                  {shipment.currentTemp > shipment.targetTemp ? (
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600">Target Temperature</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{shipment.targetTemp}°C</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-gray-600" />
                  <span className="text-xs text-gray-600">Alerts</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{shipment.alerts}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{shipment.route}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{shipment.lastUpdate}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredShipments.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Thermometer className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No shipments found</h3>
          <p className="text-gray-600">No temperature-controlled shipments match this filter</p>
        </div>
      )}
    </div>
  )
}
