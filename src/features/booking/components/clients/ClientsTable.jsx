import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Mail, Phone, ExternalLink, ShieldCheck, MoreVertical, Package } from 'lucide-react'

export default function ClientsTable({ data, onViewClient }) {
  const navigate = useNavigate()
  const getPaymentBadge = (status) => {
    const styles = {
      current: 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/10',
      pending: 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/10',
      overdue: 'bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/10'
    }
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ring-1 uppercase tracking-tight ${styles[status] || 'bg-gray-50 text-gray-700 border-gray-100 text-gray-500'}`
  }

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-50/50">
            <th className="sticky top-0 z-10 px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Client Detail</th>
            <th className="sticky top-0 z-10 px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Category</th>
            <th className="sticky top-0 z-10 px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Communication</th>
            <th className="sticky top-0 z-10 px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Officer</th>
            <th className="sticky top-0 z-10 px-6 py-4 text-right text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Activity</th>
            <th className="sticky top-0 z-10 px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Payment Status</th>
            <th className="sticky top-0 z-10 px-6 py-4 text-right text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {data.map((client) => (
            <tr key={client.id} className="group hover:bg-blue-50/30 transition-all duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm shadow-sm border border-indigo-100 group-hover:scale-105 transition-transform">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{client.name}</div>
                    <div className="text-[11px] text-gray-400 font-medium">ID: {client.id.substring(0, 8)}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-[13px] text-gray-600 font-medium px-2 py-1 bg-gray-50 rounded-md border border-gray-100">{client.industry}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {client.phone}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <span className="text-[13px] text-gray-600">{client.accountOfficer}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm font-bold text-gray-900">{client.totalTrips}</div>
                <div className="text-[11px] text-gray-400">Total Trips</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={getPaymentBadge(client.paymentStatus)}>
                  {client.paymentStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onViewClient(client)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="View details"
                  >
                    <Eye className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={() => navigate(`/admin/customers/${client.id}/bookings`)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="View user bookings"
                  >
                    <Package className="w-4.5 h-4.5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreVertical className="w-4.5 h-4.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
