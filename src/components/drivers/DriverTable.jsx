import { Phone, Mail, Truck, Edit, Trash2, UserCheck } from 'lucide-react'
import { VirtualizedTable } from '../ui/advanced'

const getStatusColor = (status) => {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-700'
    case 'on_trip': return 'bg-blue-100 text-blue-700'
    case 'inactive': return 'bg-gray-100 text-gray-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getPerformanceColor = (score) => {
  if (score >= 95) return 'text-green-600'
  if (score >= 90) return 'text-blue-600'
  if (score >= 85) return 'text-yellow-600'
  return 'text-orange-600'
}

export default function DriverTable({ drivers, onView, onEdit, onDelete, onExport, onSaveView }) {
  const columns = [
    { key: 'name', label: 'Driver Name', width: '180px' },
    { key: 'licenseNumber', label: 'License Number', width: '160px' },
    { 
      key: 'phone', 
      label: 'Contact Info', 
      width: '200px',
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs">
            <Phone className="w-3 h-3 text-gray-400" />
            <span>{value}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Mail className="w-3 h-3 text-gray-400" />
            <span className="truncate">{row.email}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'assignedTruck', 
      label: 'Assigned Truck', 
      width: '140px',
      render: (value) => (
        <div className="flex items-center gap-1">
          <Truck className="w-4 h-4 text-gray-400" />
          <span>{value || 'Unassigned'}</span>
        </div>
      )
    },
    { 
      key: 'performanceScore', 
      label: 'Performance Score', 
      width: '150px',
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${value >= 95 ? 'bg-green-500' : value >= 90 ? 'bg-blue-500' : 'bg-yellow-500'}`}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className={`text-sm font-medium ${getPerformanceColor(value)}`}>{value}%</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      width: '120px',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value.replace('_', ' ')}
        </span>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions', 
      width: '200px',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(row.id)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View
          </button>
          <button
            onClick={() => onEdit(row.id)}
            className="text-gray-600 hover:text-gray-700"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-blue-600" />
          Driver Directory
        </h2>
        <p className="text-sm text-gray-600 mt-1">{drivers.length} drivers found</p>
      </div>
      <VirtualizedTable
        data={drivers}
        columns={columns}
        height={500}
        onExport={onExport}
        onSaveView={onSaveView}
      />
    </div>
  )
}
