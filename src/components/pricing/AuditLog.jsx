import { useState, useEffect } from 'react'
import { Clock, User, Edit } from 'lucide-react'
import { getAuditLog } from '../../utils/pricingEngine'

export default function AuditLog() {
  const [logs, setLogs] = useState([])
  
  useEffect(() => {
    setLogs(getAuditLog())
  }, [])
  const [filter, setFilter] = useState('all')

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.role === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Pricing Change History</h3>
          <p className="text-sm text-gray-600 mt-1">Track all pricing modifications and who made them</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        >
          <option value="all">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Finance Officer">Finance Officer</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredLogs.map(log => (
          <div key={log.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Edit className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-gray-900">{log.action}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    log.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {log.role}
                  </span>
                </div>
                {logs.length > 0 ? (
                  <div className="text-sm mb-2 text-gray-600">
                    <span className="font-medium">Change details available in system logs</span>
                  </div>
                ) : null}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {log.user}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.timestamp}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
