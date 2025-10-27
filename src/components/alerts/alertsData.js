export const alertSeverities = {
  critical: { label: 'Critical', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
  high: { label: 'High', color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-50' },
  medium: { label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
  low: { label: 'Low', color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' }
}

export const alertTypes = [
  { id: 'delayed_eta', label: 'Delayed ETA', category: 'delivery' },
  { id: 'offline_vehicle', label: 'Offline Vehicle', category: 'vehicle' },
  { id: 'customs_hold', label: 'Customs Hold', category: 'customs' },
  { id: 'fuel_threshold', label: 'Fuel Threshold', category: 'maintenance' },
  { id: 'maintenance_due', label: 'Maintenance Due', category: 'maintenance' },
  { id: 'route_deviation', label: 'Route Deviation', category: 'delivery' },
  { id: 'temperature_alert', label: 'Temperature Alert', category: 'cargo' }
]

export const mockAlerts = [
  {
    id: 1,
    title: 'Vehicle VH-001 Offline',
    description: 'Vehicle has been offline for 45 minutes',
    severity: 'critical',
    type: 'offline_vehicle',
    assignedTo: 'John Smith',
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 15 * 60 * 1000),
    status: 'open'
  },
  {
    id: 2,
    title: 'Delayed Delivery - SH-2024-001',
    description: 'Shipment is 2 hours behind schedule',
    severity: 'high',
    type: 'delayed_eta',
    assignedTo: 'Sarah Johnson',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
    status: 'in_progress'
  },
  {
    id: 3,
    title: 'Customs Hold - Port Lagos',
    description: 'Shipment held at customs for inspection',
    severity: 'medium',
    type: 'customs_hold',
    assignedTo: 'Mike Wilson',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 18 * 60 * 60 * 1000),
    status: 'open'
  },
  {
    id: 4,
    title: 'Low Fuel Alert - VH-003',
    description: 'Vehicle fuel level below 15%',
    severity: 'medium',
    type: 'fuel_threshold',
    assignedTo: 'David Brown',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    slaDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: 'open'
  }
]

export const notificationChannels = [
  { id: 'email', label: 'Email', icon: 'Mail' },
  { id: 'sms', label: 'SMS', icon: 'MessageSquare' },
  { id: 'push', label: 'Push Notification', icon: 'Bell' }
]