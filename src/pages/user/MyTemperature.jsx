import { useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import {
  ThermometerSnowflake, Truck, AlertTriangle, CheckCircle,
  RefreshCw, AlertCircle, Package
} from 'lucide-react'
import { useShipmentsQuery } from '../../hooks/queries/useTrackingQueries'
import { BookingCardSkeleton, StatCardSkeleton } from '../../components/common/SkeletonLoaders'

export default function MyTemperature() {
  const { data: allShipments = [], isLoading, isError, refetch } = useShipmentsQuery()

  const tempControlledShipments = useMemo(() => {
    return allShipments
      .filter(s => {
        const type = (s.package_type || s.goodsType || '').toLowerCase()
        return (
          type.includes('frozen') ||
          type.includes('pharm') ||
          type.includes('dairy') ||
          type.includes('perish') ||
          type.includes('cold') ||
          s.requiresTemperatureControl
        )
      })
      .map(s => ({
        ...s,
        currentTemp: s.currentTemperature ?? null,
        targetTemp: s.targetTemperature ?? (
          (s.package_type || s.goodsType || '').toLowerCase().includes('frozen') ? -20 : 4
        ),
        tempStatus: s.temperatureStatus || 'normal',
        alerts: s.temperatureAlerts?.length || 0
      }))
  }, [allShipments])

  // Identify critical alerts — only from shipments with actual data
  const criticalShipments = tempControlledShipments.filter(s =>
    s.currentTemp !== null && s.tempStatus === 'warning'
  )

  if (isLoading) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="Temperature Monitor" subtitle="Monitor cold chain shipments in real-time" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <BookingCardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <div className="p-4 bg-red-50 rounded-full">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Failed to Load Sensor Data</h3>
        <button onClick={() => refetch()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">Retry</button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-end justify-between">
        <PageHeader title="Temperature Monitor" subtitle="Monitor cold chain shipments in real-time" />
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          title="Refresh data"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Alert Banner */}
      {criticalShipments.length > 0 && (
        <div className="bg-red-50 rounded-xl border border-red-200 p-4 flex items-start gap-3">
          <div className="p-2 bg-red-100 rounded-lg shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-red-900 mb-1">Temperature Alert</h3>
            <p className="text-sm text-red-700">
              {criticalShipments.length} shipment{criticalShipments.length > 1 ? 's' : ''} reporting
              temperature deviation. Our team is monitoring the situation.
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg"><Package className="w-4 h-4 text-blue-600" /></div>
            <span className="text-xs font-bold uppercase tracking-wide text-gray-600">Monitored</span>
          </div>
          <p className="text-3xl font-black text-gray-900">{tempControlledShipments.length}</p>
          <p className="text-xs text-gray-500 mt-1">Cold chain shipments</p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-4 h-4 text-green-600" /></div>
            <span className="text-xs font-bold uppercase tracking-wide text-gray-600">Normal</span>
          </div>
          <p className="text-3xl font-black text-gray-900">
            {tempControlledShipments.filter(s => s.tempStatus === 'normal').length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Within range</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg"><AlertTriangle className="w-4 h-4 text-red-600" /></div>
            <span className="text-xs font-bold uppercase tracking-wide text-gray-600">Alerts</span>
          </div>
          <p className="text-3xl font-black text-gray-900">
            {tempControlledShipments.reduce((sum, s) => sum + s.alerts, 0)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Active alerts</p>
        </div>
      </div>

      {/* Shipment Cards */}
      {tempControlledShipments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <ThermometerSnowflake className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No Cold Chain Shipments</h3>
          <p className="text-gray-500 text-sm">
            Temperature monitoring activates for frozen, pharmaceutical, dairy, and perishable shipments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tempControlledShipments.map((shipment, index) => (
            <div
              key={shipment.id || shipment._id || index}
              className={`bg-white rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${shipment.tempStatus === 'warning' ? 'border-red-200 ring-1 ring-red-100' : 'border-gray-200'
                }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${shipment.tempStatus === 'warning' ? 'bg-red-100' : 'bg-blue-50'}`}>
                    <ThermometerSnowflake className={`w-5 h-5 ${shipment.tempStatus === 'warning' ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {shipment.tracking_number || shipment.bookingId || `Shipment #${index + 1}`}
                    </h3>
                    <span className="text-xs text-gray-500 capitalize">
                      {shipment.goodsType || shipment.package_type || 'Cold Chain'}
                    </span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${shipment.status === 'delivered'
                    ? 'bg-green-100 text-green-700'
                    : shipment.status === 'in_transit'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {shipment.status?.replace(/_/g, ' ') || 'Pending'}
                </span>
              </div>

              {/* Temperature Display */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1 font-medium">Current</p>
                  {shipment.currentTemp !== null ? (
                    <p className={`text-2xl font-black ${shipment.tempStatus === 'warning' ? 'text-red-600' : 'text-gray-900'}`}>
                      {shipment.currentTemp}°C
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-gray-400">Awaiting data</p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1 font-medium">Target</p>
                  <p className="text-2xl font-black text-gray-900">{shipment.targetTemp}°C</p>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Truck className="w-3.5 h-3.5" />
                <span>
                  {shipment.origin?.split(',').pop()?.trim() || shipment.pickupLocation?.city || 'Origin'}
                  {' → '}
                  {shipment.destination?.split(',').pop()?.trim() || shipment.dropoffLocation?.city || 'Destination'}
                </span>
              </div>

              {/* Alert count */}
              {shipment.alerts > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-red-600 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {shipment.alerts} alert{shipment.alerts > 1 ? 's' : ''} recorded
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
