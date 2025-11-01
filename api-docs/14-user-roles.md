# User Roles & Access Control

## Role Definitions

### 1. Super Admin
**Full system access with all permissions**

**Permissions:**
- All permissions across all modules
- User management (create, update, delete, assign roles)
- System settings and configuration
- Audit logs and security settings
- Financial reconciliation and reports
- Override capabilities

**Navigation Access:**
- Dashboard
- Fleet Management
- Temperature Monitoring
- Bookings (all)
- Clients & Orders
- Drivers & Staff
- Trips Management
- Payments & Invoicing
- Reconciliation
- Reports & Analytics
- Settings
- User Management

---

### 2. Fleet Officer
**Manages fleet operations, vehicles, and maintenance**

**Permissions:**
- `fleet:read`, `fleet:create`, `fleet:update`, `fleet:delete`
- `fleet:maintenance`, `fleet:telemetry`
- `driver:read`, `driver:create`, `driver:update`
- `driver:assign`, `driver:performance`
- `temperature:read`, `temperature:alerts`
- `reports:fleet`, `reports:driver`, `reports:temperature`

**Navigation Access:**
- Dashboard (fleet-focused)
- Fleet Management (full access)
- Temperature Monitoring (read-only)
- Drivers & Staff (full access)
- Reports (fleet, driver, temperature)

**Restrictions:**
- Cannot access financial data
- Cannot manage bookings or clients
- Cannot access reconciliation
- Cannot modify system settings

---

### 3. Dispatcher
**Manages bookings, assigns drivers, coordinates trips**

**Permissions:**
- `booking:read_all`, `booking:update_status`, `booking:assign_driver`
- `trip:read`, `trip:create`, `trip:update`, `trip:assign`
- `driver:read`, `driver:assign`
- `fleet:read` (view only)
- `client:read`
- `reports:trip`, `reports:booking`

**Navigation Access:**
- Dashboard (operations-focused)
- Bookings (manage, assign, cannot create)
- Trips Management (full access)
- Drivers (view and assign)
- Fleet (view only)
- Reports (trip, booking)

**Restrictions:**
- Cannot create new bookings (Support/Admin only)
- Cannot access financial modules
- Cannot manage fleet or maintenance
- Cannot access reconciliation
- Cannot modify pricing

---

### 4. Finance
**Manages payments, invoicing, and financial reconciliation**

**Permissions:**
- `payment:read`, `payment:create`, `payment:update`, `payment:verify`
- `invoice:read`, `invoice:create`, `invoice:send`
- `reconciliation:read`, `reconciliation:resolve`, `reconciliation:run`, `reconciliation:export`
- `pricing:read`, `pricing:update`
- `reports:financial`, `reports:revenue`, `reports:payment`
- `client:read` (financial data only)

**Navigation Access:**
- Dashboard (financial-focused)
- Payments & Invoicing (full access)
- Reconciliation (full access)
- Pricing Management
- Reports (financial, revenue, payment)
- Clients (payment history only)

**Restrictions:**
- Cannot manage fleet or drivers
- Cannot create or manage bookings
- Cannot assign trips
- Cannot access temperature monitoring
- Cannot manage users

---

### 5. Support
**Customer support, booking creation, issue resolution**

**Permissions:**
- `booking:read_all`, `booking:create`, `booking:update_status`, `booking:cancel`
- `client:read`, `client:create`, `client:update`
- `trip:read`, `trip:track`
- `payment:read`, `payment:verify`
- `invoice:read`, `invoice:send`
- `driver:read` (contact info only)
- `fleet:read` (basic info only)

**Navigation Access:**
- Dashboard (support-focused)
- Bookings (full access including create)
- Clients & Orders (full access)
- Tracking & Status
- Payments (view and verify)
- Invoices (view and send)

**Restrictions:**
- Cannot assign drivers or vehicles
- Cannot manage fleet or maintenance
- Cannot access reconciliation
- Cannot modify pricing
- Cannot access system settings
- Cannot manage users

