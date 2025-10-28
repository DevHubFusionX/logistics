# Dara Express Logistics - API Documentation v1.0

## Table of Contents
1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Dashboard](#dashboard)
4. [Fleet Management](#fleet-management)
5. [Temperature Monitoring](#temperature-monitoring)
6. [Clients & Orders](#clients--orders)
7. [Drivers & Staff](#drivers--staff)
8. [Trips Management](#trips-management)
9. [Payments & Invoicing](#payments--invoicing)
10. [Reports & Analytics](#reports--analytics)
11. [Settings](#settings)
12. [User Roles & Access Control](#user-roles--access-control)
13. [Webhooks](#webhooks)
14. [Error Codes](#error-codes)
15. [Rate Limiting](#rate-limiting)

---

## API Overview

### Base URL
```
Production: https://api.daraexpress.com/v1
Staging: https://staging-api.daraexpress.com/v1
Development: http://localhost:8000/api/v1
```

### Protocol
- HTTPS only (HTTP requests will be redirected)
- REST architecture
- JSON request/response format
- UTF-8 encoding

### Versioning
- Current version: v1
- Version specified in URL path
- Breaking changes will increment version number

### Request Headers
```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
Accept: application/json
X-Request-ID: {unique-request-id}
X-API-Version: v1
```

### Response Format
All responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_abc123xyz"
}
```

### Pagination
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Filtering & Sorting
```http
GET /resource?filter[status]=active&filter[date][gte]=2024-01-01&sort=-createdAt,name
```

### Date Format
- ISO 8601: `2024-01-15T10:30:00Z`
- Timezone: UTC (convert to WAT on client)

---

## Authentication

### 1. Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@daraexpress.com",
  "password": "SecurePass123!",
  "rememberMe": false
}
```

**Validation Rules:**
- `email`: Required, valid email format, max 255 chars
- `password`: Required, min 8 chars
- `rememberMe`: Optional, boolean (default: false)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "user": {
      "id": "usr_001",
      "name": "John Doe",
      "email": "admin@daraexpress.com",
      "role": "Super Admin",
      "permissions": ["all"],
      "avatar": "https://cdn.daraexpress.com/avatars/usr_001.jpg",
      "lastLogin": "2024-01-15T10:30:00Z"
    }
  },
  "message": "Login successful"
}
```

**Error Responses:**
```json
// 401 - Invalid credentials
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "statusCode": 401
  }
}

// 423 - Account locked
{
  "success": false,
  "error": {
    "code": "AUTH_ACCOUNT_LOCKED",
    "message": "Account locked due to multiple failed login attempts. Try again in 30 minutes.",
    "statusCode": 423,
    "details": {
      "lockedUntil": "2024-01-15T11:00:00Z",
      "remainingTime": 1800
    }
  }
}
```

**Rate Limit:** 5 requests per minute per IP

---

### 2. Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_REFRESH_TOKEN",
    "message": "Invalid or expired refresh token",
    "statusCode": 401
  }
}
```

---

### 3. Logout
```http
POST /auth/logout
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 4. Forgot Password
```http
POST /auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@daraexpress.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset link sent to your email",
  "data": {
    "expiresIn": 3600
  }
}
```

**Rate Limit:** 3 requests per hour per email

---

### 5. Reset Password
```http
POST /auth/reset-password
```

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

**Validation Rules:**
- `newPassword`: Min 8 chars, must contain uppercase, lowercase, number, special char
- `confirmPassword`: Must match newPassword

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### 6. Change Password
```http
PUT /auth/change-password
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 7. Verify Email
```http
POST /auth/verify-email
```

**Request Body:**
```json
{
  "token": "email_verification_token"
}
```

---

### 8. Two-Factor Authentication Setup
```http
POST /auth/2fa/setup
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "secret": "JBSWY3DPEHPK3PXP",
    "backupCodes": [
      "12345678",
      "87654321",
      "11223344"
    ]
  }
}
```

---

### 9. Two-Factor Authentication Verify
```http
POST /auth/2fa/verify
```

**Request Body:**
```json
{
  "email": "user@daraexpress.com",
  "password": "SecurePass123!",
  "code": "123456"
}
```

---

## Dashboard

### 1. Get Dashboard Summary
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

### 2. Get Real-Time Statistics
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

---


## Fleet Management

### 1. Get All Vehicles
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

### 2. Get Vehicle Details
```http
GET /fleet/vehicles/{vehicleId}
Headers: Authorization: Bearer {token}
```

**Path Parameters:**
- `vehicleId`: Required, string (e.g., `veh_001` or `DRA-017`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
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
    "vin": "WDB9634321L123456",
    "purchaseDate": "2023-01-15",
    "purchasePrice": 45000000,
    "currentValue": 42000000,
    "specifications": {
      "engineType": "Diesel",
      "horsepower": 450,
      "transmission": "Automatic",
      "fuelCapacity": 400,
      "dimensions": {
        "length": 12.5,
        "width": 2.5,
        "height": 4.0
      }
    },
    "assignedDriver": {
      "id": "drv_001",
      "name": "Adebayo Johnson",
      "phone": "+234-801-234-5678"
    },
    "tripHistory": {
      "totalTrips": 156,
      "totalDistance": 45230,
      "averageRating": 4.7
    },
    "maintenanceHistory": [
      {
        "id": "mnt_001",
        "type": "routine",
        "description": "Oil change and filter replacement",
        "cost": 85000,
        "date": "2024-01-01T00:00:00Z",
        "nextDue": "2024-04-01T00:00:00Z"
      }
    ]
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": {
    "code": "VEHICLE_NOT_FOUND",
    "message": "Vehicle with ID 'veh_001' not found",
    "statusCode": 404
  }
}
```

---

### 3. Add New Vehicle
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
- `vin`: Optional, unique, 17 chars
- `purchasePrice`: Optional, number, min 0

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

**Error Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "statusCode": 400,
    "details": [
      {
        "field": "plateNumber",
        "message": "Plate number already exists",
        "value": "XYZ-789-AB"
      }
    ]
  }
}
```

**Permissions Required:** `fleet:create`

---

### 4. Update Vehicle
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

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "veh_001",
    "vehicleId": "DRA-017",
    "status": "maintenance",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Vehicle updated successfully"
}
```

**Permissions Required:** `fleet:update`

---

### 5. Delete Vehicle
```http
DELETE /fleet/vehicles/{vehicleId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Vehicle deleted successfully"
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": {
    "code": "VEHICLE_IN_USE",
    "message": "Cannot delete vehicle with active trips",
    "statusCode": 409,
    "details": {
      "activeTrips": ["TRP-2401", "TRP-2402"]
    }
  }
}
```

**Permissions Required:** `fleet:delete`

---

### 6. Get Vehicle Telemetry
```http
GET /fleet/vehicles/{vehicleId}/telemetry
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `metrics`: Optional, comma-separated: `fuel,speed,temperature,location`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "vehicleId": "DRA-017",
    "current": {
      "fuelLevel": 75,
      "speed": 80,
      "temperature": -18,
      "location": {
        "lat": 6.5244,
        "lng": 3.3792,
        "address": "Ikorodu Road, Lagos"
      },
      "engineStatus": "running",
      "mileage": 45230,
      "timestamp": "2024-01-15T10:30:00Z"
    },
    "history": [
      {
        "fuelLevel": 78,
        "speed": 75,
        "temperature": -17,
        "timestamp": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

**WebSocket Alternative:**
```javascript
ws://api.daraexpress.com/v1/ws/fleet/vehicles/{vehicleId}/telemetry
// Real-time updates every 30 seconds
```

---

### 7. Get Maintenance Alerts
```http
GET /fleet/maintenance/alerts
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `severity`: Optional, enum: `low|medium|high|critical`
- `status`: Optional, enum: `pending|scheduled|completed`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "mnt_alert_001",
      "vehicleId": "DRA-017",
      "vehicle": {
        "plateNumber": "ABC-123-XY",
        "make": "Mercedes",
        "model": "Actros"
      },
      "type": "scheduled_maintenance",
      "severity": "high",
      "title": "Service Due in 7 Days",
      "description": "Routine maintenance required",
      "dueDate": "2024-01-22T00:00:00Z",
      "estimatedCost": 150000,
      "status": "pending",
      "createdAt": "2024-01-15T00:00:00Z"
    }
  ]
}
```

---

### 8. Schedule Maintenance
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

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "mnt_002",
    "vehicleId": "veh_001",
    "scheduledDate": "2024-01-20T09:00:00Z",
    "status": "scheduled"
  },
  "message": "Maintenance scheduled successfully"
}
```

---

### 9. Get Trip History
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

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "TRP-2401",
      "route": "Lagos → Abuja",
      "driver": "Adebayo Johnson",
      "client": "Adebayo Industries",
      "departureDate": "2024-01-10T08:00:00Z",
      "arrivalDate": "2024-01-11T14:30:00Z",
      "distance": 750,
      "status": "completed",
      "revenue": 450000
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156
  }
}
```

---


## Temperature Monitoring

### 1. Get Temperature Data
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

### 2. Get Temperature History
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

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "truckId": "DRA-017",
    "cargoType": "Frozen Foods",
    "thresholds": {
      "min": -20,
      "max": -15
    },
    "readings": [
      {
        "temperature": -18.5,
        "setPoint": -18,
        "status": "normal",
        "location": {
          "lat": 6.5244,
          "lng": 3.3792
        },
        "timestamp": "2024-01-15T10:30:00Z"
      },
      {
        "temperature": -17.2,
        "setPoint": -18,
        "status": "warning",
        "location": {
          "lat": 6.5300,
          "lng": 3.3800
        },
        "timestamp": "2024-01-15T10:25:00Z"
      }
    ],
    "statistics": {
      "avgTemp": -18.1,
      "minTemp": -19.5,
      "maxTemp": -16.8,
      "violations": 2,
      "complianceRate": 98.5
    }
  }
}
```

**CSV Response (format=csv):**
```csv
timestamp,temperature,setPoint,status,latitude,longitude
2024-01-15T10:30:00Z,-18.5,-18,normal,6.5244,3.3792
2024-01-15T10:25:00Z,-17.2,-18,warning,6.5300,3.3800
```

---

### 3. Get Temperature Alerts
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

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "alert_001",
      "truckId": "DRA-017",
      "truck": {
        "plateNumber": "ABC-123-XY",
        "driver": "Adebayo Johnson"
      },
      "severity": "high",
      "type": "temperature_exceeded",
      "title": "Temperature Exceeded Threshold",
      "message": "Temperature reached -14°C, exceeding maximum threshold of -15°C",
      "currentTemp": -14,
      "threshold": -15,
      "cargoType": "Frozen Foods",
      "duration": 180,
      "location": {
        "lat": 6.5244,
        "lng": 3.3792,
        "address": "Ikorodu Road, Lagos"
      },
      "trip": {
        "id": "TRP-2401",
        "client": "Adebayo Industries"
      },
      "status": "active",
      "acknowledgedBy": null,
      "acknowledgedAt": null,
      "resolvedAt": null,
      "createdAt": "2024-01-15T10:25:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "summary": {
    "total": 15,
    "active": 3,
    "acknowledged": 5,
    "resolved": 7
  }
}
```

---

### 4. Acknowledge Alert
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

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "alert_001",
    "status": "acknowledged",
    "acknowledgedBy": {
      "id": "usr_001",
      "name": "John Doe"
    },
    "acknowledgedAt": "2024-01-15T10:35:00Z"
  },
  "message": "Alert acknowledged successfully"
}
```

---

### 5. Resolve Alert
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

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "alert_001",
    "status": "resolved",
    "resolvedBy": {
      "id": "usr_001",
      "name": "John Doe"
    },
    "resolvedAt": "2024-01-15T10:45:00Z"
  },
  "message": "Alert resolved successfully"
}
```

---

### 6. Get Compliance Report
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

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "summary": {
      "totalTrips": 156,
      "compliantTrips": 148,
      "nonCompliantTrips": 8,
      "complianceRate": 94.9,
      "totalViolations": 12,
      "avgViolationDuration": 45
    },
    "byTruck": [
      {
        "truckId": "DRA-017",
        "plateNumber": "ABC-123-XY",
        "trips": 15,
        "violations": 2,
        "complianceRate": 86.7,
        "avgTemp": -18.2
      }
    ],
    "byCargoType": [
      {
        "cargoType": "Frozen Foods",
        "trips": 85,
        "violations": 5,
        "complianceRate": 94.1
      }
    ],
    "violations": [
      {
        "id": "vio_001",
        "truckId": "DRA-017",
        "tripId": "TRP-2401",
        "cargoType": "Frozen Foods",
        "threshold": -15,
        "peakTemp": -14,
        "duration": 180,
        "timestamp": "2024-01-15T10:25:00Z"
      }
    ]
  }
}
```

**PDF Response (format=pdf):**
- Returns PDF file with compliance report

---

### 7. Update Temperature Thresholds
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

**Validation Rules:**
- `productType`: Required, string, max 100 chars
- `minTemp`: Required, number, must be less than maxTemp
- `maxTemp`: Required, number
- `warningOffset`: Optional, number, min 0, max 10

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "productType": "Frozen Foods",
    "minTemp": -20,
    "maxTemp": -15,
    "warningOffset": 2,
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Temperature thresholds updated successfully"
}
```

**Permissions Required:** `temperature:update_thresholds`

---

### 8. Get Temperature Analytics
```http
GET /temperature/analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `truck|cargo|route|client`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "trends": [
      {
        "date": "2024-01-15",
        "avgTemp": -18.2,
        "violations": 3,
        "complianceRate": 95.5
      }
    ],
    "distribution": {
      "normal": 85,
      "warning": 10,
      "alert": 5
    },
    "topViolators": [
      {
        "truckId": "DRA-017",
        "violations": 5,
        "avgDuration": 120
      }
    ]
  }
}
```

---

### 9. Subscribe to Temperature Alerts (WebSocket)
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

---


## Clients & Orders

### 1. Get All Clients
```http
GET /clients
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `search`: Optional, string (searches name, email, phone, industry)
- `status`: Optional, enum: `active|inactive`
- `industry`: Optional, string
- `minRevenue`: Optional, number
- `maxRevenue`: Optional, number
- `sort`: Optional, string (e.g., `-totalRevenue,name`)
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cli_001",
      "clientId": "CL001",
      "name": "Adebayo Industries",
      "industry": "Manufacturing",
      "email": "contact@adebayo.com",
      "phone": "+234-801-234-5678",
      "address": {
        "street": "45 Industrial Avenue",
        "city": "Lagos",
        "state": "Lagos State",
        "country": "Nigeria",
        "postalCode": "100001"
      },
      "contactPerson": {
        "name": "Mr. Adebayo",
        "title": "Logistics Manager",
        "email": "adebayo@adebayo.com",
        "phone": "+234-801-234-5678"
      },
      "status": "active",
      "creditLimit": 5000000,
      "paymentTerms": "Net 30",
      "statistics": {
        "totalShipments": 45,
        "activeShipments": 3,
        "totalRevenue": 3850000,
        "outstandingBalance": 450000,
        "averageRating": 4.8
      },
      "lastShipment": "2024-01-10T08:00:00Z",
      "createdAt": "2023-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 85,
    "totalPages": 5
  }
}
```

**Permissions Required:** `clients:read`

---

### 2. Get Client Details
```http
GET /clients/{clientId}
Headers: Authorization: Bearer {token}
```

