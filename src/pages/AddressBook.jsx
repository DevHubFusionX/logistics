import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { MapPin, Plus, Edit, Trash2, Star } from 'lucide-react'
import { useToast } from '../components/ui/advanced'

export default function AddressBook() {
  const { showToast, ToastContainer } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    label: '',
    name: '',
    address: '',
    city: '',
    state: '',
    phone: ''
  })
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Office',
      name: 'ABC Corporation HQ',
      address: '123 Business Ave',
      city: 'Lagos',
      state: 'Lagos',
      phone: '+234 801 234 5678',
      isDefault: true
    },
    {
      id: 2,
      label: 'Warehouse',
      name: 'Storage Facility',
      address: '456 Industrial Road',
      city: 'Ikeja',
      state: 'Lagos',
      phone: '+234 802 345 6789',
      isDefault: false
    }
  ])

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
    showToast.success('Default address updated')
  }

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
    showToast.success('Address deleted')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAddress = {
      id: addresses.length + 1,
      ...formData,
      isDefault: addresses.length === 0
    }
    setAddresses([...addresses, newAddress])
    setShowModal(false)
    setFormData({ label: '', name: '', address: '', city: '', state: '', phone: '' })
    showToast.success('Address added successfully')
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Address Book"
        subtitle="Manage your saved pickup and delivery addresses"
      />

      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Address
        </button>
      </div>

      <div className="grid gap-4">
        {addresses.map(address => (
          <div key={address.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{address.label}</h3>
                    {address.isDefault && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{address.name}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-sm font-medium text-gray-900">{address.address}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.state}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Contact</p>
                <p className="text-sm font-medium text-gray-900">{address.phone}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  <Star className="w-4 h-4" />
                  Set as Default
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm ml-auto"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved addresses</h3>
          <p className="text-gray-600 mb-4">Add addresses to speed up your booking process</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Your First Address
          </button>
        </div>
      )}

      {/* Add Address Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 rotate-45 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Office, Home, Warehouse"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., ABC Corporation HQ"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123 Business Ave"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Lagos"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Lagos"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+234 801 234 5678"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}
