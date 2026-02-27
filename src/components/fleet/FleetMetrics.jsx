import { Truck, CheckCircle, Clock, Wifi } from 'lucide-react'
import { MetricCard } from '../ui/advanced'

export default function FleetMetrics({ data, statusCounts }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <MetricCard
        title="Total Trucks"
        value={statusCounts.total}
        icon={Truck}
        sparklineData={[3, 4, 4, 5, 5, 6, 6]}
      />
      <MetricCard
        title="Approved"
        value={statusCounts.approved}
        icon={CheckCircle}
        color="green"
        sparklineData={[2, 2, 3, 3, 4, 4, 5]}
      />
      <MetricCard
        title="Pending Approval"
        value={statusCounts.pending}
        icon={Clock}
        color="orange"
        sparklineData={[1, 2, 1, 2, 1, 2, 1]}
      />
      <MetricCard
        title="GPS Enabled"
        value={statusCounts.gpsEnabled}
        icon={Wifi}
        color="blue"
        sparklineData={[2, 3, 3, 4, 4, 5, 5]}
      />
    </div>
  )
}