**Path Parameters:**
- `clientId`: Required, string (e.g., `cli_001` or `CL001`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cli_001",
    "clientId": "CL001",
    "name": "Adebayo Industries",
    "industry": "Manufacturing",
    "email": "contact@adebayo.com",
    "phone": "+234-801-234-5678",
    "alternatePhone": "+234-802-345-6789",
    "website": "https://adebayo.com",
    "taxId": "12345678-0001",
    "address": {
      "street": "45 Industrial Avenue",
      "city": "Lagos",
      "state": "Lagos State",
      "country": "Nigeria",
      "postalCode": "100001",
      "coordinates": {
        "lat": 6.5244,
        "lng": 3.3792
      }
    },
    "billingAddress": {
      "street": "45 Industrial Avenue",
      "city": "Lagos",
      "state": "Lagos State",
      "country": "Nigeria",
      "postalCode": "100001"
    },
    "contactPerson": {
      "name": "Mr. Adebayo",
      "title": "Logistics Manager",
      "email": "adebayo@adebayo.com",
      "phone": "+234-801-234-5678"
    },
    "accountManager": {
      "id": "usr_005",
      "name": "Sarah Johnson",
      "email": "sarah@daraexpress.com",
      "phone": "+234-803-456-7890"
    },
    "status": "active",
    "creditLimit": 5000000,
    "paymentTerms": "Net 30",
    "preferredPaymentMethod": "Bank Transfer",
    "bankDetails": {
      "bankName": "First Bank of Nigeria",
      "accountNumber": "1234567890",
      "accountName": "Adebayo Industries Ltd"
    },
    "statistics": {
      "totalShipments": 45,
      "activeShipments": 3,
      "completedShipments": 42,
      "cancelledShipments": 0,
      "totalRevenue": 3850000,
      "outstandingBalance": 450000,
      "paidAmount": 3400000,
      "averageShipmentValue": 85555,
      "averageRating": 4.8,
      "onTimeDeliveryRate": 95.5
    },
    "preferences": {
      "preferredVehicleType": "refrigerated",
      "specialInstructions": "Handle with care, temperature-sensitive goods",
      "notificationPreferences": {
        "email": true,
        "sms": true,
        "whatsapp": false
      }
    },
    "documents": [
      {
        "id": "doc_001",
        "type": "contract",
        "name": "Service Agreement 2024",
        "url": "https://cdn.daraexpress.com/docs/contract_cli_001.pdf",
        "uploadedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "notes": [
      {
        "id": "note_001",
        "content": "Prefers morning deliveries",
        "createdBy": "usr_005",
        "createdAt": "2024-01-10T09:00:00Z"
      }
    ],
    "createdAt": "2023-01-15T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. Add New Client
```http
POST /clients
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "TechCorp Nigeria",
  "industry": "Technology",
  "email": "info@techcorp.ng",
  "phone": "+234-809-876-5432",
  "address": {
    "street": "12 Tech Avenue",
    "city": "Abuja",
    "state": "FCT",
    "country": "Nigeria",
    "postalCode": "900001"
  },
  "contactPerson": {
    "name": "Jane Doe",
    "title": "Operations Manager",
    "email": "jane@techcorp.ng",
    "phone": "+234-809-876-5432"
  },
  "creditLimit": 3000000,
  "paymentTerms": "Net 30",
  "accountManager": "usr_005"
}
```

**Validation Rules:**
- `name`: Required, string, min 2, max 200 chars, unique
- `industry`: Optional, string, max 100 chars
- `email`: Required, valid email, unique
- `phone`: Required, valid phone format
- `address.street`: Required, string, max 200 chars
- `address.city`: Required, string, max 100 chars
- `address.state`: Required, string, max 100 chars
- `address.country`: Required, string, max 100 chars
- `contactPerson.name`: Required, string, max 100 chars
- `contactPerson.email`: Required, valid email
- `creditLimit`: Optional, number, min 0, max 100000000
- `paymentTerms`: Optional, enum: `Net 7|Net 15|Net 30|Net 45|Net 60|Prepaid`

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "cli_086",
    "clientId": "CL086",
    "name": "TechCorp Nigeria",
    "email": "info@techcorp.ng",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Client added successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "statusCode": 400,
    "details": [
      {
        "field": "email",
        "message": "Email already exists",
        "value": "info@techcorp.ng"
      }
    ]
  }
}
```

**Permissions Required:** `clients:create`

---

### 4. Update Client
```http
PUT /clients/{clientId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "status": "inactive",
  "creditLimit": 6000000,
  "paymentTerms": "Net 45",
  "contactPerson": {
    "name": "Mr. New Contact",
    "email": "newcontact@adebayo.com"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cli_001",
    "clientId": "CL001",
    "status": "inactive",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Client updated successfully"
}
```

**Permissions Required:** `clients:update`

---

### 5. Delete Client
```http
DELETE /clients/{clientId}
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `force`: Optional, boolean (default: false) - Force delete even with active shipments

**Success Response (200):**
```json
{
  "success": true,
  "message": "Client deleted successfully"
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": {
    "code": "CLIENT_HAS_ACTIVE_SHIPMENTS",
    "message": "Cannot delete client with active shipments",
    "statusCode": 409,
    "details": {
      "activeShipments": 3,
      "shipmentIds": ["TRP-2401", "TRP-2402", "TRP-2403"]
    }
  }
}
```

**Permissions Required:** `clients:delete`

---

### 6. Get Client Shipments
```http
GET /clients/{clientId}/shipments
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `pending|in_transit|delivered|cancelled`
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
      "id": "TRP-2401",
      "route": "Lagos → Abuja",
      "cargoType": "Electronics",
      "weight": 1000,
      "status": "in_transit",
      "vehicle": {
        "id": "DRA-017",
        "plateNumber": "ABC-123-XY"
      },
      "driver": {
        "id": "drv_001",
        "name": "Adebayo Johnson"
      },
      "departureDate": "2024-01-15T08:00:00Z",
      "estimatedArrival": "2024-01-16T14:00:00Z",
      "price": 85000,
      "paymentStatus": "pending",
      "progress": 65
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

---

### 7. Get Client Payment History
```http
GET /clients/{clientId}/payments
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `paid|pending|overdue`
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
      "id": "pay_001",
      "invoiceNumber": "INV-2024-001",
      "tripId": "TRP-2401",
      "amount": 85000,
      "status": "paid",
      "method": "Bank Transfer",
      "dueDate": "2024-02-14T00:00:00Z",
      "paidDate": "2024-02-10T10:30:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "summary": {
    "totalPaid": 3400000,
    "totalPending": 450000,
    "totalOverdue": 0
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42
  }
}
```

---

### 8. Create New Order
```http
POST /orders
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "clientId": "cli_001",
  "cargoType": "Electronics",
  "cargoDescription": "Laptops and accessories",
  "weight": 1000,
  "quantity": 50,
  "value": 5000000,
  "pickupLocation": {
    "address": "45 Industrial Avenue, Lagos",
    "contactName": "Mr. Adebayo",
    "contactPhone": "+234-801-234-5678",
    "coordinates": {
      "lat": 6.5244,
      "lng": 3.3792
    }
  },
  "deliveryLocation": {
    "address": "12 Market Road, Abuja",
    "contactName": "Mrs. Okonkwo",
    "contactPhone": "+234-802-345-6789",
    "coordinates": {
      "lat": 9.0765,
      "lng": 7.3986
    }
  },
  "scheduledPickup": "2024-01-16T08:00:00Z",
  "requestedDelivery": "2024-01-17T14:00:00Z",
  "vehicleType": "refrigerated",
  "temperatureRequired": true,
  "temperatureRange": {
    "min": -18,
    "max": -15
  },
  "specialInstructions": "Handle with care, fragile items",
  "insurance": true,
  "insuranceValue": 5000000,
  "price": 450000
}
```

**Validation Rules:**
- `clientId`: Required, must exist
- `cargoType`: Required, string, max 100 chars
- `weight`: Required, number, min 1, max 50000 (kg)
- `pickupLocation.address`: Required, string
- `deliveryLocation.address`: Required, string
- `scheduledPickup`: Required, ISO date, must be future date
- `price`: Required, number, min 0

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "ord_001",
    "orderId": "ORD-2024-001",
    "clientId": "cli_001",
    "status": "pending",
    "estimatedCost": 450000,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Order created successfully"
}
```

**Permissions Required:** `orders:create`

---

### 9. Assign Order to Trip
```http
POST /orders/{orderId}/assign
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "vehicleId": "veh_017",
  "driverId": "drv_001",
  "departureDate": "2024-01-16T08:00:00Z"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-2024-001",
    "tripId": "TRP-2405",
    "status": "assigned",
    "vehicle": "DRA-017",
    "driver": "Adebayo Johnson"
  },
  "message": "Order assigned to trip successfully"
}
```

---

### 10. Get Client Analytics
```http
GET /clients/{clientId}/analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": 3850000,
      "trend": [
        {
          "month": "2024-01",
          "amount": 450000
        }
      ]
    },
    "shipments": {
      "total": 45,
      "completed": 42,
      "inProgress": 3,
      "cancelled": 0
    },
    "performance": {
      "onTimeDeliveryRate": 95.5,
      "averageRating": 4.8,
      "averageDeliveryTime": 28.5
    },
    "topRoutes": [
      {
        "route": "Lagos → Abuja",
        "count": 15,
        "revenue": 1275000
      }
    ]
  }
}
```

---


## Drivers & Staff

### 1. Get All Drivers
```http
GET /drivers
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `active|inactive|on_trip|on_leave`
- `search`: Optional, string (searches name, email, phone, licenseNumber)
- `rating`: Optional, number (min rating filter)
- `sort`: Optional, string
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
      "email": "adebayo@daraexpress.com",
      "phone": "+234-801-234-5678",
      "alternatePhone": "+234-802-345-6789",
      "status": "on_trip",
      "licenseNumber": "ABC123456",
      "licenseClass": "C",
      "licenseExpiry": "2025-12-31",
      "dateOfBirth": "1985-05-15",
      "address": {
        "street": "23 Driver Street",
        "city": "Lagos",
        "state": "Lagos State",
        "country": "Nigeria"
      },
      "emergencyContact": {
        "name": "Mrs. Johnson",
        "relationship": "Spouse",
        "phone": "+234-803-456-7890"
      },
      "assignedVehicle": {
        "id": "veh_017",
        "vehicleId": "DRA-017",
        "plateNumber": "ABC-123-XY"
      },
      "currentTrip": {
        "id": "TRP-2401",
        "route": "Lagos → Abuja",
        "progress": 65,
        "estimatedArrival": "2024-01-16T14:00:00Z"
      },
      "statistics": {
        "totalTrips": 234,
        "completedTrips": 230,
        "cancelledTrips": 4,
        "totalDistance": 125000,
        "averageRating": 4.7,
        "onTimeDeliveryRate": 96.5
      },
      "documents": {
        "license": {
          "status": "valid",
          "expiryDate": "2025-12-31",
          "verified": true
        },
        "medicalCertificate": {
          "status": "valid",
          "expiryDate": "2024-12-31",
          "verified": true
        }
      },
      "hireDate": "2020-01-15",
      "lastTrip": "2024-01-15T08:00:00Z",
      "createdAt": "2020-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 58,
    "totalPages": 3
  }
}
```

**Permissions Required:** `drivers:read`

---

### 2. Get Driver Details
```http
GET /drivers/{driverId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "drv_001",
    "driverId": "DRV-001",
    "name": "Adebayo Johnson",
    "email": "adebayo@daraexpress.com",
    "phone": "+234-801-234-5678",
    "alternatePhone": "+234-802-345-6789",
    "status": "on_trip",
    "avatar": "https://cdn.daraexpress.com/avatars/drv_001.jpg",
    "licenseNumber": "ABC123456",
    "licenseClass": "C",
    "licenseExpiry": "2025-12-31",
    "dateOfBirth": "1985-05-15",
    "nationality": "Nigerian",
    "gender": "Male",
    "bloodGroup": "O+",
    "address": {
      "street": "23 Driver Street",
      "city": "Lagos",
      "state": "Lagos State",
      "country": "Nigeria",
      "postalCode": "100001"
    },
    "emergencyContact": {
      "name": "Mrs. Johnson",
      "relationship": "Spouse",
      "phone": "+234-803-456-7890",
      "address": "23 Driver Street, Lagos"
    },
    "assignedVehicle": {
      "id": "veh_017",
      "vehicleId": "DRA-017",
      "plateNumber": "ABC-123-XY",
      "make": "Mercedes",
      "model": "Actros"
    },
    "currentTrip": {
      "id": "TRP-2401",
      "route": "Lagos → Abuja",
      "client": "Adebayo Industries",
      "departureDate": "2024-01-15T08:00:00Z",
      "estimatedArrival": "2024-01-16T14:00:00Z",
      "progress": 65,
      "currentLocation": {
        "lat": 6.5244,
        "lng": 3.3792,
        "address": "Ikorodu Road, Lagos"
      }
    },
    "statistics": {
      "totalTrips": 234,
      "completedTrips": 230,
      "cancelledTrips": 4,
      "totalDistance": 125000,
      "totalRevenue": 19500000,
      "averageRating": 4.7,
      "onTimeDeliveryRate": 96.5,
      "safetyScore": 98,
      "fuelEfficiency": 8.5
    },
    "performance": {
      "thisMonth": {
        "trips": 15,
        "distance": 5500,
        "revenue": 1275000,
        "rating": 4.8
      },
      "lastMonth": {
        "trips": 18,
        "distance": 6200,
        "revenue": 1530000,
        "rating": 4.6
      }
    },
    "documents": {
      "license": {
        "number": "ABC123456",
        "class": "C",
        "issueDate": "2020-01-01",
        "expiryDate": "2025-12-31",
        "status": "valid",
        "verified": true,
        "fileUrl": "https://cdn.daraexpress.com/docs/license_drv_001.pdf"
      },
      "medicalCertificate": {
        "issueDate": "2024-01-01",
        "expiryDate": "2024-12-31",
        "status": "valid",
        "verified": true,
        "fileUrl": "https://cdn.daraexpress.com/docs/medical_drv_001.pdf"
      },
      "backgroundCheck": {
        "date": "2020-01-10",
        "status": "cleared",
        "fileUrl": "https://cdn.daraexpress.com/docs/background_drv_001.pdf"
      }
    },
    "certifications": [
      {
        "name": "Hazardous Materials Handling",
        "issuer": "FRSC",
        "issueDate": "2022-06-15",
        "expiryDate": "2025-06-15"
      }
    ],
    "violations": [
      {
        "id": "vio_001",
        "type": "speeding",
        "description": "Exceeded speed limit by 15 km/h",
        "date": "2023-11-20",
        "penalty": 50000,
        "status": "resolved"
      }
    ],
    "leaves": [
      {
        "id": "leave_001",
        "type": "annual",
        "startDate": "2024-02-01",
        "endDate": "2024-02-07",
        "status": "approved",
        "days": 7
      }
    ],
    "salary": {
      "basic": 250000,
      "allowances": 50000,
      "total": 300000,
      "currency": "NGN",
      "paymentFrequency": "monthly"
    },
    "bankDetails": {
      "bankName": "First Bank of Nigeria",
      "accountNumber": "1234567890",
      "accountName": "Adebayo Johnson"
    },
    "hireDate": "2020-01-15",
    "contractType": "permanent",
    "lastTrip": "2024-01-15T08:00:00Z",
    "lastLogin": "2024-01-15T07:45:00Z",
    "createdAt": "2020-01-15T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. Add New Driver
```http
POST /drivers
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Chidi Okafor",
  "email": "chidi@daraexpress.com",
  "phone": "+234-809-876-5432",
  "dateOfBirth": "1990-08-20",
  "licenseNumber": "XYZ789012",
  "licenseClass": "C",
  "licenseExpiry": "2026-12-31",
  "address": {
    "street": "45 Main Road",
    "city": "Abuja",
    "state": "FCT",
    "country": "Nigeria"
  },
  "emergencyContact": {
    "name": "Mr. Okafor Sr.",
    "relationship": "Father",
    "phone": "+234-808-765-4321"
  },
  "hireDate": "2024-01-15",
  "salary": {
    "basic": 250000,
    "allowances": 50000
  }
}
```

**Validation Rules:**
- `name`: Required, string, min 2, max 100 chars
- `email`: Required, valid email, unique
- `phone`: Required, valid phone format, unique
- `dateOfBirth`: Required, ISO date, must be 18+ years old
- `licenseNumber`: Required, string, unique, max 50 chars
- `licenseClass`: Required, enum: `A|B|C|D|E`
- `licenseExpiry`: Required, ISO date, must be future date
- `hireDate`: Required, ISO date

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "drv_059",
    "driverId": "DRV-059",
    "name": "Chidi Okafor",
    "email": "chidi@daraexpress.com",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Driver added successfully"
}
```