---

### 6. Customer
**Self-service portal for booking and tracking**

**Permissions:**
- `booking:create`, `booking:read_own`, `booking:cancel` (before confirmed)
- `booking:track`, `booking:read_invoice`
- `payment:create`, `payment:read_own`
- `address:read_own`, `address:create`, `address:update`, `address:delete`
- `profile:read`, `profile:update`

**Navigation Access:**
- My Dashboard (personal KPIs)
- Create Booking
- My Bookings
- Track Shipments
- Make Payments
- My Invoices
- Address Book
- Booking Status Guide
- Profile Settings

**Restrictions:**
- Can only view own bookings and data
- Cannot access staff modules
- Cannot view other customers' data
- Cannot assign drivers or vehicles
- Cannot access reports or analytics
- Cannot modify pricing
- Driver info visible only when booking confirmed/in-transit

---

## API Endpoints

### 1. Get All Users
```http
GET /users
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `role`: Optional, enum: `Super Admin|Fleet Officer|Dispatcher|Finance|Support|Customer`
- `status`: Optional, enum: `active|inactive|suspended`
- `search`: Optional, string (searches name, email)
- `department`: Optional, string
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
      "name": "Admin User",
      "email": "admin@daraexpress.com",
      "phone": "+234-801-234-5678",
      "role": "Super Admin",
      "status": "active",
      "department": "Administration",
      "avatar": "https://cdn.daraexpress.com/avatars/usr_001.jpg",
      "lastLogin": "2024-01-31T10:30:00Z",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

**Permissions Required:** `user:read` (Super Admin)

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
    "id": "usr_002",
    "userId": "USR-002",
    "name": "Sarah Johnson",
    "email": "sarah@daraexpress.com",
    "phone": "+234-802-345-6789",
    "role": "Fleet Officer",
    "status": "active",
    "department": "Fleet Operations",
    "permissions": [
      "fleet:read",
      "fleet:create",
      "fleet:update",
      "driver:read",
      "driver:create"
    ],
    "avatar": "https://cdn.daraexpress.com/avatars/usr_002.jpg",
    "lastLogin": "2024-01-31T09:15:00Z",
    "loginCount": 342,
    "createdAt": "2023-03-15T00:00:00Z",
    "createdBy": "usr_001"
  }
}
```

**Permissions Required:** `user:read` (Super Admin) or own profile

---

### 3. Create User
```http
POST /users
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@daraexpress.com",
  "phone": "+234-803-456-7890",
  "password": "SecurePass123!",
  "role": "Dispatcher",
  "department": "Operations",
  "status": "active"
}
```

