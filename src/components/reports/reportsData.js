export const reportsData = {
  tripPerformance: { onTime: 92, delayed: 6, cancelled: 2 },
  fleetUtilization: { active: 75, idle: 20, maintenance: 5 },
  temperatureCompliance: 94,
  maintenanceCost: 1250000,
  
  revenueTrend: [
    { month: 'Jan', revenue: 5200000 },
    { month: 'Feb', revenue: 5800000 },
    { month: 'Mar', revenue: 6100000 },
    { month: 'Apr', revenue: 6500000 },
    { month: 'May', revenue: 7000000 },
    { month: 'Jun', revenue: 7240000 }
  ],
  
  tripCounts: [
    { route: 'Lagos-Ibadan', count: 156 },
    { route: 'Lagos-Kano', count: 89 },
    { route: 'Lagos-Abuja', count: 234 },
    { route: 'Port Harcourt-Aba', count: 145 },
    { route: 'Kano-Kaduna', count: 67 }
  ],
  
  revenueByClient: [
    { client: 'Adebayo Industries', revenue: 2450000 },
    { client: 'Port Harcourt Logistics', revenue: 3890000 },
    { client: 'Kano Distribution', revenue: 1280000 },
    { client: 'Abuja Enterprises', revenue: 670000 }
  ],
  
  geographicPerformance: [
    { region: 'Lagos', performance: 95, trips: 450 },
    { region: 'Abuja', performance: 92, trips: 280 },
    { region: 'Kano', performance: 88, trips: 190 },
    { region: 'Port Harcourt', performance: 94, trips: 320 }
  ]
}
