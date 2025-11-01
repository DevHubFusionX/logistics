# Drivers & Staff

## 1. Get All Drivers
```http
GET /drivers
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `available|on_trip|on_leave|inactive`
- `search`: Optional, string
- `licenseStatus`: Optional, enum: `valid|expiring_soon|expired`
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "drv_001",
      "driverId": "DRV-001",
      "name": "Adebayo Johnson",
      "phone": "+234-803-456-7890",
      "email": "adebayo@daraexpress.com",
      "status": "on_trip",
      "currentTrip": {
        "id": "TRP-2401",
        "route": "Lagos → Abuja",
        "progress": 65
      },
      "license": {
        "number": "LAG123456",
        "class": "C",
        "expiryDate": "2025-06-30",
        "status": "valid"
      },
      "rating": 4.8,
      "totalTrips": 342,
      "onTimeRate": 96.5,
      "createdAt": "2022-03-15T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

**Permissions Required:** `driver:read` (Fleet Officer, Dispatcher, Super Admin)

---

## 2. Get Driver Details
```http
GET /drivers/{driverId}
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `driver:read`

---

## 3. Create Driver
```http
POST /drivers
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Chidi Okafor",
  "phone": "+234-804-567-8901",
  "email": "chidi@daraexpress.com",
  "dateOfBirth": "1985-05-15",
  "address": {
    "street": "123 Driver Street",
    "city": "Lagos",
    "state": "Lagos"
  },
  "license": {
    "number": "LAG789012",
    "class": "C",
    "issueDate": "2020-01-15",
    "expiryDate": "2025-01-15"
  },
  "emergencyContact": {
    "name": "Mrs. Okafor",
    "relationship": "Wife",
    "phone": "+234-805-678-9012"
  }
}
```

**Permissions Required:** `driver:create` (Fleet Officer, Super Admin)

---

## 4. Update Driver
```http
PUT /drivers/{driverId}
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `driver:update`

---

## 5. Get Driver Performance
```http
GET /drivers/{driverId}/performance
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "driverId": "DRV-001",
    "name": "Adebayo Johnson",
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31"
    },
    "metrics": {
      "totalTrips": 28,
      "completedTrips": 27,
      "cancelledTrips": 1,
      "completionRate": 96.4,
      "onTimeDeliveries": 26,
      "onTimeRate": 96.3,
      "averageDeliveryTime": 2.3,
      "totalDistance": 14500,
      "totalRevenue": 3500000,
      "averageRating": 4.8
    },
    "incidents": {
      "total": 0,
      "accidents": 0,
      "delays": 1,
      "complaints": 0
    },
    "fuelEfficiency": {
      "average": 8.5,
      "unit": "km/l"
    }
  }
}
```

**Permissions Required:** `driver:read_performance` (Fleet Officer, Super Admin)

---

## 6. Get Driver Trip History
```http
GET /drivers/{driverId}/trips
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `driver:read`

---

## 7. Assign Driver to Trip
```http
POST /drivers/{driverId}/assign
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "tripId": "trp_001",
  "vehicleId": "veh_001",
  "startDate": "2024-02-01T09:00:00Z"
}
```

**Permissions Required:** `driver:assign` (Dispatcher, Fleet Officer, Super Admin)

---

## 8. Mark Driver on Leave
```http
POST /drivers/{driverId}/leave
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "startDate": "2024-02-05",
  "endDate": "2024-02-10",
  "reason": "Annual leave",
  "notes": "Family vacation"
}
```

**Permissions Required:** `driver:manage_leave` (Fleet Officer, Super Admin)

---

## 9. Upload Driver Document
```http
POST /drivers/{driverId}/documents
Headers: Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: Required, file
- `type`: Required, enum: `license|id_card|medical_certificate|other`

**Permissions Required:** `driver:upload_document` (Fleet Officer, Super Admin)

---

## 10. Get Driver Documents
```http
GET /drivers/{driverId}/documents
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `driver:read`
