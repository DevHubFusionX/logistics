import { UserCheck, Truck, Star } from 'lucide-react'
import { MetricCard } from '../ui/advanced'

export default function DriverStats({ drivers }) {
  const active = drivers.filter(d => d.status === 'active').length
  const inactive = drivers.filter(d => d.status === 'inactive').length
  const verified = drivers.filter(d => d.isVerified).length
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <MetricCard
        title="Total Drivers"
        value={drivers.length}
        icon={UserCheck}
        sparklineData={[42, 44, 45, 46, 47, 48, 50]}
      />
      <MetricCard
        title="Active"
        value={active}
        icon={UserCheck}
        color="green"
        sparklineData={[28, 29, 30, 31, 32, 32, 35]}
      />
      <MetricCard
        title="Inactive"
        value={inactive}
        icon={Truck}
        color="red"
        sparklineData={[15, 14, 13, 12, 12, 12, 10]}
      />
      <MetricCard
        title="Verified"
        value={verified}
        icon={Star}
        color="yellow"
        sparklineData={[92, 93, 94, 95, 95, 96, 96]}
      />
    </div>
  )
}
