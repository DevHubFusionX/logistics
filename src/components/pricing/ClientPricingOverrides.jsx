import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react'
import { getClientOverrides, addClientOverride, updateClientOverride, deleteClientOverride } from '../../utils/pricingEngine'

export default function ClientPricingOverrides({ canEdit, showToast }) {
  const [clients, setClients] = useState([])
  
  useEffect(() => {
    loadClients()
  }, [])
  
  const loadClients = () => {
    const overrides = getClientOverrides()
    setClients(overrides.map((o, idx) => ({ ...o, numId: idx + 1 })))
  }
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [formData, setFormData] = useState({ name: '', baseRateOverride: '', discount: '', currency: 'USD' })

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
    deleteClientOverride(clientId)
    loadClients()
    showToast.success('Override removed', 'Client pricing reset to global rules')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const clientData = {
      name: formData.name,
      baseRatePerKg: parseFloat(formData.baseRateOverride),
      discount: parseFloat(formData.discount) / 100,
      currency: formData.currency
    }
    
    if (editingClient) {
      updateClientOverride(editingClient.id, clientData)
      showToast.success('Override updated', `Pricing updated for ${formData.name}`)
    } else {
      addClientOverride(clientData)
      showToast.success('Override created', `Custom pricing set for ${formData.name}`)
    }
    
    loadClients()
    setShowModal(false)
    setEditingClient(null)
    setFormData({ name: '', baseRateOverride: '', discount: '', currency: 'USD' })
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
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Base Rate/Kg</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Currency</th>
              {canEdit && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredClients.map(client => (
              <tr key={client.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{client.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${client.baseRatePerKg}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{(client.discount * 100).toFixed(0)}%</td>
                <td className="px-6 py-4 text-sm text-gray-600">{client.currency}</td>
                {canEdit && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(client)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(client.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingClient ? 'Edit' : 'Add'} Client Override
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Rate per Kg ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.baseRateOverride}
                  onChange={(e) => setFormData({ ...formData, baseRateOverride: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                <input
                  type="number"
                  step="1"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="USD">USD</option>
                  <option value="NGN">NGN</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {editingClient ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
