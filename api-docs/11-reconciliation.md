# Financial Reconciliation

## 1. Get Reconciliation Dashboard
```http
GET /reconciliation/dashboard
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `status`: Optional, enum: `matched|mismatched|pending|all` (default: `all`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalBookings": 150,
      "totalTrips": 145,
      "totalPayments": 140,
      "matched": 135,
      "mismatched": 10,
      "pending": 5,
      "matchRate": 90.0,
      "totalRevenue": 18750000,
      "reconciledRevenue": 16875000,
      "unreconciledRevenue": 1875000
    },
    "period": {
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-01-31T23:59:59Z"
    },
    "lastReconciled": "2024-01-31T18:00:00Z"
  }
}
```

**Permissions Required:** `reconciliation:read` (Finance, Super Admin)

---

## 2. Get Reconciliation Records
```http
GET /reconciliation/records
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `status`: Optional, enum: `matched|mismatched|pending`
- `type`: Optional, enum: `booking_trip|trip_payment|full_chain`
- `search`: Optional, string (searches booking ID, trip ID, payment ref)
- `page`: Optional, number (default: 1)
- `limit`: Optional, number (default: 50)
- `sort`: Optional, string (default: `-createdAt`)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "rec_001",
      "status": "matched",
      "booking": {
        "id": "bkg_001",
        "bookingId": "BKG-2024-001",
        "customerId": "usr_026",
        "customerName": "John Doe",
        "amount": 125000,
        "createdAt": "2024-01-15T10:30:00Z"
      },
      "trip": {
        "id": "trp_001",
        "tripId": "TRP-2401",
        "driverId": "drv_001",
        "driverName": "Adebayo Johnson",
        "vehicleId": "DRA-017",
        "status": "completed",
        "completedAt": "2024-01-22T14:30:00Z"
      },
      "payment": {
        "id": "pay_001",
        "paymentId": "PAY-2024-001",
        "amount": 125000,
        "method": "card",
        "status": "completed",
        "transactionRef": "TXN-2024-001",
        "paidAt": "2024-01-15T11:00:00Z"
      },
      "reconciliationStatus": "matched",
      "matchedAt": "2024-01-22T15:00:00Z",
      "matchedBy": "usr_005",
      "notes": null
    },
    {
      "id": "rec_002",
      "status": "mismatched",
      "booking": {
        "id": "bkg_002",
        "bookingId": "BKG-2024-002",
        "customerId": "usr_027",
        "customerName": "Jane Smith",
        "amount": 150000,
        "createdAt": "2024-01-16T09:00:00Z"
      },
      "trip": {
        "id": "trp_002",
        "tripId": "TRP-2402",
        "driverId": "drv_002",
        "driverName": "Chidi Okafor",
        "vehicleId": "DRA-025",
        "status": "completed",
        "completedAt": "2024-01-23T16:00:00Z"
      },
      "payment": null,
      "reconciliationStatus": "mismatched",
      "mismatchReason": "payment_missing",
      "mismatchDetails": {
        "issue": "No payment record found for completed trip",
        "expectedAmount": 150000,
        "actualAmount": 0,
        "variance": -150000
      },
      "flaggedAt": "2024-01-23T17:00:00Z",
      "notes": "Customer claims payment was made via bank transfer"
    },
    {
      "id": "rec_003",
      "status": "mismatched",
      "booking": {
        "id": "bkg_003",
        "bookingId": "BKG-2024-003",
        "customerId": "usr_028",
        "customerName": "Ahmed Ibrahim",
        "amount": 200000,
        "createdAt": "2024-01-17T11:00:00Z"
      },
      "trip": {
        "id": "trp_003",
        "tripId": "TRP-2403",
        "driverId": "drv_003",
        "driverName": "Emeka Nwosu",
        "vehicleId": "DRA-033",
        "status": "completed",
        "completedAt": "2024-01-24T10:00:00Z"
      },
      "payment": {
        "id": "pay_003",
        "paymentId": "PAY-2024-003",
        "amount": 180000,
        "method": "bank_transfer",
        "status": "completed",
        "transactionRef": "TXN-2024-003",
        "paidAt": "2024-01-17T12:00:00Z"
      },
      "reconciliationStatus": "mismatched",
      "mismatchReason": "amount_variance",
      "mismatchDetails": {
        "issue": "Payment amount does not match booking amount",
        "expectedAmount": 200000,
        "actualAmount": 180000,
        "variance": -20000
      },
      "flaggedAt": "2024-01-24T11:00:00Z",
      "notes": "Discount applied but not recorded in booking"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "totalPages": 3
  }
}
```

