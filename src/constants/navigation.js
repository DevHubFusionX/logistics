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
        id: 'admin-dashboard',
        label: 'Admin Overview',
        icon: BarChart3,
        path: '/dashboard',
        description: 'Dashboard summary',
        color: 'sky',
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
        id: 'driver-app',
        label: 'Driver App',
        icon: Navigation,
        path: '/driver-app',
        description: 'Manage deliveries',
        color: 'purple',
        comingSoon: true,
        roles: ['Super Admin', 'Dispatcher']
      },
      {
        id: 'bookings',
        label: 'New Booking',
        icon: Package,
        path: '/booking/request',
        description: 'Create new shipment',
        color: 'green',
        roles: ['Support', 'Customer']
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
        comingSoon: true,
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
      }
    ]
  },
  {
    title: 'Operations',
    items: [
      {
        id: 'admin-bookings',
        label: 'Bookings',
        icon: Package,
        path: '/bookings-management',
        description: 'Manage all shipments',
        color: 'blue',
        roles: ['Super Admin', 'Fleet Officer', 'Dispatcher']
      },
      {
        id: 'user-bookings',
        label: 'User Bookings',
        icon: Users,
        path: '/customers', // Fallback to customers list to select a user
        description: 'View bookings by user',
        color: 'indigo',
        roles: ['Super Admin', 'Fleet Officer', 'Dispatcher']
      },
      {
        id: 'fleet',
        label: 'Fleet Management',
        icon: Truck,
        path: '/fleet',
        description: 'Vehicles & maintenance',
        color: 'indigo',
        comingSoon: true,
        roles: ['Super Admin', 'Fleet Officer', 'Dispatcher'],
        subItems: [
          { label: 'All Vehicles', path: '/fleet', count: '24' },
          { label: 'Active', path: '/fleet/active', count: '18', status: 'success' },
          { label: 'Maintenance', path: '/fleet/maintenance', count: '3', status: 'warning' },
          { label: 'Offline', path: '/fleet/offline', count: '3', status: 'error' }
        ]
      },
      {
        id: 'temperature',
        label: 'Temperature',
        icon: Thermometer,
        path: '/temperature',
        description: 'Cold chain monitoring',
        color: 'cyan',
        comingSoon: true,
        badge: { count: 3, type: 'error' },
        roles: ['Super Admin', 'Fleet Officer']
      }
    ]
  },
  {
    title: 'People & Analytics',
    items: [

      {
        id: 'drivers',
        label: 'Drivers & Staff',
        icon: UserCheck,
        path: '/drivers',
        description: 'Personnel management',
        color: 'green',
        comingSoon: true,
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
      }
    ]
  }
]