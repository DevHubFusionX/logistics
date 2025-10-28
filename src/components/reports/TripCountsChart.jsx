export default function TripCountsChart({ data }) {
  const maxCount = Math.max(...data.map(d => d.count))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-4">Trip Counts by Route</h3>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.route}</span>
              <span className="font-semibold">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all" 
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
