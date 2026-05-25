import { useState } from 'react'
import {
  X, Building2, Mail, Phone, MapPin, DollarSign,
  Package, CreditCard, Clock, Info, ExternalLink,
  TrendingUp, Loader2, ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useClientShipmentsQuery } from '../../hooks/queries/useAdminQueries'

const STATUS_STYLES = {
  'in-transit': 'bg-sky-50 text-sky-700',
  'delivered':  'bg-emerald-50 text-emerald-700',
  'pending':    'bg-amber-50 text-amber-700',
  'cancelled':  'bg-red-50 text-red-600',
  'confirmed':  'bg-sky-50 text-sky-700',
}

function Field({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-sky-700" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5 truncate">{value || '—'}</p>
      </div>
    </div>
  )
}

function StatTile({ label, value, color = 'gray' }) {
  const colors = {
    sky:     'bg-sky-50 text-sky-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    red:     'bg-red-50 text-red-600',
    gray:    'bg-gray-50 text-gray-700',
  }
  return (
    <div className={`rounded-xl p-4 ${colors[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">{label}</p>
      <p className="text-xl font-heading font-black">{value}</p>
    </div>
  )
}

const TABS = [
  { id: 'overview',  label: 'Overview',   icon: Info },
  { id: 'activity',  label: 'Activity',   icon: Clock },
  { id: 'financials',label: 'Financials', icon: DollarSign },
]

export default function ClientDetail({ client, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const { data: shipmentsData, isLoading: loadingShipments } = useClientShipmentsQuery(client.id)
  const shipments = shipmentsData?.records || []

  const initials = client.name?.slice(0, 2).toUpperCase() || '??'

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-sky-700 flex items-center justify-center flex-shrink-0">
            {client.avatar
              ? <img src={client.avatar} alt={client.name} className="w-full h-full object-cover rounded-xl" />
              : <span className="text-white font-bold text-sm">{initials}</span>
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-gray-900 truncate">{client.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Building2 className="w-3 h-3 text-gray-400" />
              <p className="text-xs text-gray-400 truncate">{client.industry || '—'}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 flex-shrink-0 px-5">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-3 text-xs font-semibold border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? 'border-sky-700 text-sky-700'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-gray-100">
                <Field label="Email"    value={client.email}   icon={Mail}   />
                <Field label="Phone"    value={client.phone}   icon={Phone}  />
                <Field label="Location" value={client.address} icon={MapPin} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <StatTile label="Member since"  value={client.lastActive || '—'}              color="sky"     />
                <StatTile label="Account type"  value={client.clientCategory || 'Standard'}   color="emerald" />
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/admin/customers/${client.id}/bookings`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <Package className="w-4 h-4" /> View bookings
                </Link>
              </div>
            </div>
          )}

          {/* Activity */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-heading font-bold text-gray-900">Recent shipments</p>
                <Link
                  to={`/admin/customers/${client.id}/bookings`}
                  className="text-xs font-semibold text-sky-700 hover:underline flex items-center gap-1"
                >
                  View all <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {loadingShipments ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
                </div>
              ) : shipments.length === 0 ? (
                <div className="bg-gray-50 rounded-xl py-10 text-center">
                  <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No shipments found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {shipments.map(s => (
                    <div key={s.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                          <Package className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-mono font-bold text-gray-900 truncate">{s.trackingNumber || s.id}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{s.origin} → {s.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <p className="text-xs font-bold text-gray-900">₦{(s.cost || 0).toLocaleString()}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[s.status] || 'bg-gray-100 text-gray-600'}`}>
                          {s.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Financials */}
          {activeTab === 'financials' && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <StatTile label="Total revenue" value={`₦${((client.revenue || 0) / 1000).toFixed(0)}k`} color="sky"     />
                <StatTile label="Total trips"   value={client.totalTrips || 0}                            color="emerald" />
                <StatTile label="Unpaid"        value="₦0"                                                color="gray"    />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Pricing configuration</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">Base rate</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">₦{(client.customPricing?.baseRate || 2500).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Discount</p>
                    <p className="text-sm font-bold text-emerald-600 mt-0.5">{client.customPricing?.discount || 0}%</p>
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
