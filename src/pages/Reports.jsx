import { useState } from 'react'
import { AppLayout, PageHeader } from '../components/dashboard/index'
import { BarChart3, Settings } from 'lucide-react'
import PrebuiltReports from '../components/reports/PrebuiltReports'
import CustomReportBuilder from '../components/reports/CustomReportBuilder'
import ExportModal from '../components/reports/ExportModal'
import ScheduleModal from '../components/reports/ScheduleModal'
import { Chart, MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'

export default function Reports() {
  const [activeTab, setActiveTab] = useState('prebuilt')
  const [selectedDimensions, setSelectedDimensions] = useState([])
  const [selectedMeasures, setSelectedMeasures] = useState([])
  const [showExportModal, setShowExportModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => showToast.info('Press Ctrl+R to create new report'),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload(),
    onExport: () => setShowExportModal(true)
  })

  const handleDimensionToggle = (dimension) => {
    setSelectedDimensions(prev => 
      prev.includes(dimension) 
        ? prev.filter(d => d !== dimension)
        : [...prev, dimension]
    )
  }

  const handleMeasureToggle = (measure) => {
    setSelectedMeasures(prev => 
      prev.includes(measure) 
        ? prev.filter(m => m !== measure)
        : [...prev, measure]
    )
  }

  return (
    <AppLayout>
      <PageHeader 
        title="Analytics & Reports" 
        subtitle="Generate insights and export data for business intelligence"
      />
      
      {/* Tab Navigation */}
      <div className="mb-4 sm:mb-6">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
            <button
              onClick={() => setActiveTab('prebuilt')}
              className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === 'prebuilt'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-1 sm:mr-2" />
              <span>Prebuilt Reports</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === 'custom'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-1 sm:mr-2" />
              <span>Custom Builder</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Report Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <MetricCard 
          title="Reports Generated"
          value={156}
          change={23}
          trend="up"
          sparklineData={[120, 130, 140, 145, 150, 155, 156]}
          detail="23% increase this month"
        />
        <MetricCard 
          title="Scheduled Reports"
          value={8}
          change={0}
          trend="neutral"
          sparklineData={[8, 8, 7, 8, 8, 8, 8]}
          detail="No change from last period"
        />
        <MetricCard 
          title="Export Downloads"
          value={89}
          change={15}
          trend="up"
          sparklineData={[70, 75, 80, 82, 85, 87, 89]}
          detail="15% more downloads"
        />
        <MetricCard 
          title="Custom Views"
          value={12}
          change={20}
          trend="up"
          sparklineData={[8, 9, 10, 10, 11, 12, 12]}
          detail="4 new custom views created"
        />
      </div>

      {/* Sample Charts */}
      {activeTab === 'prebuilt' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <Chart 
            type="bar"
            data={[
              { label: 'Jan', value: 120 },
              { label: 'Feb', value: 150 },
              { label: 'Mar', value: 180 },
              { label: 'Apr', value: 160 },
              { label: 'May', value: 200 },
              { label: 'Jun', value: 220 }
            ]}
            colorblindSafe={true}
          />
          <Chart 
            type="donut"
            data={[
              { label: 'Delivered', value: 65 },
              { label: 'In Transit', value: 25 },
              { label: 'Delayed', value: 8 },
              { label: 'Pending', value: 2 }
            ]}
            size={300}
            colorblindSafe={true}
          />
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'prebuilt' && (
        <PrebuiltReports 
          onExport={() => {
            setShowExportModal(true)
            showToast.info('Export dialog opened')
          }}
          onSchedule={() => {
            setShowScheduleModal(true)
            showToast.info('Schedule dialog opened')
          }}
        />
      )}

      {activeTab === 'custom' && (
        <CustomReportBuilder 
          selectedDimensions={selectedDimensions}
          selectedMeasures={selectedMeasures}
          onDimensionToggle={handleDimensionToggle}
          onMeasureToggle={handleMeasureToggle}
        />
      )}

      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      <ScheduleModal 
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
      
      <ToastContainer />
    </AppLayout>
  )
}