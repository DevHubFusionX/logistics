import { UserCheck, Truck, Star } from 'lucide-react'
import { MetricCard } from '../ui/advanced'

export default function DriverStats({ drivers }) {
  const available = drivers.filter(d => d.status === 'available').length
  const onTrip = drivers.filter(d => d.status === 'on_trip').length
  const avgPerformance = Math.round(drivers.reduce((acc, d) => acc + d.performanceScore, 0) / drivers.length)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Total Drivers"
        value={drivers.length}
        icon={UserCheck}
        sparklineData={[42, 44, 45, 46, 47, 48, 50]}
      />
      <MetricCard 
        title="Available"
        value={available}
        icon={UserCheck}
        color="green"
        sparklineData={[28, 29, 30, 31, 32, 32, 35]}
      />
      <MetricCard 
        title="On Trip"
        value={onTrip}
        icon={Truck}
        color="blue"
        sparklineData={[15, 14, 13, 12, 12, 12, 10]}
      />
      <MetricCard 
        title="Avg Performance"
        value={`${avgPerformance}%`}
        icon={Star}
        color="yellow"
        sparklineData={[92, 93, 94, 95, 95, 96, 96]}
      />
    </div>
  )
}
