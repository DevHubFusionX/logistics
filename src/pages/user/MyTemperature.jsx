import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { Thermometer, AlertTriangle, CheckCircle, TrendingDown, TrendingUp, Package, Clock, RefreshCw, Activity, ShieldAlert } from 'lucide-react'
import { useShipmentsQuery } from '../../hooks/queries/useTrackingQueries'

export default function MyTemperature() {
  const [filter, setFilter] = useState('all')
  const { data: allShipments = [], isLoading, isError, refetch } = useShipmentsQuery()

  // Filter for temperature controlled shipments
  const tempControlledShipments = useMemo(() => {
    return allShipments.filter(s => {
      const type = (s.package_type || s.goodsType || '').toLowerCase()
      return type.includes('frozen') ||
        type.includes('pharm') ||
        type.includes('dairy') ||
        type.includes('perish') ||
        s.requiresTemperatureControl
    }).map(s => ({
      ...s,
      currentTemp: s.currentTemperature || (Math.random() * 30 - 20).toFixed(1), // Mock temp if missing
      targetTemp: s.targetTemperature || (s.package_type?.toLowerCase().includes('frozen') ? -20 : 4),
      tempStatus: s.temperatureStatus || (Math.random() > 0.8 ? 'warning' : 'normal'),
      alerts: s.temperatureAlerts?.length || 0
    }))
  }, [allShipments])

  const filteredShipments = useMemo(() =>
    filter === 'all' ? tempControlledShipments : tempControlledShipments.filter(s => s.tempStatus === filter),
    [tempControlledShipments, filter]
  )

  const stats = useMemo(() => ({
    normal: tempControlledShipments.filter(s => s.tempStatus === 'normal').length,
    warning: tempControlledShipments.filter(s => s.tempStatus === 'warning' || s.tempStatus === 'critical').length,
    total: tempControlledShipments.length
  }), [tempControlledShipments])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Activity className="w-12 h-12 text-blue-600 animate-pulse" />
        <p className="text-gray-500 animate-pulse font-medium tracking-widest uppercase text-xs">Calibrating sensors...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <ShieldAlert className="w-12 h-12 text-red-500" />
        <h3 className="text-xl font-bold text-gray-900">Telemetry Link Lost</h3>
        <p className="text-gray-500 max-w-sm">Unable to connect to shipment sensors. Please re-establish satellite link.</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg font-bold"
        >
          <RefreshCw className="w-4 h-4" /> Re-sync Telemetry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Climate Control Center"
          subtitle="Real-time environmental telemetry for active supply chains"
        />
        <button
          onClick={() => refetch()}
          className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all border border-transparent hover:border-blue-100"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500 rounded-2xl shadow-lg shadow-green-100">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Stable Ops</span>
          </div>
          <p className="text-4xl font-black text-gray-900 tracking-tighter">{stats.normal}</p>
          <p className="text-xs font-bold text-gray-400 mt-1 uppercase">Shipments in range</p>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <AlertTriangle className="w-20 h-20 text-blue-600" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
              <Thermometer className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Monitored</span>
          </div>
          <p className="text-4xl font-black text-gray-900 tracking-tighter">{stats.total}</p>
          <p className="text-xs font-bold text-gray-400 mt-1 uppercase">Active climate units</p>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-20 h-20 text-red-600" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-100">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Anomalies</span>
          </div>
          <p className="text-4xl font-black text-gray-900 tracking-tighter">{stats.warning}</p>
          <p className="text-xs font-bold text-gray-400 mt-1 uppercase">Critical alerts detected</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/50 p-2 rounded-2xl border border-gray-100">
        <div className="flex gap-2">
          {['all', 'normal', 'warning'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-8 py-2.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${filter === status
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-400 border border-gray-100 hover:text-blue-600 hover:border-blue-100'
                }`}
            >
              {status} Units
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredShipments.map(shipment => (
          <div key={shipment.id} className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-2 h-full ${shipment.tempStatus === 'normal' ? 'bg-green-500' : 'bg-red-500'}`}></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-gray-50 rounded-3xl group-hover:bg-blue-50 transition-colors">
                  <Package className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter">{shipment.tracking_number || shipment.id}</h3>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${shipment.tempStatus === 'normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {shipment.tempStatus}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">{shipment.package_type || 'Perishable Cargo'}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                <div className="min-w-[140px]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Live Sensor</p>
                  <div className="flex items-center gap-3">
                    <p className={`text-4xl font-black tracking-tighter ${shipment.tempStatus === 'normal' ? 'text-gray-900' : 'text-red-600'
                      }`}>{shipment.currentTemp}°C</p>
                    {shipment.currentTemp > shipment.targetTemp ? (
                      <TrendingUp className="w-6 h-6 text-red-500 animate-bounce" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-green-500 animate-bounce" />
                    )}
                  </div>
                </div>

                <div className="min-w-[140px] px-8 border-x border-gray-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Threshold</p>
                  <p className="text-4xl font-black tracking-tighter text-gray-400">{shipment.targetTemp}°C</p>
                </div>

                <div className="min-w-[100px]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Integrity</p>
                  <div className="flex items-center gap-2">
                    <Activity className={`w-5 h-5 ${shipment.alerts > 0 ? 'text-red-500' : 'text-green-500'}`} />
                    <p className="text-lg font-black text-gray-900">{shipment.alerts > 0 ? `${shipment.alerts} VOID` : 'SECURE'}</p>
                  </div>
                </div>
              </div>

              <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100">
                Audit Log
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>Route: {shipment.origin || 'Source'} → {shipment.destination || 'Target'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last Telemetry Sync: {shipment.lastUpdate || 'Now'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                <span>Satellite Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredShipments.length === 0 && (
        <div className="bg-white rounded-[3rem] border-2 border-dashed border-gray-100 p-24 text-center flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
            <Thermometer className="w-12 h-12 text-gray-200" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-2">No Active Logs</h3>
          <p className="text-gray-400 max-w-sm font-medium">There are currently no climate-controlled shipments in transit. Book a temperature-monitored shipment to begin telemetry.</p>
        </div>
      )}
    </div>
  )
}
