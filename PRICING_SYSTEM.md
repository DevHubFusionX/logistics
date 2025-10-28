# Admin Pricing Management System

## Overview
Complete pricing management system allowing admins to configure global pricing rules, set client-specific overrides, simulate pricing, and track all changes with audit logs.

## Features Implemented

### 1. **Global Pricing Rules Editor** (`/pricing-management`)
- **Editable Fields:**
  - Base Rate per Kg ($)
  - Insurance Rate (%)
  - Handling Fee ($)
  - Tax Rate (%)
  - Service Type Multipliers (Standard, Express, Overnight)

- **Auto-save with confirmation**
- **Last updated by** + timestamp tracking
- **Role-based access control** (Super Admin, Finance Officer only)

### 2. **Client-Specific Pricing Overrides**
- Override global pricing for key clients
- Fields:
  - Client Name
  - Custom Base Rate per Kg
  - Discount Percentage
  - Currency (USD, NGN, EUR)
- CRUD operations (Create, Read, Update, Delete)
- Search functionality

### 3. **Pricing Simulator**
- Test pricing calculations with current rules
- Input: Weight, Service Type
- Output: Complete price breakdown
  - Base Price
  - Service Multiplier
  - Insurance
  - Handling Fee
  - Subtotal
  - Tax
  - Total

### 4. **Audit Log**
- Track all pricing changes
- Shows:
  - User who made the change
  - Action performed
  - Old value → New value
  - Timestamp
  - User role
- Filter by role (Super Admin, Finance Officer)

## Pricing Calculation Flow

```javascript
// 1. Check for client-specific override
const baseRate = clientOverride?.baseRatePerKg || globalRules.baseRatePerKg

// 2. Calculate base price
const basePrice = weight × baseRate

// 3. Apply service multiplier
const serviceMultiplier = {
  standard: 1.0,
  express: 1.5,
  overnight: 2.0
}

// 4. Add insurance and handling
const insurance = basePrice × 0.02
const handling = $25

// 5. Calculate subtotal
let subtotal = (basePrice × serviceMultiplier) + insurance + handling

// 6. Apply client discount (if exists)
if (clientDiscount) {
  subtotal = subtotal - (subtotal × discountRate)
}

// 7. Add tax
const tax = subtotal × 0.08
const total = subtotal + tax
```

## Access Control

### Roles with Edit Permission:
- ✅ Super Admin
- ✅ Finance Officer

### Roles with View-Only:
- ❌ Fleet Manager
- ❌ Operations Staff

## Files Created

### Pages
- `src/pages/PricingManagement.jsx` - Main pricing management page with tabs

### Components
- `src/components/pricing/PricingRulesEditor.jsx` - Global pricing rules editor
- `src/components/pricing/ClientPricingOverrides.jsx` - Client-specific pricing CRUD
- `src/components/pricing/PricingSimulator.jsx` - Price calculator
- `src/components/pricing/AuditLog.jsx` - Change history tracker

### Utilities
- `src/utils/pricingEngine.js` - Centralized pricing calculation engine

## Integration Points

### Booking Flow
The booking quotation page (`src/pages/booking/Quotation.jsx`) now:
1. Uses centralized `calculateQuote()` function
2. Checks for client-specific overrides
3. Shows "Special Client Rate Applied" badge when override exists
4. Displays discount line item if applicable

### Payment System
- Pricing rules automatically reflect in payment calculations
- Invoice generation uses current pricing configuration
- Revenue forecasts update based on pricing changes

## Usage

### Admin Workflow
1. Navigate to **Pricing Rules** in sidebar (under People & Analytics)
2. Edit global pricing rules in **Global Pricing** tab
3. Add client overrides in **Client Overrides** tab
4. Test pricing in **Price Calculator** tab
5. Review changes in **Audit Log** tab

### Client Booking Workflow
1. Client creates booking with weight and service type
2. System checks if client has custom pricing
3. If yes → applies custom rate + discount
4. If no → uses global pricing rules
5. Displays complete quote with breakdown
6. Client proceeds to payment

## Future Enhancements

### Recommended Features:
1. **Distance-based pricing** - Add per-km rates
2. **Route-specific pricing** - Different rates for different routes
3. **Bulk pricing tiers** - Volume discounts (e.g., >1000kg)
4. **Seasonal pricing** - Peak/off-peak rates
5. **API integration** - Real-time fuel surcharge updates
6. **Price approval workflow** - Require approval for large discounts
7. **Export pricing reports** - Excel/PDF export
8. **Price comparison** - Compare quotes across time periods

## API Endpoints (To Be Implemented)

```javascript
// Global Pricing
GET    /api/pricing/rules
PUT    /api/pricing/rules
GET    /api/pricing/history

// Client Overrides
GET    /api/pricing/clients
POST   /api/pricing/clients
PUT    /api/pricing/clients/:id
DELETE /api/pricing/clients/:id

// Calculations
POST   /api/pricing/calculate
POST   /api/pricing/simulate

// Audit
GET    /api/pricing/audit-log
```

## Security Considerations

1. **Role-based access control** - Only authorized roles can edit
2. **Audit logging** - All changes tracked with user + timestamp
3. **Input validation** - Prevent negative values, extreme rates
4. **Change approval** - Optional workflow for large changes
5. **Backup/restore** - Version control for pricing rules

## Testing Checklist

- [ ] Super Admin can edit all pricing rules
- [ ] Finance Officer can edit all pricing rules
- [ ] Fleet Manager sees view-only mode
- [ ] Client override applies correctly in booking
- [ ] Discount calculation is accurate
- [ ] Audit log records all changes
- [ ] Pricing simulator matches actual quotes
- [ ] Currency conversion works (if multi-currency)
- [ ] Tax calculation is correct
- [ ] Service multipliers apply correctly

## Notes

- All pricing values stored in USD by default
- Tax rate is 8% (configurable)
- Insurance is 2% of base price (configurable)
- Handling fee is $25 flat (configurable)
- Client discounts apply to subtotal before tax
- Changes take effect immediately (no caching delay)
