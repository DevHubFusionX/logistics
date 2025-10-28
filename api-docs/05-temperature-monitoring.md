# Temperature Monitoring

## 1. Get Temperature Data
```http
GET /temperature/monitoring
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `normal|warning|alert|offline`
- `truckId`: Optional, string
- `minTemp`: Optional, number
- `maxTemp`: Optional, number
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "temp_001",
      "truckId": "DRA-017",
      "truck": {
        "plateNumber": "ABC-123-XY",
        "make": "Mercedes",
        "model": "Actros"
      },
      "currentTemp": -18.5,
      "setPoint": -18,
      "status": "normal",
      "cargoType": "Frozen Foods",
      "thresholds": {
        "min": -20,
        "max": -15
      },
      "location": {
        "lat": 6.5244,
        "lng": 3.3792,
        "address": "Ikorodu Road, Lagos"
      },
      "trip": {
        "id": "TRP-2401",
        "route": "Lagos → Abuja",
        "progress": 65
      },
      "lastUpdated": "2024-01-15T10:30:00Z",
      "sensorHealth": "good",
      "batteryLevel": 85
    }
  ],
  "summary": {
    "total": 40,
    "normal": 35,
    "warning": 2,
    "alert": 3,
    "offline": 0
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 40
  }
}
```

**Permissions Required:** `temperature:read`

**Cache:** 1 minute

---

## 2. Get Temperature History
```http
GET /temperature/history/{truckId}
Headers: Authorization: Bearer {token}
```

**Path Parameters:**
- `truckId`: Required, string

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `interval`: Optional, enum: `1min|5min|15min|1hour` (default: `5min`)
- `format`: Optional, enum: `json|csv` (default: `json`)

---

## 3. Get Temperature Alerts
```http
GET /temperature/alerts
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `severity`: Optional, enum: `low|medium|high|critical`
- `status`: Optional, enum: `active|acknowledged|resolved`
- `truckId`: Optional, string
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date

---

## 4. Acknowledge Alert
```http
POST /temperature/alerts/{alertId}/acknowledge
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "notes": "Driver notified, monitoring situation",
  "action": "contacted_driver"
}
```

---

## 5. Resolve Alert
```http
POST /temperature/alerts/{alertId}/resolve
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "resolution": "Temperature stabilized after refrigeration unit adjustment",
  "actionTaken": "adjusted_settings"
}
```

---

## 6. Get Compliance Report
```http
GET /temperature/compliance
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `truckId`: Optional, string
- `clientId`: Optional, string
- `format`: Optional, enum: `json|pdf|excel`

---

## 7. Update Temperature Thresholds
```http
PUT /temperature/thresholds
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productType": "Frozen Foods",
  "minTemp": -20,
  "maxTemp": -15,
  "warningOffset": 2
}
```

**Permissions Required:** `temperature:update_thresholds`

---

## 8. Get Temperature Analytics
```http
GET /temperature/analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `truck|cargo|route|client`

---

## 9. Subscribe to Temperature Alerts (WebSocket)
```javascript
ws://api.daraexpress.com/v1/ws/temperature/alerts
Headers: Authorization: Bearer {token}

// Subscribe to specific trucks
{
  "action": "subscribe",
  "trucks": ["DRA-017", "DRA-025"]
}

// Receive real-time alerts
{
  "type": "temperature_alert",
  "data": {
    "truckId": "DRA-017",
    "temperature": -14,
    "threshold": -15,
    "severity": "high"
  }
}
```
