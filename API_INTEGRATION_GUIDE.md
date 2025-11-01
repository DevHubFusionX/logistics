# API Integration Setup Guide

## ✅ Services Created

All API services are now ready for backend integration:

### Core Services
1. ✅ `authService.js` - Authentication & user management
2. ✅ `bookingService.js` - Customer bookings & tracking
3. ✅ `paymentService.js` - Payments & invoicing
4. ✅ `fleetService.js` - Fleet & vehicle management
5. ✅ `driverService.js` - Driver management
6. ✅ `tripService.js` - Trip operations
7. ✅ `clientService.js` - Client management
8. ✅ `reconciliationService.js` - Financial reconciliation
9. ✅ `reportService.js` - Reports & analytics
10. ✅ `temperatureService.js` - Temperature monitoring
11. ✅ `addressService.js` - Address book
12. ✅ `dashboardService.js` - Dashboard data
13. ✅ `httpClient.js` - HTTP client with auth
14. ✅ `index.js` - Central export

### Custom Hooks
1. ✅ `useApi.js` - Data fetching with loading/error states
2. ✅ `useMutation.js` - Data mutations (create/update/delete)

---

## 🚀 Quick Start

### 1. Environment Setup

Create `.env` file in project root:

```env
VITE_API_BASE_URL=https://api.daraexpress.com/v1
# or for development
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 2. Import Services

```javascript
// Import specific service
import { bookingService } from '../services'

// Or import all
import * as services from '../services'
```

### 3. Use in Components

#### Option A: Direct Service Call
```javascript
import { bookingService } from '../services'
import { useState, useEffect } from 'react'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getMyBookings()
        setBookings(response.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  if (loading) return <div>Loading...</div>
  return <div>{/* render bookings */}</div>
}
```

#### Option B: Using useApi Hook (Recommended)
```javascript
import { useApi } from '../hooks/useApi'
import { bookingService } from '../services'

