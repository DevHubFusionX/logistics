# API Documentation File Structure

## Overview
The API documentation has been split into 15 focused files for better organization and maintainability.

## File Structure

```
api-docs/
├── README.md                          # Main entry point with quick links
├── FILE_STRUCTURE.md                  # This file
├── 01-getting-started.md              # API overview, quick start
├── 02-authentication.md               # Login, tokens, 2FA, password reset
├── 03-dashboard.md                    # Dashboard endpoints
├── 04-fleet-management.md             # Vehicles, maintenance, telemetry
├── 05-temperature-monitoring.md       # Temperature data, alerts, compliance
├── 06-clients-orders.md               # Clients, orders, shipments
├── 07-drivers-staff.md                # Drivers, performance, documents
├── 08-trips-management.md             # Trips CRUD, tracking, timeline
├── 09-payments-invoicing.md           # Payments, invoices, Paystack
├── 10-reports-analytics.md            # All reports and analytics
├── 11-settings.md                     # System, integrations, notifications
├── 12-user-roles.md                   # Users, roles, permissions
├── 13-webhooks.md                     # Webhook configuration and events
├── 14-error-codes.md                  # Error codes and formats
└── 15-rate-limiting.md                # Rate limits and best practices
```

## File Contents

### 01-getting-started.md
- API Overview
- Base URLs
- Request/Response formats
- Pagination
- Quick start guide

### 02-authentication.md
- Login/Logout
- Token refresh
- Password reset
- 2FA setup
- Email verification

### 03-dashboard.md
- Dashboard summary
- Real-time statistics
- KPIs

### 04-fleet-management.md
- Get/Create/Update/Delete vehicles
- Vehicle telemetry
- Maintenance alerts
- Trip history

### 05-temperature-monitoring.md
- Temperature data
- Temperature history
- Alerts management
- Compliance reports
- Thresholds

### 06-clients-orders.md
- Client CRUD operations
- Client details
- Shipments
- Payment history
- Order creation

### 07-drivers-staff.md
- Driver CRUD operations
- Driver performance
- Trip history
- Leave management
- Document uploads

### 08-trips-management.md
- Trip CRUD operations
- Trip tracking
- Timeline
- Documents generation
- Analytics

### 09-payments-invoicing.md
- Payment CRUD operations
- Invoice generation
- Paystack integration
- Revenue data
- Outstanding payments

### 10-reports-analytics.md
- Revenue reports
- Trip performance
- Fleet utilization
- Driver performance
- Client analytics
- Temperature compliance
- Financial reports
- Export functionality

### 11-settings.md
- System settings
- Temperature thresholds
- Integration settings
- Notification settings
- Audit logs
- Backup/restore

### 12-user-roles.md
- User CRUD operations
- Role management
- Permissions
- Activity logs
- Sessions
- Bulk operations

### 13-webhooks.md
- Webhook registration
- Event types
- Security/signatures
- Retry policy
- Webhook logs

### 14-error-codes.md
- HTTP status codes
- Application error codes
- Error response formats
- Validation errors

### 15-rate-limiting.md
- Rate limit tiers
- Headers
- Best practices
- Endpoint-specific limits

## Benefits of This Structure

1. **Easy Navigation** - Find specific endpoints quickly
2. **Maintainability** - Update individual sections without affecting others
3. **Version Control** - Track changes per module
4. **Team Collaboration** - Multiple developers can work on different files
5. **Documentation Size** - Each file is manageable (< 1000 lines)
6. **Loading Performance** - Faster to load and search individual files

## Usage

### For Backend Developers
1. Start with `README.md` for overview
2. Read `01-getting-started.md` for basics
3. Navigate to specific module files as needed
4. Reference `14-error-codes.md` and `15-rate-limiting.md` frequently

### For Frontend Developers
1. Focus on `02-authentication.md` first
2. Use module-specific files for features you're implementing
3. Check `13-webhooks.md` for real-time updates

### For Integration
1. Review `01-getting-started.md`
2. Implement authentication from `02-authentication.md`
3. Set up webhooks from `13-webhooks.md`
4. Integrate specific modules as needed

## Maintenance

When updating documentation:
1. Update the specific module file
2. Keep README.md links current
3. Update version numbers in all files
4. Document breaking changes in changelog

## Next Steps

The original `API_ENDPOINTS.md` file contains all the detailed content.
To complete the split:

1. Extract authentication section → `02-authentication.md`
2. Extract dashboard section → `03-dashboard.md`
3. Extract fleet section → `04-fleet-management.md`
4. Continue for all 15 files...

Each file should include:
- Module overview
- All endpoints with full details
- Request/response examples
- Validation rules
- Error responses
- Permissions required
