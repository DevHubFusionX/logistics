# Payments & Invoicing

## 1. Get All Payments
```http
GET /payments
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `pending|completed|failed|refunded`
- `method`: Optional, enum: `card|bank_transfer|cash|wallet`
- `customerId`: Optional, string
- `bookingId`: Optional, string
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
      "paymentId": "PAY-2024-001",
      "bookingId": "BKG-2024-001",
      "customerId": "usr_026",
      "customerName": "John Doe",
      "amount": 125000,
      "currency": "NGN",
      "method": "card",
      "status": "completed",
      "transactionRef": "TXN-2024-001",
      "gatewayRef": "PAYSTACK-REF-123",
      "paidAt": "2024-01-15T11:00:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 342
  }
}
```

**Permissions Required:** `payment:read` (Finance, Super Admin)

---

## 2. Get Payment Details
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
    "booking": {
      "id": "bkg_001",
      "bookingId": "BKG-2024-001",
      "route": "Lagos → Abuja"
    },
    "customer": {
      "id": "usr_026",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "amount": 125000,
    "currency": "NGN",
    "method": "card",
    "status": "completed",
    "transactionRef": "TXN-2024-001",
    "gatewayRef": "PAYSTACK-REF-123",
    "gateway": "paystack",
    "cardDetails": {
      "last4": "4242",
      "brand": "visa",
      "bank": "GTBank"
    },
    "fees": {
      "gatewayFee": 1875,
      "netAmount": 123125
    },
    "paidAt": "2024-01-15T11:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Permissions Required:** `payment:read` (Finance, Super Admin) or own payment (Customer)

---

## 3. Initialize Payment
```http
POST /payments/initialize
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "bookingId": "bkg_001",
  "amount": 125000,
  "method": "card",
  "callbackUrl": "https://yourapp.com/payment/callback"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "paymentId": "PAY-2024-001",
    "authorizationUrl": "https://checkout.paystack.com/abc123",
    "accessCode": "abc123xyz",
    "reference": "TXN-2024-001",
    "expiresAt": "2024-01-15T11:30:00Z"
  },
  "message": "Payment initialized. Redirect customer to authorization URL."
}
```

**Permissions Required:** `payment:create` (Customer, Support, Super Admin)

---

## 4. Verify Payment
```http
GET /payments/verify/{reference}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "paymentId": "PAY-2024-001",
    "status": "completed",
    "amount": 125000,
    "paidAt": "2024-01-15T11:00:00Z",
    "gatewayResponse": {
      "status": "success",
      "reference": "TXN-2024-001",
      "message": "Payment successful"
    }
  }
}
```

**Permissions Required:** `payment:verify` (Customer, Finance, Support, Super Admin)

---

## 5. Process Bank Transfer
```http
POST /payments/bank-transfer
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "bookingId": "bkg_001",
  "amount": 125000,
  "bankName": "GTBank",
  "accountNumber": "0123456789",
  "transactionRef": "BANK-REF-123",
  "transactionDate": "2024-01-15T10:00:00Z",
  "proof": "base64_image_or_url"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "paymentId": "PAY-2024-002",
    "status": "pending",
    "message": "Bank transfer recorded. Awaiting verification."
  }
}
```

**Permissions Required:** `payment:create` (Customer, Support, Super Admin)

---

## 6. Approve Bank Transfer
```http
POST /payments/{paymentId}/approve
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "notes": "Payment verified in bank statement",
  "approvedBy": "usr_005"
}
```

**Permissions Required:** `payment:approve` (Finance, Super Admin)

---

## 7. Refund Payment
```http
POST /payments/{paymentId}/refund
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "amount": 125000,
  "reason": "Booking cancelled",
  "notes": "Full refund as per policy"
}
```

**Permissions Required:** `payment:refund` (Finance, Super Admin)

---

## 8. Get Payment Statistics
```http
GET /payments/statistics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": 18750000,
      "totalPayments": 150,
      "completedPayments": 145,
      "pendingPayments": 3,
      "failedPayments": 2,
      "averagePaymentValue": 125000
    },
    "byMethod": {
      "card": {
        "count": 120,
        "amount": 15000000
      },
      "bank_transfer": {
        "count": 25,
        "amount": 3125000
      },
      "cash": {
        "count": 5,
        "amount": 625000
      }
    },
    "trends": [
      {
        "date": "2024-01-15",
        "revenue": 625000,
        "payments": 5
      }
    ]
  }
}
```

**Permissions Required:** `payment:read_statistics` (Finance, Super Admin)

---

## 9. Get All Invoices
```http
GET /invoices
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: Optional, enum: `draft|sent|paid|overdue|cancelled`
- `customerId`: Optional, string
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
      "id": "inv_001",
      "invoiceId": "INV-2024-001",
      "bookingId": "BKG-2024-001",
      "customerId": "usr_026",
      "customerName": "John Doe",
      "amount": 125000,
      "currency": "NGN",
      "status": "paid",
      "issuedDate": "2024-01-15T10:30:00Z",
      "dueDate": "2024-01-22T23:59:59Z",
      "paidDate": "2024-01-15T11:00:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

**Permissions Required:** `invoice:read` (Finance, Support, Super Admin)

---

## 10. Get Invoice Details
```http
GET /invoices/{invoiceId}
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `format`: Optional, enum: `json|pdf` (default: `json`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "inv_001",
    "invoiceId": "INV-2024-001",
    "booking": {
      "id": "bkg_001",
      "bookingId": "BKG-2024-001",
      "route": "Lagos → Abuja"
    },
    "customer": {
      "id": "usr_026",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+234-801-234-5678",
      "address": "123 Customer Street, Lagos"
    },
    "items": [
      {
        "description": "Base Fare (Lagos to Abuja)",
        "quantity": 1,
        "unitPrice": 100000,
        "amount": 100000
      },
      {
        "description": "Distance Charge (500km)",
        "quantity": 1,
        "unitPrice": 15000,
        "amount": 15000
      },
      {
        "description": "Temperature Control",
        "quantity": 1,
        "unitPrice": 10000,
        "amount": 10000
      }
    ],
    "subtotal": 125000,
    "tax": 0,
    "discount": 0,
    "total": 125000,
    "currency": "NGN",
    "status": "paid",
    "issuedDate": "2024-01-15T10:30:00Z",
    "dueDate": "2024-01-22T23:59:59Z",
    "paidDate": "2024-01-15T11:00:00Z",
    "payment": {
      "id": "pay_001",
      "method": "card",
      "transactionRef": "TXN-2024-001"
    },
    "notes": "Thank you for your business",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Permissions Required:** `invoice:read` (Finance, Support, Super Admin) or own invoice (Customer)

---

## 11. Generate Invoice
```http
POST /invoices
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "bookingId": "bkg_001",
  "dueDate": "2024-01-22T23:59:59Z",
  "notes": "Payment due within 7 days"
}
```

**Permissions Required:** `invoice:create` (Finance, Super Admin)

---

## 12. Send Invoice
```http
POST /invoices/{invoiceId}/send
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "subject": "Invoice for Booking BKG-2024-001",
  "message": "Please find attached your invoice."
}
```

**Permissions Required:** `invoice:send` (Finance, Support, Super Admin)

---

## 13. Get Outstanding Payments
```http
GET /payments/outstanding
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `customerId`: Optional, string
- `daysOverdue`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalOutstanding": 1875000,
      "count": 15,
      "averageAge": 12.5
    },
    "payments": [
      {
        "invoiceId": "INV-2024-002",
        "bookingId": "BKG-2024-002",
        "customerId": "usr_027",
        "customerName": "Jane Smith",
        "amount": 150000,
        "dueDate": "2024-01-23T23:59:59Z",
        "daysOverdue": 8,
        "status": "overdue"
      }
    ]
  }
}
```

**Permissions Required:** `payment:read_outstanding` (Finance, Super Admin)

---

## 14. Get Revenue Report
```http
GET /payments/revenue
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month|customer|route`

**Permissions Required:** `payment:read_revenue` (Finance, Super Admin)
