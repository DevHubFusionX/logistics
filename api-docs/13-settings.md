# Settings

## 1. Get System Settings
```http
GET /settings
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "general": {
      "companyName": "Dara Express Logistics",
      "email": "info@daraexpress.com",
      "phone": "+234-800-DARA-EXPRESS",
      "address": "123 Logistics Avenue, Lagos, Nigeria",
      "timezone": "Africa/Lagos",
      "currency": "NGN",
      "dateFormat": "DD/MM/YYYY",
      "timeFormat": "24h"
    },
    "business": {
      "operatingHours": {
        "start": "08:00",
        "end": "18:00"
      },
      "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "defaultPaymentTerms": "Net 30",
      "taxRate": 0
    },
    "notifications": {
      "emailEnabled": true,
      "smsEnabled": true,
      "pushEnabled": true
    }
  }
}
```

**Permissions Required:** `settings:read` (Super Admin)

---

## 2. Update System Settings
```http
PUT /settings
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "general": {
    "companyName": "Dara Express Logistics",
    "timezone": "Africa/Lagos"
  },
  "business": {
    "defaultPaymentTerms": "Net 30"
  }
}
```

**Permissions Required:** `settings:update` (Super Admin)

---

## 3. Get Temperature Thresholds
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
      "criticalOffset": 5,
      "active": true
    },
    {
      "id": "thresh_002",
      "productType": "Chilled Foods",
      "minTemp": 0,
      "maxTemp": 5,
      "warningOffset": 2,
      "criticalOffset": 5,
      "active": true
    }
  ]
}
```

**Permissions Required:** `settings:read_temperature` (Fleet Officer, Super Admin)

---

## 4. Update Temperature Threshold
```http
PUT /settings/temperature-thresholds/{thresholdId}
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "minTemp": -20,
  "maxTemp": -15,
  "warningOffset": 2,
  "criticalOffset": 5
}
```

**Permissions Required:** `settings:update_temperature` (Fleet Officer, Super Admin)

---

## 5. Get Notification Settings
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
      "provider": "sendgrid",
      "fromEmail": "noreply@daraexpress.com",
      "fromName": "Dara Express"
    },
    "sms": {
      "enabled": true,
      "provider": "twilio",
      "senderId": "DaraExpress"
    },
    "push": {
      "enabled": true,
      "provider": "firebase"
    },
    "templates": [
      {
        "type": "booking_confirmed",
        "channels": ["email", "sms"],
        "enabled": true
      },
      {
        "type": "trip_started",
        "channels": ["email", "push"],
        "enabled": true
      }
    ]
  }
}
```

**Permissions Required:** `settings:read_notifications` (Super Admin)

---

## 6. Update Notification Settings
```http
PUT /settings/notifications
Headers: Authorization: Bearer {token}
```

**Permissions Required:** `settings:update_notifications` (Super Admin)

---

## 7. Get Integration Settings
```http
GET /settings/integrations
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "paystack": {
      "enabled": true,
      "publicKey": "pk_test_***",
      "webhookUrl": "https://api.daraexpress.com/webhooks/paystack",
      "status": "active"
    },
    "googleMaps": {
      "enabled": true,
      "apiKey": "AIza***",
      "status": "active"
    },
    "twilio": {
      "enabled": true,
      "accountSid": "AC***",
      "status": "active"
    }
  }
}
```

**Permissions Required:** `settings:read_integrations` (Super Admin)

---

## 8. Update Integration Settings
```http
PUT /settings/integrations/{integration}
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "enabled": true,
  "publicKey": "pk_live_***",
  "secretKey": "sk_live_***"
}
```

**Permissions Required:** `settings:update_integrations` (Super Admin)

---

## 9. Test Integration
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
    "status": "success",
    "message": "Connection successful",
    "testedAt": "2024-01-31T15:00:00Z"
  }
}
```

**Permissions Required:** `settings:test_integrations` (Super Admin)

---

## 10. Get Audit Logs
```http
GET /settings/audit-logs
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `userId`: Optional, string
- `action`: Optional, string
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
      "id": "log_001",
      "userId": "usr_001",
      "userName": "Admin User",
      "action": "settings:update",
      "resource": "system_settings",
      "resourceId": "settings_001",
      "changes": {
        "field": "companyName",
        "oldValue": "Dara Express",
        "newValue": "Dara Express Logistics"
      },
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-01-31T15:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1234
  }
}
```

**Permissions Required:** `settings:read_audit_logs` (Super Admin)

---

## 11. Get Pricing Settings
```http
GET /settings/pricing
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "baseFare": {
      "refrigerated": 100000,
      "dry": 80000,
      "tanker": 120000
    },
    "distanceRate": {
      "perKm": 30,
      "minimumDistance": 50
    },
    "temperatureControl": {
      "frozen": 10000,
      "chilled": 5000
    },
    "surcharges": {
      "weekend": 0.1,
      "night": 0.15,
      "express": 0.25
    },
    "discounts": {
      "corporate": 0.1,
      "bulk": 0.15
    }
  }
}
```

**Permissions Required:** `settings:read_pricing` (Finance, Super Admin)

---

## 12. Update Pricing Settings
```http
PUT /settings/pricing
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "baseFare": {
    "refrigerated": 105000
  },
  "distanceRate": {
    "perKm": 32
  }
}
```

**Permissions Required:** `settings:update_pricing` (Finance Manager, Super Admin)

---

## 13. Backup System
```http
POST /settings/backup
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "includeFiles": true,
  "includeDatabase": true,
  "compression": true
}
```

**Permissions Required:** `settings:backup` (Super Admin)

---

## 14. Restore System
```http
POST /settings/restore
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "backupId": "backup_001",
  "restoreFiles": true,
  "restoreDatabase": true
}
```

**Permissions Required:** `settings:restore` (Super Admin)
