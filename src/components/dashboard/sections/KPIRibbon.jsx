import KPICard from '../widgets/KPICard'
import { KPI_DATA } from '../../../constants/mockData'

export default function KPIRibbon({ onKPIClick }) {
  return (
    <div className="overflow-hidden">
      {/* Mobile: Grid Layout */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-3">
          {KPI_DATA.map((kpi) => (
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
        {KPI_DATA.slice(0, 4).map((kpi) => (
          <KPICard
            key={kpi.id}
            {...kpi}
            onClick={() => onKPIClick(kpi.id)}
          />
        ))}
      </div>
      
      {/* Desktop: Responsive Grid */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
        {KPI_DATA.map((kpi) => (
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