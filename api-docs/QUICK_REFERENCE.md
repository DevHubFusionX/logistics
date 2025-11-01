# API Quick Reference Guide

## Base URL
```
Production: https://api.daraexpress.com/v1
Staging: https://staging-api.daraexpress.com/v1
Development: http://localhost:8000/api/v1
```

## Authentication
```http
POST /auth/login
POST /auth/register
POST /auth/refresh
POST /auth/logout
```

**Headers:**
```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

---

## Quick Access by Role

### Super Admin
- Full access to all endpoints
- User management
- System settings
- All reports and analytics

### Fleet Officer
```http
GET /fleet/vehicles
GET /drivers
GET /temperature/monitoring
GET /reports/fleet
GET /reports/drivers
```

### Dispatcher
```http
GET /bookings
PATCH /bookings/{id}/status
POST /bookings/{id}/assign-driver
GET /trips
POST /trips
PUT /trips/{id}
```

### Finance
```http
GET /payments
GET /invoices
GET /reconciliation/dashboard
GET /reconciliation/records
POST /reconciliation/mismatches/{id}/resolve
GET /reports/financial
```

### Support
```http
POST /bookings
GET /bookings
GET /clients
POST /clients
GET /payments
GET /invoices
```

### Customer
```http
POST /bookings
GET /bookings/my-bookings
GET /bookings/{id}/track
POST /payments/initialize
GET /invoices/{id}
GET /bookings/status-guide
```

---

## Common Workflows

### 1. Customer Books Shipment
```http
# 1. Create booking
POST /bookings
{
  "pickupAddress": {...},
  "deliveryAddress": {...},
  "cargoDetails": {...}
}

# 2. Initialize payment
POST /payments/initialize
{
  "bookingId": "bkg_001",
  "amount": 125000,
  "method": "card"
}

# 3. Verify payment
GET /payments/verify/{reference}

# 4. Track booking
GET /bookings/{id}/track
```

### 2. Dispatcher Assigns Trip
```http
# 1. Get pending bookings
GET /bookings?status=pending

# 2. Confirm booking
PATCH /bookings/{id}/status
{
  "status": "confirmed"
}

# 3. Assign driver
POST /bookings/{id}/assign-driver
{
  "driverId": "drv_001",
  "vehicleId": "veh_001"
}

# 4. Create trip
POST /trips
{
  "bookingId": "bkg_001",
  "driverId": "drv_001",
  "vehicleId": "veh_001"
}
```

### 3. Driver Completes Trip
```http
# 1. Start trip
POST /trips/{id}/start
{
  "startLocation": {...},
  "odometerReading": 45230
}

# 2. Update location (periodic)
PUT /trips/{id}
{
  "currentLocation": {...}
}

# 3. Complete trip
POST /trips/{id}/complete
{
  "completionLocation": {...},
  "deliveryProof": {...}
}
```

### 4. Finance Reconciles Payments
```http
# 1. Run reconciliation
POST /reconciliation/run
{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}

# 2. Get mismatches
GET /reconciliation/mismatches

# 3. Resolve mismatch
POST /reconciliation/mismatches/{id}/resolve
{
  "resolution": "manual_payment_recorded",
  "notes": "..."
}

# 4. Export report
GET /reconciliation/export?format=excel
```

---

## Status Enums

### Booking Status
- `pending` - Awaiting review
- `confirmed` - Approved and driver assigned
- `in_transit` - En route to destination
- `delivered` - Successfully delivered
- `cancelled` - Cancelled
- `on_hold` - Temporarily on hold
- `failed` - Delivery failed

### Trip Status
- `scheduled` - Scheduled for future
- `in_progress` - Currently active
- `completed` - Successfully completed
- `cancelled` - Cancelled

### Payment Status
- `pending` - Awaiting payment
- `completed` - Payment successful
- `failed` - Payment failed
- `refunded` - Payment refunded

### Vehicle Status
- `available` - Ready for assignment
- `on_trip` - Currently on trip
- `maintenance` - Under maintenance
- `inactive` - Not in service

### Driver Status
- `available` - Ready for assignment
- `on_trip` - Currently on trip
- `on_leave` - On leave
- `inactive` - Not active

---

## Pagination
```http
GET /resource?page=1&limit=20&sort=-createdAt
```

**Response:**
```json
{
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

---

## Filtering
```http
GET /bookings?status=pending&startDate=2024-01-01&endDate=2024-01-31
GET /fleet/vehicles?type=refrigerated&status=available
GET /payments?method=card&status=completed
```

---

## Sorting
```http
# Ascending
GET /resource?sort=createdAt,name

# Descending
GET /resource?sort=-createdAt,-amount
```

---

## Error Handling

**Error Response Format:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "statusCode": 400,
    "details": {...}
  },
  "timestamp": "2024-01-31T15:00:00Z",
  "requestId": "req_abc123"
}
```

**Common Error Codes:**
- `AUTH_INVALID_TOKEN` - Invalid or expired token
- `VALIDATION_ERROR` - Validation failed
- `RESOURCE_NOT_FOUND` - Resource not found
- `USER_INSUFFICIENT_PERMISSIONS` - Insufficient permissions
- `RATE_LIMIT_EXCEEDED` - Rate limit exceeded

---

## Rate Limits

**Standard Tier:**
- 500 requests per minute
- 25,000 requests per hour
- 250,000 requests per day

**Headers:**
```http
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 487
X-RateLimit-Reset: 1705318800
```

---

## Webhooks

**Register Webhook:**
```http
POST /webhooks
{
  "url": "https://yourapp.com/webhooks",
  "events": ["booking.created", "trip.completed"],
  "secret": "your_secret"
}
```

**Common Events:**
- `booking.created`
- `booking.confirmed`
- `trip.started`
- `trip.completed`
- `payment.completed`
- `temperature.alert`

---

## Export Reports
```http
GET /reports/fleet?format=excel&startDate=2024-01-01&endDate=2024-01-31
GET /reports/financial?format=pdf&startDate=2024-01-01&endDate=2024-01-31
GET /reconciliation/export?format=csv&status=mismatched
```

---

## Testing

**Test Credentials:**
```
Super Admin:
  Email: admin@daraexpress.com
  Password: Admin123!

Fleet Officer:
  Email: fleet@daraexpress.com
  Password: Fleet123!

Customer:
  Email: customer@example.com
  Password: Customer123!
```

**Test Payment Cards (Paystack):**
```
Success: 4084084084084081
Decline: 4084080000000408
```

---

## Support

- **Email:** api-support@daraexpress.com
- **Documentation:** https://docs.daraexpress.com
- **Status:** https://status.daraexpress.com
- **Slack:** #api-support

---

## Useful Links

- [Full Documentation](./README.md)
- [Authentication Guide](./02-authentication.md)
- [User Roles & Permissions](./14-user-roles.md)
- [Error Codes](./16-error-codes.md)
- [Webhooks Guide](./15-webhooks.md)
- [Changelog](./CHANGELOG.md)
