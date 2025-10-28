import { MetricCard } from '../ui/advanced'
import { Truck, Wrench } from 'lucide-react'

export default function FleetMetrics({ data, statusCounts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Fleet"
        value={data.length}
        icon={Truck}
        sparklineData={[60, 62, 65, 63, 68, 70, 72]}
      />
      <MetricCard
        title="Available"
        value={statusCounts.available}
        icon={Truck}
        color="green"
        sparklineData={[25, 28, 26, 30, 32, 35, 38]}
      />
      <MetricCard
        title="On Trip"
        value={statusCounts.on_trip}
        icon={Truck}
        color="blue"
        sparklineData={[30, 28, 32, 30, 28, 25, 27]}
      />
      <MetricCard
        title="Maintenance"
        value={statusCounts.maintenance}
        icon={Wrench}
        color="orange"
        sparklineData={[5, 4, 6, 5, 8, 10, 7]}
      />
    </div>
  )
}
