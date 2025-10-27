import {
  PageHeader,
  KPIRibbon,
  LiveMap,
  ActivityFeed,
  OperationalInsights,
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

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleKPIClick = (kpiId) => {
    const route = KPI_ROUTES[kpiId]
    if (route) {
      navigate(route)
    }
  }

  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => navigate('/shipments'),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  if (loading) {
    return (
      <>
        <LoadingSkeleton type="card" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} type="card" />
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <LoadingSkeleton type="map" />
          <LoadingSkeleton type="list" items={5} />
        </div>
      </>
    )
  }

  return (
    <div className="pb-4 sm:pb-6">
      <PageHeader
        title="Overview"
        subtitle="Executive summary of your logistics operations and key performance indicators."
        showFilters={true}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* KPI Ribbon */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <KPIRibbon onKPIClick={handleKPIClick} />
      </div>

      {/* Central Area - Map + Activity */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <LiveMap />
        </div>
        <div className="order-1 lg:order-2">
          <ActivityFeed />
        </div>
      </div>

      {/* Operational Insights */}
      <div className="mt-4 sm:mt-6">
        <OperationalInsights />
      </div>
      <ToastContainer />
    </div>
  )
}