import { useState } from 'react'
import { Bell, Mail, MessageSquare, Truck } from 'lucide-react'

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

  const NotificationToggle = ({ label, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notification Channels</h3>
        </div>
        <div className="space-y-3">
          <NotificationToggle
            label="Email Notifications"
            description="Receive notifications via email"
            enabled={settings.emailNotifications}
            onToggle={() => toggleSetting('emailNotifications')}
          />
          <NotificationToggle
            label="Push Notifications"
            description="Receive push notifications in browser"
            enabled={settings.pushNotifications}
            onToggle={() => toggleSetting('pushNotifications')}
          />
          <NotificationToggle
            label="SMS Notifications"
            description="Receive text messages for important updates"
            enabled={settings.smsNotifications}
            onToggle={() => toggleSetting('smsNotifications')}
          />
        </div>
      </div>

      {/* Notification Types */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Truck className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notification Types</h3>
        </div>
        <div className="space-y-3">
          <NotificationToggle
            label="Shipment Updates"
            description="Get notified about shipment status changes"
            enabled={settings.shipmentUpdates}
            onToggle={() => toggleSetting('shipmentUpdates')}
          />
          <NotificationToggle
            label="Order Confirmations"
            description="Receive confirmations for new orders"
            enabled={settings.orderConfirmations}
            onToggle={() => toggleSetting('orderConfirmations')}
          />
          <NotificationToggle
            label="Promotions & Offers"
            description="Get updates about special offers and promotions"
            enabled={settings.promotions}
            onToggle={() => toggleSetting('promotions')}
          />
          <NotificationToggle
            label="Weekly Reports"
            description="Receive weekly summary of your activities"
            enabled={settings.weeklyReports}
            onToggle={() => toggleSetting('weeklyReports')}
          />
        </div>
      </div>
    </div>
  )
}
