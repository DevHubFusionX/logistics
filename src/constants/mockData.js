// Home Page Data - Moved to src/components/landing/Data.jsx

// KPI Data - Cold-Chain Focused Metrics
export const KPI_DATA = [
  // Revenue / Earnings
  {
    id: 'revenue_last_month',
    title: 'Net Revenue (Last Month)',
    value: '₦0',
    change: 0,
    period: 'Total fulfilled revenue for the previous month.',
    sparklineData: [],
    color: 'green'
  },
  {
    id: 'revenue_last_week',
    title: 'Net Revenue (Last Week)',
    value: '₦0',
    change: 0,
    period: 'Rolling 7-day fulfilled revenue.',
    sparklineData: [],
    color: 'green'
  },
  {
    id: 'revenue_this_month',
    title: 'Net Revenue (MTD)',
    value: '₦53,250,000',
    change: 0,
    period: 'Month-to-Date fulfilled revenue.',
    sparklineData: [],
    color: 'green'
  },
  {
    id: 'revenue_this_year',
    title: 'Net Revenue (YTD)',
    value: '₦289,470,000',
    change: 0,
    period: 'Year-to-Date fulfilled revenue.',
    sparklineData: [],
    color: 'green'
  },

  // Trips & Fulfillment
  {
    id: 'completed_trips',
    title: 'Cold-Chain Trips Completed',
    value: '223',
    change: 0,
    period: 'Total completed to date.',
    sparklineData: [],
    color: 'blue'
  },
  {
    id: 'pending_trips',
    title: 'Trips Pending/In Progress',
    value: '7',
    change: 0,
    period: 'Currently active.',
    sparklineData: [],
    color: 'orange'
  },
  {
    id: 'trip_timeline',
    title: 'Trip Timeline',
    value: 'Active',
    change: 0,
    period: 'Live updates from fleet.',
    sparklineData: [],
    color: 'blue'
  },
  {
    id: 'fleet_map',
    title: 'Live Fleet Map',
    value: '76 Trucks',
    change: 0,
    period: 'Active vehicles.',
    sparklineData: [],
    color: 'blue'
  },
  {
    id: 'active_drivers',
    title: 'Active Drivers',
    value: '61',
    change: 0,
    period: 'Currently on duty.',
    sparklineData: [],
    color: 'green'
  },
  {
    id: 'fleet_health',
    title: 'Fleet Health',
    value: '100%',
    change: 0,
    period: 'Operational status.',
    sparklineData: [],
    color: 'emerald'
  },
  {
    id: 'ontime_rate',
    title: 'On-time Rate',
    value: '90%',
    change: 0,
    period: 'Performance vs target.',
    sparklineData: [],
    color: 'purple'
  },
  {
    id: 'booking_mtd',
    title: 'Bookings (MTD)',
    value: '32',
    change: 0,
    period: 'Volume for current month.',
    sparklineData: [],
    color: 'blue'
  },
  {
    id: 'booking_ytd',
    title: 'Bookings (YTD)',
    value: '233',
    change: 0,
    period: 'Volume for current year.',
    sparklineData: [],
    color: 'blue'
  },
  {
    id: 'total_bookings',
    title: 'Total Bookings',
    value: '246',
    change: 0,
    period: 'All-time system volume.',
    sparklineData: [],
    color: 'blue'
  }
]

// Re-export from canonical source to maintain backward compatibility
export { KPI_ROUTES, MAINTENANCE_SCHEDULE, AUTO_SCHEDULE_THRESHOLDS, FILTER_OPTIONS } from './logistics'