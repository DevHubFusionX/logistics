import { Eye, Mail, Phone } from 'lucide-react'

export default function ClientsTable({ data, onViewClient }) {
  const getPaymentBadge = (status) => {
    const styles = {
      current: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      overdue: 'bg-red-100 text-red-700'
    }
    return `px-3 py-1 rounded-full text-xs font-semibold uppercase ${styles[status]}`
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Industry</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Info</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Account Officer</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Trips</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Active</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((client) => (
            <tr key={client.id} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">{client.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{client.industry}</td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600 mb-1">
                  <Mail className="w-3 h-3 text-gray-400" />
                  {client.email}
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Phone className="w-3 h-3 text-gray-400" />
                  {client.phone}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{client.accountOfficer}</td>
              <td className="px-6 py-4 text-sm font-bold text-gray-900">{client.totalTrips}</td>
              <td className="px-6 py-4">
                <span className={getPaymentBadge(client.paymentStatus)}>
                  {client.paymentStatus}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{client.lastActive}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onViewClient(client)}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
