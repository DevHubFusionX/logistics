export const temperatureData = [
  { truck: 'DRA-017', tripId: 'TRP-2401', currentTemp: 8, minTemp: 2, maxTemp: 5, deviation: 60, lastUpdated: '2 min ago', status: 'alert' },
  { truck: 'DRA-019', tripId: 'TRP-2402', currentTemp: null, minTemp: -18, maxTemp: -15, deviation: 0, lastUpdated: '15 min ago', status: 'offline' },
  { truck: 'DRA-023', tripId: 'TRP-2403', currentTemp: 3, minTemp: 2, maxTemp: 5, deviation: 0, lastUpdated: '1 min ago', status: 'normal' },
  { truck: 'DRA-031', tripId: 'TRP-2404', currentTemp: 6, minTemp: 2, maxTemp: 5, deviation: 20, lastUpdated: '3 min ago', status: 'warning' },
  { truck: 'DRA-045', tripId: 'TRP-2405', currentTemp: 4, minTemp: 2, maxTemp: 5, deviation: 0, lastUpdated: '1 min ago', status: 'normal' },
]

export const temperatureHistory = {
  'DRA-017': [
    { time: '10:00', temp: 3 },
    { time: '10:30', temp: 4 },
    { time: '11:00', temp: 5 },
    { time: '11:30', temp: 6 },
    { time: '12:00', temp: 8 },
  ],
  'DRA-023': [
    { time: '10:00', temp: 3 },
    { time: '10:30', temp: 3 },
    { time: '11:00', temp: 4 },
    { time: '11:30', temp: 3 },
    { time: '12:00', temp: 3 },
  ],
}

export const alerts = [
  { truck: 'DRA-017', message: 'exceeds max temp by +3°C', severity: 'high', time: '2 min ago' },
  { truck: 'DRA-019', message: 'sensor offline', severity: 'critical', time: '15 min ago' },
  { truck: 'DRA-031', message: 'approaching max temp limit', severity: 'medium', time: '3 min ago' },
]

export const complianceReports = [
  { tripId: 'TRP-2401', duration: '4h 30m', minTemp: 2, maxTemp: 8, withinRange: 75 },
  { tripId: 'TRP-2403', duration: '6h 15m', minTemp: 2, maxTemp: 5, withinRange: 100 },
  { tripId: 'TRP-2404', duration: '3h 45m', minTemp: 3, maxTemp: 6, withinRange: 92 },
  { tripId: 'TRP-2405', duration: '5h 20m', minTemp: 2, maxTemp: 5, withinRange: 100 },
]
