import { getColorClasses } from '../../../utils/helpers'

export default function StatsCard({ title, value, icon: Icon, color = "blue" }) {

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
        </div>
        {Icon && (
          <div className={`p-2 sm:p-3 rounded-lg ${getColorClasses(color).bg} ${getColorClasses(color).text} flex-shrink-0`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>
    </div>
  )
}