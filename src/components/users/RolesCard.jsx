import { Shield } from 'lucide-react'

export default function RolesCard({ roles }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Available Roles & Permissions
      </h3>
      <div className="space-y-3">
        {roles.map((role, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
                {role.name}
              </span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              {role.permissions.map((perm, j) => (
                <li key={j} className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {perm}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
