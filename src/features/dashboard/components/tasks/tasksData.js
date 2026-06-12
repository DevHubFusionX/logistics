export const taskStatuses = {
  unassigned: { label: 'Unassigned', color: 'bg-gray-500', bgColor: 'bg-gray-50' },
  assigned: { label: 'Assigned', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
  en_route: { label: 'En Route', color: 'bg-yellow-500', bgColor: 'bg-yellow-50' },
  complete: { label: 'Complete', color: 'bg-green-500', bgColor: 'bg-green-50' }
}

export const mockTasks = [
  {
    id: 1,
    title: 'Pickup - Electronics Shipment',
    description: 'Collect 15 boxes from Tech Solutions Ltd',
    status: 'unassigned',
    priority: 'high',
    customer: 'Tech Solutions Ltd',
    address: '123 Business Park, Lagos',
    scheduledTime: '09:00 AM',
    estimatedDuration: '45 min',
    driver: null,
    vehicle: null,
    photos: [],
    signature: null
  },
  {
    id: 2,
    title: 'Delivery - Medical Supplies',
    description: 'Urgent delivery to General Hospital',
    status: 'assigned',
    priority: 'critical',
    customer: 'General Hospital',
    address: '456 Medical Center, Abuja',
    scheduledTime: '10:30 AM',
    estimatedDuration: '30 min',
    driver: 'John Smith',
    vehicle: 'VH-001',
    photos: [],
    signature: null
  },
  {
    id: 3,
    title: 'Pickup & Delivery - Documents',
    description: 'Legal documents transfer',
    status: 'en_route',
    priority: 'medium',
    customer: 'Law Firm Associates',
    address: '789 Legal Plaza, Port Harcourt',
    scheduledTime: '02:00 PM',
    estimatedDuration: '60 min',
    driver: 'Sarah Johnson',
    vehicle: 'VH-002',
    photos: ['photo1.jpg'],
    signature: null
  },
  {
    id: 4,
    title: 'Delivery - Retail Goods',
    description: 'Consumer electronics delivery',
    status: 'complete',
    priority: 'low',
    customer: 'Electronics Store',
    address: '321 Shopping Mall, Lagos',
    scheduledTime: '08:00 AM',
    estimatedDuration: '40 min',
    driver: 'Mike Wilson',
    vehicle: 'VH-003',
    photos: ['photo1.jpg', 'photo2.jpg'],
    signature: 'signature.png'
  }
]

export const mockDrivers = [
  { id: 1, name: 'John Smith', status: 'available', vehicle: 'VH-001', phone: '+234-801-234-5678' },
  { id: 2, name: 'Sarah Johnson', status: 'busy', vehicle: 'VH-002', phone: '+234-802-345-6789' },
  { id: 3, name: 'Mike Wilson', status: 'available', vehicle: 'VH-003', phone: '+234-803-456-7890' },
  { id: 4, name: 'David Brown', status: 'offline', vehicle: 'VH-004', phone: '+234-804-567-8901' }
]

export const mockSchedule = [
  {
    id: 1,
    driverId: 1,
    driverName: 'John Smith',
    date: '2024-01-15',
    shifts: [
      { start: '08:00', end: '16:00', type: 'regular', tasks: [1, 2] },
    ]
  },
  {
    id: 2,
    driverId: 2,
    driverName: 'Sarah Johnson',
    date: '2024-01-15',
    shifts: [
      { start: '10:00', end: '18:00', type: 'regular', tasks: [3] },
    ]
  }
]