**Permissions Required:** `drivers:create`

---

### 4. Update Driver
```http
PUT /drivers/{driverId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "status": "on_leave",
  "phone": "+234-809-999-8888",
  "assignedVehicle": "veh_025"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "drv_001",
    "driverId": "DRV-001",
    "status": "on_leave",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Driver updated successfully"
}
```

**Permissions Required:** `drivers:update`

---

### 5. Delete Driver
```http
DELETE /drivers/{driverId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Driver deleted successfully"
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": {
    "code": "DRIVER_HAS_ACTIVE_TRIP",
    "message": "Cannot delete driver with active trip",
    "statusCode": 409,
    "details": {
      "tripId": "TRP-2401"
    }
  }
}
```

**Permissions Required:** `drivers:delete`

---

### 6. Get Driver Trip History
```http
GET /drivers/{driverId}/trips
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `completed|in_progress|cancelled`
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
      "id": "TRP-2401",
      "route": "Lagos → Abuja",
      "client": "Adebayo Industries",
      "vehicle": "DRA-017",
      "departureDate": "2024-01-15T08:00:00Z",
      "arrivalDate": "2024-01-16T14:00:00Z",
      "distance": 750,
      "status": "in_progress",
      "revenue": 450000,
      "rating": null
    }
  ],
  "statistics": {
    "totalTrips": 234,
    "totalDistance": 125000,
    "totalRevenue": 19500000,
    "averageRating": 4.7
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 234
  }
}
```

---

### 7. Get Driver Performance
```http
GET /drivers/{driverId}/performance
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `metrics`: Optional, comma-separated: `trips,revenue,rating,safety`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "trips": {
      "total": 18,
      "completed": 17,
      "cancelled": 1,
      "onTime": 16,
      "delayed": 1
    },
    "distance": {
      "total": 6200,
      "average": 344
    },
    "revenue": {
      "total": 1530000,
      "average": 85000
    },
    "ratings": {
      "average": 4.6,
      "distribution": {
        "5": 12,
        "4": 4,
        "3": 1,
        "2": 0,
        "1": 0
      }
    },
    "safety": {
      "score": 98,
      "violations": 0,
      "incidents": 0
    },
    "efficiency": {
      "fuelEfficiency": 8.5,
      "onTimeDeliveryRate": 94.1
    },
    "comparison": {
      "vsLastPeriod": {
        "trips": 12.5,
        "revenue": 8.3,
        "rating": -4.2
      },
      "vsAverage": {
        "trips": 5.8,
        "revenue": 3.2,
        "rating": 2.2
      }
    }
  }
}
```

---

### 8. Get Driver Location (Real-time)
```http
GET /drivers/{driverId}/location
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "driverId": "DRV-001",
    "location": {
      "lat": 6.5244,
      "lng": 3.3792,
      "address": "Ikorodu Road, Lagos",
      "accuracy": 10
    },
    "speed": 80,
    "heading": 45,
    "tripId": "TRP-2401",
    "vehicleId": "DRA-017",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**WebSocket Alternative:**
```javascript
ws://api.daraexpress.com/v1/ws/drivers/{driverId}/location
// Real-time location updates every 30 seconds
```

---

### 9. Request Leave
```http
POST /drivers/{driverId}/leave
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "type": "annual",
  "startDate": "2024-02-01",
  "endDate": "2024-02-07",
  "reason": "Family vacation",
  "coverDriver": "drv_025"
}
```

**Validation Rules:**
- `type`: Required, enum: `annual|sick|emergency|unpaid`
- `startDate`: Required, ISO date, must be future date
- `endDate`: Required, ISO date, must be after startDate
- `reason`: Optional, string, max 500 chars

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "leave_002",
    "driverId": "DRV-001",
    "type": "annual",
    "startDate": "2024-02-01",
    "endDate": "2024-02-07",
    "days": 7,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Leave request submitted successfully"
}
```

---

### 10. Approve/Reject Leave
```http
PUT /drivers/leave/{leaveId}/status
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "approved",
  "notes": "Approved, cover driver assigned"
}
```

**Validation Rules:**
- `status`: Required, enum: `approved|rejected`
- `notes`: Optional, string, max 500 chars

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "leave_002",
    "status": "approved",
    "approvedBy": {
      "id": "usr_001",
      "name": "John Doe"
    },
    "approvedAt": "2024-01-15T10:35:00Z"
  },
  "message": "Leave request approved"
}
```

**Permissions Required:** `drivers:approve_leave`

---

### 11. Upload Driver Document
```http
POST /drivers/{driverId}/documents
Headers: Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body:**
```
documentType: license|medical|background|certification
file: [binary file]
expiryDate: 2025-12-31 (optional)
description: Driver's license renewal (optional)
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "doc_001",
    "type": "license",
    "fileName": "license_drv_001.pdf",
    "fileUrl": "https://cdn.daraexpress.com/docs/license_drv_001.pdf",
    "expiryDate": "2025-12-31",
    "uploadedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Document uploaded successfully"
}
```

**Permissions Required:** `drivers:upload_documents`

---


## Trips Management

### 1. Get All Trips
```http
GET /trips
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `pending|in_progress|completed|cancelled`
- `driverId`: Optional, string
- `vehicleId`: Optional, string
- `clientId`: Optional, string
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `search`: Optional, string
- `sort`: Optional, string
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "trip_001",
      "tripId": "TRP-2401",
      "status": "in_progress",
      "client": {
        "id": "cli_001",
        "name": "Adebayo Industries",
        "contactPhone": "+234-801-234-5678"
      },
      "vehicle": {
        "id": "veh_017",
        "vehicleId": "DRA-017",
        "plateNumber": "ABC-123-XY",
        "type": "refrigerated"
      },
      "driver": {
        "id": "drv_001",
        "name": "Adebayo Johnson",
        "phone": "+234-801-234-5678",
        "avatar": "https://cdn.daraexpress.com/avatars/drv_001.jpg"
      },
      "route": {
        "origin": {
          "address": "45 Industrial Avenue, Lagos",
          "coordinates": {
            "lat": 6.5244,
            "lng": 3.3792
          }
        },
        "destination": {
          "address": "12 Market Road, Abuja",
          "coordinates": {
            "lat": 9.0765,
            "lng": 7.3986
          }
        },
        "distance": 750,
        "estimatedDuration": 1800
      },
      "cargo": {
        "type": "Electronics",
        "description": "Laptops and accessories",
        "weight": 1000,
        "quantity": 50,
        "value": 5000000,
        "requiresTemperature": true,
        "temperatureRange": {
          "min": -18,
          "max": -15
        }
      },
      "schedule": {
        "scheduledPickup": "2024-01-15T08:00:00Z",
        "actualPickup": "2024-01-15T08:15:00Z",
        "estimatedDelivery": "2024-01-16T14:00:00Z",
        "actualDelivery": null
      },
      "progress": {
        "percentage": 65,
        "currentLocation": {
          "lat": 7.3775,
          "lng": 3.9470,
          "address": "Ibadan Expressway",
          "lastUpdated": "2024-01-15T10:30:00Z"
        },
        "distanceCovered": 487,
        "distanceRemaining": 263,
        "estimatedTimeRemaining": 720
      },
      "pricing": {
        "basePrice": 400000,
        "additionalCharges": 50000,
        "totalPrice": 450000,
        "currency": "NGN",
        "paymentStatus": "pending"
      },
      "documents": {
        "waybill": "https://cdn.daraexpress.com/docs/waybill_TRP-2401.pdf",
        "invoice": "https://cdn.daraexpress.com/docs/invoice_TRP-2401.pdf"
      },
      "createdAt": "2024-01-14T10:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

**Permissions Required:** `trips:read`

---

### 2. Get Trip Details
```http
GET /trips/{tripId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "trip_001",
    "tripId": "TRP-2401",
    "status": "in_progress",
    "client": {
      "id": "cli_001",
      "clientId": "CL001",
      "name": "Adebayo Industries",
      "email": "contact@adebayo.com",
      "phone": "+234-801-234-5678",
      "contactPerson": "Mr. Adebayo"
    },
    "vehicle": {
      "id": "veh_017",
      "vehicleId": "DRA-017",
      "plateNumber": "ABC-123-XY",
      "make": "Mercedes",
      "model": "Actros",
      "type": "refrigerated",
      "tonnage": 20
    },
    "driver": {
      "id": "drv_001",
      "driverId": "DRV-001",
      "name": "Adebayo Johnson",
      "email": "adebayo@daraexpress.com",
      "phone": "+234-801-234-5678",
      "avatar": "https://cdn.daraexpress.com/avatars/drv_001.jpg",
      "rating": 4.7
    },
    "route": {
      "origin": {
        "address": "45 Industrial Avenue, Lagos",
        "city": "Lagos",
        "state": "Lagos State",
        "coordinates": {
          "lat": 6.5244,
          "lng": 3.3792
        },
        "contactName": "Mr. Adebayo",
        "contactPhone": "+234-801-234-5678"
      },
      "destination": {
        "address": "12 Market Road, Abuja",
        "city": "Abuja",
        "state": "FCT",
        "coordinates": {
          "lat": 9.0765,
          "lng": 7.3986
        },
        "contactName": "Mrs. Okonkwo",
        "contactPhone": "+234-802-345-6789"
      },
      "waypoints": [
        {
          "address": "Rest Stop, Ibadan",
          "coordinates": {
            "lat": 7.3775,
            "lng": 3.9470
          },
          "type": "rest",
          "estimatedArrival": "2024-01-15T12:00:00Z"
        }
      ],
      "distance": 750,
      "estimatedDuration": 1800
    },
    "cargo": {
      "type": "Electronics",
      "description": "Laptops and accessories - 50 units",
      "weight": 1000,
      "quantity": 50,
      "value": 5000000,
      "requiresTemperature": true,
      "temperatureRange": {
        "min": -18,
        "max": -15
      },
      "specialInstructions": "Handle with care, fragile items",
      "insurance": {
        "covered": true,
        "value": 5000000,
        "provider": "AXA Mansard",
        "policyNumber": "POL123456"
      }
    },
    "schedule": {
      "scheduledPickup": "2024-01-15T08:00:00Z",
      "actualPickup": "2024-01-15T08:15:00Z",
      "estimatedDelivery": "2024-01-16T14:00:00Z",
      "actualDelivery": null,
      "pickupDelay": 15
    },
    "progress": {
      "percentage": 65,
      "status": "on_route",
      "currentLocation": {
        "lat": 7.3775,
        "lng": 3.9470,
        "address": "Ibadan Expressway",
        "lastUpdated": "2024-01-15T10:30:00Z"
      },
      "distanceCovered": 487,
      "distanceRemaining": 263,
      "estimatedTimeRemaining": 720,
      "averageSpeed": 75
    },
    "pricing": {
      "basePrice": 400000,
      "additionalCharges": [
        {
          "type": "insurance",
          "amount": 30000,
          "description": "Cargo insurance"
        },
        {
          "type": "express",
          "amount": 20000,
          "description": "Express delivery"
        }
      ],
      "totalPrice": 450000,
      "currency": "NGN",
      "paymentStatus": "pending",
      "paymentMethod": null
    },
    "temperature": {
      "current": -18.5,
      "setPoint": -18,
      "status": "normal",
      "violations": 0,
      "lastReading": "2024-01-15T10:30:00Z"
    },
    "timeline": [
      {
        "id": "evt_001",
        "type": "trip_created",
        "title": "Trip Created",
        "description": "Trip created and assigned to driver",
        "timestamp": "2024-01-14T10:00:00Z",
        "user": {
          "id": "usr_005",
          "name": "Sarah Johnson"
        }
      },
      {
        "id": "evt_002",
        "type": "pickup_completed",
        "title": "Pickup Completed",
        "description": "Cargo picked up from origin",
        "timestamp": "2024-01-15T08:15:00Z",
        "location": {
          "lat": 6.5244,
          "lng": 3.3792
        }
      }
    ],
    "documents": {
      "waybill": {
        "number": "WB-2024-001",
        "url": "https://cdn.daraexpress.com/docs/waybill_TRP-2401.pdf",
        "generatedAt": "2024-01-14T10:00:00Z"
      },
      "invoice": {
        "number": "INV-2024-001",
        "url": "https://cdn.daraexpress.com/docs/invoice_TRP-2401.pdf",
        "generatedAt": "2024-01-14T10:00:00Z"
      },
      "proofOfDelivery": null
    },
    "notes": [
      {
        "id": "note_001",
        "content": "Client requested morning delivery",
        "createdBy": {
          "id": "usr_005",
          "name": "Sarah Johnson"
        },
        "createdAt": "2024-01-14T10:05:00Z"
      }
    ],
    "createdBy": {
      "id": "usr_005",
      "name": "Sarah Johnson"
    },
    "createdAt": "2024-01-14T10:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. Create New Trip
```http
POST /trips
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "clientId": "cli_001",
  "vehicleId": "veh_017",
  "driverId": "drv_001",
  "route": {
    "origin": {
      "address": "45 Industrial Avenue, Lagos",
      "coordinates": {
        "lat": 6.5244,
        "lng": 3.3792
      },
      "contactName": "Mr. Adebayo",
      "contactPhone": "+234-801-234-5678"
    },
    "destination": {
      "address": "12 Market Road, Abuja",
      "coordinates": {
        "lat": 9.0765,
        "lng": 7.3986
      },
      "contactName": "Mrs. Okonkwo",
      "contactPhone": "+234-802-345-6789"
    },
    "waypoints": []
  },
  "cargo": {
    "type": "Electronics",
    "description": "Laptops and accessories",
    "weight": 1000,
    "quantity": 50,
    "value": 5000000,
    "requiresTemperature": true,
    "temperatureRange": {
      "min": -18,
      "max": -15
    },
    "specialInstructions": "Handle with care"
  },
  "schedule": {
    "scheduledPickup": "2024-01-16T08:00:00Z",
    "estimatedDelivery": "2024-01-17T14:00:00Z"
  },
  "pricing": {
    "basePrice": 400000,
    "additionalCharges": [
      {
        "type": "insurance",
        "amount": 30000
      }
    ]
  }
}
```

**Validation Rules:**
- `clientId`: Required, must exist
- `vehicleId`: Required, must exist and be available
- `driverId`: Required, must exist and be available
- `route.origin.address`: Required, string
- `route.destination.address`: Required, string
- `cargo.type`: Required, string, max 100 chars
- `cargo.weight`: Required, number, min 1
- `schedule.scheduledPickup`: Required, ISO date, must be future date
- `pricing.basePrice`: Required, number, min 0

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "trip_157",
    "tripId": "TRP-2405",
    "status": "pending",
    "client": "Adebayo Industries",
    "vehicle": "DRA-017",
    "driver": "Adebayo Johnson",
    "scheduledPickup": "2024-01-16T08:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Trip created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "statusCode": 400,
    "details": [
      {
        "field": "vehicleId",
        "message": "Vehicle is not available for the selected time",
        "value": "veh_017"
      }
    ]
  }
}
```

**Permissions Required:** `trips:create`

---

### 4. Update Trip
```http
PUT /trips/{tripId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "status": "in_progress",
  "schedule": {
    "actualPickup": "2024-01-16T08:15:00Z"
  },
  "progress": {
    "currentLocation": {
      "lat": 7.3775,
      "lng": 3.9470
    }
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "trip_001",
    "tripId": "TRP-2401",
    "status": "in_progress",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Trip updated successfully"
}
```

**Permissions Required:** `trips:update`

---

### 5. Cancel Trip
```http
POST /trips/{tripId}/cancel
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "reason": "Client requested cancellation",
  "cancellationType": "client_request",
  "refundAmount": 450000
}
```

**Validation Rules:**
- `reason`: Required, string, max 500 chars
- `cancellationType`: Required, enum: `client_request|vehicle_breakdown|driver_unavailable|weather|other`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "trip_001",
    "tripId": "TRP-2401",
    "status": "cancelled",
    "cancelledBy": {
      "id": "usr_001",
      "name": "John Doe"
    },
    "cancelledAt": "2024-01-15T10:30:00Z",
    "refundAmount": 450000
  },
  "message": "Trip cancelled successfully"
}
```

