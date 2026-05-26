import React from 'react'
import { Building2, Truck, Package, ArrowRight, ExternalLink, Edit, Copy, Download, Trash2, MoreHorizontal } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const STATUS_STYLE = {
  Fulfilled:   'bg-emerald-50 text-emerald-700',
  Unfulfilled: 'bg-red-50 text-red-600',
}

export default function OrdersTableRow({ order, onView, onEdit, onDelete, onCopyId, onExport, formatDate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const revenue = typeof order.revenue === 'number'
    ? `₦${order.revenue.toLocaleString()}`
    : order.revenue || '—'

  return (
    <tr className="hover:bg-gray-50/60 transition-colors group">

      {/* Company */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 transition-colors">
            <Building2 className="w-3.5 h-3.5 text-sky-700" />
          </div>
          <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]">{order.company}</span>
        </div>
      </td>

      {/* Truck */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Truck className="w-3.5 h-3.5 text-gray-400" />
          {order.truckSize}
        </div>
      </td>

      {/* Goods */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Package className="w-3.5 h-3.5 text-gray-400" />
          {order.goodsType}
        </div>
      </td>

      {/* Route */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
          <span>{order.pickup}</span>
          <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
          <span>{order.delivery}</span>
        </div>
      </td>

      {/* Fleet */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <span className="text-xs text-gray-400 italic">{order.fleet}</span>
      </td>

      {/* Revenue / Date */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <p className="text-xs font-bold text-gray-900">{revenue}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(order.date)}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[order.status] || 'bg-gray-100 text-gray-500'}`}>
          {order.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(order)}
            className="p-1.5 text-gray-400 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
            title="View details"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onEdit(order)}
            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>

          {/* More menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 bottom-full mb-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-30">
                <button
                  onClick={() => { onCopyId(order.id); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy order ID
                </button>
                <button
                  onClick={() => { onExport(); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Export row
                </button>
                <div className="my-1 border-t border-gray-100" />
                <button
                  onClick={() => { onDelete(order.id); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}
