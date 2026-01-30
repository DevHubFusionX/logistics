import { useState } from 'react'
import { User as UserIcon, Bell, Lock, CreditCard, ChevronRight, Settings } from 'lucide-react'
import ProfileSection from '../../components/user/ProfileSection'
import SecuritySection from '../../components/user/SecuritySection'
import NotificationSettings from '../../components/user/NotificationSettings'
import BillingSection from '../../components/user/BillingSection'
import { PageHeader } from '../../components/dashboard/index'

const tabs = [
  { id: 'profile', label: 'Identity & Profile', icon: UserIcon, description: 'Manage your personal and business data' },
  { id: 'security', label: 'Security & Privacy', icon: Lock, description: 'Secure your account and authentication' },
  { id: 'notifications', label: 'Preferences', icon: Bell, description: 'Configure alerts and updates' },
  { id: 'billing', label: 'Payments & Billing', icon: CreditCard, description: 'Manage methods and history' }
]

export default function User() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        title="Account Configuration"
        subtitle="Manage your global identity, security protocols, and system preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-3 sticky top-24">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-gray-100 p-3 shadow-sm">
            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 group ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-100'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 text-gray-400 group-hover:text-blue-600'
                    }`}>
                    <tab.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${activeTab === tab.id ? 'text-white' : 'text-gray-900'}`}>
                      {tab.label}
                    </p>
                    <p className={`text-[10px] font-medium leading-tight mt-0.5 line-clamp-1 ${activeTab === tab.id ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                      {tab.description}
                    </p>
                  </div>
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4 text-blue-100 self-center" />}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border border-indigo-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-4">
                <Settings className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="text-sm font-black text-indigo-900">Need Enterprise Help?</h4>
              <p className="text-[11px] font-bold text-indigo-600/70 mt-1 leading-relaxed">Contact your dedicated account officer for premium support.</p>
              <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md">
                Get Support
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 xl:col-span-9 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            {activeTab === 'profile' && <ProfileSection />}
            {activeTab === 'security' && <SecuritySection />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'billing' && <BillingSection />}
          </div>
        </div>
      </div>
    </div>
  )
}