**Permissions Required:** `reconciliation:read` (Finance, Super Admin)

---

## 3. Get Mismatched Records
```http
GET /reconciliation/mismatches
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `reason`: Optional, enum: `payment_missing|trip_missing|amount_variance|status_mismatch|duplicate_payment`
- `severity`: Optional, enum: `low|medium|high|critical`
- `resolved`: Optional, boolean (default: false)
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 10,
      "paymentMissing": 3,
      "tripMissing": 1,
      "amountVariance": 4,
      "statusMismatch": 2,
      "totalVariance": -95000
    },
    "mismatches": [
      {
        "id": "rec_002",
        "bookingId": "BKG-2024-002",
        "reason": "payment_missing",
        "severity": "high",
        "expectedAmount": 150000,
        "actualAmount": 0,
        "variance": -150000,
        "flaggedAt": "2024-01-23T17:00:00Z",
        "ageInDays": 8,
        "assignedTo": "usr_005",
        "notes": "Customer claims payment was made via bank transfer"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 10
  }
}
```

**Permissions Required:** `reconciliation:read` (Finance, Super Admin)

---

## 4. Resolve Mismatch
```http
POST /reconciliation/mismatches/{recordId}/resolve
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "resolution": "manual_payment_recorded",
  "notes": "Payment was made via bank transfer on 2024-01-17. Transaction verified and recorded manually.",
  "paymentId": "pay_002",
  "adjustmentAmount": 0,
  "approvedBy": "usr_001"
}
```

