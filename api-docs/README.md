# Dara Express Logistics - API Documentation v2.0

## 🚀 Quick Links
- [Getting Started](./01-getting-started.md) - API basics and quick start
- [Quick Reference](./QUICK_REFERENCE.md) - Fast access to common endpoints
- [Changelog](./CHANGELOG.md) - What's new in v2.0

## 📚 Core Documentation

### Authentication & Users
- [Authentication](./02-authentication.md) - Login, tokens, 2FA, password management
- [User Roles & Access Control](./14-user-roles.md) - 6 roles, permissions, RBAC

### Operations
- [Dashboard](./03-dashboard.md) - Real-time statistics and KPIs
- [Bookings](./06-bookings.md) - Customer bookings, tracking, status management ⭐ NEW
- [Trips Management](./09-trips-management.md) - Trip lifecycle, tracking, completion
- [Clients & Orders](./07-clients-orders.md) - Client management and analytics

### Fleet & Drivers
- [Fleet Management](./04-fleet-management.md) - Vehicles, maintenance, telemetry
- [Drivers & Staff](./08-drivers-staff.md) - Driver management and performance
- [Temperature Monitoring](./05-temperature-monitoring.md) - Cold chain compliance

### Financial
- [Payments & Invoicing](./10-payments-invoicing.md) - Payments, invoices, Paystack
- [Reconciliation](./11-reconciliation.md) - Financial reconciliation and verification ⭐ NEW

### Analytics & Configuration
- [Reports & Analytics](./12-reports-analytics.md) - Comprehensive reporting
- [Settings](./13-settings.md) - System configuration and integrations
- [Webhooks](./15-webhooks.md) - Real-time event notifications

### Reference
- [Error Codes](./16-error-codes.md) - Complete error code reference
- [Rate Limiting](./17-rate-limiting.md) - Rate limits and best practices

## 🌐 Base URL
```
Production: https://api.daraexpress.com/v1
Staging: https://staging-api.daraexpress.com/v1
Development: http://localhost:8000/api/v1
```

## 🎯 What's New in v2.0

### New Features
- ✅ **Customer Self-Service Portal** - Complete booking and tracking system
- ✅ **Financial Reconciliation** - Automated booking-trip-payment matching
- ✅ **Role-Based Access Control** - 6 user roles with granular permissions
- ✅ **Enhanced Webhooks** - 20+ event types for real-time notifications
- ✅ **Comprehensive Reporting** - Fleet, financial, and performance analytics

### 6 User Roles
1. **Super Admin** - Full system access
2. **Fleet Officer** - Fleet and driver management
3. **Dispatcher** - Trip coordination and booking management
4. **Finance** - Financial operations and reconciliation
5. **Support** - Customer support and booking creation
6. **Customer** - Self-service booking and tracking

### 100+ API Endpoints
- Authentication & Users: 20 endpoints
- Operations (Bookings, Trips): 21 endpoints
- Fleet & Drivers: 19 endpoints
- Financial (Payments, Reconciliation): 24 endpoints
- Reports & Settings: 24 endpoints
- Webhooks & Integration: 7 endpoints

## 🚦 Quick Start

### 1. Authentication
```bash
curl -X POST https://api.daraexpress.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "SecurePass123!"}'
```

### 2. Create Booking (Customer)
```bash
curl -X POST https://api.daraexpress.com/v1/bookings \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"pickupAddress": {...}, "deliveryAddress": {...}, "cargoDetails": {...}}'
```

### 3. Track Shipment
```bash
curl -X GET https://api.daraexpress.com/v1/bookings/{id}/track \
  -H "Authorization: Bearer {token}"
```

## 🔐 Security

- **Authentication:** JWT tokens with refresh mechanism
- **Authorization:** Role-based access control (RBAC)
- **Encryption:** HTTPS only, TLS 1.2+
- **Rate Limiting:** Tiered limits based on subscription
- **Webhooks:** HMAC signature verification
- **Audit Logs:** Complete activity tracking

## 🎨 Key Features

### For Customers
- Self-service booking creation
- Real-time shipment tracking
- Online payment processing
- Invoice viewing and download
- Address book management

### For Operations
- Booking management and assignment
- Driver and vehicle coordination
- Trip tracking and completion
- Temperature monitoring
- Fleet maintenance scheduling

### For Finance
- Payment processing and verification
- Invoice generation and management
- Financial reconciliation
- Revenue reporting
- Outstanding payment tracking

### For Management
- Comprehensive analytics
- Performance reporting
- System configuration
- User management
- Audit logging

## 📞 Support
- **Email:** api-support@daraexpress.com
- **Documentation:** https://docs.daraexpress.com
- **Status Page:** https://status.daraexpress.com
- **Slack:** #api-support

## 📄 License
Proprietary - Dara Express Logistics © 2024

---

**Last Updated:** January 31, 2024  
**API Version:** v1.0.0  
**Documentation Version:** v2.0
