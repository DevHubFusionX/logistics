import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { MapPin, Plus, Edit, Trash2, Star, RefreshCw, AlertCircle, Phone, Navigation, Search, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useUpdateAddressMutation
} from '../../hooks/queries/useAddressQueries'
import { AddressCardSkeleton } from '../../components/common/SkeletonLoaders'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import toast from 'react-hot-toast'

export default function AddressBook() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [search, setSearch] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    label: '',
    name: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    postalCode: '',
    country: 'Nigeria'
  })

  const { data: addresses = [], isLoading, isError, refetch } = useAddressesQuery()
  const createMutation = useCreateAddressMutation()
  const deleteMutation = useDeleteAddressMutation()
  const setDefaultMutation = useSetDefaultAddressMutation()
  const updateMutation = useUpdateAddressMutation()

  // Search filter
  const filteredAddresses = useMemo(() => {
    if (!search.trim()) return addresses
    const q = search.toLowerCase()
    return addresses.filter(a =>
      (a.label || '').toLowerCase().includes(q) ||
      (a.contact_name || a.name || '').toLowerCase().includes(q) ||
      (a.street || a.address || '').toLowerCase().includes(q) ||
      (a.city || '').toLowerCase().includes(q)
    )
  }, [addresses, search])

  const handleSetDefault = (id) => {
    setDefaultMutation.mutate(id)
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    deleteMutation.mutate(deleteTarget, {
      onSuccess: () => {
        setDeleteTarget(null)
        toast.success('Address deleted')
      }
    })
  }

  const handleEdit = (address) => {
    setEditingAddress(address)
    setFormErrors({})
    setFormData({
      label: address.label,
      name: address.contact_name || address.name,
      address: address.street || address.address,
      city: address.city,
      state: address.state,
      phone: address.phone,
      postalCode: address.postal_code || '',
      country: address.country || 'Nigeria'
    })
    setShowModal(true)
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.label.trim()) errors.label = 'Label is required'
    if (!formData.name.trim()) errors.name = 'Contact name is required'
    if (!formData.address.trim()) errors.address = 'Street address is required'
    if (!formData.city.trim()) errors.city = 'City is required'
    if (!formData.state.trim()) errors.state = 'State is required'
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required'
    } else if (!/^[\d+\s()-]{7,}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone format'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const payload = {
      ...formData,
      street: formData.address,
      postalCode: formData.postalCode,
      country: formData.country
    }

    if (editingAddress) {
      updateMutation.mutate({ id: editingAddress.id, data: payload }, {
        onSuccess: () => {
          setShowModal(false)
          setEditingAddress(null)
          resetForm()
          toast.success('Address updated')
        }
      })
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setShowModal(false)
          resetForm()
          toast.success('Address saved')
        }
      })
    }
  }

  const resetForm = () => {
    setFormData({ label: '', name: '', address: '', city: '', state: '', phone: '', postalCode: '', country: 'Nigeria' })
    setFormErrors({})
  }

  if (isLoading) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="Address Book" subtitle="Manage saved pickup and delivery locations" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <AddressCardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <div className="p-4 bg-red-50 rounded-full">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Connection Failed</h3>
        <p className="text-gray-500 max-w-xs mx-auto text-sm">Unable to load address book.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-end justify-between">
        <PageHeader
          title="Address Book"
          subtitle="Manage saved pickup and delivery locations"
        />
        <button
          onClick={() => {
            setEditingAddress(null)
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      {/* Search bar */}
      {addresses.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search addresses…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAddresses.map(address => (
          <div key={address.id} className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all relative">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(address)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(address.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-start gap-3 mb-4 pr-16">
              <div className="p-2.5 bg-blue-50 rounded-lg shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 leading-tight">{address.label}</h3>
                  {(address.is_default || address.isDefault) && (
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">{address.contact_name || address.name}</p>
              </div>
            </div>

            <div className="space-y-3 pl-1">
              <div className="flex gap-3">
                <Navigation className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p>{address.street || address.address}</p>
                  <p>{address.city}, {address.state}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{address.country}</p>
                </div>
              </div>

              {address.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{address.phone}</span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
              {!(address.is_default || address.isDefault) && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="text-xs font-semibold text-gray-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                >
                  <Star className="w-3.5 h-3.5" />
                  Set as Default
                </button>
              )}
              <button
                onClick={() => navigate('/booking/request')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors ml-auto"
              >
                <Package className="w-3.5 h-3.5" />
                Use in Booking
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <button
          onClick={() => {
            setEditingAddress(null)
            resetForm()
            setShowModal(true)
          }}
          className="flex flex-col items-center justify-center gap-3 bg-gray-50 rounded-xl border border-dashed border-gray-300 p-8 hover:bg-gray-100 hover:border-gray-400 transition-all group min-h-[250px]"
        >
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
          </div>
          <span className="font-semibold text-gray-600 group-hover:text-gray-900">Add New Location</span>
        </button>
      </div>

      {filteredAddresses.length === 0 && addresses.length > 0 && (
        <div className="py-12 text-center">
          <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No addresses match your search.</p>
          <button onClick={() => setSearch('')} className="mt-2 text-sm text-blue-600 font-semibold hover:underline">Clear search</button>
        </div>
      )}

      {addresses.length === 0 && (
        <div className="py-12 text-center">
          <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No saved addresses</h3>
          <p className="text-gray-500 text-sm">Add your first pickup or delivery location to speed up bookings.</p>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-900">{editingAddress ? 'Edit Address' : 'New Address'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${formErrors.label ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g. Home, Office"
                />
                {formErrors.label && <p className="text-xs text-red-500 mt-1">{formErrors.label}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Contact Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${formErrors.name ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${formErrors.phone ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${formErrors.address ? 'border-red-300' : 'border-gray-300'}`}
                />
                {formErrors.address && <p className="text-xs text-red-500 mt-1">{formErrors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${formErrors.city ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {formErrors.city && <p className="text-xs text-red-500 mt-1">{formErrors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${formErrors.state ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {formErrors.state && <p className="text-xs text-red-500 mt-1">{formErrors.state}</p>}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {(createMutation.isPending || updateMutation.isPending) && <RefreshCw className="w-4 h-4 animate-spin" />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