function MyBookings() {
  const { data: bookings, loading, error, refetch } = useApi(
    bookingService.getMyBookings,
    { status: 'all' }
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      {bookings?.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

#### Option C: Using useMutation Hook
```javascript
import { useMutation } from '../hooks/useApi'
import { bookingService } from '../services'

function CreateBooking() {
  const { mutate: createBooking, loading } = useMutation(
    bookingService.createBooking
  )

  const handleSubmit = async (formData) => {
    try {
      const response = await createBooking(formData)
      console.log('Booking created:', response)
      navigate('/my-bookings')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

---

## 📚 Service Methods Reference

### Authentication Service
```javascript
import { authService } from '../services'

// Register
await authService.register({ name, email, password, role })

// Login
await authService.login({ email, password })

// Get Profile
await authService.getProfile()

// Forgot Password
await authService.forgotPassword(email)

// Reset Password
await authService.resetPassword(token, password)
```

### Booking Service
```javascript
import { bookingService } from '../services'

// Customer: Get my bookings
await bookingService.getMyBookings({ status: 'all', page: 1, limit: 20 })

// Customer: Create booking
await bookingService.createBooking(bookingData)

// Customer: Track booking
await bookingService.trackBooking(bookingId)

// Customer: Cancel booking
await bookingService.cancelBooking(bookingId, reason)

// Customer: Get invoice
await bookingService.getBookingInvoice(bookingId, 'pdf')

// Staff: Get all bookings
await bookingService.getAllBookings({ status: 'pending' })

// Staff: Update status
await bookingService.updateBookingStatus(bookingId, { status: 'confirmed' })

// Staff: Assign driver
await bookingService.assignDriver(bookingId, { driverId, vehicleId })

// Get status guide
await bookingService.getStatusGuide()
```

### Payment Service
```javascript
import { paymentService } from '../services'

// Initialize payment
await paymentService.initializePayment({ bookingId, amount, method: 'card' })

// Verify payment
await paymentService.verifyPayment(reference)

// Get payments
await paymentService.getPayments({ status: 'completed' })

// Process bank transfer
await paymentService.processBankTransfer(transferData)

// Get invoices
await paymentService.getInvoices({ status: 'paid' })

// Get invoice
await paymentService.getInvoice(invoiceId, 'pdf')

// Send invoice
await paymentService.sendInvoice(invoiceId, { email, subject, message })

// Get outstanding payments
await paymentService.getOutstandingPayments()

// Get statistics
await paymentService.getPaymentStatistics({ startDate, endDate })
```

### Fleet Service
```javascript
import { fleetService } from '../services'

// Get vehicles
await fleetService.getVehicles({ status: 'available' })

// Get vehicle
await fleetService.getVehicle(vehicleId)

// Add vehicle
await fleetService.addVehicle(vehicleData)

// Update vehicle
await fleetService.updateVehicle(vehicleId, vehicleData)

// Delete vehicle
await fleetService.deleteVehicle(vehicleId)

// Get telemetry
await fleetService.getVehicleTelemetry(vehicleId, { startDate, endDate })

// Get maintenance alerts
await fleetService.getMaintenanceAlerts({ severity: 'high' })

// Schedule maintenance
await fleetService.scheduleMaintenance(maintenanceData)

// Get vehicle trips
await fleetService.getVehicleTrips(vehicleId)
```

### Driver Service
```javascript
import { driverService } from '../services'

// Get drivers
await driverService.getDrivers({ status: 'available' })

// Get driver
await driverService.getDriver(driverId)

// Create driver
await driverService.createDriver(driverData)

// Update driver
await driverService.updateDriver(driverId, driverData)

// Get performance
await driverService.getDriverPerformance(driverId, { startDate, endDate })

// Get trips
await driverService.getDriverTrips(driverId)

// Assign driver
await driverService.assignDriver(driverId, { tripId, vehicleId })

// Mark on leave
await driverService.markDriverOnLeave(driverId, { startDate, endDate, reason })

// Upload document
await driverService.uploadDriverDocument(driverId, formData)

// Get documents
await driverService.getDriverDocuments(driverId)
```

### Trip Service
```javascript
import { tripService } from '../services'

// Get trips
await tripService.getTrips({ status: 'in_progress' })

// Get trip
await tripService.getTrip(tripId)

// Create trip
await tripService.createTrip(tripData)

// Update trip
await tripService.updateTrip(tripId, tripData)

// Start trip
await tripService.startTrip(tripId, { startLocation, odometerReading })

// Complete trip
await tripService.completeTrip(tripId, { completionLocation, deliveryProof })

// Cancel trip
await tripService.cancelTrip(tripId, { reason })

// Track trip
await tripService.trackTrip(tripId)

// Get timeline
await tripService.getTripTimeline(tripId)

// Upload document
await tripService.uploadTripDocument(tripId, formData)

// Get analytics
await tripService.getTripAnalytics({ startDate, endDate })
```

### Reconciliation Service
```javascript
import { reconciliationService } from '../services'

// Get dashboard
await reconciliationService.getDashboard({ startDate, endDate })

// Get records
await reconciliationService.getRecords({ status: 'mismatched' })

// Get mismatches
await reconciliationService.getMismatches({ reason: 'payment_missing' })

// Resolve mismatch
await reconciliationService.resolveMismatch(recordId, { resolution, notes })

// Run reconciliation
await reconciliationService.runReconciliation({ startDate, endDate, scope: 'full_chain' })

// Get job status
await reconciliationService.getJobStatus(jobId)

// Export report
await reconciliationService.exportReport({ format: 'excel', status: 'all' })

// Get analytics
await reconciliationService.getAnalytics({ startDate, endDate })

// Get unreconciled revenue
await reconciliationService.getUnreconciledRevenue()

// Bulk resolve
await reconciliationService.bulkResolveMismatches({ recordIds, resolution })
```

### Report Service
```javascript
import { reportService } from '../services'

// Get fleet report
await reportService.getFleetReport({ startDate, endDate, format: 'json' })

// Get driver report
await reportService.getDriverReport({ startDate, endDate })

// Get temperature report
await reportService.getTemperatureReport({ startDate, endDate })

// Get financial report
await reportService.getFinancialReport({ startDate, endDate })

// Get trip report
await reportService.getTripReport({ status: 'completed' })

// Get customer report
await reportService.getCustomerReport({ startDate, endDate })

// Get booking report
await reportService.getBookingReport({ status: 'all' })

// Export report
await reportService.exportReport({ reportType: 'fleet', format: 'excel' })

// Get export status
await reportService.getExportStatus(jobId)

// Get dashboard analytics
await reportService.getDashboardAnalytics({ period: 'today' })
```

### Temperature Service
```javascript
import { temperatureService } from '../services'

// Get monitoring data
await temperatureService.getMonitoring({ status: 'alert' })

// Get history
await temperatureService.getHistory(truckId, { startDate, endDate })

// Get alerts
await temperatureService.getAlerts({ severity: 'high' })

// Acknowledge alert
await temperatureService.acknowledgeAlert(alertId, { notes, action })

// Resolve alert
await temperatureService.resolveAlert(alertId, { resolution, actionTaken })

// Get compliance report
await temperatureService.getComplianceReport({ startDate, endDate })

// Update thresholds
await temperatureService.updateThresholds({ productType, minTemp, maxTemp })

// Get analytics
await temperatureService.getAnalytics({ startDate, endDate })
```

### Address Service
```javascript
import { addressService } from '../services'

// Get addresses
await addressService.getAddresses()

// Get address
await addressService.getAddress(addressId)

// Create address
await addressService.createAddress(addressData)

// Update address
await addressService.updateAddress(addressId, addressData)

// Delete address
await addressService.deleteAddress(addressId)

// Set default
await addressService.setDefaultAddress(addressId)
```

### Dashboard Service
```javascript
import { dashboardService } from '../services'

// Get summary
await dashboardService.getSummary({ period: 'today' })

// Get realtime data
await dashboardService.getRealtime()
```

---

## 🔧 HTTP Client Configuration

The `httpClient` automatically handles:
- ✅ Base URL from environment
- ✅ Authorization headers (JWT token)
- ✅ Content-Type headers
- ✅ Error handling
- ✅ Response parsing

### Custom Headers
```javascript
await httpClient.request('/endpoint', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'X-Custom-Header': 'value'
  }
})
```

### File Uploads
```javascript
const formData = new FormData()
formData.append('file', file)
formData.append('type', 'license')

await driverService.uploadDriverDocument(driverId, formData)
```

---

## 🎯 Integration Checklist

### Phase 1: Setup (15 minutes)
- [x] Create all service files
- [x] Create custom hooks
- [ ] Set up environment variables
- [ ] Test API connection

### Phase 2: Replace Mock Data (2-4 hours)
- [ ] Update MyBookings.jsx to use bookingService
- [ ] Update Payment.jsx to use paymentService
- [ ] Update Fleet.jsx to use fleetService
- [ ] Update Drivers.jsx to use driverService
- [ ] Update Dashboard.jsx to use dashboardService
- [ ] Update all other pages

### Phase 3: Error Handling (1 hour)
- [ ] Add error boundaries
- [ ] Add toast notifications for errors
- [ ] Add retry logic
- [ ] Add offline detection

### Phase 4: Loading States (1 hour)
- [ ] Add loading spinners
- [ ] Add skeleton screens
- [ ] Add progress indicators

### Phase 5: Testing (2 hours)
- [ ] Test all CRUD operations
- [ ] Test authentication flow
- [ ] Test error scenarios
- [ ] Test edge cases

---

## 📝 Example: Complete Integration

### Before (Mock Data)
```javascript
// MyBookings.jsx
const bookings = [
  { id: 'BK-1001', status: 'in_transit', ... },
  { id: 'BK-1002', status: 'pending', ... }
]
```

### After (API Integration)
```javascript
// MyBookings.jsx
import { useApi } from '../hooks/useApi'
import { bookingService } from '../services'

function MyBookings() {
  const { data: bookings, loading, error, refetch } = useApi(
    bookingService.getMyBookings
  )

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} onRetry={refetch} />
  if (!bookings?.length) return <EmptyState />

  return (
    <div>
      {bookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  )
}
```

---

## 🚨 Error Handling

### Global Error Handler
```javascript
// src/utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response?.status === 401) {
    // Redirect to login
    localStorage.clear()
    window.location.href = '/auth/login'
  } else if (error.response?.status === 403) {
    // Show permission error
    showToast.error('Permission denied')
  } else {
    // Show generic error
    showToast.error(error.message || 'An error occurred')
  }
}
```

### Usage
```javascript
try {
  await bookingService.createBooking(data)
} catch (error) {
  handleApiError(error)
}
```

---

## 🎉 Benefits

### Before Integration
- ❌ Mock data everywhere
- ❌ No real-time updates
- ❌ No persistence
- ❌ Hard to test

### After Integration
- ✅ Real data from backend
- ✅ Real-time updates possible
- ✅ Data persistence
- ✅ Easy to test
- ✅ Centralized API logic
- ✅ Reusable services
- ✅ Type-safe (with TypeScript)
- ✅ Error handling built-in

---

## 📞 Support

If you encounter issues:
1. Check API documentation
2. Verify environment variables
3. Check network tab in DevTools
4. Review error messages
5. Test with Postman/Insomnia first

**All services are ready to use immediately!** 🚀
