export const mockCustomers = [
  {
    id: 'C001',
    name: 'Adebayo Industries',
    email: 'contact@adebayo.com',
    phone: '+234-801-234-5678',
    totalShipments: 156,
    activeShipments: 8,
    revenue: 245000,
    status: 'active',
    tier: 'premium',
    location: 'Lagos',
    joinDate: '2023-01-15',
    lastOrder: '2024-01-10'
  },
  {
    id: 'C002',
    name: 'Kano Distribution Ltd',
    email: 'info@kanodist.com',
    phone: '+234-802-345-6789',
    totalShipments: 89,
    activeShipments: 3,
    revenue: 128000,
    status: 'active',
    tier: 'standard',
    location: 'Kano',
    joinDate: '2023-03-20',
    lastOrder: '2024-01-08'
  },
  {
    id: 'C003',
    name: 'Port Harcourt Logistics',
    email: 'support@phlogistics.com',
    phone: '+234-803-456-7890',
    totalShipments: 234,
    activeShipments: 12,
    revenue: 389000,
    status: 'active',
    tier: 'premium',
    location: 'Port Harcourt',
    joinDate: '2022-11-10',
    lastOrder: '2024-01-12'
  },
  {
    id: 'C004',
    name: 'Abuja Enterprises',
    email: 'hello@abujaent.com',
    phone: '+234-804-567-8901',
    totalShipments: 45,
    activeShipments: 0,
    revenue: 67000,
    status: 'inactive',
    tier: 'basic',
    location: 'Abuja',
    joinDate: '2023-08-05',
    lastOrder: '2023-12-15'
  }
]

export const customerTiers = {
  premium: { label: 'Premium', color: 'bg-purple-100 text-purple-700' },
  standard: { label: 'Standard', color: 'bg-blue-100 text-blue-700' },
  basic: { label: 'Basic', color: 'bg-gray-100 text-gray-700' }
}

export const customerStats = {
  total: 156,
  active: 142,
  premium: 45,
  newThisMonth: 12
}