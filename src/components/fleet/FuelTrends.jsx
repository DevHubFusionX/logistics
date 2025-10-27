import { Fuel, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

export default function FuelTrends({ vehicles }) {
  const fuelData = {
    totalConsumption: 2450,
    avgEfficiency: 8.5,
    costSavings: 12.3,
    trend: 'up'
  }

  const vehicleFuelData = [
    { id: 'VH001', efficiency: 9.2, consumption: 145, trend: 'up' },
    { id: 'VH002', efficiency: 7.8, consumption: 98, trend: 'down' },
    { id: 'VH003', efficiency: 8.9, consumption: 167, trend: 'up' },
    { id: 'VH004', efficiency: 6.5, consumption: 203, trend: 'down' }
  ]

  const weeklyData = [
    { week: 'Week 1', consumption: 580, cost: 1160 },
    { week: 'Week 2', consumption: 620, cost: 1240 },
    { week: 'Week 3', consumption: 595, cost: 1190 },
    { week: 'Week 4', consumption: 655, cost: 1310 }
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Fuel className="w-5 h-5" />
          Fuel Consumption Trends
        </h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
            Weekly
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Total Consumption</span>
            <Fuel className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{fuelData.totalConsumption}L</div>
          <div className="text-xs text-blue-600">This month</div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Avg Efficiency</span>
            <BarChart3 className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{fuelData.avgEfficiency} km/L</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp className="w-3 h-3" />
            +5.2% vs last month
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-yellow-700">Cost Savings</span>
            <TrendingDown className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">${fuelData.costSavings}k</div>
          <div className="text-xs text-yellow-600">Efficiency improvements</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Vehicle Performance</h4>
          <div className="space-y-3">
            {vehicleFuelData.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{vehicle.id}</div>
                  <div className="text-sm text-gray-600">{vehicle.consumption}L consumed</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{vehicle.efficiency} km/L</span>
                    {vehicle.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Weekly Consumption</h4>
          <div className="space-y-3">
            {weeklyData.map((week, index) => (
              <div key={week.week} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{week.week}</div>
                  <div className="text-sm text-gray-600">${week.cost}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{week.consumption}L</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(week.consumption / 700) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-2">Optimization Recommendations</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• VH004 shows 15% higher consumption - schedule maintenance check</li>
          <li>• Route optimization could save 8% fuel on Highway Corridor routes</li>
          <li>• Driver training program reduced harsh acceleration by 23%</li>
        </ul>
      </div>
    </div>
  )
}