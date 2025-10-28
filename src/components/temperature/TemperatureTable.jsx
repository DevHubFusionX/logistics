import { Thermometer, WifiOff } from 'lucide-react'

export default function TemperatureTable({ data }) {
  const getStatusBadge = (status) => {
    const styles = {
      alert: 'bg-red-100 text-red-700',
      warning: 'bg-yellow-100 text-yellow-700',
      offline: 'bg-gray-100 text-gray-700',
      normal: 'bg-green-100 text-green-700'
    }
    return `px-3 py-1 rounded-full text-xs font-semibold uppercase ${styles[status]}`
  }

  const getTempColor = (temp, min, max) => {
    if (temp === null) return 'text-gray-400'
    if (temp < min || temp > max) return 'text-red-600'
    return 'text-green-600'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Truck</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trip ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Temp</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Set Range</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deviation</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Updated</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row) => (
            <tr key={row.tripId} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.truck}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{row.tripId}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {row.currentTemp === null ? (
                    <WifiOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Thermometer className={`w-4 h-4 ${getTempColor(row.currentTemp, row.minTemp, row.maxTemp)}`} />
                  )}
                  <span className={`text-sm font-bold ${getTempColor(row.currentTemp, row.minTemp, row.maxTemp)}`}>
                    {row.currentTemp !== null ? `${row.currentTemp}°C` : 'Offline'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {row.minTemp}°C - {row.maxTemp}°C
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={row.deviation > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-medium'}>
                  {row.deviation > 0 ? `+${row.deviation}%` : '0%'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{row.lastUpdated}</td>
              <td className="px-6 py-4">
                <span className={getStatusBadge(row.status)}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
