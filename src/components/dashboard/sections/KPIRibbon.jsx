import KPICard from '../widgets/KPICard'
import { Loader2 } from 'lucide-react'
import { useDashboardSummaryQuery } from '../../../hooks/queries/useDashboardQueries'

export default function KPIRibbon({ onKPIClick }) {
  const { data: dashboardData, isLoading } = useDashboardSummaryQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    )
  }

  const kpis = dashboardData?.kpis || []

  return (
    <div className="overflow-hidden">
      {/* Mobile: Grid Layout */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi) => (
            <KPICard
              key={kpi.id}
              {...kpi}
              onClick={() => onKPIClick(kpi.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Tablet: 2 Columns */}
      <div className="hidden sm:grid md:hidden grid-cols-2 gap-3">
        {kpis.slice(0, 4).map((kpi) => (
          <KPICard
            key={kpi.id}
            {...kpi}
            onClick={() => onKPIClick(kpi.id)}
          />
        ))}
      </div>
      
      {/* Desktop: Responsive Grid */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
        {kpis.map((kpi) => (
          <KPICard
            key={kpi.id}
            {...kpi}
            onClick={() => onKPIClick(kpi.id)}
          />
        ))}
      </div>
    </div>
  )
}