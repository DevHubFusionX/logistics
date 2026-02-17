
import { useState, useMemo, memo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { MetricCard } from '../../components/ui/advanced'
import {
    TrendingUp,
    DollarSign,
    Package,
    BarChart3,
    PieChart,
    Map as MapIcon,
    Calendar,
    ArrowUpRight,
    Clock
} from 'lucide-react'
import { useUserAnalyticsSummaryQuery } from '../../hooks/queries/useAnalyticsQueries'
import { useShipmentsQuery } from '../../hooks/queries/useTrackingQueries'
import { MetricSkeleton } from '../../components/common/SkeletonLoaders'

function MyAnalytics() {
    const [period, setPeriod] = useState('month')

    const { data: analyticsSummary, isLoading: summaryLoading } = useUserAnalyticsSummaryQuery({ period })
    const { data: bookings = [], isLoading: bookingsLoading, isError, refetch } = useShipmentsQuery()

    const loading = summaryLoading || bookingsLoading

    const calculatePrice = (booking) => {
        return booking.shipping_fee || booking.totalCost || booking.estimatedCost || 5000
    }

    const derivedStats = useMemo(() => {
        if (bookings.length === 0) return {
            totalSpend: 0,
            totalShipments: 0,
            avgCostPerShip: 0,
            onTimeRate: 0,
            monthlyData: [],
            cargoTypes: [],
            topRoutes: []
        }

        const totalSpend = bookings.reduce((sum, b) => sum + calculatePrice(b), 0)
        const delivered = bookings.filter(b => b.status === 'delivered')

        // Monthly Trends
        const monthlyMap = bookings.reduce((acc, b) => {
            const date = new Date(b.createdAt || b.created_at)
            const month = date.toLocaleString('default', { month: 'short' })
            if (!acc[month]) acc[month] = { month, shipments: 0, cost: 0 }
            acc[month].shipments++
            acc[month].cost += calculatePrice(b)
            return acc
        }, {})

        // Cargo Distribution
        const cargoMap = bookings.reduce((acc, b) => {
            const type = (b.goodsType || b.package_type || 'General').toUpperCase()
            acc[type] = (acc[type] || 0) + 1
            return acc
        }, {})

        // Top Routes with transit time calculation
        const routeMap = bookings.reduce((acc, b) => {
            const origin = b.origin?.split(',').pop()?.trim() || b.pickupLocation?.city || 'Origin'
            const dest = b.destination?.split(',').pop()?.trim() || b.dropoffLocation?.city || 'Dest'
            const route = `${origin} → ${dest}`
            if (!acc[route]) acc[route] = { route, shipments: 0, cost: 0, transitDays: [] }
            acc[route].shipments++
            acc[route].cost += calculatePrice(b)

            // Calculate actual transit time from dates
            if (b.deliveredAt && (b.createdAt || b.created_at)) {
                const start = new Date(b.createdAt || b.created_at)
                const end = new Date(b.deliveredAt)
                const days = (end - start) / (1000 * 60 * 60 * 24)
                if (days > 0 && days < 30) acc[route].transitDays.push(days)
            }
            return acc
        }, {})

        return {
            totalSpend,
            totalShipments: bookings.length,
            avgCostPerShip: totalSpend / bookings.length,
            onTimeRate: bookings.length > 0 ? Math.round((delivered.length / bookings.length) * 100) : 0,
            monthlyData: Object.values(monthlyMap).slice(-6),
            cargoTypes: Object.entries(cargoMap).map(([type, count]) => ({
                type, shipments: count, percentage: Math.round((count / bookings.length) * 100)
            })).sort((a, b) => b.shipments - a.shipments),
            topRoutes: Object.values(routeMap)
                .map(r => ({
                    ...r,
                    avgTransit: r.transitDays.length > 0
                        ? (r.transitDays.reduce((a, b) => a + b, 0) / r.transitDays.length).toFixed(1)
                        : null
                }))
                .sort((a, b) => b.shipments - a.shipments).slice(0, 5)
        }
    }, [bookings])

    if (loading) {
        return (
            <div className="space-y-6 pb-6">
                <PageHeader title="Logistics Insights" subtitle="Performance metrics and financial overview" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => <MetricSkeleton key={i} />)}
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-64 animate-pulse" />
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-64 animate-pulse" />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
                <div className="p-4 bg-red-50 rounded-full">
                    <BarChart3 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Analytics Unavailable</h3>
                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6 pb-6">
            <PageHeader
                title="Logistics Insights"
                subtitle="Performance metrics and financial overview"
            />

            {/* Period Filter */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 mr-2">Time Period:</span>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['week', 'month', 'quarter', 'year'].map(p => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide transition-all ${period === p
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Total Spend"
                    value={(derivedStats.totalSpend / 1000).toFixed(0)}
                    unit="K"
                    icon={DollarSign}
                    color="blue"
                    sparklineData={[65, 59, 80, 81, 56, 55, 40]}
                />
                <MetricCard
                    title="Shipment Volume"
                    value={derivedStats.totalShipments}
                    unit="Units"
                    icon={Package}
                    color="green"
                    sparklineData={[28, 48, 40, 19, 86, 27, 90]}
                />
                <MetricCard
                    title="Avg. Cost / Unit"
                    value={(derivedStats.avgCostPerShip / 1000).toFixed(1)}
                    unit="K"
                    icon={TrendingUp}
                    color="indigo"
                    sparklineData={[12, 19, 3, 5, 2, 3]}
                />
                <MetricCard
                    title="On-Time Delivery"
                    value={derivedStats.onTimeRate}
                    unit="%"
                    icon={BarChart3}
                    color="purple"
                    sparklineData={[90, 92, 94, 91, 95, 96, 98]}
                />
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Temporal Trends */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-gray-500" />
                            Monthly Trends
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {derivedStats.monthlyData.map((data, index) => (
                            <div key={index} className="space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-gray-600 uppercase">{data.month}</span>
                                    <span className="text-gray-900">{data.shipments} Units</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${(data.shipments / Math.max(...derivedStats.monthlyData.map(d => d.shipments), 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {derivedStats.monthlyData.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No trend data available</p>}
                    </div>
                </div>

                {/* Cargo Composition */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-gray-500" />
                            Cargo Mix
                        </h3>
                    </div>
                    <div className="space-y-5">
                        {derivedStats.cargoTypes.map((cargo, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-4 border-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                                    {cargo.percentage}%
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-gray-900">{cargo.type}</span>
                                        <span className="text-gray-500">{cargo.shipments} shipments</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div
                                            className="bg-green-500 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${cargo.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {derivedStats.cargoTypes.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No cargo data available</p>}
                    </div>
                </div>
            </div>

            {/* Strategic Routes Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <MapIcon className="w-5 h-5 text-gray-500" />
                        Strategic Routes
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                        Top 5
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3">Route</th>
                                <th className="px-6 py-3">Volume</th>
                                <th className="px-6 py-3">Total Spend</th>
                                <th className="px-6 py-3 text-right">Avg. Transit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {derivedStats.topRoutes.map((route, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {route.route}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {route.shipments} units
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        ₦{(route.cost / 1000).toFixed(1)}K
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold">
                                            <Clock className="w-3 h-3" />
                                            {route.avgTransit ? `${route.avgTransit} Days` : 'N/A'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {derivedStats.topRoutes.length === 0 && (
                        <div className="p-8 text-center text-gray-400 text-sm">No route data available</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(MyAnalytics)
