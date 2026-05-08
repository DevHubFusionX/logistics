import { useState, useMemo } from 'react'
import { Plus, Edit2, Trash2, Search, X, AlertCircle, RefreshCw } from 'lucide-react'
import { useClientOverridesQuery, useAdminMutations } from '../../hooks/queries/useAdminQueries'

export default function ClientPricingOverrides({ canEdit, showToast }) {
  const { data: clients = [], isLoading, isError, refetch } = useClientOverridesQuery()
  const { manageClientOverride } = useAdminMutations()

  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [formData, setFormData] = useState({ name: '', baseRateOverride: '', discount: '', currency: 'NGN' })

  const filteredClients = useMemo(() => {
    return clients.filter(c => (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()))
  }, [clients, searchTerm])

  const handleEdit = (client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      baseRateOverride: client.baseRatePerKg,
      discount: client.discount * 100,
      currency: client.currency
    })
    setShowModal(true)
  }

  const handleDelete = (clientId) => {
    if (window.confirm('Are you sure you want to remove this pricing override?')) {
      manageClientOverride.mutate({ action: 'delete', id: clientId }, {
        onSuccess: () => {
          showToast.success('Override removed', 'Client pricing reset to global rules')
        }
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const clientData = {
      name: formData.name,
      baseRatePerKg: parseFloat(formData.baseRateOverride),
      discount: parseFloat(formData.discount) / 100,
      currency: formData.currency
    }

    const action = editingClient ? 'update' : 'add'
    const id = editingClient?.id

    manageClientOverride.mutate({ action, id, data: clientData }, {
      onSuccess: () => {
        showToast.success(
          editingClient ? 'Override updated' : 'Override created',
          editingClient ? `Pricing updated for ${formData.name}` : `Custom pricing set for ${formData.name}`
        )
        setShowModal(false)
        setEditingClient(null)
        setFormData({ name: '', baseRateOverride: '', discount: '', currency: 'NGN' })
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 text-sm">Fetching client overrides...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <h4 className="text-gray-900 font-semibold">Failed to load overrides</h4>
        <button onClick={() => refetch()} className="text-blue-600 font-medium text-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Client-Specific Pricing</h3>
          <p className="text-sm text-gray-600 mt-1">Override global pricing for key clients</p>
        </div>
        {canEdit && (
          <button
            onClick={() => {
              setEditingClient(null)
              setFormData({ name: '', baseRateOverride: '', discount: '', currency: 'NGN' })
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Override
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 font-medium"
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Base Rate/Kg</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Currency</th>
              {canEdit && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={canEdit ? 5 : 4} className="px-6 py-12 text-center text-gray-500 italic">
                  No overrides found Matching your search.
                </td>
              </tr>
            ) : (
              filteredClients.map(client => (
                <tr key={client.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{client.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">₦{client.baseRatePerKg?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-green-700 font-bold">{(client.discount * 100).toFixed(0)}%</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{client.currency}</td>
                  {canEdit && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(client)}
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                          title="Edit override"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-transparent hover:border-red-200"
                          title="Remove override"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {editingClient ? 'Edit' : 'Add'} Pricing Override
                </h3>
                <p className="text-xs text-gray-500 mt-1">Configure custom rates for specific client accounts</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Client Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    placeholder="e.g. Acme Corp"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Base Rate/Kg (₦)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.baseRateOverride}
                      onChange={(e) => setFormData({ ...formData, baseRateOverride: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Discount (%)</label>
                    <input
                      type="number"
                      step="1"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold appearance-none bg-no-repeat bg-[right_1rem_center]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")' }}
                  >
                    <option value="NGN">NGN - Nigerian Naira</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-6 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={manageClientOverride.isPending}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold shadow-lg shadow-blue-200 disabled:opacity-50"
                >
                  {manageClientOverride.isPending ? 'Processing...' : (editingClient ? 'Update Override' : 'Create Override')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
