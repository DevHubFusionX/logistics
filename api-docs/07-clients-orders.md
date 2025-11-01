# Clients & Orders

## 1. Get All Clients
```http
GET /clients
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `active|inactive|suspended`
- `search`: Optional, string (searches name, email, company)
- `type`: Optional, enum: `individual|corporate`
- `creditStatus`: Optional, enum: `good|warning|exceeded`
- `page`: Optional, number (default: 1)
- `limit`: Optional, number (default: 20)
- `sort`: Optional, string (default: `-createdAt`)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cli_001",
      "clientId": "CLI-001",
      "name": "ABC Corporation",
      "type": "corporate",
      "email": "contact@abccorp.com",
      "phone": "+234-801-234-5678",
      "status": "active",
      "creditLimit": 5000000,
      "creditUsed": 1250000,
      "creditAvailable": 3750000,
      "outstandingBalance": 250000,
      "totalBookings": 145,
      "activeBookings": 8,
      "lastBookingDate": "2024-01-30T10:00:00Z",
      "rating": 4.7,
      "createdAt": "2023-01-15T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 87,
    "totalPages": 5
  }
}
```

**Permissions Required:** `client:read` (Support, Finance, Super Admin)

---

## 2. Get Client Details
```http
GET /clients/{clientId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cli_001",
    "clientId": "CLI-001",
    "name": "ABC Corporation",
    "type": "corporate",
    "email": "contact@abccorp.com",
    "phone": "+234-801-234-5678",
    "alternatePhone": "+234-802-345-6789",
    "status": "active",
    "address": {
      "street": "123 Business Avenue",
      "city": "Lagos",
      "state": "Lagos",
      "country": "Nigeria",
      "postalCode": "100001"
    },
    "contactPerson": {
      "name": "John Doe",
      "title": "Logistics Manager",
      "email": "john@abccorp.com",
      "phone": "+234-803-456-7890"
    },
    "financial": {
      "creditLimit": 5000000,
      "creditUsed": 1250000,
      "creditAvailable": 3750000,
      "outstandingBalance": 250000,
      "paymentTerms": "Net 30",
      "preferredPaymentMethod": "bank_transfer"
    },
    "statistics": {
      "totalBookings": 145,
      "activeBookings": 8,
      "completedBookings": 132,
      "cancelledBookings": 5,
      "totalRevenue": 18750000,
      "averageBookingValue": 129310,
      "onTimeDeliveryRate": 94.5
    },
    "preferences": {
      "temperatureControl": true,
      "preferredVehicleType": "refrigerated",
      "specialInstructions": "Always call before delivery"
    },
    "documents": [
      {
        "type": "business_registration",
        "url": "https://cdn.daraexpress.com/docs/cli_001_reg.pdf",
        "uploadedAt": "2023-01-15T00:00:00Z"
      }
    ],
    "rating": 4.7,
    "createdAt": "2023-01-15T00:00:00Z",
    "lastBookingDate": "2024-01-30T10:00:00Z"
  }
}
```

**Permissions Required:** `client:read` (Support, Finance, Super Admin)

---

## 3. Create Client
```http
POST /clients
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "XYZ Limited",
  "type": "corporate",
  "email": "info@xyzltd.com",
  "phone": "+234-804-567-8901",
  "address": {
    "street": "456 Commerce Road",
    "city": "Abuja",
    "state": "FCT",
    "country": "Nigeria"
  },
  "contactPerson": {
    "name": "Jane Smith",
    "title": "Operations Manager",
    "email": "jane@xyzltd.com",
    "phone": "+234-805-678-9012"
  },
  "creditLimit": 3000000,
  "paymentTerms": "Net 30"
}
```

