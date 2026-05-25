export default function StatsCard({ title, value, icon: Icon, color = "blue" }) {
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    gray: 'bg-gray-500'
  }

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${colorMap[color]}`} />
      
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${colorMap[color]} bg-opacity-10 flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${colorMap[color].replace('bg-', 'text-')}`} />
          </div>
        )}
      </div>
    </div>
  )
}
