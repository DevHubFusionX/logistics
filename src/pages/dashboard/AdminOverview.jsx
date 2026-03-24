import { memo } from 'react'
import { PageHeader } from '../../components/dashboard'
import KPICard from '../../components/dashboard/widgets/KPICard'
import { Loader2 } from 'lucide-react'
import { useDashboardSummaryQuery } from '../../hooks/queries/useDashboardQueries'

function AdminOverview() {
    const { data: dashboardData, isLoading } = useDashboardSummaryQuery()

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-gray-500 font-medium">Loading dashboard metrics...</p>
            </div>
        )
    }

    const kpis = dashboardData?.kpis || []

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
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {kpis.filter(kpi => kpi.id.includes('revenue') || kpi.id.includes('gmv')).map((kpi) => (
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
                        {kpis.filter(kpi => kpi.id.includes('trip') || kpi.id.includes('fleet')).map((kpi) => (
                            <KPICard key={kpi.id} {...kpi} />
                        ))}
                    </div>
                </section>

                {/* Fleet Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Performance & Health</h2>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {kpis.filter(kpi => !kpi.id.includes('revenue') && !kpi.id.includes('gmv') && !kpi.id.includes('trip') && !kpi.id.includes('fleet')).map((kpi) => (
                            <KPICard key={kpi.id} {...kpi} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default memo(AdminOverview)
