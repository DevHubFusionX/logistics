// Home Page Data - Moved to src/components/landing/Data.jsx

// KPI Data - Cold-Chain Focused Metrics
export const KPI_DATA = [
  // Revenue / Earnings
  {
    id: 'revenue_last_month',
    title: 'Net Revenue (Last Month)',
    value: '₦23,000,000',
    change: 0,
    period: 'Total fulfilled revenue for February 2026.',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  {
    id: 'revenue_last_week',
    title: 'Net Revenue (Last Week)',
    value: '₦5,200,000',
    change: 0,
    period: 'Rolling 7-day fulfilled revenue (Mar 20 – Mar 26).',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  {
    id: 'revenue_this_month',
    title: 'Net Revenue (MTD)',
    value: '₦24,850,000',
    change: 0,
    period: 'Month-to-Date fulfilled revenue for March 2026.',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  {
    id: 'revenue_this_year',
    title: 'Net Revenue (YTD)',
    value: '₦86,100,000',
    change: 0,
    period: 'Year-to-Date fulfilled revenue (Jan 1 – Mar 27, 2026).',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  {
    id: 'total_gmv',
    title: 'Total GMV',
    value: '₦165,900,000',
    change: 0,
    period: 'Gross Merchandise Value (since Oct 2025).',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  // Trips & Fulfillment
  {
    id: 'completed_trips',
    title: 'Cold-Chain Trips Completed',
    value: '42',
    change: 0,
    period: 'total to date',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'blue'
  },
  {
    id: 'pending_trips',
    title: 'Trips Pending/In Progress',
    value: '4',
    change: 0,
    period: 'currently active',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'orange'
  },
  {
    id: 'trip_timeline',
    title: 'Trip Timeline',
    value: 'Real-time',
    change: 0,
    period: 'live updates',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'blue'
  },
  {
    id: 'fleet_map',
    title: 'Live Fleet Map',
    value: '6 Trucks',
    change: 0,
    period: 'active vehicles',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'blue'
  },
  {
    id: 'active_drivers',
    title: 'Active Drivers',
    value: '18',
    change: 2,
    period: 'on duty',
    sparklineData: [15, 16, 18, 17, 18, 18, 18],
    color: 'green'
  },
  {
    id: 'fleet_health',
    title: 'Fleet Health',
    value: '98%',
    change: 0,
    period: 'operational',
    sparklineData: [95, 96, 98, 98, 98, 98, 98],
    color: 'emerald'
  },
  {
    id: 'ontime_rate',
    title: 'On-time Rate',
    value: '99.2%',
    change: 0.5,
    period: 'vs last month',
    sparklineData: [98, 98.5, 99, 99.2, 99.2, 99.2, 99.2],
    color: 'purple'
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