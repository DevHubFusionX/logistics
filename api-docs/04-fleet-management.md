# Fleet Management

## 1. Get All Vehicles
```http
GET /fleet/vehicles
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `available|on_trip|maintenance|inactive`
- `search`: Optional, string (searches plateNumber, make, model)
- `type`: Optional, enum: `refrigerated|dry|tanker`
- `minTonnage`: Optional, number
- `maxTonnage`: Optional, number
- `page`: Optional, number (default: 1)
- `limit`: Optional, number (default: 20, max: 100)
- `sort`: Optional, string (e.g., `-createdAt,plateNumber`)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "veh_001",
      "vehicleId": "DRA-017",
      "plateNumber": "ABC-123-XY",
      "make": "Mercedes",
      "model": "Actros",
      "year": 2023,
      "type": "refrigerated",
      "tonnage": 20,
      "capacity": "40 pallets",
      "status": "on_trip",
      "currentTrip": {
        "id": "TRP-2401",
        "route": "Lagos → Abuja",
        "progress": 65
      },
      "location": {
        "lat": 6.5244,
        "lng": 3.3792,
        "address": "Ikorodu Road, Lagos",
        "lastUpdated": "2024-01-15T10:28:00Z"
      },
      "telemetry": {
        "fuelLevel": 75,
        "mileage": 45230,
        "engineStatus": "running",
        "temperature": -18
      },
      "maintenance": {
        "lastService": "2024-01-01T00:00:00Z",
        "nextService": "2024-04-01T00:00:00Z",
        "daysUntilService": 76
      },
      "documents": {
        "insurance": {
          "expiryDate": "2024-12-31",
          "status": "valid"
        },
        "roadWorthiness": {
          "expiryDate": "2024-06-30",
          "status": "valid"
        }
      },
      "createdAt": "2023-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 72,
    "totalPages": 4,
    "hasNext": true,
    "hasPrev": false
  }
}
```

**Permissions Required:** `fleet:read`

---

## 2. Get Vehicle Details
```http
GET /fleet/vehicles/{vehicleId}
Headers: Authorization: Bearer {token}
```

**Path Parameters:**
- `vehicleId`: Required, string (e.g., `veh_001` or `DRA-017`)

---

## 3. Add New Vehicle
```http
POST /fleet/vehicles
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "vehicleId": "DRA-025",
  "plateNumber": "XYZ-789-AB",
  "make": "Mercedes",
  "model": "Actros",
  "year": 2024,
  "type": "refrigerated",
  "tonnage": 20,
  "capacity": "40 pallets",
  "vin": "WDB9634321L789012",
  "purchaseDate": "2024-01-15",
  "purchasePrice": 48000000,
  "specifications": {
    "engineType": "Diesel",
    "horsepower": 450,
    "transmission": "Automatic",
    "fuelCapacity": 400
  },
  "documents": {
    "insurance": {
      "provider": "AXA Mansard",
      "policyNumber": "POL123456",
      "expiryDate": "2025-01-15"
    },
    "roadWorthiness": {
      "certificateNumber": "RW123456",
      "expiryDate": "2024-07-15"
    }
  }
}
```

**Validation Rules:**
- `vehicleId`: Required, unique, alphanumeric with hyphen, max 20 chars
- `plateNumber`: Required, unique, format: XXX-XXX-XX
- `make`: Required, string, max 50 chars
- `model`: Required, string, max 50 chars
- `year`: Required, number, between 1990 and current year + 1
- `type`: Required, enum: `refrigerated|dry|tanker`
- `tonnage`: Required, number, min 1, max 100

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "veh_025",
    "vehicleId": "DRA-025",
    "plateNumber": "XYZ-789-AB",
    "status": "available",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Vehicle added successfully"
}
```

**Permissions Required:** `fleet:create`

---

## 4. Update Vehicle
```http
PUT /fleet/vehicles/{vehicleId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "status": "maintenance",
  "tonnage": 22,
  "assignedDriver": "drv_005"
}
```

**Permissions Required:** `fleet:update`

---

## 5. Delete Vehicle
```http
DELETE /fleet/vehicles/{vehicleId}
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `fleet:delete`

---

## 6. Get Vehicle Telemetry
```http
GET /fleet/vehicles/{vehicleId}/telemetry
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `metrics`: Optional, comma-separated: `fuel,speed,temperature,location`

**WebSocket Alternative:**
```javascript
ws://api.daraexpress.com/v1/ws/fleet/vehicles/{vehicleId}/telemetry
// Real-time updates every 30 seconds
```

---

## 7. Get Maintenance Alerts
```http
GET /fleet/maintenance/alerts
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `severity`: Optional, enum: `low|medium|high|critical`
- `status`: Optional, enum: `pending|scheduled|completed`

---

## 8. Schedule Maintenance
```http
POST /fleet/maintenance
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "vehicleId": "veh_001",
  "type": "routine",
  "description": "Oil change and tire rotation",
  "scheduledDate": "2024-01-20T09:00:00Z",
  "estimatedCost": 120000,
  "vendor": "AutoCare Services",
  "notes": "Check brake pads as well"
}
```

---

## 9. Get Trip History
```http
GET /fleet/vehicles/{vehicleId}/trips
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `completed|in_progress|cancelled`
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `page`: Optional, number
- `limit`: Optional, number
