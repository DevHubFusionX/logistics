# Reports & Analytics

## 1. Get Fleet Report
```http
GET /reports/fleet
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `vehicleId`: Optional, string
- `format`: Optional, enum: `json|pdf|excel` (default: `json`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31"
    },
    "summary": {
      "totalVehicles": 72,
      "activeVehicles": 67,
      "maintenanceVehicles": 5,
      "utilizationRate": 93.1,
      "totalDistance": 145000,
      "totalTrips": 342,
      "averageTripsPerVehicle": 4.75
    },
    "byVehicle": [
      {
        "vehicleId": "DRA-017",
        "trips": 28,
        "distance": 14500,
        "utilizationRate": 96.5,
        "maintenanceCost": 120000,
        "revenue": 3500000
      }
    ],
    "maintenance": {
      "scheduled": 12,
      "completed": 10,
      "pending": 2,
      "totalCost": 1440000
    }
  }
}
```

**Permissions Required:** `reports:fleet` (Fleet Officer, Super Admin)

---

## 2. Get Driver Performance Report
```http
GET /reports/drivers
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `driverId`: Optional, string
- `format`: Optional, enum: `json|pdf|excel`

**Permissions Required:** `reports:driver` (Fleet Officer, Super Admin)

---

## 3. Get Temperature Compliance Report
```http
GET /reports/temperature
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `vehicleId`: Optional, string
- `clientId`: Optional, string
- `format`: Optional, enum: `json|pdf|excel`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31"
    },
    "summary": {
      "totalTrips": 342,
      "compliantTrips": 335,
      "nonCompliantTrips": 7,
      "complianceRate": 97.9,
      "totalAlerts": 23,
      "criticalAlerts": 3
    },
    "byVehicle": [
      {
        "vehicleId": "DRA-017",
        "trips": 28,
        "compliantTrips": 27,
        "complianceRate": 96.4,
        "alerts": 2
      }
    ],
    "alertBreakdown": {
      "high": 3,
      "medium": 8,
      "low": 12
    }
  }
}
```

**Permissions Required:** `reports:temperature` (Fleet Officer, Super Admin)

---

## 4. Get Financial Report
```http
GET /reports/financial
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month`
- `format`: Optional, enum: `json|pdf|excel`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31"
    },
    "revenue": {
      "total": 18750000,
      "byMethod": {
        "card": 15000000,
        "bank_transfer": 3125000,
        "cash": 625000
      },
      "byRoute": [
        {
          "route": "Lagos → Abuja",
          "revenue": 5625000,
          "bookings": 45
        }
      ]
    },
    "expenses": {
      "fuel": 3500000,
      "maintenance": 1440000,
      "salaries": 4200000,
      "other": 850000,
      "total": 9990000
    },
    "profit": {
      "gross": 18750000,
      "net": 8760000,
      "margin": 46.7
    },
    "outstanding": {
      "amount": 1875000,
      "count": 15
    }
  }
}
```

**Permissions Required:** `reports:financial` (Finance, Super Admin)

---

## 5. Get Trip Performance Report
```http
GET /reports/trips
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `status`: Optional, enum
- `format`: Optional, enum: `json|pdf|excel`

**Permissions Required:** `reports:trip` (Dispatcher, Super Admin)

---

## 6. Get Customer Analytics
```http
GET /reports/customers
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `customerId`: Optional, string
- `format`: Optional, enum: `json|pdf|excel`

**Permissions Required:** `reports:customer` (Finance, Super Admin)

---

## 7. Get Booking Analytics
```http
GET /reports/bookings
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `status`: Optional, enum
- `format`: Optional, enum: `json|pdf|excel`

**Permissions Required:** `reports:booking` (Dispatcher, Support, Super Admin)

---

## 8. Export Report
```http
POST /reports/export
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "reportType": "fleet",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "format": "excel",
  "filters": {
    "vehicleId": "DRA-017"
  }
}
```

**Success Response (202):**
```json
{
  "success": true,
  "data": {
    "jobId": "export_job_001",
    "status": "processing",
    "estimatedCompletion": "2024-01-31T15:05:00Z"
  },
  "message": "Report export started. You will be notified when ready."
}
```

**Permissions Required:** Based on report type

---

## 9. Get Export Job Status
```http
GET /reports/exports/{jobId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "jobId": "export_job_001",
    "status": "completed",
    "downloadUrl": "https://cdn.daraexpress.com/reports/fleet_2024-01.xlsx",
    "expiresAt": "2024-02-01T15:00:00Z",
    "fileSize": 245760
  }
}
```

---

## 10. Get Dashboard Analytics
```http
GET /reports/dashboard
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `period`: Optional, enum: `today|week|month|year` (default: `today`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "kpis": {
      "activeTrips": 45,
      "totalFleet": 72,
      "onTimeDelivery": 92.3,
      "revenue": 7240000
    },
    "trends": {
      "bookings": [
        {"date": "2024-01-15", "count": 5}
      ],
      "revenue": [
        {"date": "2024-01-15", "amount": 625000}
      ]
    }
  }
}
```

**Permissions Required:** Based on user role
