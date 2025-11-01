// Development-only mock data
// This file is only imported when VITE_USE_MOCK_DATA=true

export const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Super Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Fleet Officer' }
]

export const MOCK_BOOKINGS = [
  {
    id: 'BK-2024-001',
    customerName: 'Acme Corp',
    status: 'pending_assignment',
    pickupCity: 'Lagos',
    deliveryCity: 'Abuja',
    amount: 25000,
    createdAt: '2024-01-15'
  }
]

export const MOCK_FLEET = [
  {
    id: 'VH-001',
    plate: 'ABC-123',
    status: 'active',
    driver: 'John Driver',
    location: { lat: 6.5244, lng: 3.3792 }
  }
]

export const MOCK_DRIVERS = [
  {
    id: 'DR-001',
    name: 'John Driver',
    phone: '08012345678',
    status: 'available',
    rating: 4.8
  }
]

export const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true'
