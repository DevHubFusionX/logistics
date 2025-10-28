export const mockDrivers = [
  {
    id: 'D001',
    name: 'Adebayo Ogun',
    email: 'adebayo@logistics.com',
    phone: '+234-801-234-5678',
    licenseNumber: 'LAG-DL-2022-45678',
    assignedTruck: 'DRA-001',
    status: 'available',
    performanceScore: 96,
    rating: 4.8,
    totalDeliveries: 342,
    onTimeRate: 96,
    location: 'Lagos',
    joinDate: '2022-05-15',
    licenseExpiry: '2025-08-20',
    address: '45 Marina Street, Lagos Island',
    emergencyContact: '+234-801-999-8888',
    complianceNotes: 'Excellent safety record. No violations in past 2 years.'
  },
  {
    id: 'D002',
    name: 'Fatima Ahmed',
    email: 'fatima@logistics.com',
    phone: '+234-802-345-6789',
    licenseNumber: 'KAN-DL-2022-78901',
    assignedTruck: 'DRA-002',
    status: 'on_trip',
    performanceScore: 98,
    rating: 4.9,
    totalDeliveries: 289,
    onTimeRate: 98,
    location: 'Kano',
    joinDate: '2022-08-10',
    licenseExpiry: '2026-03-15',
    address: '12 Bompai Road, Kano',
    emergencyContact: '+234-802-888-7777',
    complianceNotes: 'Top performer. Completed advanced driving certification.'
  },
  {
    id: 'D003',
    name: 'Chidi Okoro',
    email: 'chidi@logistics.com',
    phone: '+234-803-456-7890',
    licenseNumber: 'PHC-DL-2021-34567',
    assignedTruck: 'DRA-003',
    status: 'available',
    performanceScore: 94,
    rating: 4.7,
    totalDeliveries: 412,
    onTimeRate: 94,
    location: 'Port Harcourt',
    joinDate: '2021-11-20',
    licenseExpiry: '2024-12-30',
    address: '78 Trans Amadi, Port Harcourt',
    emergencyContact: '+234-803-777-6666',
    complianceNotes: 'License renewal due soon. Reminder sent.'
  },
  {
    id: 'D004',
    name: 'Amina Hassan',
    email: 'amina@logistics.com',
    phone: '+234-804-567-8901',
    licenseNumber: 'ABJ-DL-2023-12345',
    assignedTruck: null,
    status: 'inactive',
    performanceScore: 92,
    rating: 4.6,
    totalDeliveries: 156,
    onTimeRate: 92,
    location: 'Abuja',
    joinDate: '2023-02-05',
    licenseExpiry: '2027-01-10',
    address: '23 Gwarinpa Estate, Abuja',
    emergencyContact: '+234-804-666-5555',
    complianceNotes: 'On leave. Returns next week.'
  },
  {
    id: 'D005',
    name: 'Ibrahim Musa',
    email: 'ibrahim@logistics.com',
    phone: '+234-805-678-9012',
    licenseNumber: 'KAD-DL-2023-56789',
    assignedTruck: 'DRA-007',
    status: 'on_trip',
    performanceScore: 95,
    rating: 4.8,
    totalDeliveries: 234,
    onTimeRate: 95,
    location: 'Kaduna',
    joinDate: '2023-01-15',
    licenseExpiry: '2026-11-20',
    address: '56 Kachia Road, Kaduna',
    emergencyContact: '+234-805-555-4444',
    complianceNotes: 'Clean record. Completed hazmat training.'
  },
  {
    id: 'D006',
    name: 'Ngozi Eze',
    email: 'ngozi@logistics.com',
    phone: '+234-806-789-0123',
    licenseNumber: 'ENS-DL-2022-90123',
    assignedTruck: 'DRA-006',
    status: 'available',
    performanceScore: 97,
    rating: 4.9,
    totalDeliveries: 298,
    onTimeRate: 97,
    location: 'Enugu',
    joinDate: '2022-06-20',
    licenseExpiry: '2025-09-15',
    address: '34 Independence Layout, Enugu',
    emergencyContact: '+234-806-444-3333',
    complianceNotes: 'Outstanding performance. Zero incidents.'
  }
]

export const driverStats = {
  total: 48,
  active: 32,
  busy: 12,
  offline: 4,
  avgRating: 4.7
}


export const DRIVER_DOCUMENTS = {
  'D001': [
    { id: 1, type: 'License', name: 'drivers_license.pdf', uploadDate: '2022-05-15', status: 'valid' },
    { id: 2, type: 'ID Card', name: 'national_id.pdf', uploadDate: '2022-05-15', status: 'valid' },
    { id: 3, type: 'Certification', name: 'defensive_driving_cert.pdf', uploadDate: '2023-03-10', status: 'valid' }
  ],
  'D002': [
    { id: 1, type: 'License', name: 'drivers_license.pdf', uploadDate: '2022-08-10', status: 'valid' },
    { id: 2, type: 'ID Card', name: 'national_id.pdf', uploadDate: '2022-08-10', status: 'valid' },
    { id: 3, type: 'Certification', name: 'advanced_driving_cert.pdf', uploadDate: '2023-06-15', status: 'valid' }
  ]
}

export const DRIVER_TRIP_HISTORY = {
  'D001': [
    { id: 'T001', route: 'Lagos → Abuja', date: '2024-01-28', duration: '8h 30m', status: 'completed', onTime: true },
    { id: 'T002', route: 'Abuja → Kano', date: '2024-01-26', duration: '6h 15m', status: 'completed', onTime: true },
    { id: 'T003', route: 'Kano → Lagos', date: '2024-01-24', duration: '12h 45m', status: 'completed', onTime: false },
    { id: 'T004', route: 'Lagos → Port Harcourt', date: '2024-01-22', duration: '7h 20m', status: 'completed', onTime: true },
    { id: 'T005', route: 'Port Harcourt → Enugu', date: '2024-01-20', duration: '3h 10m', status: 'completed', onTime: true },
    { id: 'T006', route: 'Enugu → Abuja', date: '2024-01-18', duration: '5h 45m', status: 'completed', onTime: true },
    { id: 'T007', route: 'Abuja → Lagos', date: '2024-01-16', duration: '9h 20m', status: 'completed', onTime: true },
    { id: 'T008', route: 'Lagos → Ibadan', date: '2024-01-14', duration: '2h 30m', status: 'completed', onTime: true },
    { id: 'T009', route: 'Ibadan → Lagos', date: '2024-01-12', duration: '2h 45m', status: 'completed', onTime: true },
    { id: 'T010', route: 'Lagos → Benin', date: '2024-01-10', duration: '6h 15m', status: 'completed', onTime: true }
  ]
}
