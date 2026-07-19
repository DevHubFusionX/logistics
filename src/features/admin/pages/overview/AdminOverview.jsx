import { memo, useMemo } from 'react'
import { PageHeader, KPICard } from '@/features/dashboard'
import { KPI_DATA } from '@/constants/mockData'

function AdminOverview() {
  const dynamicKPIs = useMemo(() => KPI_DATA, [])

  return (
    <div className="space-y-6 pb-8 px-4">
      <PageHeader
        title="Admin Overview"
        subtitle="Real-time performance and financial metrics"
      />

      <div className="space-y-8">
        {/* Financial Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-gray-900">Financial Performance</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {dynamicKPIs.filter(kpi =>
              (kpi.id.includes('revenue') || kpi.id.includes('gmv')) &&
              !['revenue_last_month', 'revenue_last_week', 'total_gmv'].includes(kpi.id)
            ).map((kpi) => (
              <KPICard key={kpi.id} {...kpi} />
            ))}
          </div>
        </section>

        {/* Operations Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-gray-900">Operations & Logistics</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dynamicKPIs.filter(kpi => kpi.id.includes('trip') || ['fleet_map', 'fleet_health'].includes(kpi.id)).map((kpi) => (
              <KPICard key={kpi.id} {...kpi} />
            ))}
          </div>
        </section>

        {/* Performance Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-gray-900">Performance & Health</h2>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dynamicKPIs.filter(kpi => kpi.id.includes('booking') || ['active_drivers', 'ontime_rate'].includes(kpi.id)).map((kpi) => (
              <KPICard key={kpi.id} {...kpi} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default memo(AdminOverview)
