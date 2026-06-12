export const paymentsData = [
  {
    id: 'PAY-001',
    tripId: 'TRP-2401',
    client: 'Adebayo Industries',
    amount: 85000,
    status: 'paid',
    paymentDate: '2024-01-15',
    invoiceId: 'INV-2401',
    method: 'Paystack'
  },
  {
    id: 'PAY-002',
    tripId: 'TRP-2402',
    client: 'Kano Distribution Ltd',
    amount: 65000,
    status: 'pending',
    paymentDate: null,
    invoiceId: 'INV-2402',
    method: 'Bank Transfer'
  },
  {
    id: 'PAY-003',
    tripId: 'TRP-2403',
    client: 'Port Harcourt Logistics',
    amount: 120000,
    status: 'paid',
    paymentDate: '2024-01-14',
    invoiceId: 'INV-2403',
    method: 'Paystack'
  },
  {
    id: 'PAY-004',
    tripId: 'TRP-2404',
    client: 'Abuja Enterprises',
    amount: 95000,
    status: 'overdue',
    paymentDate: null,
    invoiceId: 'INV-2404',
    method: 'Bank Transfer'
  },
  {
    id: 'PAY-005',
    tripId: 'TRP-2405',
    client: 'Adebayo Industries',
    amount: 75000,
    status: 'paid',
    paymentDate: '2024-01-13',
    invoiceId: 'INV-2405',
    method: 'Paystack'
  },
]

export const revenueData = {
  today: 345000,
  week: 1850000,
  month: 7240000,
  daily: [
    { date: 'Mon', amount: 245000 },
    { date: 'Tue', amount: 320000 },
    { date: 'Wed', amount: 280000 },
    { date: 'Thu', amount: 365000 },
    { date: 'Fri', amount: 295000 },
    { date: 'Sat', amount: 180000 },
    { date: 'Sun', amount: 165000 },
  ]
}