**Validation Rules:**
- `resolution`: Required, enum: `manual_payment_recorded|amount_adjusted|duplicate_removed|error_corrected|waived`
- `notes`: Required, string, min 10 chars, max 500 chars
- `paymentId`: Optional, string (required if resolution is `manual_payment_recorded`)
- `adjustmentAmount`: Optional, number (required if resolution is `amount_adjusted`)
- `approvedBy`: Optional, string (required for high/critical severity)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "recordId": "rec_002",
    "status": "resolved",
    "resolution": "manual_payment_recorded",
    "resolvedAt": "2024-01-31T14:30:00Z",
    "resolvedBy": "usr_005"
  },
  "message": "Mismatch resolved successfully"
}
```

**Permissions Required:** `reconciliation:resolve` (Finance, Super Admin)

---

## 5. Run Reconciliation
```http
POST /reconciliation/run
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-01-31T23:59:59Z",
  "scope": "full_chain",
  "autoMatch": true,
  "notifyOnMismatch": true
}
```

**Validation Rules:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date, must be after startDate
- `scope`: Required, enum: `booking_trip|trip_payment|full_chain`
- `autoMatch`: Optional, boolean (default: true)
- `notifyOnMismatch`: Optional, boolean (default: true)

**Success Response (202):**
```json
{
  "success": true,
  "data": {
    "jobId": "recon_job_001",
    "status": "processing",
    "startedAt": "2024-01-31T15:00:00Z",
    "estimatedCompletion": "2024-01-31T15:05:00Z"
  },
  "message": "Reconciliation job started. You will be notified when complete."
}
```

**Permissions Required:** `reconciliation:run` (Finance, Super Admin)

---

## 6. Get Reconciliation Job Status
```http
GET /reconciliation/jobs/{jobId}
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "jobId": "recon_job_001",
    "status": "completed",
    "startedAt": "2024-01-31T15:00:00Z",
    "completedAt": "2024-01-31T15:04:32Z",
    "duration": 272,
    "results": {
      "recordsProcessed": 150,
      "matched": 135,
      "mismatched": 10,
      "pending": 5,
      "newMismatches": 3,
      "resolvedMismatches": 2
    },
    "errors": []
  }
}
```

---

## 7. Export Reconciliation Report
```http
GET /reconciliation/export
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `status`: Optional, enum: `matched|mismatched|pending|all`
- `format`: Required, enum: `excel|csv|pdf`
- `includeDetails`: Optional, boolean (default: true)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://cdn.daraexpress.com/reports/reconciliation_2024-01.xlsx",
    "expiresAt": "2024-02-01T15:00:00Z",
    "fileSize": 245760,
    "format": "excel"
  }
}
```

**Permissions Required:** `reconciliation:export` (Finance, Super Admin)

---

## 8. Get Reconciliation Analytics
```http
GET /reconciliation/analytics
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Required, ISO date
- `endDate`: Required, ISO date
- `groupBy`: Optional, enum: `day|week|month` (default: `day`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "trends": [
      {
        "date": "2024-01-01",
        "totalBookings": 5,
        "matched": 4,
        "mismatched": 1,
        "matchRate": 80.0,
        "revenue": 625000,
        "reconciledRevenue": 500000
      }
    ],
    "topMismatchReasons": [
      {
        "reason": "payment_missing",
        "count": 3,
        "totalAmount": 450000
      },
      {
        "reason": "amount_variance",
        "count": 4,
        "totalAmount": 95000
      }
    ],
    "averageResolutionTime": 2.5,
    "resolutionTimeUnit": "days"
  }
}
```

**Permissions Required:** `reconciliation:read` (Finance, Super Admin)

---

## 9. Get Unreconciled Revenue
```http
GET /reconciliation/unreconciled-revenue
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `groupBy`: Optional, enum: `customer|driver|route`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 1875000,
    "currency": "NGN",
    "breakdown": [
      {
        "customerId": "usr_027",
        "customerName": "Jane Smith",
        "unreconciledAmount": 150000,
        "bookingCount": 1,
        "oldestBooking": "2024-01-16T09:00:00Z"
      },
      {
        "customerId": "usr_028",
        "customerName": "Ahmed Ibrahim",
        "unreconciledAmount": 20000,
        "bookingCount": 1,
        "oldestBooking": "2024-01-17T11:00:00Z"
      }
    ]
  }
}
```

**Permissions Required:** `reconciliation:read` (Finance, Super Admin)

---

## 10. Bulk Resolve Mismatches
```http
POST /reconciliation/mismatches/bulk-resolve
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "recordIds": ["rec_002", "rec_003", "rec_004"],
  "resolution": "amount_adjusted",
  "notes": "Bulk adjustment for promotional discount period",
  "approvedBy": "usr_001"
}
```

**Permissions Required:** `reconciliation:bulk_resolve` (Finance Manager, Super Admin)

---

## Reconciliation Rules

### Auto-Match Criteria
Records are automatically matched when:
1. Booking ID matches Trip booking reference
2. Trip ID matches Payment trip reference
3. Amounts match within 1% tolerance (configurable)
4. All records are in completed/paid status
5. Dates are within expected range

### Mismatch Reasons
- `payment_missing`: Trip completed but no payment record
- `trip_missing`: Booking confirmed but no trip record
- `amount_variance`: Payment amount differs from booking amount
- `status_mismatch`: Status inconsistency across records
- `duplicate_payment`: Multiple payments for same booking

### Severity Levels
- `low`: Variance < ₦10,000 or resolved within 24 hours
- `medium`: Variance ₦10,000 - ₦50,000 or age 1-7 days
- `high`: Variance ₦50,000 - ₦200,000 or age 7-30 days
- `critical`: Variance > ₦200,000 or age > 30 days
