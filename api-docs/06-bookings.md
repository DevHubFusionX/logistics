# Bookings

## 1. Create Booking (Customer)
```http
POST /bookings
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "pickupAddress": {
    "label": "Warehouse A",
    "locationName": "Main Warehouse",
    "streetAddress": "123 Industrial Road",
    "city": "Lagos",
    "state": "Lagos",
    "contactPhone": "+234-801-234-5678"
  },
  "deliveryAddress": {
    "label": "Client Office",
    "locationName": "ABC Company",
    "streetAddress": "456 Business Avenue",
    "city": "Abuja",
    "state": "FCT",
    "contactPhone": "+234-802-345-6789"
  },
  "cargoDetails": {
    "type": "Frozen Foods",
    "weight": 500,
    "quantity": 20,
    "description": "Frozen chicken products",
    "temperature": -18,
    "packaging": "Palletized"
  },
  "preferredPickupDate": "2024-01-20T09:00:00Z",
  "specialInstructions": "Handle with care, temperature sensitive"
}
```

**Validation Rules:**
- `pickupAddress`: Required, object with all address fields
- `deliveryAddress`: Required, object with all address fields
- `cargoDetails.type`: Required, string, max 100 chars
- `cargoDetails.weight`: Required, number, min 1, max 50000 (kg)
- `cargoDetails.quantity`: Required, number, min 1
- `cargoDetails.temperature`: Optional, number (for refrigerated cargo)
- `cargoDetails.packaging`: Optional, string
- `preferredPickupDate`: Required, ISO date, must be future date

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "bkg_001",
    "bookingId": "BKG-2024-001",
    "status": "pending",
    "customerId": "usr_026",
    "pickupAddress": {...},
    "deliveryAddress": {...},
    "cargoDetails": {...},
    "estimatedCost": 125000,
    "currency": "NGN",
    "preferredPickupDate": "2024-01-20T09:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Booking created successfully. Our team will review and confirm shortly."
}
```

**Permissions Required:** `booking:create` (Customer, Support, Super Admin)

---

## 2. Get My Bookings (Customer)
```http
GET /bookings/my-bookings
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `pending|confirmed|in_transit|delivered|cancelled|on_hold|failed`
- `search`: Optional, string (searches bookingId, cargo type)
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `page`: Optional, number (default: 1)
- `limit`: Optional, number (default: 20)
- `sort`: Optional, string (default: `-createdAt`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "pending": 3,
      "active": 5,
      "delivered": 42,
      "outstandingInvoices": 2
    },
    "bookings": [
      {
        "id": "bkg_001",
        "bookingId": "BKG-2024-001",
        "status": "in_transit",
        "pickupLocation": "Lagos",
        "deliveryLocation": "Abuja",
        "cargoType": "Frozen Foods",
        "weight": 500,
        "estimatedCost": 125000,
        "paymentStatus": "paid",
        "preferredPickupDate": "2024-01-20T09:00:00Z",
        "actualPickupDate": "2024-01-20T10:15:00Z",
        "estimatedDeliveryDate": "2024-01-22T14:00:00Z",
        "driver": {
          "name": "Adebayo Johnson",
          "phone": "+234-803-456-7890",
          "vehiclePlate": "ABC-123-XY"
        },
        "tracking": {
          "currentLocation": "Lokoja, Kogi",
          "progress": 65,
          "lastUpdated": "2024-01-21T10:30:00Z"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

**Permissions Required:** `booking:read_own` (Customer)

---

## 3. Get Booking Details
```http
GET /bookings/{bookingId}
Headers: Authorization: Bearer {token}
```

**Path Parameters:**
- `bookingId`: Required, string (e.g., `bkg_001` or `BKG-2024-001`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "bkg_001",
    "bookingId": "BKG-2024-001",
    "status": "in_transit",
    "customer": {
      "id": "usr_026",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+234-801-234-5678"
    },
    "pickupAddress": {
      "label": "Warehouse A",
      "locationName": "Main Warehouse",
      "streetAddress": "123 Industrial Road",
      "city": "Lagos",
      "state": "Lagos",
      "contactPhone": "+234-801-234-5678",
      "coordinates": {
        "lat": 6.5244,
        "lng": 3.3792
      }
    },
    "deliveryAddress": {
      "label": "Client Office",
      "locationName": "ABC Company",
      "streetAddress": "456 Business Avenue",
      "city": "Abuja",
      "state": "FCT",
      "contactPhone": "+234-802-345-6789",
      "coordinates": {
        "lat": 9.0765,
        "lng": 7.3986
      }
    },
    "cargoDetails": {
      "type": "Frozen Foods",
      "weight": 500,
      "quantity": 20,
      "description": "Frozen chicken products",
      "temperature": -18,
      "packaging": "Palletized"
    },
    "pricing": {
      "baseFare": 100000,
      "distanceCharge": 15000,
      "temperatureControl": 10000,
      "subtotal": 125000,
      "tax": 0,
      "total": 125000,
      "currency": "NGN"
    },
    "payment": {
      "status": "paid",
      "method": "card",
      "paidAt": "2024-01-15T11:00:00Z",
      "transactionRef": "TXN-2024-001"
    },
    "driver": {
      "id": "drv_001",
      "name": "Adebayo Johnson",
      "phone": "+234-803-456-7890",
      "vehiclePlate": "ABC-123-XY",
      "vehicleType": "Refrigerated Truck",
      "rating": 4.8
    },
    "trip": {
      "id": "TRP-2401",
      "status": "in_progress",
      "startedAt": "2024-01-20T10:15:00Z",
      "estimatedArrival": "2024-01-22T14:00:00Z"
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
      "distanceRemaining": 175,
      "estimatedTimeRemaining": "4 hours 30 minutes"
    },
    "timeline": [
      {
        "status": "pending",
        "timestamp": "2024-01-15T10:30:00Z",
        "description": "Booking created"
      },
      {
        "status": "confirmed",
        "timestamp": "2024-01-15T14:00:00Z",
        "description": "Booking confirmed by dispatcher",
        "user": "Jane Smith"
      },
      {
        "status": "in_transit",
        "timestamp": "2024-01-20T10:15:00Z",
        "description": "Pickup completed, en route to delivery"
      }
    ],
    "specialInstructions": "Handle with care, temperature sensitive",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-21T10:30:00Z"
  }
}
```

**Permissions Required:** `booking:read_own` (Customer) or `booking:read` (Staff)

**Note:** Driver information (name, phone, vehicle) only visible when status is `confirmed` or `in_transit`

---

## 4. Track Booking
```http
GET /bookings/{bookingId}/track
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "bookingId": "BKG-2024-001",
    "status": "in_transit",
    "currentLocation": {
      "lat": 8.4799,
      "lng": 4.5418,
      "address": "Lokoja, Kogi",
      "lastUpdated": "2024-01-21T10:30:00Z"
    },
    "route": {
      "origin": "Lagos",
      "destination": "Abuja",
      "waypoints": [
        {
          "location": "Ibadan",
          "timestamp": "2024-01-20T12:30:00Z",
          "status": "passed"
        },
        {
          "location": "Lokoja",
          "timestamp": "2024-01-21T10:30:00Z",
          "status": "current"
        }
      ]
    },
    "progress": 65,
    "estimatedArrival": "2024-01-22T14:00:00Z",
    "driver": {
      "name": "Adebayo Johnson",
      "phone": "+234-803-456-7890",
      "vehiclePlate": "ABC-123-XY"
    },
    "temperature": {
      "current": -18.2,
      "setPoint": -18,
      "status": "normal",
      "lastUpdated": "2024-01-21T10:30:00Z"
    }
  }
}
```

**Permissions Required:** `booking:track` (Customer, Staff)

---

## 5. Update Booking Status (Staff Only)
```http
PATCH /bookings/{bookingId}/status
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "confirmed",
  "notes": "Driver and vehicle assigned",
  "assignedDriver": "drv_001",
  "assignedVehicle": "veh_001",
  "estimatedPickupDate": "2024-01-20T09:00:00Z"
}
```

**Validation Rules:**
- `status`: Required, enum: `pending|confirmed|in_transit|delivered|cancelled|on_hold|failed`
- Valid status transitions:
  - `pending` → `confirmed`, `cancelled`, `on_hold`
  - `confirmed` → `in_transit`, `cancelled`, `on_hold`
  - `in_transit` → `delivered`, `failed`
  - `on_hold` → `confirmed`, `cancelled`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "bookingId": "BKG-2024-001",
    "status": "confirmed",
    "updatedAt": "2024-01-15T14:00:00Z"
  },
  "message": "Booking status updated successfully"
}
```

