import { useState, useEffect } from 'react'
import { PageHeader } from '../components/dashboard'
import { TrendingUp, DollarSign, Package, Clock, Calendar, BarChart3 } from 'lucide-react'
import bookingService from '../services/bookingService'

export default function MyAnalytics() {
  const [period, setPeriod] = useState('month')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getBookings()
      setBookings(response.data?.records || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculatePrice = (booking) => {
    if (booking.totalCost || booking.estimatedCost || booking.price) return booking.totalCost || booking.estimatedCost || booking.price
    const baseRate = 5000
    const weightRate = parseFloat(booking.cargoWeightKg || 0) * 50
    const quantityRate = (booking.quantity || 1) * 500
    const fragileCharge = booking.isFragile ? 2000 : 0
    const perishableCharge = booking.isPerishable ? 3000 : 0
    const vehicleRates = { 'Van': 0, 'Truck': 5000, 'Refrigerated Van': 8000 }
    return baseRate + weightRate + quantityRate + fragileCharge + perishableCharge + (vehicleRates[booking.vehicleType] || 0)
  }

  const stats = {
    totalSpend: bookings.reduce((sum, b) => sum + calculatePrice(b), 0),
    totalShipments: bookings.length,
    avgCostPerShip: bookings.length > 0 ? bookings.reduce((sum, b) => sum + calculatePrice(b), 0) / bookings.length : 0,
    avgDeliveryTime: 2.8,
    onTimeRate: bookings.length > 0 ? (bookings.filter(b => b.status === 'delivered').length / bookings.length * 100) : 0
  }

  const monthlyData = bookings.reduce((acc, booking) => {
    const month = new Date(booking.createdAt).toLocaleString('default', { month: 'short' })
    const existing = acc.find(m => m.month === month)
    if (existing) {
      existing.shipments++
      existing.cost += calculatePrice(booking)
    } else {
      acc.push({ month, shipments: 1, cost: calculatePrice(booking) })
    }
    return acc
  }, [])

  const routeCounts = bookings.reduce((acc, booking) => {
    const route = `${booking.pickupLocation?.city} → ${booking.dropoffLocation?.city}`
    if (!acc[route]) acc[route] = { route, shipments: 0, cost: 0, totalDays: 0 }
    acc[route].shipments++
    acc[route].cost += calculatePrice(booking)
    const days = Math.abs(new Date(booking.estimatedDeliveryDate) - new Date(booking.estimatedPickupDate)) / (1000 * 60 * 60 * 24)
    acc[route].totalDays += days
    return acc
  }, {})
  const topRoutes = Object.values(routeCounts).map(r => ({ ...r, avgTime: r.totalDays / r.shipments })).sort((a, b) => b.shipments - a.shipments).slice(0, 5)

  const cargoCounts = bookings.reduce((acc, booking) => {
    const type = booking.goodsType
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})
  const cargoTypes = Object.entries(cargoCounts).map(([type, count]) => ({
    type,
    shipments: count,
    percentage: Math.round((count / bookings.length) * 100)
  })).sort((a, b) => b.shipments - a.shipments)

  if (loading) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="My Analytics" subtitle="Track your shipping costs, trends, and performance" />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="My Analytics"
        subtitle="Track your shipping costs, trends, and performance"
      />

      <div className="flex gap-2">
        {['week', 'month', 'quarter', 'year'].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg transition-colors font-medium capitalize ${
              period === p
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{(stats.totalSpend / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 mt-1">Total Spend</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalShipments}</p>
          <p className="text-sm text-gray-600 mt-1">Total Shipments</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{(stats.avgCostPerShip / 1000).toFixed(1)}K</p>
          <p className="text-sm text-gray-600 mt-1">Avg Cost/Ship</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.avgDeliveryTime} days</p>
          <p className="text-sm text-gray-600 mt-1">Avg Delivery</p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-pink-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-pink-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.onTimeRate}%</p>
          <p className="text-sm text-gray-600 mt-1">On-Time Rate</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{data.month}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{data.shipments} shipments</span>
                    <span className="text-xs text-gray-600 ml-2">₦{(data.cost / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(data.shipments / 25) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cargo Distribution</h3>
          <div className="space-y-4">
            {cargoTypes.map((cargo, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{cargo.type}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{cargo.shipments}</span>
                    <span className="text-xs text-gray-600 ml-2">({cargo.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${cargo.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Routes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Route</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Shipments</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Cost</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {topRoutes.map((route, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{route.route}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{route.shipments}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">₦{(route.cost / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{route.avgTime} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
