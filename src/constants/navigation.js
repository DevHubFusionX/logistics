import { 
  Home, Package, Truck, Map, Warehouse, ShoppingCart, Users, 
  UserCheck, BarChart3, AlertTriangle, Clipboard, Puzzle, 
  Settings, HelpCircle, Thermometer, CreditCard, MapPin, FileText, DollarSign, ClipboardList, Navigation, Info, BookOpen, MessageSquare, TrendingUp
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
        color: 'blue',
        roles: ['Super Admin', 'Fleet Officer', 'Dispatcher', 'Finance', 'Support']
      },
      {
        id: 'my-bookings',
        label: 'My Bookings',
        icon: Package,
        path: '/my-bookings',
        description: 'View your bookings',
        color: 'blue',
        roles: ['Customer']
      },
      {
        id: 'payment-history',
        label: 'Payment History',
        icon: CreditCard,
        path: '/payment-history',
        description: 'View payment transactions',
        color: 'green',
        roles: ['Customer']
      },
      {
        id: 'bookings',
        label: 'New Booking',
        icon: Package,
        path: '/booking/request',
        description: 'Create new shipment',
        color: 'green',
        roles: ['Super Admin', 'Support', 'Customer']
      },
      {
        id: 'bookings-management',
        label: 'Manage Bookings',
        icon: ClipboardList,
        path: '/bookings-management',
        description: 'Assign drivers',
        color: 'blue',
        badge: { count: 3, type: 'warning' },
        isNew: true,
        roles: ['Super Admin', 'Dispatcher']
      },
      {
        id: 'tracking',
        label: 'Track Shipment',
        icon: MapPin,
        path: '/tracking/track',
        description: 'Real-time tracking',
        color: 'blue',
        roles: ['Super Admin', 'Fleet Officer', 'Dispatcher', 'Finance', 'Support', 'Customer']
      },
      {
        id: 'status-guide',
        label: 'Status Guide',
        icon: Info,
        path: '/booking-status-guide',
        description: 'Understand booking status',
        color: 'purple',
        roles: ['Customer']
      },
      {
        id: 'address-book',
        label: 'Address Book',
        icon: BookOpen,
        path: '/address-book',
        description: 'Manage saved addresses',
        color: 'indigo',
        roles: ['Customer']
      },
      {
        id: 'my-temperature',
        label: 'Temperature Monitor',
        icon: Thermometer,
        path: '/my-temperature',
        description: 'Cold chain tracking',
        color: 'cyan',
        roles: ['Customer']
      },
      {
        id: 'my-analytics',
        label: 'My Analytics',
        icon: TrendingUp,
        path: '/my-analytics',
        description: 'Cost & performance insights',
        color: 'purple',
        roles: ['Customer']
      },
      {
        id: 'support',
        label: 'Support Center',
        icon: MessageSquare,
        path: '/support',
        description: 'Get help & create tickets',
        color: 'blue',
        roles: ['Customer']
      },
      {
        id: 'driver-app',
        label: 'Driver App',
        icon: Navigation,
        path: '/driver-app',
        description: 'Manage deliveries',
        color: 'purple',
        isNew: true,
        roles: ['Super Admin', 'Dispatcher']
      },
      // {
      //   id: 'shipments',
      //   label: 'Shipments',
      //   icon: Package,
      //   path: '/shipments',
      //   badge: { count: 12, type: 'info' },
      //   description: 'Track all deliveries',
      //   color: 'blue',
      //   subItems: [
      //     { label: 'All Shipments', path: '/shipments', count: '1,234' },
      //     { label: 'In Transit', path: '/shipments/in-transit', count: '45', status: 'active' },
      //     { label: 'Delayed', path: '/shipments/delayed', count: '8', status: 'warning' },
      //     { label: 'Delivered', path: '/shipments/delivered', count: '1,181', status: 'success' },
      //     { label: 'Exceptions', path: '/shipments/exceptions', count: '3', status: 'error' }
      //   ]
      // },
      // {
      //   id: 'orders',
      //   label: 'Orders',
      //   icon: ShoppingCart,
      //   path: '/orders',
      //   badge: { count: 5, type: 'warning' },
      //   description: 'Manage order fulfillment',
      //   color: 'green'
      // }
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
        roles: ['Super Admin', 'Fleet Officer', 'Dispatcher'],
        subItems: [
          { label: 'All Vehicles', path: '/fleet', count: '24' },
          { label: 'Active', path: '/fleet/active', count: '18', status: 'success' },
          { label: 'Maintenance', path: '/fleet/maintenance', count: '3', status: 'warning' },
          { label: 'Offline', path: '/fleet/offline', count: '3', status: 'error' }
        ]
      },
      // {
      //   id: 'routes',
      //   label: 'Routes & Live Map',
      //   icon: Map,
      //   path: '/routes',
      //   description: 'Real-time tracking',
      //   color: 'emerald',
      //   isNew: true
      // },
      // {
      //   id: 'warehouses',
      //   label: 'Warehouses',
      //   icon: Warehouse,
      //   path: '/warehouses',
      //   description: 'Inventory management',
      //   color: 'purple',
      //   subItems: [
      //     { label: 'All Locations', path: '/warehouses', count: '8' },
      //     { label: 'Inventory', path: '/warehouses/inventory' },
      //     { label: 'Stock Alerts', path: '/warehouses/alerts', count: '2', status: 'warning' }
      //   ]
      // },
      // {
      //   id: 'tasks',
      //   label: 'Dispatch Board',
      //   icon: Clipboard,
      //   path: '/tasks',
      //   description: 'Task management',
      //   color: 'orange'
      // },
      {
        id: 'temperature',
        label: 'Temperature',
        icon: Thermometer,
        path: '/temperature',
        description: 'Cold chain monitoring',
        color: 'cyan',
        badge: { count: 3, type: 'error' },
        roles: ['Super Admin', 'Fleet Officer']
      }
    ]
  },
  {
    title: 'People & Analytics',
    items: [
      {
        id: 'customers',
        label: 'Clients & Orders',
        icon: Users,
        path: '/customers',
        description: 'Client & order management',
        color: 'blue',
        roles: ['Super Admin', 'Support']
      },
      {
        id: 'drivers',
        label: 'Drivers & Staff',
        icon: UserCheck,
        path: '/drivers',
        description: 'Personnel management',
        color: 'green',
        roles: ['Super Admin', 'Fleet Officer']
      },
      {
        id: 'analytics',
        label: 'Reports',
        icon: BarChart3,
        path: '/reports',
        description: 'Reports & insights',
        color: 'violet',
        roles: ['Super Admin', 'Fleet Officer', 'Finance', 'Support']
      },
      {
        id: 'payments',
        label: 'Payments',
        icon: CreditCard,
        path: '/payments',
        description: 'Invoicing & revenue',
        color: 'green',
        badge: { count: 1, type: 'warning' },
        roles: ['Super Admin', 'Finance'],
        subItems: [
          { label: 'All Payments', path: '/payments' },
          { label: 'Payment History', path: '/payment-history' },
          { label: 'Invoices', path: '/tracking/invoice' },
          { label: 'Outstanding', path: '/payments?status=pending', count: '5', status: 'warning' },
          { label: 'Reconciliation', path: '/payments/reconciliation', status: 'success' }
        ]
      },
      {
        id: 'pricing',
        label: 'Pricing Rules',
        icon: DollarSign,
        path: '/pricing-management',
        description: 'Configure pricing',
        color: 'emerald',
        isNew: true,
        roles: ['Super Admin', 'Finance']
      }
    ]
  },
  {
    title: 'System',
    items: [
      // {
      //   id: 'alerts',
      //   label: 'Alerts & Incidents',
      //   icon: AlertTriangle,
      //   path: '/alerts',
      //   badge: { count: 3, type: 'error' },
      //   description: 'System notifications',
      //   color: 'red'
      // },
      // {
      //   id: 'integrations',
      //   label: 'Integrations',
      //   icon: Puzzle,
      //   path: '/integrations',
      //   description: 'Third-party connections',
      //   color: 'gray'
      // },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        path: '/settings',
        description: 'System configuration',
        color: 'gray',
        roles: ['Super Admin'],
        subItems: [
          { label: 'System Settings', path: '/settings' },
          { label: 'User Roles', path: '/settings/roles' },
          { label: 'Notifications', path: '/settings/notifications' },
          { label: 'Security', path: '/settings/security' }
        ]
      },
      // {
      //   id: 'help',
      //   label: 'Help & Support',
      //   icon: HelpCircle,
      //   path: '/help',
      //   description: '24/7 assistance',
      //   color: 'blue'
      // }
    ]
  }
]