**Permissions Required:** `booking:update_status` (Dispatcher, Support, Super Admin)

---

## 6. Cancel Booking
```http
POST /bookings/{bookingId}/cancel
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "reason": "Change of plans",
  "refundRequested": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "bookingId": "BKG-2024-001",
    "status": "cancelled",
    "refund": {
      "eligible": true,
      "amount": 125000,
      "processingTime": "3-5 business days"
    }
  },
  "message": "Booking cancelled successfully"
}
```

**Permissions Required:** `booking:cancel` (Customer before confirmed, Staff anytime)

---

## 7. Get Booking Status Guide
```http
GET /bookings/status-guide
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "statuses": [
      {
        "status": "pending",
        "label": "Pending Review",
        "description": "Your booking has been received and is awaiting review by our team",
        "color": "yellow",
        "icon": "clock",
        "nextSteps": ["Our team will review your booking within 2 hours", "You will receive a confirmation email once approved"],
        "canCancel": true
      },
      {
        "status": "confirmed",
        "label": "Confirmed",
        "description": "Your booking has been confirmed and a driver has been assigned",
        "color": "blue",
        "icon": "check-circle",
        "nextSteps": ["Driver will contact you before pickup", "Prepare your cargo for pickup"],
        "canCancel": true
      },
      {
        "status": "in_transit",
        "label": "In Transit",
        "description": "Your cargo is on the way to the delivery location",
        "color": "purple",
        "icon": "truck",
        "nextSteps": ["Track your shipment in real-time", "Driver will notify you upon arrival"],
        "canCancel": false
      },
      {
        "status": "delivered",
        "label": "Delivered",
        "description": "Your cargo has been successfully delivered",
        "color": "green",
        "icon": "check",
        "nextSteps": ["Download your invoice", "Rate your experience"],
        "canCancel": false
      },
      {
        "status": "cancelled",
        "label": "Cancelled",
        "description": "This booking has been cancelled",
        "color": "red",
        "icon": "x-circle",
        "nextSteps": ["Refund will be processed if applicable"],
        "canCancel": false
      },
      {
        "status": "on_hold",
        "label": "On Hold",
        "description": "Your booking is temporarily on hold",
        "color": "orange",
        "icon": "pause",
        "nextSteps": ["Our team will contact you to resolve the issue"],
        "canCancel": true
      },
      {
        "status": "failed",
        "label": "Failed",
        "description": "Delivery attempt was unsuccessful",
        "color": "red",
        "icon": "alert-triangle",
        "nextSteps": ["Contact support for rescheduling"],
        "canCancel": false
      }
    ]
  }
}
```

