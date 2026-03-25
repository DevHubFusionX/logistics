import { memo } from 'react'
import { PageHeader } from '../../components/dashboard'
import KPICard from '../../components/dashboard/widgets/KPICard'
import { KPI_DATA } from '../../constants/mockData'

function AdminOverview() {
    // Slice or group the KPI data as needed, here we show all 12
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
                        {KPI_DATA.filter(kpi => kpi.id.includes('revenue') || kpi.id.includes('gmv')).map((kpi) => (
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
                        {KPI_DATA.filter(kpi => kpi.id.includes('trip') || kpi.id.includes('fleet')).map((kpi) => (
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
                        {KPI_DATA.filter(kpi => !kpi.id.includes('revenue') && !kpi.id.includes('gmv') && !kpi.id.includes('trip') && !kpi.id.includes('fleet')).map((kpi) => (
                            <KPICard key={kpi.id} {...kpi} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default memo(AdminOverview)