**Validation Rules:**
- `name`: Required, min 2, max 200 chars
- `type`: Required, enum: `individual|corporate`
- `email`: Required, valid email, unique
- `phone`: Required, valid phone format
- `creditLimit`: Optional, number, min 0 (default: 0)
- `paymentTerms`: Optional, string (default: "Net 30")

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "cli_088",
    "clientId": "CLI-088",
    "name": "XYZ Limited",
    "email": "info@xyzltd.com",
    "status": "active",
    "createdAt": "2024-01-31T15:00:00Z"
  },
  "message": "Client created successfully"
}
```

**Permissions Required:** `client:create` (Support, Super Admin)

---

## 4. Update Client
```http
PUT /clients/{clientId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "phone": "+234-804-567-8901",
  "creditLimit": 4000000,
  "status": "active"
}
```

**Permissions Required:** `client:update` (Support, Super Admin)

---

## 5. Get Client Bookings
```http
GET /clients/{clientId}/bookings
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum
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
      "id": "bkg_001",
      "bookingId": "BKG-2024-001",
      "status": "delivered",
      "route": "Lagos → Abuja",
      "cargoType": "Frozen Foods",
      "weight": 500,
      "amount": 125000,
      "paymentStatus": "paid",
      "createdAt": "2024-01-15T10:30:00Z",
      "deliveredAt": "2024-01-22T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 145
  }
}
```

**Permissions Required:** `client:read` (Support, Finance, Super Admin)

---

## 6. Get Client Payment History
```http
GET /clients/{clientId}/payments
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `pending|completed|failed|refunded`
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalPaid": 18500000,
      "totalPending": 250000,
      "totalRefunded": 0,
      "averagePaymentTime": 2.5
    },
    "payments": [
      {
        "id": "pay_001",
        "paymentId": "PAY-2024-001",
        "bookingId": "BKG-2024-001",
        "amount": 125000,
        "method": "bank_transfer",
        "status": "completed",
        "transactionRef": "TXN-2024-001",
        "paidAt": "2024-01-15T11:00:00Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 145
  }
}
```

**Permissions Required:** `client:read_payments` (Finance, Super Admin)

---

## 7. Get Client Analytics
```http
GET /clients/{clientId}/analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month` (default: `month`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": 18750000,
      "trend": [
        {
          "period": "2024-01",
          "amount": 1875000,
          "bookings": 15
        }
      ]
    },
    "bookings": {
      "total": 145,
      "completed": 132,
      "cancelled": 5,
      "completionRate": 91.0
    },
    "performance": {
      "onTimeDeliveryRate": 94.5,
      "averageDeliveryTime": 2.3,
      "customerSatisfaction": 4.7
    },
    "topRoutes": [
      {
        "route": "Lagos → Abuja",
        "bookings": 45,
        "revenue": 5625000
      }
    ],
    "topCargoTypes": [
      {
        "type": "Frozen Foods",
        "bookings": 67,
        "revenue": 8375000
      }
    ]
  }
}
```

**Permissions Required:** `client:read_analytics` (Finance, Super Admin)

---

## 8. Update Client Credit Limit
```http
PATCH /clients/{clientId}/credit-limit
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "creditLimit": 6000000,
  "reason": "Increased business volume",
  "approvedBy": "usr_001"
}
```

**Permissions Required:** `client:update_credit` (Finance Manager, Super Admin)

---

## 9. Suspend Client
```http
POST /clients/{clientId}/suspend
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "reason": "Outstanding payments overdue",
  "notes": "Multiple payment reminders sent"
}
```

**Permissions Required:** `client:suspend` (Finance, Super Admin)

---

## 10. Get Client Documents
```http
GET /clients/{clientId}/documents
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "doc_001",
      "type": "business_registration",
      "name": "CAC Certificate",
      "url": "https://cdn.daraexpress.com/docs/cli_001_reg.pdf",
      "size": 245760,
      "uploadedBy": "usr_005",
      "uploadedAt": "2023-01-15T00:00:00Z"
    }
  ]
}
```

---

## 11. Upload Client Document
```http
POST /clients/{clientId}/documents
Headers: Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: Required, file (max 10MB, PDF/JPG/PNG)
- `type`: Required, enum: `business_registration|tax_certificate|id_card|other`
- `name`: Optional, string

**Permissions Required:** `client:upload_document` (Support, Super Admin)
