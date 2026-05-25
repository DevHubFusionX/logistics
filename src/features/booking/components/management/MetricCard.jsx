export default function MetricCard({ icon: Icon, label, value, description, color }) {
  const colorClasses = {
    yellow: {
      gradient: 'from-yellow-50 to-amber-50',
      border: 'border-yellow-200',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    green: {
      gradient: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    blue: {
      gradient: 'from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    orange: {
      gradient: 'from-orange-50 to-red-50',
      border: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  }

  const classes = colorClasses[color]

  return (
    <div className={`bg-gradient-to-br ${classes.gradient} rounded-xl p-4 border ${classes.border}`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 ${classes.iconBg} rounded-lg`}>
          <Icon className={`w-5 h-5 ${classes.iconColor}`} />
        </div>
        <span className={`text-xs font-medium ${classes.iconColor}`}>{label}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  )
}
