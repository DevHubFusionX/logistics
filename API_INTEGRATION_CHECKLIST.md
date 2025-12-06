# API Integration Checklist - Week 1 Priority

## ✅ Frontend Ready - Backend Needed

### 1. Receipt PDF Download
**Status**: Frontend complete, needs backend endpoints

**Endpoints Required**:
```
GET /payments/:paymentId/receipt
- Returns receipt data for PDF generation
- Response: { paymentId, amount, date, bookingId, method, status }

POST /payments/:paymentId/email-receipt
- Emails receipt to customer
- Body: { email }
- Response: { success: true, message: "Receipt sent" }
```

**Frontend Files**:
- `src/components/payments/ReceiptDownload.jsx`
- `src/services/paymentService.js` - downloadReceipt(), emailReceipt()
- `src/services/pdfService.js` - generateReceipt()

---

### 2. Email Confirmation Service
**Status**: Frontend complete, needs backend email service

**Endpoints Required**:
```
POST /notifications/email/booking-confirmation
- Body: { bookingId, email, customerName, pickupAddress, deliveryAddress, estimatedCost }
- Response: { success: true }

POST /notifications/email/payment-confirmation
- Body: { paymentId, email, amount, bookingId }
- Response: { success: true }

POST /notifications/sms/booking-confirmation
- Body: { phone, bookingId, trackingNumber }
- Response: { success: true }
```

**Frontend Files**:
- `src/services/notificationService.js`
- `src/pages/booking/Confirmation.jsx` (auto-sends on mount)

**Integration Point**:
```javascript
// Already integrated in Confirmation.jsx
useEffect(() => {
  if (bookingId) {
    notificationService.sendBookingConfirmationEmail(...)
    notificationService.sendBookingConfirmationSMS(...)
  }
}, [bookingId])
```

---

### 3. Booking Modification UI
**Status**: Frontend complete, needs backend update endpoint

**Endpoints Required**:
```
PATCH /bookings/:id
- Body: { pickupDate?, deliveryDate?, notes?, packageDetails? }
- Response: { success: true, booking: {...} }

GET /bookings/:id
- Returns full booking details for editing
- Response: { booking: {...} }
```

**Frontend Files**:
- `src/components/bookings/BookingModification.jsx`
- `src/services/bookingService.js` - updateBooking()
- `src/pages/MyBookings.jsx` (integrated)

**Usage**:
```javascript
// Already integrated in MyBookings.jsx
<BookingModification
  booking={editBooking}
  onSuccess={() => refetch()}
  onClose={() => setEditBooking(null)}
/>
```

---

### 4. Wallet/Bank Transfer Flows
**Status**: Frontend complete, needs backend payment endpoints

**Endpoints Required**:
```
POST /payments/wallet
- Body: { bookingId, amount, walletId }
- Response: { success: true, transactionId, newBalance }

POST /payments/bank-transfer/upload-proof
- Body: FormData with file + { bookingId, amount, bankName, accountNumber }
- Response: { success: true, proofId, status: "pending_verification" }

GET /payments/wallet/balance
- Returns current wallet balance
- Response: { balance: 50000, currency: "NGN" }
```

**Frontend Files**:
- `src/components/payments/WalletPayment.jsx`
- `src/components/payments/BankTransferComplete.jsx`
- `src/services/paymentService.js` - payWithWallet()
- `src/services/uploadService.js` - uploadPaymentProof()

---

### 5. Server-Side Price Validation
**Status**: Frontend complete, CRITICAL backend endpoint needed

**Endpoints Required**:
```
POST /bookings/calculate-price
- Body: {
    cargoWeightKg: number,
    quantity: number,
    vehicleType: string,
    isFragile: boolean,
    isPerishable: boolean,
    pickupLocation: { city, state },
    dropoffLocation: { city, state }
  }
- Response: {
    price: number,
    breakdown: {
      baseRate: number,
      weightCharge: number,
      vehicleCharge: number,
      specialHandling: number,
      distanceCharge: number
    }
  }
```

**Frontend Files**:
- `src/services/securityService.js` - calculatePrice()
- `src/pages/booking/BookingRequest.jsx` (integrated)

**Integration Point**:
```javascript
// Already integrated in BookingRequest.jsx
const handleNext = async (e) => {
  e.preventDefault()
  const { price } = await securityService.calculatePrice(formData)
  setEstimatedCost(price)
  setStep(2)
}
```

---

## 🔧 Additional Endpoints (Already Frontend Ready)

### Booking Cancellation
```
PATCH /bookings/cancel/:id
- Body: { reason: string }
- Response: { success: true, refundAmount?: number }
```
**File**: `src/components/bookings/BookingCancellation.jsx`

### Multi-Stop Booking
```
POST /bookings/multi-stop
- Body: { ...bookingData, stops: [{ address, city, state, sequence }] }
- Response: { bookingId, totalCost }
```
**File**: `src/components/bookings/MultiStopBooking.jsx`

### Recurring Booking
```
POST /bookings/recurring
- Body: { ...bookingData, schedule: { frequency, startDate, endDate, daysOfWeek } }
- Response: { recurringId, bookingIds: [] }
```
**File**: `src/components/bookings/RecurringBooking.jsx`

### Invoice Generation
```
GET /payments/:paymentId/invoice
- Returns invoice data
- Response: { invoiceNumber, items, subtotal, tax, total }
```
**File**: `src/components/payments/InvoiceGenerator.jsx`

### Refund Request
```
POST /payments/:paymentId/refund
- Body: { reason, amount?, bankDetails }
- Response: { refundId, status: "pending", estimatedDays: 7 }
```
**File**: `src/components/payments/RefundRequest.jsx`

---

## 📦 Testing Checklist

### Before API Integration
- [x] All components render without errors
- [x] Form validations work
- [x] File uploads have proper validation
- [x] PDF generation works client-side
- [x] Rate limiting prevents spam
- [x] Draft encryption works
- [x] Input sanitization active

### After API Integration
- [ ] Receipt download returns valid PDF
- [ ] Email confirmations arrive
- [ ] Booking modifications save correctly
- [ ] Wallet payments deduct balance
- [ ] Bank transfer proof uploads successfully
- [ ] Server price matches client expectations
- [ ] Error messages display properly
- [ ] Loading states work correctly

---

## 🚀 Quick Start for Backend Team

### 1. Install Dependencies
```bash
# For PDF generation
npm install pdfkit

# For email
npm install nodemailer

# For SMS
npm install twilio

# For file uploads
npm install multer
```

### 2. Priority Order
1. **POST /bookings/calculate-price** (CRITICAL - security issue)
2. **POST /notifications/email/booking-confirmation** (user experience)
3. **PATCH /bookings/:id** (booking modification)
4. **POST /payments/wallet** (payment flow)
5. **GET /payments/:paymentId/receipt** (receipt download)

### 3. Test with Frontend
All frontend code is ready. Just start backend server and update:
```javascript
// src/services/httpClient.js
const BASE_URL = 'http://localhost:3000/api' // Update to your backend URL
```

---

## 📝 Notes

- All services use `httpClient.request()` for API calls
- Error handling already implemented with user-friendly messages
- Rate limiting active on client (20 req/min for pricing)
- Draft data encrypted in localStorage
- Input sanitization prevents XSS
- File uploads validated (size, type, count)
- PDF generation works offline (client-side)

---

## 🔗 Documentation References

- **Full Integration Guide**: `INTEGRATIONS_READY.md`
- **Security Features**: `SECURITY_FEATURES.md`
- **Codebase Organization**: `CODEBASE_ORGANIZATION.md`
- **Import Examples**: `IMPORT_EXAMPLES.md`
