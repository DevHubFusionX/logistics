export default function GeographicHeatmap({ data }) {
  const getPerformanceColor = (performance) => {
    if (performance >= 94) return 'bg-green-100 border-green-300'
    if (performance >= 90) return 'bg-yellow-100 border-yellow-300'
    return 'bg-orange-100 border-orange-300'
  }

  const getTextColor = (performance) => {
    if (performance >= 94) return 'text-green-700'
    if (performance >= 90) return 'text-yellow-700'
    return 'text-orange-700'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-4">Geographic Performance</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.map((region, i) => (
          <div 
            key={i} 
            className={`p-4 rounded-lg border-2 text-center transition-all hover:shadow-md ${getPerformanceColor(region.performance)}`}
          >
            <div className={`text-2xl font-bold ${getTextColor(region.performance)}`}>
              {region.performance}%
            </div>
            <div className="text-sm font-medium text-gray-900 mt-1">{region.region}</div>
            <div className="text-xs text-gray-600 mt-1">{region.trips} trips</div>
          </div>
        ))}
      </div>
    </div>
  )
}
