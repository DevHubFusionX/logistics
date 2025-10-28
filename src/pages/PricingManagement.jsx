import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { DollarSign, Save, History, Users, Calculator, AlertCircle } from 'lucide-react'
import { useToast } from '../components/ui/advanced'
import { useAuth } from '../hooks/useAuth'
import PricingRulesEditor from '../components/pricing/PricingRulesEditor'
import ClientPricingOverrides from '../components/pricing/ClientPricingOverrides'
import PricingSimulator from '../components/pricing/PricingSimulator'
import AuditLog from '../components/pricing/AuditLog'

export default function PricingManagement() {
  const [activeTab, setActiveTab] = useState('global')
  const { showToast, ToastContainer } = useToast()
  const { user } = useAuth()

  const canEdit = ['Super Admin', 'Finance'].includes(user?.role)

  const tabs = [
    { id: 'global', label: 'Global Pricing', icon: DollarSign },
    { id: 'clients', label: 'Client Overrides', icon: Users },
    { id: 'simulator', label: 'Price Calculator', icon: Calculator },
    { id: 'audit', label: 'Audit Log', icon: History }
  ]

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Pricing Management"
        subtitle="Configure pricing rules, client-specific rates, and view pricing history"
      />

      {!canEdit && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900">View Only Access</p>
            <p className="text-sm text-yellow-700">You don't have permission to edit pricing. Contact Super Admin or Finance Officer.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'global' && <PricingRulesEditor canEdit={canEdit} showToast={showToast} />}
          {activeTab === 'clients' && <ClientPricingOverrides canEdit={canEdit} showToast={showToast} />}
          {activeTab === 'simulator' && <PricingSimulator />}
          {activeTab === 'audit' && <AuditLog />}
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
