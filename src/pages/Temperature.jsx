import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { Thermometer, AlertTriangle, TrendingUp, CheckCircle, WifiOff } from 'lucide-react'
import TemperatureTable from '../components/temperature/TemperatureTable'
import TemperatureGraph from '../components/temperature/TemperatureGraph'
import AlertCenter from '../components/temperature/AlertCenter'
import ComplianceReport from '../components/temperature/ComplianceReport'
import { temperatureData, alerts, complianceReports } from '../components/temperature/temperatureData'

export default function Temperature() {
  const [activeTab, setActiveTab] = useState('monitoring')
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const activeMonitoring = temperatureData.filter(t => t.status !== 'offline').length
  const alertCount = temperatureData.filter(t => t.status === 'alert').length
  const offlineCount = temperatureData.filter(t => t.status === 'offline').length
  const avgCompliance = Math.round(complianceReports.reduce((acc, r) => acc + r.withinRange, 0) / complianceReports.length)

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Temperature Monitoring"
        subtitle="Real-time cold chain monitoring and compliance tracking for refrigerated fleet"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Monitoring"
          value={activeMonitoring}
          icon={Thermometer}
          color="blue"
          sparklineData={[4, 5, 5, 4, 5, 5, 5]}
        />
        <MetricCard
          title="Temperature Alerts"
          value={alertCount}
          icon={AlertTriangle}
          color="red"
          sparklineData={[1, 2, 3, 2, 3, 2, 3]}
        />
        <MetricCard
          title="Avg Compliance"
          value={avgCompliance}
          unit="%"
          icon={CheckCircle}
          color="green"
          sparklineData={[92, 94, 93, 95, 96, 94, 92]}
        />
        <MetricCard
          title="Offline Sensors"
          value={offlineCount}
          icon={WifiOff}
          color="gray"
          sparklineData={[0, 1, 0, 1, 1, 0, 1]}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
        <nav className="flex gap-2">
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'monitoring'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            Live Monitoring
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'compliance'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Compliance Reports
          </button>
        </nav>
      </div>

      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-blue-600" />
                Live Temperature Monitoring
              </h2>
              <p className="text-sm text-gray-600 mt-1">Real-time temperature data from all active sensors</p>
            </div>
            <TemperatureTable data={temperatureData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TemperatureGraph />
            <AlertCenter alerts={alerts} />
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <ComplianceReport reports={complianceReports} />
      )}

      <ToastContainer />
    </div>
  )
}
