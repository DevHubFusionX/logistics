export const TRIPS_DATA = [
  {
    id: 'TRP-001',
    truckId: 'DRA-001',
    driverId: 'D001',
    driverName: 'Adebayo Ogun',
    origin: 'Lagos Warehouse',
    destination: 'Abuja Distribution Center',
    status: 'in_transit',
    cargoType: 'Pharmaceuticals',
    weight: 2500,
    value: 5000000,
    tempRange: { min: 2, max: 8 },
    tempAvg: 5.2,
    departure: '2024-01-30 06:00',
    eta: '2024-01-30 14:30',
    distance: 780,
    fuelUsed: 156,
    progress: 65,
    alerts: ['Temperature stable', 'On schedule']
  },
  {
    id: 'TRP-002',
    truckId: 'DRA-002',
    driverId: 'D002',
    driverName: 'Fatima Ahmed',
    origin: 'Kano Hub',
    destination: 'Port Harcourt Depot',
    status: 'in_transit',
    cargoType: 'Frozen Foods',
    weight: 3200,
    value: 2500000,
    tempRange: { min: -18, max: -15 },
    tempAvg: -16.8,
    departure: '2024-01-30 05:30',
    eta: '2024-01-30 18:45',
    distance: 1050,
    fuelUsed: 198,
    progress: 45,
    alerts: ['Route deviation detected', 'Temperature alert']
  },
  {
    id: 'TRP-003',
    truckId: 'DRA-003',
    driverId: 'D003',
    driverName: 'Chidi Okoro',
    origin: 'Port Harcourt Depot',
    destination: 'Enugu Station',
    status: 'delivered',
    cargoType: 'Dairy Products',
    weight: 1800,
    value: 1200000,
    tempRange: { min: 0, max: 4 },
    tempAvg: 2.5,
    departure: '2024-01-29 08:00',
    eta: '2024-01-29 11:30',
    distance: 180,
    fuelUsed: 42,
    progress: 100,
    alerts: []
  },
  {
    id: 'TRP-004',
    truckId: 'DRA-005',
    driverId: 'D005',
    driverName: 'Ibrahim Musa',
    origin: 'Kaduna Warehouse',
    destination: 'Lagos Warehouse',
    status: 'pending',
    cargoType: 'Medical Supplies',
    weight: 1500,
    value: 8000000,
    tempRange: { min: 15, max: 25 },
    tempAvg: null,
    departure: '2024-01-30 14:00',
    eta: '2024-01-31 02:00',
    distance: 650,
    fuelUsed: 0,
    progress: 0,
    alerts: []
  },
  {
    id: 'TRP-005',
    truckId: 'DRA-007',
    driverId: 'D002',
    driverName: 'Fatima Ahmed',
    origin: 'Abuja Hub',
    destination: 'Kano Distribution',
    status: 'cancelled',
    cargoType: 'Beverages',
    weight: 2800,
    value: 1500000,
    tempRange: { min: 2, max: 8 },
    tempAvg: null,
    departure: '2024-01-29 10:00',
    eta: '2024-01-29 16:00',
    distance: 420,
    fuelUsed: 0,
    progress: 0,
    alerts: ['Trip cancelled - Vehicle maintenance required']
  }
]

export const TRIP_TIMELINE = {
  'TRP-001': [
    { id: 1, event: 'Trip Created', time: '2024-01-30 05:30', status: 'completed', location: 'Lagos Warehouse' },
    { id: 2, event: 'Departure', time: '2024-01-30 06:00', status: 'completed', location: 'Lagos Warehouse' },
    { id: 3, event: 'Checkpoint 1', time: '2024-01-30 08:30', status: 'completed', location: 'Ibadan' },
    { id: 4, event: 'Checkpoint 2', time: '2024-01-30 11:00', status: 'completed', location: 'Lokoja' },
    { id: 5, event: 'Checkpoint 3', time: '2024-01-30 13:15', status: 'in_progress', location: 'Gwagwalada' },
    { id: 6, event: 'Delivery', time: '2024-01-30 14:30', status: 'pending', location: 'Abuja Distribution Center' }
  ],
  'TRP-003': [
    { id: 1, event: 'Trip Created', time: '2024-01-29 07:30', status: 'completed', location: 'Port Harcourt Depot' },
    { id: 2, event: 'Departure', time: '2024-01-29 08:00', status: 'completed', location: 'Port Harcourt Depot' },
    { id: 3, event: 'Checkpoint 1', time: '2024-01-29 09:30', status: 'completed', location: 'Aba' },
    { id: 4, event: 'Checkpoint 2', time: '2024-01-29 10:45', status: 'completed', location: 'Umuahia' },
    { id: 5, event: 'Delivery', time: '2024-01-29 11:30', status: 'completed', location: 'Enugu Station' },
    { id: 6, event: 'POD Uploaded', time: '2024-01-29 11:45', status: 'completed', location: 'Enugu Station' }
  ]
}

export const TRIP_TEMPERATURE_DATA = {
  'TRP-001': [
    { time: '06:00', temp: 5.5 },
    { time: '07:00', temp: 5.3 },
    { time: '08:00', temp: 5.1 },
    { time: '09:00', temp: 5.2 },
    { time: '10:00', temp: 5.4 },
    { time: '11:00', temp: 5.0 },
    { time: '12:00', temp: 5.2 },
    { time: '13:00', temp: 5.3 }
  ],
  'TRP-002': [
    { time: '05:30', temp: -16.5 },
    { time: '06:30', temp: -16.8 },
    { time: '07:30', temp: -16.2 },
    { time: '08:30', temp: -14.5 },
    { time: '09:30', temp: -13.8 },
    { time: '10:30', temp: -16.9 },
    { time: '11:30', temp: -16.7 }
  ]
}

export const TRIP_ALERTS = [
  {
    id: 1,
    tripId: 'TRP-002',
    type: 'route_deviation',
    severity: 'high',
    message: 'Vehicle DRA-002 deviated from planned route by 15km',
    time: '2024-01-30 09:45',
    resolved: false
  },
  {
    id: 2,
    tripId: 'TRP-002',
    type: 'temperature',
    severity: 'critical',
    message: 'Temperature exceeded maximum threshold: -13.8°C (Max: -15°C)',
    time: '2024-01-30 09:30',
    resolved: false
  },
  {
    id: 3,
    tripId: 'TRP-001',
    type: 'delay',
    severity: 'medium',
    message: 'Trip delayed by 15 minutes due to traffic',
    time: '2024-01-30 10:30',
    resolved: true
  }
]
