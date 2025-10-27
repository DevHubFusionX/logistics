import { useState } from 'react'
import { User as UserIcon, Shield, Bell, Lock, CreditCard, Globe } from 'lucide-react'
import ProfileSection from '../components/user/ProfileSection'
import SecuritySection from '../components/user/SecuritySection'
import NotificationSettings from '../components/user/NotificationSettings'
import BillingSection from '../components/user/BillingSection'

const tabs = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard }
]

export default function User() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Account Settings</h1>
          <p className="text-sm text-gray-600 truncate">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'profile' && <ProfileSection />}
        {activeTab === 'security' && <SecuritySection />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'billing' && <BillingSection />}
      </div>
    </div>
  )
}
