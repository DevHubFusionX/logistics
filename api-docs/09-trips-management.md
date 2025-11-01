# Trips Management

## 1. Get All Trips
```http
GET /trips
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `scheduled|in_progress|completed|cancelled`
- `driverId`: Optional, string
- `vehicleId`: Optional, string
- `search`: Optional, string
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "trp_001",
      "tripId": "TRP-2401",
      "bookingId": "BKG-2024-001",
      "status": "in_progress",
      "driver": {
        "id": "drv_001",
        "name": "Adebayo Johnson",
        "phone": "+234-803-456-7890"
      },
      "vehicle": {
        "id": "veh_001",
        "vehicleId": "DRA-017",
        "plateNumber": "ABC-123-XY"
      },
      "route": {
        "origin": "Lagos",
        "destination": "Abuja",
        "distance": 500,
        "estimatedDuration": 8
      },
      "cargo": {
        "type": "Frozen Foods",
        "weight": 500,
        "temperature": -18
      },
      "schedule": {
        "scheduledStart": "2024-01-20T09:00:00Z",
        "actualStart": "2024-01-20T10:15:00Z",
        "estimatedArrival": "2024-01-22T14:00:00Z"
      },
      "progress": 65,
      "currentLocation": {
        "lat": 8.4799,
        "lng": 4.5418,
        "address": "Lokoja, Kogi"
      },
      "createdAt": "2024-01-15T14:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 145
  }
}
```

**Permissions Required:** `trip:read` (Dispatcher, Fleet Officer, Super Admin)

---

## 2. Get Trip Details
```http
GET /trips/{tripId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "trp_001",
    "tripId": "TRP-2401",
    "bookingId": "BKG-2024-001",
    "status": "in_progress",
    "driver": {
      "id": "drv_001",
      "name": "Adebayo Johnson",
      "phone": "+234-803-456-7890",
      "license": "LAG123456"
    },
    "vehicle": {
      "id": "veh_001",
      "vehicleId": "DRA-017",
      "plateNumber": "ABC-123-XY",
      "type": "refrigerated",
      "tonnage": 20
    },
    "route": {
      "origin": {
        "address": "123 Industrial Road, Lagos",
        "coordinates": {
          "lat": 6.5244,
          "lng": 3.3792
        }
      },
      "destination": {
        "address": "456 Business Avenue, Abuja",
        "coordinates": {
          "lat": 9.0765,
          "lng": 7.3986
        }
      },
      "distance": 500,
      "estimatedDuration": 8,
      "waypoints": [
        {
          "location": "Ibadan",
          "timestamp": "2024-01-20T12:30:00Z",
          "status": "passed"
        }
      ]
    },
    "cargo": {
      "type": "Frozen Foods",
      "weight": 500,
      "quantity": 20,
      "description": "Frozen chicken products",
      "temperature": -18,
      "packaging": "Palletized"
    },
    "schedule": {
      "scheduledStart": "2024-01-20T09:00:00Z",
      "actualStart": "2024-01-20T10:15:00Z",
      "estimatedArrival": "2024-01-22T14:00:00Z",
      "actualArrival": null
    },
    "tracking": {
      "currentLocation": {
        "lat": 8.4799,
        "lng": 4.5418,
        "address": "Lokoja, Kogi",
        "lastUpdated": "2024-01-21T10:30:00Z"
      },
      "progress": 65,
      "distanceCovered": 325,
      "distanceRemaining": 175
    },
    "temperature": {
      "current": -18.2,
      "setPoint": -18,
      "status": "normal",
      "alerts": []
    },
    "timeline": [
      {
        "event": "trip_created",
        "timestamp": "2024-01-15T14:00:00Z",
        "description": "Trip created and assigned to driver"
      },
      {
        "event": "trip_started",
        "timestamp": "2024-01-20T10:15:00Z",
        "description": "Driver started the trip"
      }
    ],
    "documents": [],
    "createdAt": "2024-01-15T14:00:00Z",
    "updatedAt": "2024-01-21T10:30:00Z"
  }
}
```

**Permissions Required:** `trip:read`

---

## 3. Create Trip
```http
POST /trips
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "bookingId": "bkg_001",
  "driverId": "drv_001",
  "vehicleId": "veh_001",
  "scheduledStart": "2024-02-01T09:00:00Z",
  "estimatedDuration": 8,
  "notes": "Temperature monitoring required"
}
```

**Permissions Required:** `trip:create` (Dispatcher, Super Admin)

---

## 4. Update Trip
```http
PUT /trips/{tripId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "status": "in_progress",
  "actualStart": "2024-02-01T09:15:00Z",
  "currentLocation": {
    "lat": 6.5244,
    "lng": 3.3792
  }
}
```

**Permissions Required:** `trip:update` (Dispatcher, Driver, Super Admin)

---

## 5. Start Trip
```http
POST /trips/{tripId}/start
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "startLocation": {
    "lat": 6.5244,
    "lng": 3.3792
  },
  "odometerReading": 45230,
  "fuelLevel": 100,
  "notes": "All checks completed"
}
```

**Permissions Required:** `trip:start` (Driver, Dispatcher, Super Admin)

---

## 6. Complete Trip
```http
POST /trips/{tripId}/complete
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "completionLocation": {
    "lat": 9.0765,
    "lng": 7.3986
  },
  "odometerReading": 45730,
  "fuelLevel": 25,
  "deliveryProof": {
    "recipientName": "John Doe",
    "recipientSignature": "base64_signature",
    "photo": "base64_photo"
  },
  "notes": "Delivered successfully"
}
```

**Permissions Required:** `trip:complete` (Driver, Dispatcher, Super Admin)

---

## 7. Cancel Trip
```http
POST /trips/{tripId}/cancel
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "reason": "Vehicle breakdown",
  "notes": "Engine failure, vehicle towed to workshop"
}
```

**Permissions Required:** `trip:cancel` (Dispatcher, Super Admin)

---

## 8. Track Trip
```http
GET /trips/{tripId}/track
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "tripId": "TRP-2401",
    "status": "in_progress",
    "currentLocation": {
      "lat": 8.4799,
      "lng": 4.5418,
      "address": "Lokoja, Kogi",
      "lastUpdated": "2024-01-21T10:30:00Z"
    },
    "progress": 65,
    "estimatedArrival": "2024-01-22T14:00:00Z",
    "driver": {
      "name": "Adebayo Johnson",
      "phone": "+234-803-456-7890"
    },
    "temperature": {
      "current": -18.2,
      "status": "normal"
    }
  }
}
```

**Permissions Required:** `trip:track` (Customer, Staff)

---

## 9. Get Trip Timeline
```http
GET /trips/{tripId}/timeline
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `trip:read`

---

## 10. Upload Trip Document
```http
POST /trips/{tripId}/documents
Headers: Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: Required, file
- `type`: Required, enum: `waybill|delivery_note|pod|other`

**Permissions Required:** `trip:upload_document` (Driver, Dispatcher, Super Admin)

---

## 11. Get Trip Analytics
```http
GET /trips/analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month|driver|vehicle|route`

**Permissions Required:** `trip:read_analytics` (Dispatcher, Fleet Officer, Super Admin)
