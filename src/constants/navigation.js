import { 
  Home, Package, Truck, Map, Warehouse, ShoppingCart, Users, 
  UserCheck, BarChart3, AlertTriangle, Clipboard, Puzzle, 
  Settings, HelpCircle
} from 'lucide-react'

export const NAVIGATION_SECTIONS = [
  {
    title: 'Main',
    items: [
      {
        id: 'overview',
        label: 'Overview',
        icon: Home,
        path: '/dashboard',
        description: 'Dashboard & insights',
        color: 'blue'
      },
      {
        id: 'shipments',
        label: 'Shipments',
        icon: Package,
        path: '/shipments',
        badge: { count: 12, type: 'info' },
        description: 'Track all deliveries',
        color: 'blue',
        subItems: [
          { label: 'All Shipments', path: '/shipments', count: '1,234' },
          { label: 'In Transit', path: '/shipments/in-transit', count: '45', status: 'active' },
          { label: 'Delayed', path: '/shipments/delayed', count: '8', status: 'warning' },
          { label: 'Delivered', path: '/shipments/delivered', count: '1,181', status: 'success' },
          { label: 'Exceptions', path: '/shipments/exceptions', count: '3', status: 'error' }
        ]
      },
      {
        id: 'orders',
        label: 'Orders',
        icon: ShoppingCart,
        path: '/orders',
        badge: { count: 5, type: 'warning' },
        description: 'Manage order fulfillment',
        color: 'green'
      }
    ]
  },
  {
    title: 'Operations',
    items: [
      {
        id: 'fleet',
        label: 'Fleet Management',
        icon: Truck,
        path: '/fleet',
        description: 'Vehicles & maintenance',
        color: 'indigo',
        subItems: [
          { label: 'All Vehicles', path: '/fleet', count: '24' },
          { label: 'Active', path: '/fleet/active', count: '18', status: 'success' },
          { label: 'Maintenance', path: '/fleet/maintenance', count: '3', status: 'warning' },
          { label: 'Offline', path: '/fleet/offline', count: '3', status: 'error' }
        ]
      },
      {
        id: 'routes',
        label: 'Routes & Live Map',
        icon: Map,
        path: '/routes',
        description: 'Real-time tracking',
        color: 'emerald',
        isNew: true
      },
      {
        id: 'warehouses',
        label: 'Warehouses',
        icon: Warehouse,
        path: '/warehouses',
        description: 'Inventory management',
        color: 'purple',
        subItems: [
          { label: 'All Locations', path: '/warehouses', count: '8' },
          { label: 'Inventory', path: '/warehouses/inventory' },
          { label: 'Stock Alerts', path: '/warehouses/alerts', count: '2', status: 'warning' }
        ]
      },
      {
        id: 'tasks',
        label: 'Dispatch Board',
        icon: Clipboard,
        path: '/tasks',
        description: 'Task management',
        color: 'orange'
      }
    ]
  },
  {
    title: 'People & Analytics',
    items: [
      {
        id: 'customers',
        label: 'Customers',
        icon: Users,
        path: '/customers',
        description: 'Customer management',
        color: 'blue'
      },
      {
        id: 'drivers',
        label: 'Drivers & Staff',
        icon: UserCheck,
        path: '/drivers',
        description: 'Personnel management',
        color: 'green'
      },
      {
        id: 'analytics',
        label: 'Reports',
        icon: BarChart3,
        path: '/reports',
        description: 'Reports & insights',
        color: 'violet'
      }
    ]
  },
  {
    title: 'System',
    items: [
      {
        id: 'alerts',
        label: 'Alerts & Incidents',
        icon: AlertTriangle,
        path: '/alerts',
        badge: { count: 3, type: 'error' },
        description: 'System notifications',
        color: 'red'
      },
      {
        id: 'integrations',
        label: 'Integrations',
        icon: Puzzle,
        path: '/integrations',
        description: 'Third-party connections',
        color: 'gray'
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        path: '/settings',
        description: 'System configuration',
        color: 'gray',
        subItems: [
          { label: 'Account Settings', path: '/settings/account' },
          { label: 'User Roles', path: '/settings/roles' },
          { label: 'Notifications', path: '/settings/notifications' },
          { label: 'Security', path: '/settings/security' }
        ]
      },
      {
        id: 'help',
        label: 'Help & Support',
        icon: HelpCircle,
        path: '/help',
        description: '24/7 assistance',
        color: 'blue'
      }
    ]
  }
]