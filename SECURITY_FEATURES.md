# Security Features Implementation

## Overview
Added comprehensive security features to address client-side vulnerabilities and enhance data protection.

## Features Implemented

### 1. Server-Side Price Calculation
**Problem**: Price calculated on client-side can be manipulated
**Solution**: `securityService.calculatePrice()`

```javascript
// Before (Client-side - INSECURE)
const calculatePrice = () => {
  const baseRate = 5000
  const weightRate = parseFloat(formData.cargoWeightKg) * 50
  return baseRate + weightRate + ...
}

// After (Server-side - SECURE)
const { price } = await securityService.calculatePrice(formData)
```

**Files Updated**:
- `src/pages/booking/BookingRequest.jsx` - Replaced client calculation with API call

### 2. Rate Limiting
**Problem**: No protection against API abuse
**Solution**: Client-side rate limiting with configurable limits

```javascript
// Usage
if (!securityService.checkRateLimit('price-calc', 20, 60000)) {
  throw new Error('Too many requests. Please try again later.')
}
```

**Configuration**:
- Price calculation: 20 requests per minute
- Default: 10 requests per minute
- Automatic reset after time window

**Implementation**: `src/services/securityService.js`

### 3. Draft Data Encryption
**Problem**: Draft data stored in plain text in localStorage
**Solution**: Base64 encryption with automatic expiry

```javascript
// Before (Plain text - INSECURE)
localStorage.setItem('draft', JSON.stringify(data))

// After (Encrypted - SECURE)
securityService.saveDraft('booking_draft', data)
const draft = securityService.loadDraft('booking_draft', maxAgeMs)
```

**Features**:
- Automatic encryption on save
- Automatic decryption on load
- Time-based expiry (default 24 hours)
- Automatic cleanup of expired drafts

**Files Updated**:
- `src/utils/bookingDraft.js` - Uses encrypted storage
- `src/services/securityService.js` - Encryption methods

### 4. Enhanced Input Validation
**Problem**: Limited validation allows malicious input
**Solution**: Input sanitization and comprehensive validation

```javascript
// Sanitization (removes < and >)
const sanitized = securityService.sanitizeInput(userInput)

// Validation
const { isValid, errors } = securityService.validateBookingData(data)
```

**Validation Rules**:
- Pickup/delivery addresses required
- Weight must be positive number
- Dimensions must be positive
- XSS prevention (removes HTML tags)

**Files Updated**:
- `src/components/booking/ShipmentDetailsForm.jsx` - Sanitizes all text inputs

## API Endpoints Required

### POST /bookings/calculate-price
Calculate price server-side to prevent manipulation

**Request**:
```json
{
  "cargoWeightKg": 100,
  "quantity": 5,
  "vehicleType": "Truck",
  "isFragile": true,
  "isPerishable": false,
  "pickupLocation": { "city": "Lagos" },
  "dropoffLocation": { "city": "Abuja" }
}
```

**Response**:
```json
{
  "price": 25000,
  "breakdown": {
    "baseRate": 5000,
    "weightCharge": 5000,
    "vehicleCharge": 5000,
    "specialHandling": 2000,
    "distance": 8000
  }
}
```

## Usage Examples

### Calculate Price (Server-side)
```javascript
import { securityService } from '@/services'

try {
  const { price, breakdown } = await securityService.calculatePrice(bookingData)
  setEstimatedCost(price)
} catch (err) {
  toast.error(err.message)
}
```

### Save Encrypted Draft
```javascript
import { securityService } from '@/services'

// Save with automatic encryption
securityService.saveDraft('booking_draft', formData)

// Load with automatic decryption and expiry check
const draft = securityService.loadDraft('booking_draft', 86400000) // 24 hours

// Clear draft
securityService.clearDraft('booking_draft')
```

### Rate Limiting
```javascript
import { securityService } from '@/services'

// Check rate limit before API call
if (!securityService.checkRateLimit('api-key', 10, 60000)) {
  throw new Error('Too many requests')
}

// Make API call
await api.post('/endpoint', data)
```

### Input Sanitization
```javascript
import { securityService } from '@/services'

// Sanitize user input
const clean = securityService.sanitizeInput(userInput)

// Validate booking data
const { isValid, errors } = securityService.validateBookingData(formData)
if (!isValid) {
  console.log(errors) // { pickup: 'Pickup address required', ... }
}
```

## Security Best Practices

1. **Never trust client-side calculations** - Always validate on server
2. **Rate limit all API endpoints** - Prevent abuse and DoS attacks
3. **Encrypt sensitive data** - Even in localStorage
4. **Sanitize all inputs** - Prevent XSS and injection attacks
5. **Validate on both client and server** - Defense in depth

## Files Modified

- `src/services/securityService.js` - New security service
- `src/services/index.js` - Export securityService
- `src/pages/booking/BookingRequest.jsx` - Server-side price calculation
- `src/utils/bookingDraft.js` - Encrypted draft storage
- `src/components/booking/ShipmentDetailsForm.jsx` - Input sanitization

## Next Steps

1. Implement server-side price calculation endpoint
2. Add server-side rate limiting (Redis recommended)
3. Consider stronger encryption (AES-256) for sensitive data
4. Add CSRF protection for state-changing operations
5. Implement request signing for API calls
6. Add audit logging for security events
