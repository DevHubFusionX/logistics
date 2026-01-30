import { useState, useMemo } from 'react'
import { Clock, User, Edit, AlertCircle, RefreshCw } from 'lucide-react'
import { usePricingAuditQuery } from '../../hooks/queries/useAdminQueries'

export default function AuditLog() {
  const { data: logs = [], isLoading, isError, refetch } = usePricingAuditQuery()
  const [filter, setFilter] = useState('all')

  const filteredLogs = useMemo(() => {
    return filter === 'all' ? logs : logs.filter(log => log.role === filter)
  }, [logs, filter])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 text-sm">Loading audit logs...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <h4 className="text-gray-900 font-semibold">Failed to load audit logs</h4>
        <button onClick={() => refetch()} className="text-blue-600 font-medium text-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Pricing Change History</h3>
          <p className="text-sm text-gray-600 mt-1">Track all pricing modifications and who made them</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 font-medium"
          >
            <option value="all">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Finance Officer">Finance Officer</option>
          </select>
          <button
            onClick={() => refetch()}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Refresh logs"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 italic">No audit entries found for the selected filter.</p>
          </div>
        ) : (
          filteredLogs.map(log => (
            <div key={log.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Edit className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{log.action}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${log.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                      {log.role}
                    </span>
                  </div>
                  <div className="text-sm mb-3 text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="font-medium">Change details logged and synced to cloud.</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-gray-400" />
                      {log.user}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {log.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