**Permissions Required:** `trips:cancel`

---

### 6. Complete Trip
```http
POST /trips/{tripId}/complete
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "actualDelivery": "2024-01-16T13:45:00Z",
  "proofOfDelivery": {
    "signature": "base64_encoded_signature",
    "photo": "base64_encoded_photo",
    "recipientName": "Mrs. Okonkwo",
    "recipientPhone": "+234-802-345-6789",
    "notes": "Delivered in good condition"
  },
  "finalOdometer": 45980
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "trip_001",
    "tripId": "TRP-2401",
    "status": "completed",
    "completedAt": "2024-01-16T13:45:00Z",
    "proofOfDelivery": "https://cdn.daraexpress.com/docs/pod_TRP-2401.pdf"
  },
  "message": "Trip completed successfully"
}
```

**Permissions Required:** `trips:complete`

---

### 7. Get Trip Tracking
```http
GET /trips/{tripId}/tracking
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
      "lat": 7.3775,
      "lng": 3.9470,
      "address": "Ibadan Expressway",
      "lastUpdated": "2024-01-15T10:30:00Z"
    },
    "progress": 65,
    "estimatedArrival": "2024-01-16T14:00:00Z",
    "route": {
      "origin": {
        "lat": 6.5244,
        "lng": 3.3792
      },
      "destination": {
        "lat": 9.0765,
        "lng": 7.3986
      },
      "polyline": "encoded_polyline_string"
    },
    "locationHistory": [
      {
        "lat": 7.3775,
        "lng": 3.9470,
        "timestamp": "2024-01-15T10:30:00Z",
        "speed": 80
      }
    ],
    "temperature": {
      "current": -18.5,
      "status": "normal"
    }
  }
}
```

**Public Access:** This endpoint can be accessed with a tracking token without authentication
```http
GET /public/tracking/{trackingToken}
```

---

### 8. Get Trip Timeline
```http
GET /trips/{tripId}/timeline
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "evt_001",
      "type": "trip_created",
      "title": "Trip Created",
      "description": "Trip created and assigned to driver",
      "timestamp": "2024-01-14T10:00:00Z",
      "user": {
        "id": "usr_005",
        "name": "Sarah Johnson"
      }
    },
    {
      "id": "evt_002",
      "type": "driver_assigned",
      "title": "Driver Assigned",
      "description": "Adebayo Johnson assigned to trip",
      "timestamp": "2024-01-14T10:05:00Z"
    },
    {
      "id": "evt_003",
      "type": "pickup_completed",
      "title": "Pickup Completed",
      "description": "Cargo picked up from origin",
      "timestamp": "2024-01-15T08:15:00Z",
      "location": {
        "lat": 6.5244,
        "lng": 3.3792
      }
    }
  ]
}
```

---

### 9. Add Trip Note
```http
POST /trips/{tripId}/notes
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "content": "Driver reported traffic delay on Lagos-Ibadan expressway",
  "type": "general"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "note_002",
    "content": "Driver reported traffic delay on Lagos-Ibadan expressway",
    "type": "general",
    "createdBy": {
      "id": "usr_001",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Note added successfully"
}
```

---

### 10. Generate Trip Documents
```http
POST /trips/{tripId}/documents/generate
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "documentType": "waybill",
  "format": "pdf"
}
```

**Validation Rules:**
- `documentType`: Required, enum: `waybill|invoice|manifest|pod`
- `format`: Optional, enum: `pdf|excel` (default: `pdf`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "documentType": "waybill",
    "number": "WB-2024-001",
    "url": "https://cdn.daraexpress.com/docs/waybill_TRP-2401.pdf",
    "generatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Document generated successfully"
}
```

---

### 11. Get Trip Analytics
```http
GET /trips/analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month|client|driver|vehicle`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalTrips": 156,
      "completed": 148,
      "inProgress": 5,
      "cancelled": 3,
      "totalRevenue": 13260000,
      "totalDistance": 117000,
      "averageRating": 4.6
    },
    "trends": [
      {
        "date": "2024-01-15",
        "trips": 8,
        "revenue": 680000,
        "distance": 6000
      }
    ],
    "topRoutes": [
      {
        "route": "Lagos → Abuja",
        "count": 45,
        "revenue": 3825000
      }
    ],
    "performance": {
      "onTimeDeliveryRate": 94.9,
      "averageDeliveryTime": 28.5,
      "customerSatisfaction": 4.6
    }
  }
}
```

---


## Payments & Invoicing

### 1. Get All Payments
```http
GET /payments
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `paid|pending|overdue|cancelled`
- `method`: Optional, enum: `Bank Transfer|Paystack|Cash|Cheque`
- `clientId`: Optional, string
- `tripId`: Optional, string
- `search`: Optional, string (searches invoice number, client name)
- `minAmount`: Optional, number
- `maxAmount`: Optional, number
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `sort`: Optional, string
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "pay_001",
      "paymentId": "PAY-2024-001",
      "invoiceNumber": "INV-2024-001",
      "trip": {
        "id": "trip_001",
        "tripId": "TRP-2401",
        "route": "Lagos → Abuja"
      },
      "client": {
        "id": "cli_001",
        "clientId": "CL001",
        "name": "Adebayo Industries",
        "email": "contact@adebayo.com"
      },
      "amount": 450000,
      "currency": "NGN",
      "status": "paid",
      "method": "Bank Transfer",
      "dueDate": "2024-02-14T00:00:00Z",
      "paidDate": "2024-02-10T10:30:00Z",
      "paidAmount": 450000,
      "reference": "TRF123456789",
      "description": "Payment for trip TRP-2401",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-02-10T10:30:00Z"
    }
  ],
  "summary": {
    "totalAmount": 13260000,
    "paidAmount": 11850000,
    "pendingAmount": 1200000,
    "overdueAmount": 210000
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

**Permissions Required:** `payments:read`

---

### 2. Get Payment Details
```http
GET /payments/{paymentId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "pay_001",
    "paymentId": "PAY-2024-001",
    "invoiceNumber": "INV-2024-001",
    "trip": {
      "id": "trip_001",
      "tripId": "TRP-2401",
      "route": "Lagos → Abuja",
      "departureDate": "2024-01-15T08:00:00Z",
      "deliveryDate": "2024-01-16T13:45:00Z"
    },
    "client": {
      "id": "cli_001",
      "clientId": "CL001",
      "name": "Adebayo Industries",
      "email": "contact@adebayo.com",
      "phone": "+234-801-234-5678",
      "address": "45 Industrial Avenue, Lagos"
    },
    "lineItems": [
      {
        "description": "Base transportation fee",
        "quantity": 1,
        "unitPrice": 400000,
        "amount": 400000
      },
      {
        "description": "Insurance",
        "quantity": 1,
        "unitPrice": 30000,
        "amount": 30000
      },
      {
        "description": "Express delivery",
        "quantity": 1,
        "unitPrice": 20000,
        "amount": 20000
      }
    ],
    "subtotal": 450000,
    "tax": {
      "rate": 7.5,
      "amount": 33750
    },
    "discount": {
      "type": "percentage",
      "value": 5,
      "amount": 22500
    },
    "totalAmount": 461250,
    "currency": "NGN",
    "status": "paid",
    "method": "Bank Transfer",
    "dueDate": "2024-02-14T00:00:00Z",
    "paidDate": "2024-02-10T10:30:00Z",
    "paidAmount": 461250,
    "reference": "TRF123456789",
    "bankDetails": {
      "bankName": "First Bank of Nigeria",
      "accountNumber": "1234567890",
      "accountName": "Dara Express Logistics Ltd"
    },
    "paymentTerms": "Net 30",
    "notes": "Payment received in full",
    "documents": {
      "invoice": "https://cdn.daraexpress.com/docs/invoice_PAY-2024-001.pdf",
      "receipt": "https://cdn.daraexpress.com/docs/receipt_PAY-2024-001.pdf"
    },
    "history": [
      {
        "action": "created",
        "timestamp": "2024-01-15T10:30:00Z",
        "user": {
          "id": "usr_005",
          "name": "Sarah Johnson"
        }
      },
      {
        "action": "paid",
        "timestamp": "2024-02-10T10:30:00Z",
        "amount": 461250,
        "method": "Bank Transfer",
        "reference": "TRF123456789"
      }
    ],
    "createdBy": {
      "id": "usr_005",
      "name": "Sarah Johnson"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-02-10T10:30:00Z"
  }
}
```

---

### 3. Create Payment
```http
POST /payments
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "tripId": "trip_001",
  "clientId": "cli_001",
  "lineItems": [
    {
      "description": "Base transportation fee",
      "quantity": 1,
      "unitPrice": 400000
    },
    {
      "description": "Insurance",
      "quantity": 1,
      "unitPrice": 30000
    }
  ],
  "tax": {
    "rate": 7.5
  },
  "discount": {
    "type": "percentage",
    "value": 5
  },
  "dueDate": "2024-02-14T00:00:00Z",
  "paymentTerms": "Net 30",
  "notes": "Payment for completed trip"
}
```

**Validation Rules:**
- `tripId`: Required, must exist
- `clientId`: Required, must exist
- `lineItems`: Required, array, min 1 item
- `lineItems[].description`: Required, string, max 200 chars
- `lineItems[].unitPrice`: Required, number, min 0
- `dueDate`: Required, ISO date, must be future date

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "pay_157",
    "paymentId": "PAY-2024-157",
    "invoiceNumber": "INV-2024-157",
    "totalAmount": 461250,
    "status": "pending",
    "dueDate": "2024-02-14T00:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Payment created successfully"
}
```

**Permissions Required:** `payments:create`

---

### 4. Update Payment Status
```http
PUT /payments/{paymentId}/status
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "paid",
  "method": "Bank Transfer",
  "reference": "TRF123456789",
  "paidAmount": 461250,
  "paidDate": "2024-02-10T10:30:00Z",
  "notes": "Payment received in full"
}
```

**Validation Rules:**
- `status`: Required, enum: `paid|pending|overdue|cancelled`
- `method`: Required if status is `paid`, enum: `Bank Transfer|Paystack|Cash|Cheque`
- `reference`: Required if status is `paid`, string, max 100 chars
- `paidAmount`: Required if status is `paid`, number, min 0
- `paidDate`: Required if status is `paid`, ISO date

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "pay_001",
    "paymentId": "PAY-2024-001",
    "status": "paid",
    "paidAmount": 461250,
    "paidDate": "2024-02-10T10:30:00Z",
    "updatedAt": "2024-02-10T10:30:00Z"
  },
  "message": "Payment status updated successfully"
}
```

**Permissions Required:** `payments:update`

---

### 5. Record Partial Payment
```http
POST /payments/{paymentId}/partial
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "amount": 200000,
  "method": "Bank Transfer",
  "reference": "TRF123456789",
  "paidDate": "2024-02-05T10:30:00Z",
  "notes": "Partial payment received"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "pay_001",
    "paymentId": "PAY-2024-001",
    "totalAmount": 461250,
    "paidAmount": 200000,
    "remainingAmount": 261250,
    "status": "pending",
    "partialPayments": [
      {
        "id": "partial_001",
        "amount": 200000,
        "method": "Bank Transfer",
        "reference": "TRF123456789",
        "paidDate": "2024-02-05T10:30:00Z"
      }
    ]
  },
  "message": "Partial payment recorded successfully"
}
```

---

### 6. Generate Invoice
```http
POST /payments/{paymentId}/invoice
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `format`: Optional, enum: `pdf|html` (default: `pdf`)
- `send`: Optional, boolean (default: false) - Send to client email

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "invoiceNumber": "INV-2024-001",
    "url": "https://cdn.daraexpress.com/docs/invoice_PAY-2024-001.pdf",
    "generatedAt": "2024-01-15T10:30:00Z",
    "emailSent": false
  },
  "message": "Invoice generated successfully"
}
```

**PDF Response (format=pdf):**
- Returns PDF file directly

---

### 7. Download Receipt
```http
GET /payments/{paymentId}/receipt
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `format`: Optional, enum: `pdf|html` (default: `pdf`)

**Success Response (200):**
- Returns PDF or HTML file

---

### 8. Send Payment Reminder
```http
POST /payments/{paymentId}/reminder
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "method": "email",
  "message": "This is a friendly reminder that payment is due in 3 days"
}
```

