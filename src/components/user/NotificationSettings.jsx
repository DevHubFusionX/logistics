import { useState } from 'react'
import { Bell, Mail, MessageSquare, Truck, Shield, Zap, Smartphone } from 'lucide-react'

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    shipmentUpdates: true,
    orderConfirmations: true,
    promotions: false,
    weeklyReports: true
  })

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const NotificationToggle = ({ label, description, enabled, onToggle, icon: Icon }) => (
    <div className="flex items-center justify-between p-5 bg-gray-50/50 rounded-[1.5rem] border border-gray-100 group hover:border-blue-100 hover:bg-white transition-all duration-300">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`p-2 rounded-xl transition-colors ${enabled ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-black text-gray-900 leading-none">{label}</p>
          <p className="text-[10px] font-bold text-gray-400 mt-1.5 leading-tight">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${enabled ? 'bg-blue-600' : 'bg-gray-200'
          }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
      </button>
    </div>
  )

  return (
    <div className="divide-y divide-gray-100">
      {/* Channels Section */}
      <div className="p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-8">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Communication Channels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NotificationToggle
            label="Email Dispatch"
            description="Authoritative updates via enterprise email."
            enabled={settings.emailNotifications}
            onToggle={() => toggleSetting('emailNotifications')}
            icon={Mail}
          />
          <NotificationToggle
            label="Real-time Push"
            description="Browser-level system notifications."
            enabled={settings.pushNotifications}
            onToggle={() => toggleSetting('pushNotifications')}
            icon={Bell}
          />
          <NotificationToggle
            label="Secure SMS"
            description="Critical alerts via mobile network."
            enabled={settings.smsNotifications}
            onToggle={() => toggleSetting('smsNotifications')}
            icon={MessageSquare}
          />
        </div>
      </div>

      {/* Intelligence Section */}
      <div className="p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-8">
          <Truck className="w-5 h-5 text-indigo-600" />
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Operational Intelligence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NotificationToggle
            label="Logistics Heartbeat"
            description="Status changes in the supply chain."
            enabled={settings.shipmentUpdates}
            onToggle={() => toggleSetting('shipmentUpdates')}
            icon={Truck}
          />
          <NotificationToggle
            label="System Audit"
            description="Confirmations for all fiscal events."
            enabled={settings.orderConfirmations}
            onToggle={() => toggleSetting('orderConfirmations')}
            icon={Shield}
          />
          <NotificationToggle
            label="Analytic Digests"
            description="Weekly performance synchronization."
            enabled={settings.weeklyReports}
            onToggle={() => toggleSetting('weeklyReports')}
            icon={Zap}
          />
        </div>
      </div>
    </div>
  )
}
