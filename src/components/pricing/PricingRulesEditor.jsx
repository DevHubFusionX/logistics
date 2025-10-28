import { useState, useEffect } from 'react'
import { Save, RotateCcw, Clock } from 'lucide-react'
import { getPricingRules, updatePricingRules } from '../../utils/pricingEngine'

export default function PricingRulesEditor({ canEdit, showToast }) {
  const [rules, setRules] = useState(getPricingRules())
  const [hasChanges, setHasChanges] = useState(false)
  
  useEffect(() => {
    setRules(getPricingRules())
  }, [])

  const handleChange = (field, value) => {
    if (!canEdit) return
    setRules(prev => ({ ...prev, [field]: parseFloat(value) || value }))
    setHasChanges(true)
  }

  const handleMultiplierChange = (service, value) => {
    if (!canEdit) return
    setRules(prev => ({
      ...prev,
      serviceMultipliers: { ...prev.serviceMultipliers, [service]: parseFloat(value) }
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    const updatedRules = updatePricingRules(rules, 'admin@daraexpress.com')
    setRules(updatedRules)
    setHasChanges(false)
    showToast.success('Pricing rules updated', 'Changes will apply to new bookings immediately')
  }

  const handleReset = () => {
    setRules(getPricingRules())
    setHasChanges(false)
    showToast.info('Changes discarded', 'Pricing rules reset')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Global Pricing Rules</h3>
          <p className="text-sm text-gray-600 mt-1">Configure default pricing for all shipments</p>
        </div>
        {canEdit && hasChanges && (
          <div className="flex gap-2">
            <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Base Rate per Kg</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                value={rules.baseRatePerKg}
                onChange={(e) => handleChange('baseRatePerKg', e.target.value)}
                disabled={!canEdit}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Rate (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={rules.insuranceRate * 100}
                onChange={(e) => handleChange('insuranceRate', e.target.value / 100)}
                disabled={!canEdit}
                className="w-full pr-8 pl-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Handling Fee</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                step="1"
                value={rules.handlingFee}
                onChange={(e) => handleChange('handlingFee', e.target.value)}
                disabled={!canEdit}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                value={rules.taxRate * 100}
                onChange={(e) => handleChange('taxRate', e.target.value / 100)}
                disabled={!canEdit}
                className="w-full pr-8 pl-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Service Type Multipliers</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Standard</span>
                <input
                  type="number"
                  step="0.1"
                  value={rules.serviceMultipliers.standard}
                  onChange={(e) => handleMultiplierChange('standard', e.target.value)}
                  disabled={!canEdit}
                  className="w-20 px-3 py-1.5 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Express</span>
                <input
                  type="number"
                  step="0.1"
                  value={rules.serviceMultipliers.express}
                  onChange={(e) => handleMultiplierChange('express', e.target.value)}
                  disabled={!canEdit}
                  className="w-20 px-3 py-1.5 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Overnight</span>
                <input
                  type="number"
                  step="0.1"
                  value={rules.serviceMultipliers.overnight}
                  onChange={(e) => handleMultiplierChange('overnight', e.target.value)}
                  disabled={!canEdit}
                  className="w-20 px-3 py-1.5 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">Last Updated</span>
            </div>
            <p className="text-xs text-blue-600">By: {rules.lastUpdatedBy}</p>
            <p className="text-xs text-blue-600">On: {rules.lastUpdatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
