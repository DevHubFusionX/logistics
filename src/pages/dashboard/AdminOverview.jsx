import { memo, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import KPICard from '../../components/dashboard/widgets/KPICard'
import { KPI_DATA } from '../../constants/mockData'
import { 
    useFleetQuery, 
    useMoneyAnalyticsQuery,
    useOrderAnalyticsQuery,
    useTruckAnalyticsQuery
} from '../../hooks/queries/useAdminQueries'
import { Loader2 } from 'lucide-react'

function AdminOverview() {
    const { data: fleetResponse, isLoading: isFleetLoading } = useFleetQuery()
    const { data: moneyData, isLoading: isMoneyLoading } = useMoneyAnalyticsQuery()
    const { data: orderData, isLoading: isOrderLoading } = useOrderAnalyticsQuery()
    const { data: truckData, isLoading: isTruckLoading } = useTruckAnalyticsQuery()

    // Debug logs for UI verification
    console.log('[Dashboard] Money Analytics Response:', moneyData)
    console.log('[Dashboard] Order Analytics Response:', orderData)
    console.log('[Dashboard] Truck Analytics Response:', truckData)

    const isLoading = isFleetLoading || isMoneyLoading || isOrderLoading || isTruckLoading
    const fleetCount = fleetResponse?.total || 0

    // Merge real data into KPI_DATA templates
    const dynamicKPIs = useMemo(() => {
        return KPI_DATA.map(kpi => {
            const updatedKpi = { ...kpi, change: 0, sparklineData: [] }

            // Sync Fleet Count (Total Records from API)
            if (kpi.id === 'fleet_map') {
                updatedKpi.value = `${fleetCount} Trucks`
            }

            // Sync Financial Metrics (Prioritizing Order Analytics as per user request)
            const orders = orderData || {}
            const money = moneyData || {}
            
            // Financial Metrics from Order Analytics
            if (kpi.id === 'revenue_this_month') updatedKpi.value = `₦${(orders.netRevenueMTD || 0).toLocaleString()}`
            if (kpi.id === 'revenue_last_week') updatedKpi.value = `₦${(orders.netRevenueWTD || 0).toLocaleString()}`
            if (kpi.id === 'revenue_this_year') updatedKpi.value = `₦${(orders.netRevenueYTD || 0).toLocaleString()}`
            if (kpi.id === 'total_gmv') updatedKpi.value = `₦${(orders.totalGMV || 0).toLocaleString()}`
            
            // Fallbacks for financial metrics not in new endpoint
            if (kpi.id === 'revenue_last_month' && !updatedKpi.value) {
                updatedKpi.value = `₦${(money.netRevenueLastMonth || 0).toLocaleString()}`
            }

            // Sync Booking Metrics
            if (kpi.id === 'booking_mtd') updatedKpi.value = String(orders.orderCountMTD || orders.bookingCountMTD || 0)
            if (kpi.id === 'booking_ytd') updatedKpi.value = String(orders.orderCountYTD || orders.bookingCountYTD || 0)
            if (kpi.id === 'total_bookings') updatedKpi.value = String(orders.totalOrders || orders.totalBookings || 0)

            // Sync Operational Metrics
            const trucks = truckData || {}
            if (kpi.id === 'completed_trips') updatedKpi.value = String(orders.fulfilledCount || orders.totalDelivered || 0)
            if (kpi.id === 'pending_trips') updatedKpi.value = String(orders.unfulfilledCount || (orders.totalProcessing || 0) + (orders.totalInTransit || 0))
            if (kpi.id === 'active_drivers') updatedKpi.value = String(trucks.activeDrivers || orders.activeDrivers || 0)
            if (kpi.id === 'ontime_rate') updatedKpi.value = `${orders.fulfillmentRate || orders.onTimeRate || 0}%`

            // Sync Truck Analytics
            if (kpi.id === 'fleet_map') updatedKpi.value = `${trucks.totalTrucks || fleetCount} Trucks`
            if (kpi.id === 'fleet_health') {
                const healthPct = trucks.fleetHealth || trucks.operationalRate || (trucks.activeTrucks && trucks.totalTrucks ? Math.round((trucks.activeTrucks / trucks.totalTrucks) * 100) : 100)
                updatedKpi.value = `${healthPct}%`
            }

            return updatedKpi
        })
    }, [fleetCount, moneyData, orderData, truckData])

    const hasData = moneyData || orderData || truckData || fleetCount > 0

    if (isLoading && !hasData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-gray-500 animate-pulse font-medium">Fetching real-time metrics...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 pb-8 px-4">
            <PageHeader
                title="Admin Overview"
                subtitle="Real-time performance and financial metrics"
            />

            <div className="space-y-8">
                {/* Financial Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Financial Performance</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                        {dynamicKPIs.filter(kpi => 
                            (kpi.id.includes('revenue') || kpi.id.includes('gmv')) && 
                            !['revenue_last_month', 'revenue_last_week'].includes(kpi.id)
                        ).map((kpi) => (
                            <KPICard key={kpi.id} {...kpi} />
                        ))}
                    </div>
                </section>

                {/* Operations Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Operations & Logistics</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dynamicKPIs.filter(kpi => kpi.id.includes('trip') || kpi.id.includes('fleet') || kpi.id.includes('booking')).map((kpi) => (
                            <KPICard key={kpi.id} {...kpi} />
                        ))}
                    </div>
                </section>

                {/* Performance Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Performance & Health</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dynamicKPIs.filter(kpi => !kpi.id.includes('revenue') && !kpi.id.includes('gmv') && !kpi.id.includes('trip') && !kpi.id.includes('fleet')).map((kpi) => (
                            <KPICard key={kpi.id} {...kpi} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default memo(AdminOverview)
