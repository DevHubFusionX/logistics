import { useState } from 'react'
import {
  X, Building2, Mail, Phone, MapPin, DollarSign,
  Package, CreditCard, Settings, Calendar, Shield,
  TrendingUp, Clock, Info, ExternalLink
} from 'lucide-react'
import { useClientShipmentsQuery } from '../../hooks/queries/useAdminQueries'

export default function ClientDetail({ client, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const { data: shipments = [], isLoading: loadingShipments } = useClientShipmentsQuery(client.id)

  const getStatusBadge = (status) => {
    const styles = {
      'in-transit': 'bg-blue-100 text-blue-700',
      'delivered': 'bg-green-100 text-green-700',
      'pending': 'bg-amber-100 text-amber-700',
      'cancelled': 'bg-rose-100 text-rose-700'
    }
    return `px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status] || 'bg-gray-100 text-gray-700'}`
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'pricing', label: 'Financials', icon: DollarSign },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-bold shadow-xl">
                {client.avatar ? (
                  <img src={client.avatar} alt={client.name} className="w-full h-full object-cover rounded-2xl" />
                ) : client.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">{client.name}</h2>
                <div className="flex items-center gap-3 mt-2 text-blue-100 text-sm font-medium">
                  <span className="flex items-center gap-1 opacity-80">
                    <Shield className="w-4 h-4" />
                    {client.role || 'Verified Client'}
                  </span>
                  <span className="w-1 h-1 bg-white/30 rounded-full" />
                  <span className="flex items-center gap-1 opacity-80">
                    <Building2 className="w-4 h-4" />
                    {client.industry}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-8 pt-6 border-b border-gray-100 bg-gray-50/50">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full shadow-lg shadow-blue-200" />
              )}
            </button>
          ))}
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-200">
          {activeTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-4 uppercase tracking-widest text-[11px]">Primary Information</h3>
                  <div className="grid gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                        <p className="text-sm font-bold text-gray-900">{client.email}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Number</p>
                        <p className="text-sm font-bold text-gray-900">{client.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Primary Location</p>
                        <p className="text-sm font-bold text-gray-900">{client.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 border-l-4 border-indigo-600 pl-4 uppercase tracking-widest text-[11px]">Account Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Member Since</p>
                      <p className="text-lg font-extrabold text-indigo-900">{client.lastActive}</p>
                    </div>
                    <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Account Type</p>
                      <p className="text-lg font-extrabold text-emerald-900 uppercase tracking-tight">{client.clientCategory || 'Standard'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-blue-600 pl-4 uppercase tracking-widest text-[11px]">Recent Shipments</h3>
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{shipments.length} Records</span>
              </div>

              {loadingShipments ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : shipments.length > 0 ? (
                <div className="space-y-3">
                  {shipments.map(shipment => (
                    <div key={shipment.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <Package className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{shipment.trackingNumber || shipment.id}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{shipment.origin} → {shipment.destination}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <div>
                          <p className="font-extrabold text-gray-900">₦{(shipment.cost || 0).toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5 font-bold">
                            {shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : 'Active'}
                          </p>
                        </div>
                        <span className={getStatusBadge(shipment.status)}>
                          {shipment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <Package className="w-10 h-10 text-gray-300 mb-2" />
                  <p className="text-gray-500 font-medium">No shipment records found for this client</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100 flex flex-col md:flex-row items-center gap-8 justify-between">
                <div>
                  <h4 className="text-indigo-900 font-extrabold text-xl mb-2 flex items-center gap-2">
                    <DollarSign className="w-6 h-6" />
                    Custom Pricing Configuration
                  </h4>
                  <p className="text-indigo-600/70 text-sm max-w-md font-medium">Configure individual rate overrides and discounts for this specific enterprise relationship.</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100 text-center min-w-[120px]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Base Rate</p>
                    <p className="text-xl font-black text-gray-900">₦{(client.customPricing?.baseRate || 2500).toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100 text-center min-w-[120px]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Discount</p>
                    <p className="text-xl font-black text-emerald-600">{client.customPricing?.discount || 0}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-gray-900 pl-4 uppercase tracking-widest text-[11px]">Financial Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Volume</p>
                      <p className="text-xl font-black text-gray-900">₦{(client.revenue || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Package className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completed Trips</p>
                      <p className="text-xl font-black text-gray-900">{client.totalTrips || 0}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Unpaid Dues</p>
                      <p className="text-xl font-black text-rose-600">₦0.00</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
