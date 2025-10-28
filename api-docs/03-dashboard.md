# Dashboard

## 1. Get Dashboard Summary
```http
GET /dashboard/summary
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `period`: Optional, enum: `today|week|month|year` (default: `today`)
- `timezone`: Optional, string (default: `UTC`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "kpis": {
      "activeTrips": {
        "value": 45,
        "change": 12.5,
        "trend": "up"
      },
      "totalFleet": {
        "value": 72,
        "available": 27,
        "onTrip": 40,
        "maintenance": 5
      },
      "onTimeDelivery": {
        "value": 92.3,
        "change": -2.1,
        "trend": "down"
      },
      "revenue": {
        "value": 7240000,
        "currency": "NGN",
        "change": 18.7,
        "trend": "up"
      }
    },
    "recentActivity": [
      {
        "id": "act_001",
        "type": "trip_completed",
        "title": "Trip TRP-2401 completed",
        "description": "Driver Adebayo delivered to Lagos Port",
        "timestamp": "2024-01-15T10:30:00Z",
        "user": {
          "id": "drv_001",
          "name": "Adebayo Johnson",
          "avatar": "https://cdn.daraexpress.com/avatars/drv_001.jpg"
        }
      }
    ],
    "alerts": [
      {
        "id": "alert_001",
        "severity": "high",
        "type": "temperature",
        "title": "Temperature Alert - DRA-017",
        "message": "Temperature exceeded threshold",
        "timestamp": "2024-01-15T10:25:00Z",
        "acknowledged": false
      }
    ],
    "upcomingTrips": [
      {
        "id": "TRP-2405",
        "route": "Lagos → Abuja",
        "departureTime": "2024-01-15T14:00:00Z",
        "driver": "Chidi Okafor",
        "vehicle": "DRA-025"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Permissions Required:** `dashboard:read`

**Cache:** 5 minutes

---

## 2. Get Real-Time Statistics
```http
GET /dashboard/realtime
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "activeTrips": 45,
    "driversOnDuty": 38,
    "temperatureAlerts": 3,
    "pendingPayments": 12,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

**WebSocket Alternative:**
```javascript
ws://api.daraexpress.com/v1/ws/dashboard
// Receives real-time updates every 30 seconds
```
