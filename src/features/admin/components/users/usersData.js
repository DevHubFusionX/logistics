export const usersData = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@daraexpress.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2024-01-15 14:30:22',
    createdAt: '2023-01-10'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@daraexpress.com',
    role: 'Fleet Officer',
    status: 'active',
    lastLogin: '2024-01-15 12:15:10',
    createdAt: '2023-03-15'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@daraexpress.com',
    role: 'Dispatcher',
    status: 'active',
    lastLogin: '2024-01-14 16:45:33',
    createdAt: '2023-05-20'
  },
  {
    id: 4,
    name: 'Mike Johnson',
    email: 'mike@daraexpress.com',
    role: 'Finance',
    status: 'active',
    lastLogin: '2024-01-14 10:20:15',
    createdAt: '2023-06-12'
  },
  {
    id: 5,
    name: 'Sarah Williams',
    email: 'sarah@daraexpress.com',
    role: 'Support',
    status: 'active',
    lastLogin: '2024-01-10 09:30:00',
    createdAt: '2023-08-05'
  },
  {
    id: 6,
    name: 'David Chen',
    email: 'david@abccorp.com',
    role: 'Customer',
    status: 'active',
    lastLogin: '2024-01-15 08:45:12',
    createdAt: '2023-09-20'
  },
  {
    id: 7,
    name: 'Emily Brown',
    email: 'emily@xyzlogistics.com',
    role: 'Customer',
    status: 'active',
    lastLogin: '2024-01-14 15:20:30',
    createdAt: '2023-10-15'
  }
]

export const roles = [
  {
    name: 'Super Admin',
    permissions: ['Full access to all features', 'Manage all users', 'System configuration'],
    color: 'bg-purple-100 text-purple-700',
    description: 'Complete system control'
  },
  {
    name: 'Fleet Officer',
    permissions: ['Manage vehicles', 'Manage drivers', 'Temperature monitoring', 'Fleet reports'],
    color: 'bg-blue-100 text-blue-700',
    description: 'Manages physical assets and personnel'
  },
  {
    name: 'Dispatcher',
    permissions: ['Manage bookings', 'Assign drivers', 'Track shipments', 'Driver app access'],
    color: 'bg-green-100 text-green-700',
    description: 'Handles operations and routing'
  },
  {
    name: 'Finance',
    permissions: ['Process payments', 'Manage pricing', 'Generate invoices', 'Financial reports', 'Reconciliation'],
    color: 'bg-yellow-100 text-yellow-700',
    description: 'Manages billing and revenue'
  },
  {
    name: 'Support',
    permissions: ['Create bookings', 'View clients', 'Track shipments', 'Generate reports'],
    color: 'bg-orange-100 text-orange-700',
    description: 'Customer service and booking creation'
  },
  {
    name: 'Customer',
    permissions: ['Create bookings', 'Track own shipments', 'View own invoices', 'View booking status'],
    color: 'bg-cyan-100 text-cyan-700',
    description: 'End customer with limited access'
  }
]

export const activityLogs = [
  { id: 1, user: 'John Doe', role: 'Fleet Officer', action: 'edited Trip #DRA-02', timestamp: '2024-01-15 14:30:22' },
  { id: 2, user: 'Jane Smith', role: 'Dispatcher', action: 'created Trip #DRA-03', timestamp: '2024-01-15 12:15:10' },
  { id: 3, user: 'Mike Johnson', role: 'Finance', action: 'generated payment report', timestamp: '2024-01-14 16:45:33' },
  { id: 4, user: 'Admin User', role: 'Super Admin', action: 'added new user Sarah Williams', timestamp: '2024-01-14 10:20:15' },
  { id: 5, user: 'John Doe', role: 'Fleet Officer', action: 'updated truck DRA-017 status', timestamp: '2024-01-13 09:30:00' },
  { id: 6, user: 'David Chen', role: 'Customer', action: 'created booking BK-1001', timestamp: '2024-01-15 08:45:12' },
  { id: 7, user: 'Sarah Williams', role: 'Support', action: 'confirmed booking BK-1002', timestamp: '2024-01-14 11:30:45' }
]
