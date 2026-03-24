import React from 'react'
import { 
  Building2, Truck, Package, MapPin, 
  CheckCircle2, AlertCircle, ExternalLink, 
  Edit, MoreHorizontal, Copy, Download 
} from 'lucide-react'

export default function OrdersTableRow({ 
  order, 
  onView, 
  onEdit, 
  onDelete, 
  onCopyId, 
  onExport,
  formatDate 
}) {
  return (
    <tr className="hover:bg-blue-50/10 transition-all group border-b border-gray-50/50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-all shadow-sm">
            <Building2 className="w-4.5 h-4.5 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <div className="text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors uppercase tracking-tight">
            {order.company}
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg w-fit border border-gray-100/50">
          <Truck className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs font-semibold text-gray-600">{order.truckSize}</span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-gray-300" />
          <span className="text-xs font-semibold text-gray-500">{order.goodsType}</span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
          <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {order.pickup}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
          <MapPin className="w-3.5 h-3.5 text-rose-500" /> {order.delivery}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-xs font-medium italic text-gray-400">{order.fleet}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-xs font-black text-gray-900 tracking-tight">
            {typeof order.revenue === 'number' ? `₦${order.revenue.toLocaleString()}` : order.revenue}
          </span>
          <span className="text-[10px] text-gray-400 font-bold uppercase">{formatDate(order.date)}</span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-center gap-2">
           <button 
            onClick={() => onView(order)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
            title="View Details"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onEdit(order)}
            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" 
            title="Edit Dispatch"
          >
            <Edit className="w-4 h-4" />
          </button>
          <div className="relative group/more">
            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all z-30">
              <button 
                onClick={() => onCopyId(order.id)}
                className="w-full text-left px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl flex items-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Order ID
              </button>
              <button 
                onClick={() => onExport()}
                className="w-full text-left px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Export Data
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button 
                onClick={() => onDelete(order.id)}
                className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2"
              >
                <AlertCircle className="w-3.5 h-3.5" /> Delete Dispatch
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}