**Validation Rules:**
- `method`: Required, enum: `email|sms|both`
- `message`: Optional, string, max 500 chars

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "paymentId": "PAY-2024-001",
    "reminderSent": true,
    "methods": ["email"],
    "sentAt": "2024-01-15T10:30:00Z"
  },
  "message": "Payment reminder sent successfully"
}
```

**Permissions Required:** `payments:send_reminder`

---

### 9. Get Revenue Data
```http
GET /payments/revenue
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `period`: Optional, enum: `today|week|month|year|custom` (default: `month`)
- `startDate`: Required if period is `custom`, ISO date
- `endDate`: Required if period is `custom`, ISO date
- `groupBy`: Optional, enum: `day|week|month|client|method`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "summary": {
      "totalRevenue": 13260000,
      "paidRevenue": 11850000,
      "pendingRevenue": 1200000,
      "overdueRevenue": 210000,
      "totalPayments": 156,
      "averagePaymentValue": 85000
    },
    "trends": [
      {
        "date": "2024-01-15",
        "revenue": 680000,
        "payments": 8
      }
    ],
    "byMethod": [
      {
        "method": "Bank Transfer",
        "amount": 8880000,
        "percentage": 74.9,
        "count": 98
      },
      {
        "method": "Paystack",
        "amount": 2370000,
        "percentage": 20.0,
        "count": 45
      },
      {
        "method": "Cash",
        "amount": 600000,
        "percentage": 5.1,
        "count": 13
      }
    ],
    "byClient": [
      {
        "clientId": "CL001",
        "clientName": "Adebayo Industries",
        "amount": 3850000,
        "percentage": 32.5,
        "payments": 45
      }
    ],
    "comparison": {
      "vsLastPeriod": {
        "revenue": 12.5,
        "payments": 8.3
      }
    }
  }
}
```

---

### 10. Get Outstanding Payments
```http
GET /payments/outstanding
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `clientId`: Optional, string
- `daysOverdue`: Optional, number (filter by days overdue)
- `sort`: Optional, string (default: `-dueDate`)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "pay_045",
      "paymentId": "PAY-2024-045",
      "invoiceNumber": "INV-2024-045",
      "client": {
        "id": "cli_012",
        "name": "TechCorp Nigeria"
      },
      "amount": 350000,
      "dueDate": "2024-01-10T00:00:00Z",
      "daysOverdue": 5,
      "status": "overdue"
    }
  ],
  "summary": {
    "totalOutstanding": 1410000,
    "totalOverdue": 210000,
    "count": 12
  }
}
```

---

### 11. Export Payments
```http
POST /payments/export
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "format": "excel",
  "filters": {
    "status": "paid",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  },
  "columns": [
    "invoiceNumber",
    "client",
    "amount",
    "status",
    "paidDate"
  ]
}
```

**Validation Rules:**
- `format`: Required, enum: `excel|csv|pdf`
- `filters`: Optional, object
- `columns`: Optional, array of strings

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "fileUrl": "https://cdn.daraexpress.com/exports/payments_2024-01-15.xlsx",
    "fileName": "payments_2024-01-15.xlsx",
    "recordCount": 156,
    "generatedAt": "2024-01-15T10:30:00Z",
    "expiresAt": "2024-01-15T22:30:00Z"
  },
  "message": "Export generated successfully"
}
```

**File Download Response:**
- Returns file directly if `download=true` query parameter is provided

---

### 12. Paystack Integration - Initialize Payment
```http
POST /payments/{paymentId}/paystack/initialize
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "email": "contact@adebayo.com",
  "callbackUrl": "https://app.daraexpress.com/payments/callback"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "authorizationUrl": "https://checkout.paystack.com/abc123xyz",
    "accessCode": "abc123xyz",
    "reference": "PAY-2024-001_1705318200"
  },
  "message": "Payment initialized successfully"
}
```

---

### 13. Paystack Integration - Verify Payment
```http
GET /payments/paystack/verify/{reference}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "reference": "PAY-2024-001_1705318200",
    "amount": 461250,
    "status": "success",
    "paidAt": "2024-01-15T10:30:00Z",
    "channel": "card",
    "currency": "NGN",
    "customer": {
      "email": "contact@adebayo.com"
    }
  }
}
```

---

### 14. Get Payment Analytics
```http
GET /payments/analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month|client|method`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": 13260000,
      "growth": 12.5,
      "trend": "up"
    },
    "payments": {
      "total": 156,
      "paid": 144,
      "pending": 9,
      "overdue": 3
    },
    "averages": {
      "paymentValue": 85000,
      "paymentTime": 25.5,
      "collectionRate": 92.3
    },
    "topClients": [
      {
        "clientId": "CL001",
        "clientName": "Adebayo Industries",
        "revenue": 3850000,
        "payments": 45
      }
    ],
    "paymentMethods": [
      {
        "method": "Bank Transfer",
        "amount": 8880000,
        "percentage": 74.9
      }
    ]
  }
}
```

---


## Reports & Analytics

### 1. Get Dashboard Analytics
```http
GET /reports/dashboard
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `period`: Optional, enum: `today|week|month|quarter|year|custom` (default: `month`)
- `startDate`: Required if period is `custom`, ISO date
- `endDate`: Required if period is `custom`, ISO date

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "kpis": {
      "totalRevenue": {
        "value": 13260000,
        "change": 12.5,
        "trend": "up"
      },
      "totalTrips": {
        "value": 156,
        "change": 8.3,
        "trend": "up"
      },
      "activeVehicles": {
        "value": 67,
        "change": -2.9,
        "trend": "down"
      },
      "customerSatisfaction": {
        "value": 4.6,
        "change": 4.5,
        "trend": "up"
      }
    },
    "charts": {
      "revenueByDay": [...],
      "tripsByStatus": {...},
      "topRoutes": [...]
    }
  }
}
```

**Permissions Required:** `reports:read`

---

### 2. Get Revenue Report
```http
GET /reports/revenue
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month|client|route|vehicle` (default: `day`)
- `clientId`: Optional, string
- `format`: Optional, enum: `json|excel|pdf` (default: `json`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "summary": {
      "totalRevenue": 13260000,
      "totalTrips": 156,
      "averageRevenuePerTrip": 85000,
      "growth": 12.5
    },
    "breakdown": [
      {
        "date": "2024-01-15",
        "revenue": 680000,
        "trips": 8,
        "averageValue": 85000
      }
    ],
    "byClient": [
      {
        "clientId": "CL001",
        "clientName": "Adebayo Industries",
        "revenue": 3850000,
        "trips": 45,
        "percentage": 29.0
      }
    ],
    "byRoute": [
      {
        "route": "Lagos → Abuja",
        "revenue": 3825000,
        "trips": 45,
        "percentage": 28.8
      }
    ],
    "byVehicle": [
      {
        "vehicleId": "DRA-017",
        "revenue": 1950000,
        "trips": 23,
        "utilization": 95.8
      }
    ],
    "comparison": {
      "vsLastPeriod": {
        "revenue": 12.5,
        "trips": 8.3
      },
      "vsLastYear": {
        "revenue": 25.8,
        "trips": 18.2
      }
    }
  }
}
```

---

### 3. Get Trip Performance Report
```http
GET /reports/trip-performance
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `status`: Optional, enum: `completed|cancelled|all` (default: `all`)
- `driverId`: Optional, string
- `vehicleId`: Optional, string

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalTrips": 156,
      "completed": 148,
      "inProgress": 5,
      "cancelled": 3,
      "completionRate": 94.9,
      "onTimeDeliveryRate": 92.3,
      "averageRating": 4.6
    },
    "performance": {
      "averageDeliveryTime": 28.5,
      "averageDistance": 750,
      "totalDistance": 117000,
      "fuelEfficiency": 8.5
    },
    "byStatus": {
      "completed": 148,
      "inProgress": 5,
      "cancelled": 3,
      "delayed": 12
    },
    "delays": {
      "total": 12,
      "averageDelay": 45,
      "reasons": [
        {
          "reason": "Traffic",
          "count": 7,
          "percentage": 58.3
        },
        {
          "reason": "Weather",
          "count": 3,
          "percentage": 25.0
        },
        {
          "reason": "Vehicle Issue",
          "count": 2,
          "percentage": 16.7
        }
      ]
    },
    "cancellations": {
      "total": 3,
      "reasons": [
        {
          "reason": "Client Request",
          "count": 2
        },
        {
          "reason": "Vehicle Breakdown",
          "count": 1
        }
      ]
    },
    "topPerformers": {
      "drivers": [
        {
          "driverId": "DRV-001",
          "name": "Adebayo Johnson",
          "trips": 23,
          "onTimeRate": 95.7,
          "rating": 4.8
        }
      ],
      "vehicles": [
        {
          "vehicleId": "DRA-017",
          "trips": 23,
          "utilization": 95.8,
          "efficiency": 9.2
        }
      ]
    }
  }
}
```

---

### 4. Get Fleet Utilization Report
```http
GET /reports/fleet-utilization
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `vehicleType`: Optional, enum: `refrigerated|dry|tanker`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalVehicles": 72,
      "activeVehicles": 67,
      "utilizationRate": 93.1,
      "averageTripsPerVehicle": 2.2
    },
    "byVehicle": [
      {
        "vehicleId": "DRA-017",
        "plateNumber": "ABC-123-XY",
        "type": "refrigerated",
        "trips": 23,
        "activeHours": 552,
        "idleHours": 168,
        "maintenanceHours": 24,
        "utilizationRate": 95.8,
        "revenue": 1950000,
        "revenuePerHour": 3533
      }
    ],
    "byType": [
      {
        "type": "refrigerated",
        "count": 45,
        "utilizationRate": 94.2,
        "trips": 120,
        "revenue": 10200000
      },
      {
        "type": "dry",
        "count": 20,
        "utilizationRate": 88.5,
        "trips": 30,
        "revenue": 2550000
      },
      {
        "type": "tanker",
        "count": 7,
        "utilizationRate": 92.8,
        "trips": 6,
        "revenue": 510000
      }
    ],
    "underutilized": [
      {
        "vehicleId": "DRA-045",
        "utilizationRate": 45.2,
        "trips": 8,
        "reason": "Frequent maintenance"
      }
    ]
  }
}
```

---

### 5. Get Driver Performance Report
```http
GET /reports/driver-performance
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `driverId`: Optional, string
- `minRating`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalDrivers": 58,
      "activeDrivers": 52,
      "averageRating": 4.6,
      "averageTripsPerDriver": 2.7
    },
    "byDriver": [
      {
        "driverId": "DRV-001",
        "name": "Adebayo Johnson",
        "trips": 23,
        "completedTrips": 23,
        "cancelledTrips": 0,
        "totalDistance": 17250,
        "totalRevenue": 1950000,
        "averageRating": 4.8,
        "onTimeDeliveryRate": 95.7,
        "safetyScore": 98,
        "fuelEfficiency": 9.2,
        "violations": 0
      }
    ],
    "topPerformers": [
      {
        "driverId": "DRV-001",
        "name": "Adebayo Johnson",
        "score": 98,
        "rating": 4.8
      }
    ],
    "needsImprovement": [
      {
        "driverId": "DRV-045",
        "name": "Emeka Obi",
        "score": 72,
        "rating": 3.8,
        "issues": ["Late deliveries", "Low fuel efficiency"]
      }
    ]
  }
}
```

---

### 6. Get Client Analytics Report
```http
GET /reports/client-analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `clientId`: Optional, string

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalClients": 85,
      "activeClients": 72,
      "newClients": 8,
      "churnedClients": 2,
      "retentionRate": 97.2
    },
    "byClient": [
      {
        "clientId": "CL001",
        "clientName": "Adebayo Industries",
        "trips": 45,
        "revenue": 3850000,
        "averageOrderValue": 85555,
        "onTimeDeliveryRate": 95.5,
        "rating": 4.8,
        "growth": 15.2
      }
    ],
    "topClients": [
      {
        "clientId": "CL001",
        "clientName": "Adebayo Industries",
        "revenue": 3850000,
        "percentage": 29.0
      }
    ],
    "newClients": [
      {
        "clientId": "CL086",
        "clientName": "TechCorp Nigeria",
        "joinDate": "2024-01-15",
        "trips": 2,
        "revenue": 170000
      }
    ],
    "atRisk": [
      {
        "clientId": "CL045",
        "clientName": "Global Traders",
        "lastTrip": "2023-11-20",
        "daysSinceLastTrip": 56,
        "reason": "No recent activity"
      }
    ]
  }
}
```

---

### 7. Get Temperature Compliance Report
```http
GET /reports/temperature-compliance
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `truckId`: Optional, string
- `cargoType`: Optional, string

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalTrips": 120,
      "compliantTrips": 114,
      "nonCompliantTrips": 6,
      "complianceRate": 95.0,
      "totalViolations": 8,
      "averageViolationDuration": 42
    },
    "byTruck": [
      {
        "truckId": "DRA-017",
        "plateNumber": "ABC-123-XY",
        "trips": 23,
        "violations": 2,
        "complianceRate": 91.3,
        "averageTemp": -18.2
      }
    ],
    "byCargoType": [
      {
        "cargoType": "Frozen Foods",
        "trips": 85,
        "violations": 5,
        "complianceRate": 94.1,
        "threshold": {
          "min": -20,
          "max": -15
        }
      }
    ],
    "violations": [
      {
        "id": "vio_001",
        "truckId": "DRA-017",
        "tripId": "TRP-2401",
        "cargoType": "Frozen Foods",
        "threshold": -15,
        "peakTemp": -14,
        "duration": 180,
        "severity": "high",
        "timestamp": "2024-01-15T10:25:00Z",
        "resolved": true
      }
    ],
    "trends": [
      {
        "date": "2024-01-15",
        "complianceRate": 95.5,
        "violations": 1
      }
    ]
  }
}
```

---

### 8. Get Maintenance Report
```http
GET /reports/maintenance
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `vehicleId`: Optional, string
- `type`: Optional, enum: `routine|repair|emergency`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalMaintenance": 45,
      "totalCost": 6750000,
      "averageCost": 150000,
      "totalDowntime": 360,
      "averageDowntime": 8
    },
    "byVehicle": [
      {
        "vehicleId": "DRA-017",
        "plateNumber": "ABC-123-XY",
        "maintenanceCount": 3,
        "totalCost": 450000,
        "downtime": 24,
        "lastMaintenance": "2024-01-01T00:00:00Z",
        "nextDue": "2024-04-01T00:00:00Z"
      }
    ],
    "byType": [
      {
        "type": "routine",
        "count": 30,
        "cost": 4500000,
        "percentage": 66.7
      },
      {
        "type": "repair",
        "count": 12,
        "cost": 1800000,
        "percentage": 26.7
      },
      {
        "type": "emergency",
        "count": 3,
        "cost": 450000,
        "percentage": 6.7
      }
    ],
    "upcoming": [
      {
        "vehicleId": "DRA-025",
        "type": "routine",
        "dueDate": "2024-01-20T00:00:00Z",
        "estimatedCost": 150000
      }
    ],
    "costTrends": [
      {
        "month": "2024-01",
        "cost": 675000,
        "count": 5
      }
    ]
  }
}
```

---

### 9. Get Financial Report
```http
GET /reports/financial
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `format`: Optional, enum: `json|excel|pdf`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": 13260000,
      "byMonth": [
        {
          "month": "2024-01",
          "amount": 13260000
        }
      ]
    },
    "expenses": {
      "total": 8500000,
      "breakdown": [
        {
          "category": "Fuel",
          "amount": 4250000,
          "percentage": 50.0
        },
        {
          "category": "Maintenance",
          "amount": 2125000,
          "percentage": 25.0
        },
        {
          "category": "Salaries",
          "amount": 1700000,
          "percentage": 20.0
        },
        {
          "category": "Other",
          "amount": 425000,
          "percentage": 5.0
        }
      ]
    },
    "profit": {
      "gross": 4760000,
      "margin": 35.9,
      "net": 3800000,
      "netMargin": 28.7
    },
    "cashFlow": {
      "inflow": 11850000,
      "outflow": 8500000,
      "net": 3350000
    },
    "receivables": {
      "total": 1410000,
      "current": 1200000,
      "overdue": 210000
    },
    "comparison": {
      "vsLastPeriod": {
        "revenue": 12.5,
        "expenses": 8.2,
        "profit": 18.7
      }
    }
  }
}
```

---

