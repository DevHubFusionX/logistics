import { useState } from 'react'
import { User as UserIcon, Bell, Lock, CreditCard } from 'lucide-react'
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
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your profile, security, and preferences</p>
        </div>
      </div>

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
        {activeTab === 'profile' && <ProfileSection />}
        {activeTab === 'security' && <SecuritySection />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'billing' && <BillingSection />}
      </div>
    </div>
  )
}
