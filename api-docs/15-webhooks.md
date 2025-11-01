# Webhooks

## Overview
Webhooks allow you to receive real-time notifications when events occur in the Dara Express system. Instead of polling the API, you can subscribe to events and receive HTTP POST requests to your specified endpoint.

---

## 1. Register Webhook
```http
POST /webhooks
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "url": "https://yourapp.com/webhooks/daraexpress",
  "events": [
    "booking.created",
    "booking.confirmed",
    "trip.started",
    "trip.completed",
    "payment.completed"
  ],
  "secret": "your_webhook_secret",
  "active": true
}
```

**Validation Rules:**
- `url`: Required, valid HTTPS URL
- `events`: Required, array of event types (min 1)
- `secret`: Optional, string (recommended for signature verification)
- `active`: Optional, boolean (default: true)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "webhook_001",
    "url": "https://yourapp.com/webhooks/daraexpress",
    "events": ["booking.created", "booking.confirmed"],
    "active": true,
    "createdAt": "2024-01-31T15:00:00Z"
  },
  "message": "Webhook registered successfully"
}
```

**Permissions Required:** `webhook:create` (Super Admin)

---

## 2. Get All Webhooks
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
      "url": "https://yourapp.com/webhooks/daraexpress",
      "events": ["booking.created", "booking.confirmed"],
      "active": true,
      "lastTriggered": "2024-01-31T14:30:00Z",
      "successRate": 98.5,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Permissions Required:** `webhook:read` (Super Admin)

---

## 3. Update Webhook
```http
PUT /webhooks/{webhookId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "url": "https://yourapp.com/webhooks/daraexpress-v2",
  "events": ["booking.created", "trip.completed"],
  "active": true
}
```

**Permissions Required:** `webhook:update` (Super Admin)

---

## 4. Delete Webhook
```http
DELETE /webhooks/{webhookId}
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `webhook:delete` (Super Admin)

---

## 5. Test Webhook
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
    "status": "success",
    "responseCode": 200,
    "responseTime": 245,
    "testedAt": "2024-01-31T15:00:00Z"
  },
  "message": "Webhook test successful"
}
```

**Permissions Required:** `webhook:test` (Super Admin)

---

## 6. Get Webhook Logs
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
      "id": "log_001",
      "webhookId": "webhook_001",
      "event": "booking.created",
      "payload": {
        "bookingId": "BKG-2024-001",
        "status": "pending"
      },
      "status": "success",
      "responseCode": 200,
      "responseTime": 245,
      "attempts": 1,
      "triggeredAt": "2024-01-31T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 342
  }
}
```

**Permissions Required:** `webhook:read_logs` (Super Admin)

---

## 7. Retry Failed Webhook
```http
POST /webhooks/logs/{logId}/retry
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `webhook:retry` (Super Admin)

---

## Event Types

### Booking Events
- `booking.created` - New booking created
- `booking.confirmed` - Booking confirmed by dispatcher
- `booking.cancelled` - Booking cancelled
- `booking.on_hold` - Booking put on hold
- `booking.driver_assigned` - Driver assigned to booking

### Trip Events
- `trip.created` - New trip created
- `trip.started` - Trip started by driver
- `trip.in_progress` - Trip in progress (location updates)
- `trip.completed` - Trip completed successfully
- `trip.cancelled` - Trip cancelled
- `trip.delayed` - Trip delayed beyond threshold

### Payment Events
- `payment.initialized` - Payment initialized
- `payment.completed` - Payment completed successfully
- `payment.failed` - Payment failed
- `payment.refunded` - Payment refunded

### Temperature Events
- `temperature.alert` - Temperature threshold exceeded
- `temperature.critical` - Critical temperature alert
- `temperature.normalized` - Temperature returned to normal

### Driver Events
- `driver.assigned` - Driver assigned to trip
- `driver.on_leave` - Driver marked on leave
- `driver.license_expiring` - Driver license expiring soon

### Vehicle Events
- `vehicle.maintenance_due` - Vehicle maintenance due
- `vehicle.breakdown` - Vehicle breakdown reported

---

## Webhook Payload Format

All webhook payloads follow this structure:

```json
{
  "id": "event_001",
  "event": "booking.created",
  "timestamp": "2024-01-31T15:00:00Z",
  "data": {
    "bookingId": "BKG-2024-001",
    "customerId": "usr_026",
    "status": "pending",
    "amount": 125000,
    "route": "Lagos → Abuja"
  },
  "metadata": {
    "environment": "production",
    "apiVersion": "v1"
  }
}
```

---

## Security

### Signature Verification

Each webhook request includes a signature in the `X-Dara-Signature` header:

```
X-Dara-Signature: sha256=abc123...
```

**Verify signature:**
```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return `sha256=${hash}` === signature;
}
```

### Headers
```http
POST /your-webhook-endpoint
Content-Type: application/json
X-Dara-Signature: sha256=abc123...
X-Dara-Event: booking.created
X-Dara-Delivery: event_001
User-Agent: DaraExpress-Webhook/1.0
```

---

## Retry Policy

- Failed webhooks are retried automatically
- Retry schedule: 1min, 5min, 15min, 1hour, 6hours
- Maximum 5 retry attempts
- Webhook disabled after 10 consecutive failures
- HTTP status codes 2xx considered success
- Timeout: 30 seconds

---

## Best Practices

1. **Respond Quickly**
   - Return 200 OK immediately
   - Process webhook asynchronously

2. **Verify Signatures**
   - Always verify webhook signatures
   - Use constant-time comparison

3. **Handle Duplicates**
   - Use event ID for idempotency
   - Store processed event IDs

4. **Monitor Failures**
   - Set up alerts for failed webhooks
   - Review logs regularly

5. **Use HTTPS**
   - Only HTTPS endpoints accepted
   - Valid SSL certificate required

---

## Example Implementation

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.post('/webhooks/daraexpress', (req, res) => {
  // 1. Verify signature
  const signature = req.headers['x-dara-signature'];
  const secret = process.env.WEBHOOK_SECRET;
  
  if (!verifySignature(req.body, signature, secret)) {
    return res.status(401).send('Invalid signature');
  }
  
  // 2. Respond immediately
  res.status(200).send('OK');
  
  // 3. Process asynchronously
  processWebhook(req.body);
});

async function processWebhook(payload) {
  const { event, data } = payload;
  
  switch (event) {
    case 'booking.created':
      await handleBookingCreated(data);
      break;
    case 'trip.completed':
      await handleTripCompleted(data);
      break;
    // ... handle other events
  }
}
```