---

## 8. Get All Bookings (Staff Only)
```http
GET /bookings
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum
- `customerId`: Optional, string
- `driverId`: Optional, string
- `search`: Optional, string
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `paymentStatus`: Optional, enum: `pending|paid|failed`
- `page`: Optional, number
- `limit`: Optional, number
- `sort`: Optional, string

**Permissions Required:** `booking:read_all` (Dispatcher, Support, Super Admin)

---

## 9. Assign Driver to Booking
```http
POST /bookings/{bookingId}/assign-driver
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "driverId": "drv_001",
  "vehicleId": "veh_001",
  "estimatedPickupDate": "2024-01-20T09:00:00Z",
  "notes": "Ensure temperature monitoring is active"
}
```

**Permissions Required:** `booking:assign_driver` (Dispatcher, Super Admin)

---

## 10. Get Booking Invoice
```http
GET /bookings/{bookingId}/invoice
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `format`: Optional, enum: `json|pdf` (default: `json`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "invoiceId": "INV-2024-001",
    "bookingId": "BKG-2024-001",
    "customer": {...},
    "items": [
      {
        "description": "Base Fare (Lagos to Abuja)",
        "amount": 100000
      },
      {
        "description": "Distance Charge (500km)",
        "amount": 15000
      },
      {
        "description": "Temperature Control",
        "amount": 10000
      }
    ],
    "subtotal": 125000,
    "tax": 0,
    "total": 125000,
    "currency": "NGN",
    "paymentStatus": "paid",
    "issuedDate": "2024-01-15T10:30:00Z",
    "dueDate": "2024-01-22T23:59:59Z"
  }
}
```

**Permissions Required:** `booking:read_invoice` (Customer for own, Staff for all)
