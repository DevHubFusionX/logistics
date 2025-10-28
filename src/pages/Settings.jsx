import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { useToast } from '../components/ui/advanced'
import { Settings as SettingsIcon, Thermometer, Plug, Bell, FileText } from 'lucide-react'
import SystemSettings from '../components/settings/SystemSettings'
import TemperatureThresholds from '../components/settings/TemperatureThresholds'
import IntegrationsSettings from '../components/settings/IntegrationsSettings'
import NotificationsSettings from '../components/settings/NotificationsSettings'
import AuditLogs from '../components/settings/AuditLogs'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('system')
  const { showToast, ToastContainer } = useToast()

  const handleSave = (section) => {
    showToast.success(`${section} settings saved successfully`)
  }

  const tabs = [
    { id: 'system', label: 'System', icon: SettingsIcon },
    { id: 'temperature', label: 'Temperature', icon: Thermometer },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'audit', label: 'Audit Logs', icon: FileText }
  ]

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Settings & Configuration"
        subtitle="System preferences, integrations, and audit logs management"
      />

      <div className="bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div>
        {activeTab === 'system' && <SystemSettings onSave={() => handleSave('System')} />}
        {activeTab === 'temperature' && <TemperatureThresholds onSave={() => handleSave('Temperature')} />}
        {activeTab === 'integrations' && <IntegrationsSettings onSave={() => handleSave('Integration')} />}
        {activeTab === 'notifications' && <NotificationsSettings onSave={() => handleSave('Notification')} />}
        {activeTab === 'audit' && <AuditLogs />}
      </div>

      <ToastContainer />
    </div>
  )
}
