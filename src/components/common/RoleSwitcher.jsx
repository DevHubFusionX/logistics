import { useAuth } from '../../hooks'
import { Shield } from 'lucide-react'

export default function RoleSwitcher() {
  const { user, setUser } = useAuth()

  const roles = ['Super Admin', 'Fleet Officer', 'Dispatcher', 'Finance', 'Support', 'Customer']

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-semibold text-gray-900">Test Role</span>
      </div>
      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-2">Switch roles to test permissions</p>
    </div>
  )
}
