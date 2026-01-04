// Home Page Data - Moved to src/components/landing/Data.jsx

// KPI Data
export const KPI_DATA = [
  {
    id: 'active_trucks',
    title: 'Active Trucks',
    value: '48',
    change: 8.3,
    period: '24h',
    sparklineData: [42, 44, 46, 45, 47, 49, 48],
    color: 'blue'
  },
  {
    id: 'ongoing_trips',
    title: 'Ongoing Trips',
    value: '127',
    change: 5.2,
    period: '24h',
    sparklineData: [115, 118, 122, 120, 125, 128, 127],
    color: 'blue'
  },
  {
    id: 'completed',
    title: 'Completed Deliveries',
    value: '1,847',
    change: 12.4,
    period: '7d',
    sparklineData: [1600, 1650, 1700, 1750, 1800, 1820, 1847],
    color: 'green'
  },
  {
    id: 'failed',
    title: 'Failed Deliveries',
    value: '23',
    change: -15.2,
    period: '7d',
    sparklineData: [35, 32, 28, 26, 24, 25, 23],
    color: 'green'
  },
  {
    id: 'temperature',
    title: 'Avg Truck Temperature',
    value: '22.5',
    unit: '°C',
    change: 2.1,
    period: '24h',
    sparklineData: [21, 21.5, 22, 22.5, 23, 22.8, 22.5],
    color: 'blue'
  },
  {
    id: 'revenue',
    title: 'Daily Revenue',
    value: '₦2.4M',
    change: 18.7,
    period: '24h',
    sparklineData: [1.8, 2.0, 2.1, 2.3, 2.2, 2.5, 2.4],
    color: 'green'
  },
  {
    id: 'alerts',
    title: 'Active Alerts',
    value: '8',
    change: -25.0,
    period: '24h',
    sparklineData: [15, 13, 11, 10, 9, 10, 8],
    color: 'green'
  }
]

// Route mappings for KPI navigation
export const KPI_ROUTES = {
  ontime: '/analytics/delivery-performance',
  shipments: '/shipments',
  fleet: '/fleet',
  delivery_time: '/analytics/delivery-times',
  fuel_cost: '/analytics/fuel-costs',
  warehouse: '/warehouses',
  satisfaction: '/analytics/customer-satisfaction'
}

// Maintenance schedule data
export const MAINTENANCE_SCHEDULE = [
  { id: 'VH001', plate: 'ABC-123', type: 'Oil Change', due: '2024-01-25', priority: 'high', mileage: 45230 },
  { id: 'VH003', plate: 'DEF-789', type: 'Brake Inspection', due: '2024-01-28', priority: 'medium', mileage: 38500 },
  { id: 'VH002', plate: 'XYZ-456', type: 'Tire Rotation', due: '2024-02-02', priority: 'low', mileage: 32100 },
  { id: 'VH004', plate: 'GHI-012', type: 'Engine Service', due: '2024-02-05', priority: 'high', mileage: 52000 }
]

// Auto-schedule thresholds
export const AUTO_SCHEDULE_THRESHOLDS = {
  'Oil Change': 5000,
  'Brake Inspection': 15000,
  'Tire Rotation': 10000,
  'Engine Service': 20000
}

// Filter options
export const FILTER_OPTIONS = {
  status: [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'exception', label: 'Exception' }
  ],
  priority: [
    { value: '', label: 'All Priority' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ],
  dateRange: [
    { value: '', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ]
}