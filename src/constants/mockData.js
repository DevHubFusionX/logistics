// Home Page Data - Moved to src/components/landing/Data.jsx

// KPI Data - Cold-Chain Focused Metrics
export const KPI_DATA = [
  // Revenue / Earnings
  {
    id: 'revenue_last_month',
    title: 'Net Revenue (Last Month)',
    value: '₦2,190,000',
    change: 0,
    period: 'vs prev month',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  {
    id: 'revenue_last_week',
    title: 'Net Revenue (Last Week)',
    value: '₦520,000',
    change: 0,
    period: 'vs prev week',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  {
    id: 'revenue_this_month',
    title: 'Net Revenue (MTD)',
    value: '₦1,050,000',
    change: 0,
    period: 'month to date',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  {
    id: 'revenue_this_year',
    title: 'Net Revenue (YTD)',
    value: '₦6,280,000',
    change: 0,
    period: 'year to date',
    sparklineData: [0, 0, 0, 0, 0, 0, 0],
    color: 'green'
  },
  {
    id: 'total_gmv',
    title: 'Total GMV',
    value: '₦41,900,000',
    change: 0,
    period: 'billed to clients',
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