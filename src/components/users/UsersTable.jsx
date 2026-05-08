import { Edit, Trash2, Clock } from 'lucide-react'

export default function UsersTable({ data, onEdit, onDelete }) {
  const getRoleBadge = (role) => {
    const styles = {
      'Super Admin': 'bg-purple-100 text-purple-700',
      'Fleet Officer': 'bg-blue-100 text-blue-700',
      'Dispatcher': 'bg-green-100 text-green-700',
      'Finance': 'bg-yellow-100 text-yellow-700',
      'Support': 'bg-gray-100 text-gray-700'
    }
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`
  }

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{user.email}</td>
              <td className="px-3 sm:px-4 py-2 sm:py-3">
                <span className={getRoleBadge(user.role)}>{user.role}</span>
              </td>
              <td className="px-3 sm:px-4 py-2 sm:py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </td>
              <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {user.lastLogin}
                </div>
              </td>
              <td className="px-3 sm:px-4 py-2 sm:py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="Edit User"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
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
