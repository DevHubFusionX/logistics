import { Clock, Truck, CheckCircle, AlertCircle } from 'lucide-react'

const StatCard = ({ icon: Icon, label, count, description, gradient, iconBg, iconColor, labelColor }) => (
  <div className={`${gradient} rounded-xl p-4 border ${iconBg.replace('bg-', 'border-')}`}>
    <div className="flex items-center justify-between mb-2">
      <div className={`p-2 ${iconBg} rounded-lg`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <span className={`text-xs font-medium ${labelColor}`}>{label}</span>
    </div>
    <p className="text-3xl font-bold text-gray-900">{count}</p>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
)

export default function BookingStats({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <StatCard
        icon={Clock}
        label="Pending"
        count={stats.pendingCount}
        description="Awaiting confirmation"
        gradient="bg-gradient-to-br from-yellow-50 to-amber-50"
        iconBg="bg-yellow-100"
        iconColor="text-yellow-600"
        labelColor="text-yellow-600"
      />
      <StatCard
        icon={Truck}
        label="Active"
        count={stats.activeCount}
        description="In transit or confirmed"
        gradient="bg-gradient-to-br from-green-50 to-emerald-50"
        iconBg="bg-green-100"
        iconColor="text-green-600"
        labelColor="text-green-600"
      />
      <StatCard
        icon={CheckCircle}
        label="Delivered"
        count={stats.deliveredThisMonth}
        description="This month"
        gradient="bg-gradient-to-br from-blue-50 to-cyan-50"
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        labelColor="text-blue-600"
      />
      <StatCard
        icon={AlertCircle}
        label="Outstanding"
        count={stats.outstandingInvoices}
        description="Pending invoices"
        gradient="bg-gradient-to-br from-orange-50 to-red-50"
        iconBg="bg-orange-100"
        iconColor="text-orange-600"
        labelColor="text-orange-600"
      />
    </div>
  )
}
