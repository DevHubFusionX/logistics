import { useState } from 'react'
import { PageHeader } from '../components/dashboard/index'
import { AlertTriangle, Settings, Bell } from 'lucide-react'
import AlertsDashboard from '../components/alerts/AlertsDashboard'
import AlertRulesForm from '../components/alerts/AlertRulesForm'
import NotificationTemplates from '../components/alerts/NotificationTemplates'
import { useToast, MetricCard } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'

export default function Alerts() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showRuleForm, setShowRuleForm] = useState(false)
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => showToast.info('Use Ctrl+N to create new alert rule'),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const handleSaveRule = (rule) => {
    console.log('Save rule:', rule)
    showToast.success('Alert rule created successfully', 'Rule Active')
    setShowRuleForm(false)
  }

  return (
    <>
      <PageHeader
        title="Alerts & Notifications"
        subtitle="Manage system alerts, rules, and notification templates"
      />
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Active Alerts
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'rules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Alert Rules
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Bell className="w-4 h-4 inline mr-2" />
                Notifications
              </button>
            </nav>
          </div>
        </div>

        {/* Alert Metrics */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <MetricCard
              title="Critical Alerts"
              value={3}
              change={-25}
              trend="down"
              sparklineData={[8, 6, 4, 5, 3, 2, 3]}
              detail="25% decrease from yesterday"
              colorblindSafe={true}
            />
            <MetricCard
              title="Active Rules"
              value={12}
              change={15}
              trend="up"
              sparklineData={[8, 9, 10, 11, 12, 12, 12]}
              detail="3 new rules added this week"
            />
            <MetricCard
              title="Avg Response Time"
              value="4.2"
              unit="min"
              change={-10}
              trend="down"
              sparklineData={[6, 5.5, 5, 4.8, 4.5, 4.3, 4.2]}
              detail="10% faster response time"
            />
            <MetricCard
              title="Resolution Rate"
              value={94}
              unit="%"
              change={5}
              trend="up"
              sparklineData={[88, 90, 91, 92, 93, 94, 94]}
              detail="5% improvement this month"
            />
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <AlertsDashboard onCreateRule={() => setShowRuleForm(true)} />
        )}

        {activeTab === 'rules' && (
          <div className="space-y-6">
            {showRuleForm ? (
              <AlertRulesForm
                onSave={handleSaveRule}
                onCancel={() => setShowRuleForm(false)}
              />
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Alert Rules</h3>
                <p className="text-gray-600 mb-6">Create automated rules for system monitoring</p>
                <button
                  onClick={() => setShowRuleForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create First Rule
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'templates' && <NotificationTemplates />}
      </div>

      <ToastContainer />
    </>
  )
}