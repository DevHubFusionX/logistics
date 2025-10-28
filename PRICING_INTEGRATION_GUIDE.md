# Pricing System Integration Guide

## ✅ Integration Complete

The pricing management system is now fully integrated with the booking flow. Here's how it works:

## How It Works

### 1. Admin Updates Pricing Rules
**Location:** `/pricing-management`

Admin can:
- Edit global pricing rules (base rate, insurance, handling, tax, multipliers)
- Add/edit/delete client-specific overrides
- Test pricing with the simulator
- View audit log of all changes

**Changes take effect immediately** - no restart or cache clearing needed.

---

### 2. Client Creates Booking
**Location:** `/booking/request`

When a client fills out the booking form:
1. System captures customer email
2. Checks if email matches a client with custom pricing
3. Passes `clientId` to quotation page

**Client Identification Logic:**
```javascript
// In BookingRequest.jsx
const clientId = formData.customerEmail.toLowerCase().includes('adebayo') ? 'adebayo-industries' :
                 formData.customerEmail.toLowerCase().includes('kano') ? 'kano-distribution' : null
```

---

### 3. System Generates Quote
**Location:** `/booking/quotation`

The quotation page:
1. Calls `calculateQuote(bookingData, clientId)` from pricing engine
2. Engine checks if client has custom pricing override
3. If yes → uses custom rate + applies discount
4. If no → uses global pricing rules
5. Returns complete price breakdown

**Quote Display:**
- Shows "Special Client Rate Applied" badge if override exists
- Displays client name, custom rate, and discount percentage
- Shows detailed breakdown: base price, service multiplier, insurance, handling, discount, tax, total

---

### 4. Client Proceeds to Payment
**Location:** `/booking/payment`

Payment page receives the calculated quote and displays:
- Order summary with booking details
- Final total amount
- Payment method selection
- Secure payment processing

---

## Testing the Integration

### Test Case 1: Regular Client (No Override)
1. Go to `/booking/request`
2. Fill form with email: `john@example.com`
3. Weight: 100 kg, Service: Standard
4. Expected quote:
   - Base: $250 (100 × $2.50)
   - Insurance: $5 (2%)
   - Handling: $25
   - Subtotal: $280
   - Tax: $22.40 (8%)
   - **Total: $302.40**

### Test Case 2: Client with Override (Adebayo Industries)
1. Go to `/booking/request`
2. Fill form with email: `contact@adebayo.com`
3. Weight: 100 kg, Service: Standard
4. Expected quote:
   - Base: $220 (100 × $2.20) ← Custom rate
   - Insurance: $4.40 (2%)
   - Handling: $25
   - Subtotal before discount: $249.40
   - Discount: $24.94 (10%) ← Client discount
   - Subtotal: $224.46
   - Tax: $17.96 (8%)
   - **Total: $242.42**
   - Shows "Special Client Rate Applied" badge

### Test Case 3: Admin Changes Pricing
1. Go to `/pricing-management`
2. Change base rate from $2.50 to $3.00
3. Click "Save Changes"
4. Create new booking (Test Case 1)
5. Expected quote:
   - Base: $300 (100 × $3.00) ← New rate applied
   - Total will be higher

---

## Client Override Management

### Adding New Client Override
1. Go to `/pricing-management` → "Client Overrides" tab
2. Click "Add Override"
3. Fill in:
   - Client Name: "New Company Ltd"
   - Base Rate per Kg: 2.10
   - Discount: 15
   - Currency: USD
4. Click "Create"

### Using the Override in Booking
Update `BookingRequest.jsx` to identify the client:
```javascript
const clientId = formData.customerEmail.toLowerCase().includes('newcompany') ? 'new-company-ltd' : ...
```

Or implement a proper client lookup system with API.

---

## Pricing Engine API

### Calculate Quote
```javascript
import { calculateQuote } from '../utils/pricingEngine'

const quote = calculateQuote(bookingData, clientId)
// Returns: { basePrice, serviceMultiplier, insurance, handling, 
//           discount, subtotal, tax, total, hasClientOverride, ... }
```

