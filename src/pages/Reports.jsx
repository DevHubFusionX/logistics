import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { Download, Calendar, Filter, TrendingUp, Truck, Thermometer, Wrench, FileSpreadsheet, FileText } from 'lucide-react'
import RevenueTrendChart from '../components/reports/RevenueTrendChart'
import FleetUsageChart from '../components/reports/FleetUsageChart'
import TripCountsChart from '../components/reports/TripCountsChart'
import RevenueByClientChart from '../components/reports/RevenueByClientChart'
import GeographicHeatmap from '../components/reports/GeographicHeatmap'
import { reportsData } from '../components/reports/reportsData'

export default function Reports() {
  const [dateRange, setDateRange] = useState('month')
  const [filterClient, setFilterClient] = useState('all')
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const handleExport = (format) => {
    showToast.success(`Report exported as ${format.toUpperCase()}`, `analytics_report.${format}`)
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive business intelligence and performance analytics dashboard"
      />

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            >
              <option value="all">All Clients</option>
              <option value="adebayo">Adebayo Industries</option>
              <option value="ph">Port Harcourt Logistics</option>
              <option value="kano">Kano Distribution</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
            >
              <FileText className="w-4 h-4" />
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Trip Performance"
          value={reportsData.tripPerformance.onTime}
          unit="%"
          icon={TrendingUp}
          color="green"
          sparklineData={[88, 89, 90, 91, 92, 92, 92]}
        />
        <MetricCard
          title="Fleet Utilization"
          value={reportsData.fleetUtilization.active}
          unit="%"
          icon={Truck}
          color="blue"
          sparklineData={[70, 72, 73, 74, 75, 75, 75]}
        />
        <MetricCard
          title="Temp Compliance"
          value={reportsData.temperatureCompliance}
          unit="%"
          icon={Thermometer}
          color="cyan"
          sparklineData={[90, 91, 92, 93, 94, 94, 94]}
        />
        <MetricCard
          title="Maintenance Cost"
          value={(reportsData.maintenanceCost / 1000000).toFixed(2)}
          unit="M"
          icon={Wrench}
          color="orange"
          sparklineData={[1.1, 1.15, 1.2, 1.22, 1.24, 1.25, 1.25]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendChart data={reportsData.revenueTrend} />
        <FleetUsageChart data={reportsData.fleetUtilization} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TripCountsChart data={reportsData.tripCounts} />
        <RevenueByClientChart data={reportsData.revenueByClient} />
      </div>

      <GeographicHeatmap data={reportsData.geographicPerformance} />

      <ToastContainer />
    </div>
  )
}
