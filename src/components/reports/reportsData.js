import { 
  Clock, 
  DollarSign, 
  Route, 
  User, 
  AlertTriangle, 
  Package 
} from 'lucide-react'

export const prebuiltReports = [
  {
    id: 'on-time-delivery',
    title: 'On-time Delivery',
    description: 'Track delivery performance and punctuality metrics',
    icon: Clock,
    color: 'bg-green-500',
    metrics: '94.2% on-time rate'
  },
  {
    id: 'cost-per-shipment',
    title: 'Cost per Shipment',
    description: 'Analyze shipping costs and profitability trends',
    icon: DollarSign,
    color: 'bg-blue-500',
    metrics: '$45.30 avg cost'
  },
  {
    id: 'route-efficiency',
    title: 'Route Efficiency',
    description: 'Optimize routes and reduce fuel consumption',
    icon: Route,
    color: 'bg-purple-500',
    metrics: '87% efficiency'
  },
  {
    id: 'driver-performance',
    title: 'Driver Performance',
    description: 'Monitor driver metrics and safety scores',
    icon: User,
    color: 'bg-orange-500',
    metrics: '4.8/5 avg rating'
  },
  {
    id: 'exception-causes',
    title: 'Exception Root Causes',
    description: 'Identify and analyze delivery exceptions',
    icon: AlertTriangle,
    color: 'bg-red-500',
    metrics: '12% exception rate'
  },
  {
    id: 'warehouse-throughput',
    title: 'Warehouse Throughput',
    description: 'Track warehouse processing and capacity',
    icon: Package,
    color: 'bg-indigo-500',
    metrics: '2,340 items/day'
  }
]

export const dimensions = [
  { id: 'date', label: 'Date', type: 'date' },
  { id: 'location', label: 'Location', type: 'category' },
  { id: 'driver', label: 'Driver', type: 'category' },
  { id: 'vehicle', label: 'Vehicle', type: 'category' },
  { id: 'route', label: 'Route', type: 'category' },
  { id: 'customer', label: 'Customer', type: 'category' }
]

export const measures = [
  { id: 'delivery_time', label: 'Delivery Time', type: 'numeric' },
  { id: 'cost', label: 'Cost', type: 'currency' },
  { id: 'distance', label: 'Distance', type: 'numeric' },
  { id: 'fuel_consumption', label: 'Fuel Consumption', type: 'numeric' },
  { id: 'shipment_count', label: 'Shipment Count', type: 'count' },
  { id: 'revenue', label: 'Revenue', type: 'currency' }
]