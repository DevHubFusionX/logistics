import React from 'react'
import { Eye, Mail, Phone, Building2, Package, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

const ROLE_STYLES = {
  admin:    'bg-purple-50 text-purple-700',
  driver:   'bg-sky-50 text-sky-700',
  customer: 'bg-emerald-50 text-emerald-700',
  user:     'bg-emerald-50 text-emerald-700',
}

const ClientCard = ({ client, onViewClient }) => {
  const initials   = client.name?.slice(0, 2).toUpperCase() || '??'
  const roleStyle  = ROLE_STYLES[client.role?.toLowerCase()] || ROLE_STYLES.user
  const roleLabel  = client.role || 'Customer'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {client.avatar ? (
            <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-sky-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-heading font-bold text-gray-900 truncate">{client.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <p className="text-xs text-gray-400 truncate">{client.industry || 'N/A'}</p>
            </div>
          </div>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${roleStyle}`}>
          {roleLabel}
        </span>
      </div>

      {/* Contact info */}
      <div className="px-5 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="truncate">{client.email || '—'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>{client.phone || '—'}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
        <div>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Joined</p>
          <p className="text-xs font-semibold text-gray-800 mt-0.5">{client.lastActive || '—'}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Trips</p>
          <p className="text-xs font-semibold text-gray-800 mt-0.5">{client.totalTrips ?? '—'}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto border-t border-gray-100 px-5 py-3 flex gap-2">
        <button
          onClick={() => onViewClient(client)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-900 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> Profile
        </button>
        <Link
          to={`/admin/customers/${client.id}/bookings`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-600 hover:border-sky-200 hover:text-sky-700 hover:bg-sky-50 text-xs font-semibold rounded-xl transition-colors"
        >
          <Package className="w-3.5 h-3.5" /> Bookings
        </Link>
      </div>
    </div>
  )
}

export default React.memo(ClientCard)