### 10. Get Geographic Performance Report
```http
GET /reports/geographic-performance
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `state|city|route`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "byState": [
      {
        "state": "Lagos",
        "trips": 85,
        "revenue": 7225000,
        "percentage": 54.5
      },
      {
        "state": "Abuja",
        "trips": 45,
        "revenue": 3825000,
        "percentage": 28.8
      }
    ],
    "byRoute": [
      {
        "route": "Lagos → Abuja",
        "trips": 45,
        "revenue": 3825000,
        "averageDistance": 750,
        "averageDuration": 1800
      }
    ],
    "heatmap": [
      {
        "lat": 6.5244,
        "lng": 3.3792,
        "city": "Lagos",
        "trips": 85,
        "revenue": 7225000
      }
    ]
  }
}
```

---

### 11. Export Report
```http
POST /reports/export
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "reportType": "revenue",
  "format": "excel",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "filters": {
    "clientId": "CL001",
    "status": "completed"
  },
  "columns": [
    "tripId",
    "client",
    "route",
    "revenue",
    "date"
  ],
  "includeCharts": true,
  "sendEmail": false
}
```

**Validation Rules:**
- `reportType`: Required, enum: `revenue|trips|fleet|drivers|clients|temperature|maintenance|financial`
- `format`: Required, enum: `excel|csv|pdf`
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "fileUrl": "https://cdn.daraexpress.com/exports/revenue_report_2024-01-15.xlsx",
    "fileName": "revenue_report_2024-01-15.xlsx",
    "fileSize": 245678,
    "recordCount": 156,
    "generatedAt": "2024-01-15T10:30:00Z",
    "expiresAt": "2024-01-15T22:30:00Z"
  },
  "message": "Report exported successfully"
}
```

**Permissions Required:** `reports:export`

---

### 12. Schedule Report
```http
POST /reports/schedule
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "reportType": "revenue",
  "format": "pdf",
  "frequency": "weekly",
  "dayOfWeek": "monday",
  "time": "09:00",
  "recipients": [
    "admin@daraexpress.com",
    "finance@daraexpress.com"
  ],
  "filters": {
    "status": "completed"
  }
}
```

**Validation Rules:**
- `reportType`: Required, enum: `revenue|trips|fleet|drivers|clients|temperature|maintenance|financial`
- `format`: Required, enum: `excel|pdf`
- `frequency`: Required, enum: `daily|weekly|monthly`
- `recipients`: Required, array of valid emails, min 1

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "schedule_001",
    "reportType": "revenue",
    "frequency": "weekly",
    "nextRun": "2024-01-22T09:00:00Z",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Report scheduled successfully"
}
```

**Permissions Required:** `reports:schedule`

---

### 13. Get Custom Report
```http
POST /reports/custom
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Monthly Client Revenue Analysis",
  "dataSource": "trips",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "metrics": [
    "revenue",
    "tripCount",
    "averageValue"
  ],
  "dimensions": [
    "client",
    "route"
  ],
  "filters": {
    "status": "completed",
    "minRevenue": 50000
  },
  "groupBy": "client",
  "orderBy": "-revenue",
  "limit": 50
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "reportName": "Monthly Client Revenue Analysis",
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "results": [
      {
        "client": "Adebayo Industries",
        "revenue": 3850000,
        "tripCount": 45,
        "averageValue": 85555
      }
    ],
    "summary": {
      "totalRevenue": 13260000,
      "totalTrips": 156,
      "averageValue": 85000
    }
  }
}
```

**Permissions Required:** `reports:custom`

---


## Settings

### 1. Get System Settings
```http
GET /settings/system
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "company": {
      "name": "Dara Express Logistics",
      "email": "info@daraexpress.com",
      "phone": "+234-800-DARA-EXP",
      "address": {
        "street": "123 Logistics Avenue",
        "city": "Lagos",
        "state": "Lagos State",
        "country": "Nigeria",
        "postalCode": "100001"
      },
      "logo": "https://cdn.daraexpress.com/logo.png",
      "website": "https://daraexpress.com"
    },
    "regional": {
      "timezone": "Africa/Lagos",
      "currency": "NGN",
      "dateFormat": "DD/MM/YYYY",
      "timeFormat": "24h",
      "language": "en"
    },
    "business": {
      "fiscalYearStart": "01-01",
      "taxRate": 7.5,
      "defaultPaymentTerms": "Net 30"
    },
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Permissions Required:** `settings:read`

---

### 2. Update System Settings
```http
PUT /settings/system
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "company": {
    "name": "Dara Express Logistics Ltd",
    "phone": "+234-800-DARA-EXP"
  },
  "regional": {
    "timezone": "Africa/Lagos",
    "currency": "NGN"
  }
}
```

**Validation Rules:**
- `company.name`: Optional, string, min 2, max 200 chars
- `company.email`: Optional, valid email
- `regional.timezone`: Optional, valid timezone string
- `regional.currency`: Optional, valid ISO 4217 currency code

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "company": {
      "name": "Dara Express Logistics Ltd",
      "phone": "+234-800-DARA-EXP"
    },
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "System settings updated successfully"
}
```

**Permissions Required:** `settings:update`

---

### 3. Upload Company Logo
```http
POST /settings/system/logo
Headers: Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body:**
```
file: [image file]
```

**Validation Rules:**
- File type: image/jpeg, image/png, image/svg+xml
- Max file size: 2MB
- Recommended dimensions: 200x200px

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "logoUrl": "https://cdn.daraexpress.com/logo_1705318200.png",
    "uploadedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Logo uploaded successfully"
}
```

---

### 4. Get Temperature Thresholds
```http
GET /settings/temperature-thresholds
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "thresh_001",
      "productType": "Frozen Foods",
      "minTemp": -20,
      "maxTemp": -15,
      "warningOffset": 2,
      "unit": "celsius",
      "active": true,
      "createdAt": "2023-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "thresh_002",
      "productType": "Chilled Foods",
      "minTemp": 2,
      "maxTemp": 8,
      "warningOffset": 1,
      "unit": "celsius",
      "active": true,
      "createdAt": "2023-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "thresh_003",
      "productType": "Pharmaceuticals",
      "minTemp": 2,
      "maxTemp": 8,
      "warningOffset": 0.5,
      "unit": "celsius",
      "active": true,
      "createdAt": "2023-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 5. Update Temperature Thresholds
```http
PUT /settings/temperature-thresholds
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "thresholds": [
    {
      "productType": "Frozen Foods",
      "minTemp": -20,
      "maxTemp": -15,
      "warningOffset": 2
    },
    {
      "productType": "Chilled Foods",
      "minTemp": 2,
      "maxTemp": 8,
      "warningOffset": 1
    }
  ]
}
```

**Validation Rules:**
- `productType`: Required, string, max 100 chars
- `minTemp`: Required, number, must be less than maxTemp
- `maxTemp`: Required, number
- `warningOffset`: Optional, number, min 0, max 10

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "updated": 2,
    "thresholds": [...]
  },
  "message": "Temperature thresholds updated successfully"
}
```

**Permissions Required:** `settings:update_thresholds`

---

### 6. Get Integration Settings
```http
GET /settings/integrations
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "iotSensor": {
      "enabled": true,
      "provider": "SensorTech",
      "endpoint": "https://api.sensortech.com/v1",
      "apiKey": "sk_***************xyz",
      "syncInterval": 30,
      "lastSync": "2024-01-15T10:30:00Z",
      "status": "connected"
    },
    "gpsTracker": {
      "enabled": true,
      "provider": "TrackPro",
      "endpoint": "https://api.trackpro.com/v1",
      "apiKey": "gps_***************abc",
      "updateInterval": 30,
      "lastUpdate": "2024-01-15T10:30:00Z",
      "status": "connected"
    },
    "paystack": {
      "enabled": true,
      "publicKey": "pk_***************123",
      "secretKey": "sk_***************456",
      "webhookUrl": "https://api.daraexpress.com/v1/webhooks/paystack",
      "testMode": false,
      "status": "active"
    },
    "sms": {
      "enabled": true,
      "provider": "Twilio",
      "accountSid": "AC***************xyz",
      "authToken": "***************",
      "fromNumber": "+234-800-DARA-EXP",
      "status": "active"
    },
    "email": {
      "enabled": true,
      "provider": "SendGrid",
      "apiKey": "SG.***************",
      "fromEmail": "noreply@daraexpress.com",
      "fromName": "Dara Express Logistics",
      "status": "active"
    }
  }
}
```

**Permissions Required:** `settings:read_integrations`

---

### 7. Update Integration Settings
```http
PUT /settings/integrations/{integration}
Headers: Authorization: Bearer {token}
```

**Path Parameters:**
- `integration`: Required, enum: `iotSensor|gpsTracker|paystack|sms|email`

**Request Body (Paystack example):**
```json
{
  "enabled": true,
  "publicKey": "pk_live_abc123xyz",
  "secretKey": "sk_live_xyz789abc",
  "testMode": false
}
```

**Validation Rules:**
- `enabled`: Optional, boolean
- API keys: Required if enabled is true
- Keys are validated against provider's format

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "integration": "paystack",
    "enabled": true,
    "status": "active",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Integration settings updated successfully"
}
```

**Permissions Required:** `settings:update_integrations`

---

### 8. Test Integration Connection
```http
POST /settings/integrations/{integration}/test
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "integration": "paystack",
    "status": "connected",
    "responseTime": 245,
    "testedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Integration connection successful"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "INTEGRATION_CONNECTION_FAILED",
    "message": "Failed to connect to Paystack API",
    "statusCode": 400,
    "details": {
      "reason": "Invalid API key"
    }
  }
}
```

---

### 9. Get Notification Settings
```http
GET /settings/notifications
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "email": {
      "enabled": true,
      "templates": {
        "tripAssigned": {
          "enabled": true,
          "subject": "New Trip Assigned - {{tripId}}",
          "body": "Hello {{driverName}}, you have been assigned to trip {{tripId}}..."
        },
        "tripCompleted": {
          "enabled": true,
          "subject": "Trip Completed - {{tripId}}",
          "body": "Trip {{tripId}} has been completed successfully..."
        },
        "paymentReceived": {
          "enabled": true,
          "subject": "Payment Received - {{invoiceNumber}}",
          "body": "We have received your payment of {{amount}}..."
        },
        "temperatureAlert": {
          "enabled": true,
          "subject": "Temperature Alert - {{truckId}}",
          "body": "Temperature alert for truck {{truckId}}..."
        }
      }
    },
    "sms": {
      "enabled": true,
      "templates": {
        "tripAssigned": {
          "enabled": true,
          "message": "New trip {{tripId}} assigned. Pickup at {{time}}."
        },
        "temperatureAlert": {
          "enabled": true,
          "message": "ALERT: Temperature {{temp}}°C on truck {{truckId}}"
        }
      }
    },
    "push": {
      "enabled": true,
      "events": [
        "trip_assigned",
        "trip_completed",
        "temperature_alert",
        "payment_received"
      ]
    },
    "preferences": {
      "sendToDrivers": true,
      "sendToClients": true,
      "sendToAdmins": true,
      "quietHours": {
        "enabled": true,
        "start": "22:00",
        "end": "07:00"
      }
    }
  }
}
```

---

### 10. Update Notification Settings
```http
PUT /settings/notifications
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "email": {
    "enabled": true,
    "templates": {
      "tripAssigned": {
        "enabled": true,
        "subject": "New Trip Assignment - {{tripId}}",
        "body": "Custom email body..."
      }
    }
  },
  "preferences": {
    "quietHours": {
      "enabled": true,
      "start": "23:00",
      "end": "06:00"
    }
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "email": {...},
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Notification settings updated successfully"
}
```

**Permissions Required:** `settings:update_notifications`

---

### 11. Send Test Notification
```http
POST /settings/notifications/test
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "type": "email",
  "template": "tripAssigned",
  "recipient": "test@daraexpress.com",
  "data": {
    "tripId": "TRP-2401",
    "driverName": "Test Driver"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "type": "email",
    "recipient": "test@daraexpress.com",
    "status": "sent",
    "sentAt": "2024-01-15T10:30:00Z"
  },
  "message": "Test notification sent successfully"
}
```

---

### 12. Get Audit Logs
```http
GET /settings/audit-logs
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `userId`: Optional, string
- `action`: Optional, enum: `create|update|delete|login|logout`
- `resource`: Optional, enum: `trip|vehicle|driver|client|payment|user|settings`
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
      "id": "log_001",
      "user": {
        "id": "usr_001",
        "name": "John Doe",
        "email": "john@daraexpress.com"
      },
      "action": "update",
      "resource": "trip",
      "resourceId": "TRP-2401",
      "description": "Updated trip status to completed",
      "changes": {
        "status": {
          "from": "in_progress",
          "to": "completed"
        }
      },
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1250,
    "totalPages": 25
  }
}
```

**Permissions Required:** `settings:read_audit_logs`

---

### 13. Export Audit Logs
```http
POST /settings/audit-logs/export
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "format": "excel",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "filters": {
    "userId": "usr_001",
    "action": "update"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "fileUrl": "https://cdn.daraexpress.com/exports/audit_logs_2024-01-15.xlsx",
    "fileName": "audit_logs_2024-01-15.xlsx",
    "recordCount": 1250,
    "generatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Audit logs exported successfully"
}
```

---

### 14. Get Backup Settings
```http
GET /settings/backup
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "automatic": {
      "enabled": true,
      "frequency": "daily",
      "time": "02:00",
      "retention": 30
    },
    "storage": {
      "provider": "AWS S3",
      "bucket": "dara-express-backups",
      "region": "us-east-1"
    },
    "lastBackup": {
      "timestamp": "2024-01-15T02:00:00Z",
      "size": 2456789012,
      "status": "success"
    },
    "backupHistory": [
      {
        "id": "backup_001",
        "timestamp": "2024-01-15T02:00:00Z",
        "size": 2456789012,
        "status": "success"
      }
    ]
  }
}
```

**Permissions Required:** `settings:read_backup`

---

### 15. Create Manual Backup
```http
POST /settings/backup/create
Headers: Authorization: Bearer {token}
```

**Success Response (202):**
```json
{
  "success": true,
  "data": {
    "backupId": "backup_manual_001",
    "status": "in_progress",
    "startedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Backup started successfully"
}
```

**Permissions Required:** `settings:create_backup`

---

### 16. Restore from Backup
```http
POST /settings/backup/restore
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "backupId": "backup_001",
  "confirmRestore": true
}
```

**Success Response (202):**
```json
{
  "success": true,
  "data": {
    "restoreId": "restore_001",
    "backupId": "backup_001",
    "status": "in_progress",
    "startedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Restore started successfully"
}
```

**Permissions Required:** `settings:restore_backup`

---


## User Roles & Access Control

### 1. Get All Users
```http
GET /users
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `role`: Optional, enum: `Super Admin|Fleet Officer|Dispatcher|Finance|Support`
- `status`: Optional, enum: `active|inactive|suspended`
- `search`: Optional, string (searches name, email)
- `sort`: Optional, string
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "usr_001",
      "userId": "USR-001",
      "name": "John Doe",
      "email": "john@daraexpress.com",
      "phone": "+234-801-234-5678",
      "role": "Super Admin",
      "status": "active",
      "avatar": "https://cdn.daraexpress.com/avatars/usr_001.jpg",
      "department": "Administration",
      "permissions": ["all"],
      "lastLogin": "2024-01-15T10:30:00Z",
      "lastActivity": "2024-01-15T10:35:00Z",
      "createdAt": "2020-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "summary": {
    "total": 25,
    "active": 23,
    "inactive": 2,
    "byRole": {
      "Super Admin": 2,
      "Fleet Officer": 5,
      "Dispatcher": 8,
      "Finance": 6,
      "Support": 4
    }
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 25,
    "totalPages": 2
  }
}
```

**Permissions Required:** `users:read`

---

### 2. Get User Details
```http
GET /users/{userId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "usr_001",
    "userId": "USR-001",
    "name": "John Doe",
    "email": "john@daraexpress.com",
    "phone": "+234-801-234-5678",
    "alternatePhone": "+234-802-345-6789",
    "role": "Super Admin",
    "status": "active",
    "avatar": "https://cdn.daraexpress.com/avatars/usr_001.jpg",
    "department": "Administration",
    "jobTitle": "System Administrator",
    "dateOfBirth": "1985-05-15",
    "gender": "Male",
    "address": {
      "street": "123 Admin Street",
      "city": "Lagos",
      "state": "Lagos State",
      "country": "Nigeria",
      "postalCode": "100001"
    },
    "emergencyContact": {
      "name": "Jane Doe",
      "relationship": "Spouse",
      "phone": "+234-803-456-7890"
    },
    "permissions": [
      "all"
    ],
    "preferences": {
      "language": "en",
      "timezone": "Africa/Lagos",
      "notifications": {
        "email": true,
        "sms": true,
        "push": true
      },
      "theme": "light"
    },
    "security": {
      "twoFactorEnabled": true,
      "lastPasswordChange": "2024-01-01T00:00:00Z",
      "passwordExpiresAt": "2024-07-01T00:00:00Z",
      "failedLoginAttempts": 0,
      "accountLockedUntil": null
    },
    "statistics": {
      "totalLogins": 1250,
      "totalActions": 5680,
      "averageSessionDuration": 3600
    },
    "lastLogin": "2024-01-15T10:30:00Z",
    "lastActivity": "2024-01-15T10:35:00Z",
    "lastIpAddress": "192.168.1.100",
    "hireDate": "2020-01-15",
    "createdBy": {
      "id": "usr_000",
      "name": "System"
    },
    "createdAt": "2020-01-15T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. Add New User
```http
POST /users
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Sarah Johnson",
  "email": "sarah@daraexpress.com",
  "phone": "+234-809-876-5432",
  "role": "Fleet Officer",
  "department": "Operations",
  "jobTitle": "Fleet Manager",
  "password": "SecurePass123!",
  "sendWelcomeEmail": true
}
```

**Validation Rules:**
- `name`: Required, string, min 2, max 100 chars
- `email`: Required, valid email, unique
- `phone`: Optional, valid phone format
- `role`: Required, enum: `Super Admin|Fleet Officer|Dispatcher|Finance|Support`
- `password`: Required, min 8 chars, must contain uppercase, lowercase, number, special char
- `sendWelcomeEmail`: Optional, boolean (default: true)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "usr_026",
    "userId": "USR-026",
    "name": "Sarah Johnson",
    "email": "sarah@daraexpress.com",
    "role": "Fleet Officer",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "User created successfully. Welcome email sent."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "statusCode": 400,
    "details": [
      {
        "field": "email",
        "message": "Email already exists",
        "value": "sarah@daraexpress.com"
      }
    ]
  }
}
```

**Permissions Required:** `users:create`

---

### 4. Update User
```http
PUT /users/{userId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "name": "Sarah Johnson-Smith",
  "phone": "+234-809-999-8888",
  "department": "Fleet Management",
  "status": "active"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "usr_026",
    "userId": "USR-026",
    "name": "Sarah Johnson-Smith",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "User updated successfully"
}
```

**Permissions Required:** `users:update`

---

### 5. Delete User
```http
DELETE /users/{userId}
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `transferTo`: Optional, string (userId to transfer data to)

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": {
    "code": "USER_HAS_ACTIVE_SESSIONS",
    "message": "Cannot delete user with active sessions",
    "statusCode": 409,
    "details": {
      "activeSessions": 2
    }
  }
}
```

**Permissions Required:** `users:delete`

---

### 6. Update User Role
```http
PUT /users/{userId}/role
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "role": "Dispatcher",
  "reason": "Promoted to dispatcher role"
}
```

**Validation Rules:**
- `role`: Required, enum: `Super Admin|Fleet Officer|Dispatcher|Finance|Support`
- `reason`: Optional, string, max 500 chars

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "usr_026",
    "userId": "USR-026",
    "role": "Dispatcher",
    "permissions": [
      "trips:read",
      "trips:create",
      "trips:update",
      "drivers:read",
      "vehicles:read"
    ],
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "User role updated successfully"
}
```

