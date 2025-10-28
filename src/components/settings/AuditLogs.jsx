import { FileText, User, Clock } from 'lucide-react'

export default function AuditLogs() {
  const logs = [
    { id: 1, user: 'Admin User', action: 'Updated temperature threshold for Frozen Foods', timestamp: '2024-01-15 14:30:22', type: 'update' },
    { id: 2, user: 'John Doe', action: 'Added new IoT sensor API key', timestamp: '2024-01-15 12:15:10', type: 'create' },
    { id: 3, user: 'Admin User', action: 'Changed company timezone to WAT', timestamp: '2024-01-14 16:45:33', type: 'update' },
    { id: 4, user: 'Jane Smith', action: 'Enabled SMS notifications', timestamp: '2024-01-14 10:20:15', type: 'update' },
    { id: 5, user: 'Admin User', action: 'Updated Paystack secret key', timestamp: '2024-01-13 09:30:00', type: 'update' }
  ]

  const getTypeBadge = (type) => {
    const styles = {
      create: 'bg-green-100 text-green-700',
      update: 'bg-blue-100 text-blue-700',
      delete: 'bg-red-100 text-red-700'
    }
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[type]}`
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Audit Logs - Admin Changes
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{log.user}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{log.action}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.timestamp}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={getTypeBadge(log.type)}>
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