### Get Pricing Rules
```javascript
import { getPricingRules } from '../utils/pricingEngine'

const rules = getPricingRules()
// Returns: { baseRatePerKg, serviceMultipliers, insuranceRate, 
//           handlingFee, taxRate, currency, ... }
```

### Update Pricing Rules
```javascript
import { updatePricingRules } from '../utils/pricingEngine'

const newRules = {
  baseRatePerKg: 3.00,
  handlingFee: 30
}
updatePricingRules(newRules, 'admin@daraexpress.com')
```

### Manage Client Overrides
```javascript
import { 
  getClientOverrides, 
  addClientOverride, 
  updateClientOverride, 
  deleteClientOverride 
} from '../utils/pricingEngine'

// Get all overrides
const clients = getClientOverrides()

// Add new override
addClientOverride({
  name: 'New Client',
  baseRatePerKg: 2.10,
  discount: 0.15,
  currency: 'USD'
})

// Update existing
updateClientOverride('client-id', { discount: 0.20 })

// Delete
deleteClientOverride('client-id')
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN UPDATES PRICING                     │
│                  /pricing-management                         │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │ Global Rules │    │   Client     │    │   Pricing    │ │
│  │   Editor     │───▶│  Overrides   │───▶│   Engine     │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  pricingEngine.js│
                    │  (Single Source  │
                    │   of Truth)      │
                    └──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   CLIENT CREATES BOOKING                     │
│                   /booking/request                           │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │ Booking Form │───▶│   Identify   │───▶│  Quotation   │ │
│  │              │    │   Client     │    │    Page      │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                  │           │
│                                                  ▼           │
│                                        ┌──────────────────┐ │
│                                        │ calculateQuote() │ │
│                                        │  - Check client  │ │
│                                        │  - Apply rules   │ │
│                                        │  - Return quote  │ │
│                                        └──────────────────┘ │
│                                                  │           │
│                                                  ▼           │
│                                        ┌──────────────────┐ │
│                                        │  Payment Page    │ │
│                                        │  Process Payment │ │
│                                        └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Features

✅ **Real-time Updates** - Changes apply immediately to new bookings
✅ **Client-Specific Pricing** - Override global rules for key clients
✅ **Automatic Discounts** - Apply percentage discounts to subtotal
✅ **Transparent Pricing** - Show detailed breakdown to clients
✅ **Audit Trail** - Track all pricing changes with user and timestamp
✅ **Role-Based Access** - Only Super Admin and Finance Officer can edit
✅ **Price Simulator** - Test pricing before applying changes
✅ **Centralized Engine** - Single source of truth for all calculations

---

## Next Steps

### For Production:
1. **Replace in-memory storage with database**
   - Store pricing rules in database
   - Store client overrides in database
   - Store audit log in database

2. **Add API endpoints**
   - `GET /api/pricing/rules`
   - `PUT /api/pricing/rules`
   - `GET /api/pricing/clients`
   - `POST /api/pricing/clients`
   - `PUT /api/pricing/clients/:id`
   - `DELETE /api/pricing/clients/:id`

3. **Implement proper client lookup**
   - Replace email matching with database lookup
   - Use client ID from authentication system
   - Support multiple contact emails per client

4. **Add validation**
   - Prevent negative values
   - Set min/max limits for rates
   - Require approval for large changes

5. **Add notifications**
   - Email admins when pricing changes
   - Notify clients of custom pricing
   - Alert on unusual quote amounts

---

## Troubleshooting

### Quote not showing client override
- Check if email matches in `BookingRequest.jsx`
- Verify client override exists in pricing engine
- Check browser console for errors

### Pricing changes not applying
- Ensure you clicked "Save Changes"
- Check if user has edit permissions
- Verify pricing engine is imported correctly

### Discount not calculating correctly
- Discount applies to subtotal (before tax)
- Discount is stored as decimal (0.10 = 10%)
- Check discount percentage in client override

---

## Support

For issues or questions:
1. Check browser console for errors
2. Review audit log for recent changes
3. Test with pricing simulator
4. Verify client override configuration
