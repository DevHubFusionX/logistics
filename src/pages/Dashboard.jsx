import {
  PageHeader,
  KPIRibbon,
  LiveMap,
  ActivityFeed,
  OperationalInsights,
  TemperatureWidget,
  useDashboardData
} from '../components/dashboard'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KPI_ROUTES } from '../constants/mockData'
import { LoadingSkeleton, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'

export default function Dashboard() {
  const { loading } = useDashboardData()
  const [filters, setFilters] = useState({})
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleKPIClick = (kpiId) => {
    const route = KPI_ROUTES[kpiId]
    if (route) navigate(route)
  }

  useLogisticsShortcuts({
    onNewShipment: () => navigate('/shipments'),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="card" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} type="card" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingSkeleton type="map" />
          <LoadingSkeleton type="list" items={5} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Command Center"
        subtitle="Real-time operations dashboard with live tracking, trip monitoring, and performance analytics"
        showFilters={true}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <KPIRibbon onKPIClick={handleKPIClick} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveMap />
        <ActivityFeed />
      </div>

      <TemperatureWidget />

      <OperationalInsights />
      
      <ToastContainer />
    </div>
  )
}