**Permissions Required:** `users:update_role`

---

### 7. Update User Status
```http
PUT /users/{userId}/status
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "suspended",
  "reason": "Policy violation",
  "suspendUntil": "2024-02-15T00:00:00Z"
}
```

**Validation Rules:**
- `status`: Required, enum: `active|inactive|suspended`
- `reason`: Required if status is `suspended`, string, max 500 chars
- `suspendUntil`: Optional, ISO date (for temporary suspension)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "usr_026",
    "userId": "USR-026",
    "status": "suspended",
    "suspendedUntil": "2024-02-15T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "User status updated successfully"
}
```

**Permissions Required:** `users:update_status`

---

### 8. Get User Activity Logs
```http
GET /users/{userId}/activity
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `action`: Optional, enum: `login|logout|create|update|delete|view`
- `resource`: Optional, string
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
      "id": "activity_001",
      "action": "update",
      "resource": "trip",
      "resourceId": "TRP-2401",
      "description": "Updated trip status to completed",
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "summary": {
    "totalActions": 156,
    "byAction": {
      "create": 45,
      "update": 78,
      "delete": 12,
      "view": 21
    }
  },
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 156,
    "totalPages": 4
  }
}
```

---

### 9. Get All Roles
```http
GET /users/roles
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "role_001",
      "name": "Super Admin",
      "description": "Full system access with all permissions",
      "permissions": ["all"],
      "userCount": 2,
      "color": "#FF5733",
      "createdAt": "2020-01-15T00:00:00Z"
    },
    {
      "id": "role_002",
      "name": "Fleet Officer",
      "description": "Manage fleet, drivers, and trips",
      "permissions": [
        "fleet:read",
        "fleet:create",
        "fleet:update",
        "fleet:delete",
        "drivers:read",
        "drivers:create",
        "drivers:update",
        "trips:read",
        "trips:create",
        "trips:update"
      ],
      "userCount": 5,
      "color": "#3498DB",
      "createdAt": "2020-01-15T00:00:00Z"
    },
    {
      "id": "role_003",
      "name": "Dispatcher",
      "description": "Create and assign trips",
      "permissions": [
        "trips:read",
        "trips:create",
        "trips:update",
        "drivers:read",
        "vehicles:read",
        "clients:read"
      ],
      "userCount": 8,
      "color": "#2ECC71",
      "createdAt": "2020-01-15T00:00:00Z"
    },
    {
      "id": "role_004",
      "name": "Finance",
      "description": "Manage payments and financial reports",
      "permissions": [
        "payments:read",
        "payments:create",
        "payments:update",
        "reports:read",
        "reports:export",
        "clients:read"
      ],
      "userCount": 6,
      "color": "#F39C12",
      "createdAt": "2020-01-15T00:00:00Z"
    },
    {
      "id": "role_005",
      "name": "Support",
      "description": "View-only access for customer support",
      "permissions": [
        "trips:read",
        "clients:read",
        "drivers:read",
        "vehicles:read",
        "temperature:read"
      ],
      "userCount": 4,
      "color": "#9B59B6",
      "createdAt": "2020-01-15T00:00:00Z"
    }
  ]
}
```

---

### 10. Get Role Details
```http
GET /users/roles/{roleId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "role_002",
    "name": "Fleet Officer",
    "description": "Manage fleet, drivers, and trips",
    "permissions": [
      {
        "resource": "fleet",
        "actions": ["read", "create", "update", "delete"]
      },
      {
        "resource": "drivers",
        "actions": ["read", "create", "update"]
      },
      {
        "resource": "trips",
        "actions": ["read", "create", "update"]
      }
    ],
    "users": [
      {
        "id": "usr_005",
        "name": "Sarah Johnson",
        "email": "sarah@daraexpress.com"
      }
    ],
    "userCount": 5,
    "createdAt": "2020-01-15T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 11. Get User Permissions
```http
GET /users/{userId}/permissions
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_005",
    "role": "Fleet Officer",
    "permissions": [
      {
        "resource": "fleet",
        "actions": ["read", "create", "update", "delete"],
        "scope": "all"
      },
      {
        "resource": "drivers",
        "actions": ["read", "create", "update"],
        "scope": "all"
      },
      {
        "resource": "trips",
        "actions": ["read", "create", "update"],
        "scope": "all"
      }
    ],
    "customPermissions": []
  }
}
```

---

### 12. Update User Permissions
```http
PUT /users/{userId}/permissions
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "customPermissions": [
    {
      "resource": "reports",
      "actions": ["read", "export"]
    }
  ]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_005",
    "permissions": [...],
    "customPermissions": [
      {
        "resource": "reports",
        "actions": ["read", "export"]
      }
    ],
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "User permissions updated successfully"
}
```

**Permissions Required:** `users:update_permissions`

---

### 13. Reset User Password
```http
POST /users/{userId}/reset-password
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "sendEmail": true,
  "temporaryPassword": "TempPass123!"
}
```

**Validation Rules:**
- `sendEmail`: Optional, boolean (default: true)
- `temporaryPassword`: Optional, string (auto-generated if not provided)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_005",
    "temporaryPassword": "TempPass123!",
    "emailSent": true,
    "mustChangePassword": true,
    "resetAt": "2024-01-15T10:30:00Z"
  },
  "message": "Password reset successfully. Email sent to user."
}
```

**Permissions Required:** `users:reset_password`

---

### 14. Get User Sessions
```http
GET /users/{userId}/sessions
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "session_001",
      "device": "Chrome on Windows",
      "ipAddress": "192.168.1.100",
      "location": "Lagos, Nigeria",
      "loginAt": "2024-01-15T10:30:00Z",
      "lastActivity": "2024-01-15T10:35:00Z",
      "status": "active"
    }
  ],
  "summary": {
    "totalSessions": 3,
    "activeSessions": 2,
    "expiredSessions": 1
  }
}
```

---

### 15. Revoke User Session
```http
DELETE /users/{userId}/sessions/{sessionId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Session revoked successfully"
}
```

**Permissions Required:** `users:revoke_session`

---

### 16. Bulk User Operations
```http
POST /users/bulk
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "operation": "update_status",
  "userIds": ["usr_005", "usr_006", "usr_007"],
  "data": {
    "status": "active"
  }
}
```

**Validation Rules:**
- `operation`: Required, enum: `update_status|update_role|delete|export`
- `userIds`: Required, array of strings, min 1, max 100
- `data`: Required, object (varies by operation)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "operation": "update_status",
    "processed": 3,
    "successful": 3,
    "failed": 0,
    "results": [
      {
        "userId": "usr_005",
        "status": "success"
      }
    ]
  },
  "message": "Bulk operation completed successfully"
}
```

**Permissions Required:** `users:bulk_operations`

---


## Webhooks

### Overview
Webhooks allow you to receive real-time notifications when events occur in the Dara Express system. Configure webhook endpoints to receive HTTP POST requests with event data.

### Webhook Configuration

#### 1. Register Webhook
```http
POST /webhooks
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "url": "https://your-domain.com/webhooks/dara-express",
  "events": [
    "trip.created",
    "trip.updated",
    "trip.completed",
    "payment.received",
    "temperature.alert"
  ],
  "secret": "your_webhook_secret_key",
  "active": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "webhook_001",
    "url": "https://your-domain.com/webhooks/dara-express",
    "events": ["trip.created", "trip.updated", "trip.completed"],
    "secret": "whsec_***************",
    "active": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Webhook registered successfully"
}
```

---

#### 2. List Webhooks
```http
GET /webhooks
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "webhook_001",
      "url": "https://your-domain.com/webhooks/dara-express",
      "events": ["trip.created", "trip.updated"],
      "active": true,
      "lastTriggered": "2024-01-15T10:30:00Z",
      "successRate": 98.5,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

#### 3. Update Webhook
```http
PUT /webhooks/{webhookId}
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "events": ["trip.created", "trip.completed", "payment.received"],
  "active": true
}
```

---

#### 4. Delete Webhook
```http
DELETE /webhooks/{webhookId}
Headers: Authorization: Bearer {token}
```

---

#### 5. Test Webhook
```http
POST /webhooks/{webhookId}/test
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "webhookId": "webhook_001",
    "testEventSent": true,
    "responseCode": 200,
    "responseTime": 245,
    "testedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Test webhook sent successfully"
}
```

---

### Webhook Events

#### Trip Events

**trip.created**
```json
{
  "event": "trip.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "trip_001",
    "tripId": "TRP-2401",
    "client": "Adebayo Industries",
    "route": "Lagos → Abuja",
    "driver": "Adebayo Johnson",
    "vehicle": "DRA-017",
    "scheduledPickup": "2024-01-16T08:00:00Z"
  }
}
```

**trip.updated**
```json
{
  "event": "trip.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "trip_001",
    "tripId": "TRP-2401",
    "changes": {
      "status": {
        "from": "pending",
        "to": "in_progress"
      }
    }
  }
}
```

**trip.completed**
```json
{
  "event": "trip.completed",
  "timestamp": "2024-01-16T13:45:00Z",
  "data": {
    "id": "trip_001",
    "tripId": "TRP-2401",
    "completedAt": "2024-01-16T13:45:00Z",
    "deliveryTime": 29.75,
    "onTime": true
  }
}
```

**trip.cancelled**
```json
{
  "event": "trip.cancelled",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "trip_001",
    "tripId": "TRP-2401",
    "reason": "Client request",
    "cancelledBy": "usr_001"
  }
}
```

---

#### Payment Events

**payment.created**
```json
{
  "event": "payment.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "pay_001",
    "paymentId": "PAY-2024-001",
    "invoiceNumber": "INV-2024-001",
    "amount": 450000,
    "client": "Adebayo Industries",
    "dueDate": "2024-02-14T00:00:00Z"
  }
}
```

**payment.received**
```json
{
  "event": "payment.received",
  "timestamp": "2024-02-10T10:30:00Z",
  "data": {
    "id": "pay_001",
    "paymentId": "PAY-2024-001",
    "amount": 450000,
    "method": "Bank Transfer",
    "reference": "TRF123456789",
    "paidAt": "2024-02-10T10:30:00Z"
  }
}
```

**payment.overdue**
```json
{
  "event": "payment.overdue",
  "timestamp": "2024-02-15T00:00:00Z",
  "data": {
    "id": "pay_001",
    "paymentId": "PAY-2024-001",
    "amount": 450000,
    "dueDate": "2024-02-14T00:00:00Z",
    "daysOverdue": 1,
    "client": "Adebayo Industries"
  }
}
```

---

#### Temperature Events

**temperature.alert**
```json
{
  "event": "temperature.alert",
  "timestamp": "2024-01-15T10:25:00Z",
  "data": {
    "id": "alert_001",
    "truckId": "DRA-017",
    "tripId": "TRP-2401",
    "currentTemp": -14,
    "threshold": -15,
    "severity": "high",
    "cargoType": "Frozen Foods",
    "location": {
      "lat": 6.5244,
      "lng": 3.3792
    }
  }
}
```

**temperature.normalized**
```json
{
  "event": "temperature.normalized",
  "timestamp": "2024-01-15T10:45:00Z",
  "data": {
    "id": "alert_001",
    "truckId": "DRA-017",
    "currentTemp": -18,
    "duration": 1200
  }
}
```

---

#### Vehicle Events

**vehicle.maintenance_due**
```json
{
  "event": "vehicle.maintenance_due",
  "timestamp": "2024-01-15T00:00:00Z",
  "data": {
    "vehicleId": "DRA-017",
    "maintenanceType": "routine",
    "dueDate": "2024-01-22T00:00:00Z",
    "daysUntilDue": 7
  }
}
```

**vehicle.breakdown**
```json
{
  "event": "vehicle.breakdown",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "vehicleId": "DRA-017",
    "tripId": "TRP-2401",
    "location": {
      "lat": 6.5244,
      "lng": 3.3792
    },
    "issue": "Engine failure"
  }
}
```

---

#### Driver Events

**driver.assigned**
```json
{
  "event": "driver.assigned",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "driverId": "DRV-001",
    "driverName": "Adebayo Johnson",
    "tripId": "TRP-2401",
    "vehicleId": "DRA-017"
  }
}
```

**driver.license_expiring**
```json
{
  "event": "driver.license_expiring",
  "timestamp": "2024-01-15T00:00:00Z",
  "data": {
    "driverId": "DRV-001",
    "driverName": "Adebayo Johnson",
    "licenseNumber": "ABC123456",
    "expiryDate": "2024-02-15T00:00:00Z",
    "daysUntilExpiry": 30
  }
}
```

---

### Webhook Security

#### Signature Verification
All webhook requests include a signature in the `X-Dara-Signature` header. Verify this signature to ensure the request is from Dara Express.

**Example Verification (Node.js):**
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Usage
app.post('/webhooks/dara-express', (req, res) => {
  const signature = req.headers['x-dara-signature'];
  const isValid = verifyWebhookSignature(req.body, signature, 'your_webhook_secret');
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook
  res.status(200).send('OK');
});
```

