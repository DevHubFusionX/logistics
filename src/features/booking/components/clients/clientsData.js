export const clientsData = [
  {
    id: 'CL001',
    name: 'Adebayo Industries',
    industry: 'Manufacturing',
    email: 'contact@adebayo.com',
    phone: '+234-801-234-5678',
    accountOfficer: 'Amina Yusuf',
    totalTrips: 156,
    activeTrips: 8,
    paymentStatus: 'current',
    lastActive: '2 hours ago',
    revenue: 2450000,
    address: '45 Industrial Avenue, Ikeja, Lagos',
    customPricing: { baseRate: 85000, discount: 15 }
  },
  {
    id: 'CL002',
    name: 'Kano Distribution Ltd',
    industry: 'Retail',
    email: 'info@kanodist.com',
    phone: '+234-802-345-6789',
    accountOfficer: 'Chidi Okoro',
    totalTrips: 89,
    activeTrips: 3,
    paymentStatus: 'overdue',
    lastActive: '1 day ago',
    revenue: 1280000,
    address: '12 Market Road, Kano',
    customPricing: { baseRate: 75000, discount: 10 }
  },
  {
    id: 'CL003',
    name: 'Port Harcourt Logistics',
    industry: 'Oil & Gas',
    email: 'support@phlogistics.com',
    phone: '+234-803-456-7890',
    accountOfficer: 'Fatima Ahmed',
    totalTrips: 234,
    activeTrips: 12,
    paymentStatus: 'current',
    lastActive: '30 min ago',
    revenue: 3890000,
    address: '78 Trans Amadi, Port Harcourt',
    customPricing: { baseRate: 95000, discount: 20 }
  },
  {
    id: 'CL004',
    name: 'Abuja Enterprises',
    industry: 'Technology',
    email: 'hello@abujaent.com',
    phone: '+234-804-567-8901',
    accountOfficer: 'Emeka Nwosu',
    totalTrips: 45,
    activeTrips: 2,
    paymentStatus: 'pending',
    lastActive: '5 hours ago',
    revenue: 670000,
    address: '23 Central Business District, Abuja',
    customPricing: { baseRate: 70000, discount: 5 }
  },
]

export const clientShipments = {
  'CL001': [
    { id: 'TRP-2401', route: 'Lagos → Ibadan', status: 'in-transit', date: '2024-01-15', amount: 85000 },
    { id: 'TRP-2398', route: 'Lagos → Kano', status: 'delivered', date: '2024-01-12', amount: 120000 },
    { id: 'TRP-2385', route: 'Lagos → Abuja', status: 'delivered', date: '2024-01-08', amount: 95000 },
  ],
  'CL002': [
    { id: 'TRP-2402', route: 'Kano → Kaduna', status: 'in-transit', date: '2024-01-14', amount: 65000 },
    { id: 'TRP-2390', route: 'Kano → Abuja', status: 'delivered', date: '2024-01-10', amount: 75000 },
  ],
}

export const paymentHistory = {
  'CL001': [
    { id: 'PAY-001', date: '2024-01-10', amount: 340000, status: 'paid', method: 'Bank Transfer' },
    { id: 'PAY-002', date: '2023-12-28', amount: 255000, status: 'paid', method: 'Bank Transfer' },
  ],
  'CL002': [
    { id: 'PAY-003', date: '2024-01-05', amount: 140000, status: 'overdue', method: 'Bank Transfer' },
  ],
}