**Validation Rules:**
- `name`: Required, min 2, max 100 chars
- `email`: Required, valid email, unique
- `phone`: Optional, valid phone format
- `password`: Required, min 8 chars, strong password
- `role`: Required, enum: `Super Admin|Fleet Officer|Dispatcher|Finance|Support|Customer`
- `department`: Optional, string, max 100 chars
- `status`: Optional, enum: `active|inactive` (default: `active`)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "usr_026",
    "userId": "USR-026",
    "name": "John Doe",
    "email": "john@daraexpress.com",
    "role": "Dispatcher",
    "status": "active",
    "createdAt": "2024-01-31T14:30:00Z"
  },
  "message": "User created successfully. Verification email sent."
}
```

**Permissions Required:** `user:create` (Super Admin)

---

### 4. Update User
```http
PUT /users/{userId}
Headers: Authorization: Bearer {token}
```

**Request Body:** (All fields optional)
```json
{
  "name": "John Doe Updated",
  "phone": "+234-803-456-7890",
  "department": "Logistics",
  "status": "active"
}
```

**Permissions Required:** `user:update` (Super Admin) or own profile (limited fields)

---

### 5. Update User Role
```http
PATCH /users/{userId}/role
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "role": "Finance",
  "reason": "Promoted to Finance Manager",
  "effectiveDate": "2024-02-01T00:00:00Z"
}
```

**Permissions Required:** `user:update_role` (Super Admin only)

---

### 6. Deactivate User
```http
POST /users/{userId}/deactivate
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "reason": "Employee resigned",
  "revokeAccess": true
}
```

**Permissions Required:** `user:deactivate` (Super Admin)

---

### 7. Get User Permissions
```http
GET /users/{userId}/permissions
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_002",
    "role": "Fleet Officer",
    "permissions": [
      "fleet:read",
      "fleet:create",
      "fleet:update",
      "fleet:delete",
      "fleet:maintenance",
      "driver:read",
      "driver:create",
      "driver:update",
      "temperature:read",
      "reports:fleet"
    ],
    "restrictions": [
      "Cannot access financial data",
      "Cannot manage bookings",
      "Cannot access reconciliation"
    ]
  }
}
```

---

### 8. Get User Activity Log
```http
GET /users/{userId}/activity
Headers: Authorization: Bearer {token}
```

**Query Parameters:**
- `startDate`: Optional, ISO date
- `endDate`: Optional, ISO date
- `action`: Optional, string
- `page`: Optional, number
- `limit`: Optional, number

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "act_001",
      "userId": "usr_002",
      "action": "fleet:update",
      "resource": "Vehicle DRA-017",
      "resourceId": "veh_001",
      "details": {
        "field": "status",
        "oldValue": "available",
        "newValue": "maintenance"
      },
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-01-31T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 342
  }
}
```

**Permissions Required:** `user:read_activity` (Super Admin) or own activity

---

### 9. Get Role Definitions
```http
GET /roles
Headers: Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "role": "Super Admin",
      "description": "Full system access with all permissions",
      "permissions": ["all"],
      "userCount": 2,
      "canAssign": false
    },
    {
      "role": "Fleet Officer",
      "description": "Manages fleet operations, vehicles, and maintenance",
      "permissions": [
        "fleet:read",
        "fleet:create",
        "fleet:update",
        "driver:read",
        "temperature:read"
      ],
      "userCount": 5,
      "canAssign": true
    }
  ]
}
```

---

### 10. Check Permission
```http
POST /users/check-permission
Headers: Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "userId": "usr_002",
  "permission": "fleet:update"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "hasPermission": true,
    "role": "Fleet Officer",
    "permission": "fleet:update"
  }
}
```

---

## Permission Matrix

| Module | Super Admin | Fleet Officer | Dispatcher | Finance | Support | Customer |
|--------|-------------|---------------|------------|---------|---------|----------|
| **Dashboard** | Full | Fleet-focused | Ops-focused | Finance-focused | Support-focused | Personal |
| **Fleet Management** | Full | Full | Read | None | Read (basic) | None |
| **Temperature** | Full | Full | None | None | None | None |
| **Bookings** | Full | None | Manage (no create) | Read | Full | Own only |
| **Clients** | Full | None | Read | Read (financial) | Full | None |
| **Drivers** | Full | Full | Read/Assign | None | Read (contact) | None |
| **Trips** | Full | None | Full | Read | Read/Track | Track own |
| **Payments** | Full | None | None | Full | Read/Verify | Own only |
| **Reconciliation** | Full | None | None | Full | None | None |
| **Reports** | Full | Fleet/Driver | Trip/Booking | Financial | None | None |
| **Settings** | Full | None | None | None | None | Profile |
| **Users** | Full | None | None | None | None | None |

---

## Role-Based Navigation

Navigation items are filtered based on user role using the `roles` array:

```javascript
{
  name: 'Fleet Management',
  path: '/fleet',
  icon: Truck,
  roles: ['Super Admin', 'Fleet Officer']
}
```

Users only see navigation items where their role is included in the `roles` array.
