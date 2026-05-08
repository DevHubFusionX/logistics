import { useState, useEffect } from 'react'
import { Save, RotateCcw, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react'
import { usePricingRulesQuery, useAdminMutations } from '../../hooks/queries/useAdminQueries'
import pricingService from '../../services/pricingService'
import toast from 'react-hot-toast'

export default function PricingRulesEditor({ canEdit, showToast }) {
  const { data: pricingData, isLoading, isError, refetch } = usePricingRulesQuery()
  const [configs, setConfigs] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (pricingData?.configs) {
      setConfigs(pricingData.configs)
    }
  }, [pricingData])

  const handleEdit = (config) => {
    if (!canEdit) return
    setEditingId(config.id)
    setEditForm({
      base_price: config.basePrice,
      price_per_kg: config.pricePerKg,
      price_per_km: config.pricePerKm,
      is_active: config.isActive
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleSave = async (id) => {
    if (!canEdit) return
    setSaving(true)
    try {
      await pricingService.updatePricingConfig(id, editForm)
      toast.success('Pricing updated successfully')
      setEditingId(null)
      setEditForm({})
      refetch()
    } catch (error) {
      toast.error(error.message || 'Failed to update pricing')
    } finally {
      setSaving(false)
    }
  }

  const formatCurrency = (value) => {
    return `₦${Number(value).toLocaleString()}`
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 text-sm">Loading pricing configurations...</p>
      </div>
    )
  }

  if (isError || !configs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <div>
          <h4 className="text-gray-900 font-semibold">Failed to load pricing</h4>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">Could not retrieve pricing configurations from the server.</p>
        </div>
        <button onClick={() => refetch()} className="text-blue-600 font-medium text-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    )
  }

  // Group configs by category
  const standardConfigs = configs.filter(c =>
    ['standard', 'express', 'priority', 'economy'].includes(c.serviceType?.toLowerCase())
  )
  const truckConfigs = configs.filter(c =>
    c.serviceType?.toLowerCase().includes('tons')
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Service Pricing Configurations</h3>
          <p className="text-sm text-gray-600 mt-1">
            Configure pricing for each service type. All prices are in Nigerian Naira (₦)
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          title="Refresh pricing data"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Standard Delivery Services */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Standard Delivery Services
        </h4>
        <div className="grid gap-4">
          {standardConfigs.map(config => (
            <PricingCard
              key={config.id}
              config={config}
              isEditing={editingId === config.id}
              editForm={editForm}
              setEditForm={setEditForm}
              canEdit={canEdit}
              saving={saving}
              onEdit={() => handleEdit(config)}
              onSave={() => handleSave(config.id)}
              onCancel={handleCancel}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      </div>

      {/* Truck/Freight Services */}
      {truckConfigs.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Freight & Truck Services
          </h4>
          <div className="grid gap-4">
            {truckConfigs.map(config => (
              <PricingCard
                key={config.id}
                config={config}
                isEditing={editingId === config.id}
                editForm={editForm}
                setEditForm={setEditForm}
                canEdit={canEdit}
                saving={saving}
                onEdit={() => handleEdit(config)}
                onSave={() => handleSave(config.id)}
                onCancel={handleCancel}
                formatCurrency={formatCurrency}
                variant="freight"
              />
            ))}
          </div>
        </div>
      )}

      {/* Currency Note */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-emerald-900">Nigerian Naira (₦) Pricing</p>
          <p className="text-sm text-emerald-700">
            All prices are configured in Naira. Prices are automatically calculated based on: Base Price + (Price per KG × Weight) + (Price per KM × Distance)
          </p>
        </div>
      </div>
    </div>
  )
}

function PricingCard({
  config,
  isEditing,
  editForm,
  setEditForm,
  canEdit,
  saving,
  onEdit,
  onSave,
  onCancel,
  formatCurrency,
  variant = 'standard'
}) {
  const bgClass = variant === 'freight'
    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100'
    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'

  const badgeClass = config.isActive
    ? 'bg-green-100 text-green-700'
    : 'bg-gray-100 text-gray-500'

  return (
    <div className={`border rounded-xl p-5 ${bgClass} transition-all hover:shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h5 className="text-lg font-bold text-gray-900 capitalize">{config.serviceType}</h5>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeClass}`}>
            {config.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        {canEdit && !isEditing && (
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Base Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₦</span>
                <input
                  type="number"
                  value={editForm.base_price}
                  onChange={(e) => setEditForm(prev => ({ ...prev, base_price: parseFloat(e.target.value) || 0 }))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Price per KG</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₦</span>
                <input
                  type="number"
                  value={editForm.price_per_kg}
                  onChange={(e) => setEditForm(prev => ({ ...prev, price_per_kg: parseFloat(e.target.value) || 0 }))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Price per KM</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₦</span>
                <input
                  type="number"
                  value={editForm.price_per_km}
                  onChange={(e) => setEditForm(prev => ({ ...prev, price_per_km: parseFloat(e.target.value) || 0 }))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editForm.is_active}
                onChange={(e) => setEditForm(prev => ({ ...prev, is_active: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={onSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={onCancel}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Base Price</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(config.basePrice)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Per KG</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(config.pricePerKg)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Per KM</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(config.pricePerKm)}</p>
          </div>
        </div>
      )}
    </div>
  )
}
