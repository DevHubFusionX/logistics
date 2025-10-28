import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { Users, Shield, Activity, Plus, Search } from 'lucide-react'
import UsersTable from '../components/users/UsersTable'
import UserModal from '../components/users/UserModal'
import RolesCard from '../components/users/RolesCard'
import ActivityLogs from '../components/users/ActivityLogs'
import { usersData, roles, activityLogs } from '../components/users/usersData'

export default function UserRoles() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const activeUsers = usersData.filter(u => u.status === 'active').length
  const totalRoles = roles.length

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowModal(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      showToast.success('User deleted successfully', user.name)
    }
  }

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      showToast.success('User updated successfully', userData.name)
    } else {
      showToast.success('User added successfully', userData.name)
    }
    setShowModal(false)
  }

  return (
    <>
      <PageHeader
        title="User Roles & Access Control"
        subtitle="Manage internal users and permissions"
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <MetricCard
          title="Total Users"
          value={usersData.length}
          icon={Users}
          color="blue"
          sparklineData={[3, 4, 4, 5, 5, 5, 5]}
        />
        <MetricCard
          title="Active Users"
          value={activeUsers}
          icon={Users}
          color="green"
          sparklineData={[3, 3, 4, 4, 4, 4, 4]}
        />
        <MetricCard
          title="Roles Defined"
          value={totalRoles}
          icon={Shield}
          color="purple"
          sparklineData={[5, 5, 5, 5, 5, 5, 5]}
        />
        <MetricCard
          title="Recent Activities"
          value={activityLogs.length}
          icon={Activity}
          color="orange"
          sparklineData={[3, 4, 5, 4, 5, 5, 5]}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Fleet Officer">Fleet Officer</option>
            <option value="Dispatcher">Dispatcher</option>
            <option value="Finance">Finance</option>
            <option value="Support">Support</option>
          </select>
        </div>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-3 sm:p-4 border-b">
          <h2 className="text-base sm:text-lg font-semibold">Internal Users</h2>
        </div>
        <UsersTable
          data={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>

      {/* Roles & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RolesCard roles={roles} />
        <ActivityLogs logs={activityLogs} />
      </div>

      {/* User Modal */}
      {showModal && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
          onSave={handleSaveUser}
        />
      )}

      <ToastContainer />
    </>
  )
}