---

#### Webhook Headers
```http
POST https://your-domain.com/webhooks/dara-express
Content-Type: application/json
X-Dara-Signature: sha256=abc123...
X-Dara-Event: trip.created
X-Dara-Webhook-ID: webhook_001
X-Dara-Delivery-ID: delivery_abc123
X-Dara-Timestamp: 2024-01-15T10:30:00Z
```

---

#### Retry Policy
- Failed webhook deliveries are retried up to 3 times
- Retry intervals: 1 minute, 5 minutes, 15 minutes
- Webhooks are considered failed if:
  - Response status code is not 2xx
  - Request times out (30 seconds)
  - Connection error occurs

---

#### Webhook Logs
```http
GET /webhooks/{webhookId}/logs
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `success|failed|pending`
- `event`: Optional, string
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
      "id": "delivery_001",
      "event": "trip.created",
      "status": "success",
      "responseCode": 200,
      "responseTime": 245,
      "attempts": 1,
      "sentAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "delivery_002",
      "event": "payment.received",
      "status": "failed",
      "responseCode": 500,
      "attempts": 3,
      "lastAttempt": "2024-01-15T10:45:00Z",
      "error": "Internal Server Error"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 156
  }
}
```

---


## Error Codes

### HTTP Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `202 Accepted` - Request accepted for processing
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request data or parameters
- `401 Unauthorized` - Authentication required or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate entry)
- `422 Unprocessable Entity` - Validation error
- `423 Locked` - Resource is locked
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error
- `502 Bad Gateway` - Gateway error
- `503 Service Unavailable` - Service temporarily unavailable
- `504 Gateway Timeout` - Gateway timeout

---

### Application Error Codes

#### Authentication Errors (AUTH_*)
- `AUTH_INVALID_CREDENTIALS` - Invalid email or password
- `AUTH_INVALID_TOKEN` - Invalid or expired access token
- `AUTH_INVALID_REFRESH_TOKEN` - Invalid or expired refresh token
- `AUTH_TOKEN_EXPIRED` - Access token has expired
- `AUTH_ACCOUNT_LOCKED` - Account locked due to multiple failed attempts
- `AUTH_ACCOUNT_SUSPENDED` - Account has been suspended
- `AUTH_ACCOUNT_INACTIVE` - Account is inactive
- `AUTH_EMAIL_NOT_VERIFIED` - Email address not verified
- `AUTH_2FA_REQUIRED` - Two-factor authentication required
- `AUTH_2FA_INVALID_CODE` - Invalid 2FA code
- `AUTH_PASSWORD_EXPIRED` - Password has expired
- `AUTH_SESSION_EXPIRED` - Session has expired

#### Validation Errors (VALIDATION_*)
- `VALIDATION_ERROR` - General validation error
- `VALIDATION_REQUIRED_FIELD` - Required field missing
- `VALIDATION_INVALID_FORMAT` - Invalid field format
- `VALIDATION_INVALID_EMAIL` - Invalid email format
- `VALIDATION_INVALID_PHONE` - Invalid phone format
- `VALIDATION_INVALID_DATE` - Invalid date format
- `VALIDATION_MIN_LENGTH` - Value below minimum length
- `VALIDATION_MAX_LENGTH` - Value exceeds maximum length
- `VALIDATION_MIN_VALUE` - Value below minimum
- `VALIDATION_MAX_VALUE` - Value exceeds maximum
- `VALIDATION_INVALID_ENUM` - Invalid enum value

#### Resource Errors (RESOURCE_*)
- `RESOURCE_NOT_FOUND` - Resource not found
- `RESOURCE_ALREADY_EXISTS` - Resource already exists
- `RESOURCE_CONFLICT` - Resource conflict
- `RESOURCE_LOCKED` - Resource is locked
- `RESOURCE_DELETED` - Resource has been deleted

#### Trip Errors (TRIP_*)
- `TRIP_NOT_FOUND` - Trip not found
- `TRIP_ALREADY_STARTED` - Trip has already started
- `TRIP_ALREADY_COMPLETED` - Trip has already been completed
- `TRIP_ALREADY_CANCELLED` - Trip has already been cancelled
- `TRIP_CANNOT_CANCEL` - Trip cannot be cancelled in current state
- `TRIP_INVALID_STATUS` - Invalid trip status transition
- `TRIP_DRIVER_UNAVAILABLE` - Driver is not available
- `TRIP_VEHICLE_UNAVAILABLE` - Vehicle is not available

#### Vehicle Errors (VEHICLE_*)
- `VEHICLE_NOT_FOUND` - Vehicle not found
- `VEHICLE_IN_USE` - Vehicle is currently in use
- `VEHICLE_MAINTENANCE` - Vehicle is under maintenance
- `VEHICLE_INACTIVE` - Vehicle is inactive
- `VEHICLE_DUPLICATE_PLATE` - Plate number already exists

#### Driver Errors (DRIVER_*)
- `DRIVER_NOT_FOUND` - Driver not found
- `DRIVER_UNAVAILABLE` - Driver is not available
- `DRIVER_ON_TRIP` - Driver is currently on a trip
- `DRIVER_ON_LEAVE` - Driver is on leave
- `DRIVER_LICENSE_EXPIRED` - Driver's license has expired
- `DRIVER_HAS_ACTIVE_TRIP` - Driver has an active trip

#### Client Errors (CLIENT_*)
- `CLIENT_NOT_FOUND` - Client not found
- `CLIENT_INACTIVE` - Client account is inactive
- `CLIENT_HAS_ACTIVE_SHIPMENTS` - Client has active shipments
- `CLIENT_CREDIT_LIMIT_EXCEEDED` - Credit limit exceeded
- `CLIENT_DUPLICATE_EMAIL` - Email already exists

#### Payment Errors (PAYMENT_*)
- `PAYMENT_NOT_FOUND` - Payment not found
- `PAYMENT_ALREADY_PAID` - Payment has already been paid
- `PAYMENT_CANCELLED` - Payment has been cancelled
- `PAYMENT_INVALID_AMOUNT` - Invalid payment amount
- `PAYMENT_PROCESSING_FAILED` - Payment processing failed
- `PAYMENT_GATEWAY_ERROR` - Payment gateway error

#### Temperature Errors (TEMP_*)
- `TEMP_SENSOR_OFFLINE` - Temperature sensor is offline
- `TEMP_THRESHOLD_EXCEEDED` - Temperature threshold exceeded
- `TEMP_INVALID_READING` - Invalid temperature reading
- `TEMP_CALIBRATION_REQUIRED` - Sensor calibration required

#### User Errors (USER_*)
- `USER_NOT_FOUND` - User not found
- `USER_ALREADY_EXISTS` - User already exists
- `USER_INACTIVE` - User account is inactive
- `USER_SUSPENDED` - User account is suspended
- `USER_HAS_ACTIVE_SESSIONS` - User has active sessions
- `USER_INSUFFICIENT_PERMISSIONS` - Insufficient permissions

#### Integration Errors (INTEGRATION_*)
- `INTEGRATION_NOT_CONFIGURED` - Integration not configured
- `INTEGRATION_CONNECTION_FAILED` - Failed to connect to integration
- `INTEGRATION_INVALID_CREDENTIALS` - Invalid integration credentials
- `INTEGRATION_API_ERROR` - Integration API error
- `INTEGRATION_RATE_LIMIT` - Integration rate limit exceeded

#### File Errors (FILE_*)
- `FILE_NOT_FOUND` - File not found
- `FILE_TOO_LARGE` - File size exceeds limit
- `FILE_INVALID_TYPE` - Invalid file type
- `FILE_UPLOAD_FAILED` - File upload failed
- `FILE_CORRUPTED` - File is corrupted

#### Rate Limit Errors (RATE_LIMIT_*)
- `RATE_LIMIT_EXCEEDED` - Rate limit exceeded
- `RATE_LIMIT_DAILY_EXCEEDED` - Daily rate limit exceeded
- `RATE_LIMIT_HOURLY_EXCEEDED` - Hourly rate limit exceeded

---

### Error Response Format

**Standard Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "statusCode": 400,
    "details": {
      "field": "email",
      "value": "invalid@email",
      "constraint": "must be a valid email"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_abc123xyz"
}
```

**Validation Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "statusCode": 400,
    "details": [
      {
        "field": "email",
        "message": "Email already exists",
        "value": "john@example.com"
      },
      {
        "field": "phone",
        "message": "Invalid phone format",
        "value": "123456"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_abc123xyz"
}
```

---

## Rate Limiting

### Rate Limit Tiers

**Free Tier:**
- 100 requests per minute
- 5,000 requests per hour
- 50,000 requests per day

**Standard Tier:**
- 500 requests per minute
- 25,000 requests per hour
- 250,000 requests per day

**Premium Tier:**
- 2,000 requests per minute
- 100,000 requests per hour
- 1,000,000 requests per day

**Enterprise Tier:**
- Custom limits
- Dedicated infrastructure
- SLA guarantees

---

### Rate Limit Headers

All API responses include rate limit information in headers:

```http
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 487
X-RateLimit-Reset: 1705318800
X-RateLimit-Reset-After: 45
```

**Header Descriptions:**
- `X-RateLimit-Limit` - Maximum requests allowed in the current window
- `X-RateLimit-Remaining` - Remaining requests in the current window
- `X-RateLimit-Reset` - Unix timestamp when the rate limit resets
- `X-RateLimit-Reset-After` - Seconds until the rate limit resets

---

### Rate Limit Exceeded Response

**Status Code:** 429 Too Many Requests

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again in 45 seconds.",
    "statusCode": 429,
    "details": {
      "limit": 500,
      "remaining": 0,
      "resetAt": "2024-01-15T10:45:00Z",
      "resetAfter": 45
    }
  },
  "timestamp": "2024-01-15T10:44:15Z"
}
```

---

### Rate Limit Best Practices

1. **Implement Exponential Backoff**
   - Wait progressively longer between retries
   - Example: 1s, 2s, 4s, 8s, 16s

2. **Cache Responses**
   - Cache GET requests when possible
   - Use ETags for conditional requests

3. **Batch Requests**
   - Use bulk endpoints when available
   - Combine multiple operations

4. **Monitor Headers**
   - Check `X-RateLimit-Remaining` before making requests
   - Implement client-side rate limiting

5. **Use Webhooks**
   - Subscribe to webhooks instead of polling
   - Reduces API calls significantly

---

### Endpoint-Specific Rate Limits

Some endpoints have stricter rate limits:

**Authentication Endpoints:**
- Login: 5 requests per minute per IP
- Password Reset: 3 requests per hour per email
- 2FA Verification: 10 requests per minute per user

**Export Endpoints:**
- Report Export: 10 requests per hour
- Data Export: 5 requests per hour

**Webhook Endpoints:**
- Test Webhook: 20 requests per hour

---

## Best Practices

### 1. Authentication
- Store tokens securely (never in localStorage for web apps)
- Refresh tokens before they expire
- Implement token rotation
- Use HTTPS only

### 2. Error Handling
- Always check the `success` field in responses
- Log `requestId` for debugging
- Implement retry logic with exponential backoff
- Handle all error codes appropriately

### 3. Pagination
- Always use pagination for list endpoints
- Start with reasonable page sizes (20-50 items)
- Implement cursor-based pagination for large datasets

### 4. Filtering & Sorting
- Use filters to reduce response size
- Sort on indexed fields when possible
- Combine filters for better performance

### 5. Webhooks
- Verify webhook signatures
- Respond quickly (< 5 seconds)
- Process webhooks asynchronously
- Implement idempotency

### 6. Performance
- Use compression (gzip/deflate)
- Implement caching where appropriate
- Batch requests when possible
- Use WebSockets for real-time data

### 7. Security
- Never expose API keys in client-side code
- Rotate API keys regularly
- Use environment variables for secrets
- Implement IP whitelisting for sensitive operations

---

## SDK & Libraries

### Official SDKs

**JavaScript/Node.js**
```bash
npm install @dara-express/api-client
```

```javascript
const DaraExpress = require('@dara-express/api-client');

const client = new DaraExpress({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Get all trips
const trips = await client.trips.list({
  status: 'in_progress',
  page: 1,
  limit: 20
});
```

**Python**
```bash
pip install dara-express
```

```python
from dara_express import DaraExpressClient

client = DaraExpressClient(
    api_key='your_api_key',
    environment='production'
)

# Get all trips
trips = client.trips.list(
    status='in_progress',
    page=1,
    limit=20
)
```

**PHP**
```bash
composer require dara-express/api-client
```

```php
use DaraExpress\ApiClient;

$client = new ApiClient([
    'api_key' => 'your_api_key',
    'environment' => 'production'
]);

// Get all trips
$trips = $client->trips->list([
    'status' => 'in_progress',
    'page' => 1,
    'limit' => 20
]);
```

---

## Support & Resources

### Documentation
- API Reference: https://docs.daraexpress.com/api
- Developer Guide: https://docs.daraexpress.com/guides
- Changelog: https://docs.daraexpress.com/changelog

### Support Channels
- Email: api-support@daraexpress.com
- Developer Forum: https://forum.daraexpress.com
- Status Page: https://status.daraexpress.com
- GitHub Issues: https://github.com/dara-express/api-issues

### SLA & Uptime
- 99.9% uptime guarantee (Enterprise tier)
- 24/7 monitoring
- Incident response: < 1 hour
- Scheduled maintenance: Announced 7 days in advance

---

## Changelog

### Version 1.0.0 (2024-01-15)
- Initial API release
- Core endpoints for all modules
- Webhook support
- Rate limiting implementation
- Comprehensive error handling

---

**Last Updated:** January 15, 2024  
**API Version:** v1.0.0  
**Documentation Version:** 1.0.0

