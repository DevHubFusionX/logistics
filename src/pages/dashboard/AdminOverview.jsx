import { memo, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import KPICard from '../../components/dashboard/widgets/KPICard'
import { KPI_DATA } from '../../constants/mockData'
import { useOrderAnalyticsQuery } from '../../hooks/queries/useAdminQueries'
import { Loader2 } from 'lucide-react'

function AdminOverview() {
    const { data: orderData, isLoading } = useOrderAnalyticsQuery()

    // Debug log for UI verification
    console.log('[Dashboard] Order Analytics Response:', orderData)

    // Merge real data into KPI_DATA templates
    const dynamicKPIs = useMemo(() => {
        const orders = orderData || {}

        return KPI_DATA.map(kpi => {
            const updatedKpi = { ...kpi, change: 0, sparklineData: [] }

            // Financial Metrics
            if (kpi.id === 'revenue_this_month') updatedKpi.value = `₦${(orders.netRevenueMTD || 0).toLocaleString()}`
            if (kpi.id === 'revenue_this_year') updatedKpi.value = `₦${(orders.netRevenueYTD || 0).toLocaleString()}`
            if (kpi.id === 'total_gmv') updatedKpi.value = `₦${(orders.totalGMV || 0).toLocaleString()}`

            // Booking Metrics
            if (kpi.id === 'booking_mtd') updatedKpi.value = String(orders.orderCountMTD || 0)
            if (kpi.id === 'booking_ytd') updatedKpi.value = String(orders.orderCountYTD || 0)
            if (kpi.id === 'total_bookings') updatedKpi.value = String(orders.totalOrders || 0)

            // Operational Metrics
            if (kpi.id === 'completed_trips') updatedKpi.value = String(orders.fulfilledCount || 0)
            if (kpi.id === 'pending_trips') updatedKpi.value = String(orders.unfulfilledCount || 0)
            if (kpi.id === 'ontime_rate') updatedKpi.value = `${orders.fulfillmentRate || 0}%`

            // Static values (not in order-analytics endpoint)
            if (kpi.id === 'active_drivers') updatedKpi.value = '32'
            if (kpi.id === 'fleet_map') updatedKpi.value = '5 Trucks'
            if (kpi.id === 'fleet_health') updatedKpi.value = '100%'

            return updatedKpi
        })
    }, [orderData])

    if (isLoading && !orderData) {
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
