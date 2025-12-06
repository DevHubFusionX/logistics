# Import Examples - Quick Reference

## 🎯 Common Import Patterns

### Services Layer

```javascript
// ✅ Correct - Use barrel exports
import { 
  bookingService, 
  authService, 
  paymentService,
  fleetService,
  driverService,
  httpClient 
} from '@/services'

// Usage
const bookings = await bookingService.getBookings()
const price = await bookingService.calculatePrice(data)
```

### Custom Hooks

```javascript
// ✅ Correct - Named imports from hooks barrel
import { 
  useAuth, 
  useApi, 
  useBookingDraft,
  usePaymentStatus,
  useRetry 
} from '@/hooks'

// Usage in component
const { user, isAuthenticated } = useAuth()
const { data, loading, error } = useApi('/bookings')
const { saveDraft, loadDraft } = useBookingDraft()
```

### Utility Functions

```javascript
// ✅ Correct - Named imports from utils barrel
import { 
  formatCurrency, 
  formatDate,
  validateEmail,
  handleError,
  sanitizeInput 
} from '@/utils'

// Usage
const price = formatCurrency(1500)
const date = formatDate(new Date())
const isValid = validateEmail('user@example.com')
```

### Constants

```javascript
// ✅ Correct - Named imports
import { 
  COLORS, 
  STATUS_COLORS, 
  BADGE_COLORS,
  PRIORITY_COLORS 
} from '@/constants'

// Usage
<div className={STATUS_COLORS.active}>Active</div>
<span className={BADGE_COLORS.success}>Success</span>
```

### Common Components

```javascript
// ✅ Correct - Named imports from common barrel
import { 
  Navbar, 
  Footer, 
  LoadingScreen,
  ProtectedRoute,
  ErrorFallback 
} from '@/components/common'

// Footer sub-components
import { 
  ChatWidget, 
  CompanyInfo, 
  ContactInfo 
} from '@/components/common/footer'
```

### Dashboard Components

```javascript
// ✅ Correct - Named imports from dashboard barrel
import { 
  AppLayout, 
  DashboardLayout,
  Sidebar,
  TopHeader,
  PageHeader 
} from '@/components/dashboard'

// Dashboard widgets
import { 
  StatsCard, 
  KPICard, 
  TemperatureWidget 
} from '@/components/dashboard'

// Dashboard sections
import { 
  StatsSection, 
  KPIRibbon, 
  LiveMap,
  ActivityFeed 
} from '@/components/dashboard'
```

### Feature Components

```javascript
// Bookings
import { 
  BookingCard, 
  BookingFilters, 
  BookingStats,
  AssignDriverModal,
  BookingDetailsModal 
} from '@/components/bookings'

// Booking flow
import { 
  ShipmentDetailsForm, 
  ReviewQuote, 
  PaymentSelection,
  BookingConfirmation,
  ProgressSteps 
} from '@/components/booking'

// Fleet
import { 
  VehicleCard, 
  FleetMap, 
  FleetMetrics,
  AddTruckModal,
  TruckDetailModal 
} from '@/components/fleet'

// Drivers
import { 
  DriverCard, 
  DriverTable, 
  DriverStats,
  AddDriverModal,
  DriverFilters 
} from '@/components/drivers'

// Trips
import { 
  TripTable, 
  TripFilters, 
  TripDetailModal,
  TripFormModal 
} from '@/components/trips'

// Payments
import { 
  PaymentsTable, 
  PaystackPayment, 
  BankTransferForm,
  RevenueChart,
  OutstandingPayments 
} from '@/components/payments'

// Temperature
import { 
  TemperatureGraph, 
  TemperatureTable, 
  AlertCenter,
  ComplianceReport 
} from '@/components/temperature'

// Tracking
import { 
  TrackingMap, 
  StatusTimeline, 
  DriverInfo,
  ProofOfDelivery 
} from '@/components/tracking'

// Shipments
import { 
  ShipmentTable, 
  KanbanBoard, 
  ShipmentFilters,
  CreateShipmentModal 
} from '@/components/shipments'
```

### UI Components

```javascript
// Basic UI
import { 
  Button, 
  Badge, 
  FeatureCard,
  ServiceCard,
  SectionHeader 
} from '@/components/ui'

// Advanced UI
import { 
  Chart, 
  LoadingSkeleton, 
  MetricCard,
  Toast,
  VirtualizedTable 
} from '@/components/ui'
```

### Landing Page Components

```javascript
// Main landing components
import { 
  DaraHero, 
  DaraAbout, 
  DaraServices,
  DaraTestimonials,
  DaraWhyUs,
  DaraContact 
} from '@/components/landing'

// Contact sub-components
import { 
  ContactForm, 
  ContactInfo, 
  OfficeLocations 
} from '@/components/landing/contact'

// Services sub-components
import { 
  CoreServicesSection, 
  SpecializedServicesSection,
  ProcessSection 
} from '@/components/landing/services'

// About sub-components
import { 
  AboutHero, 
  AboutValues, 
  AboutLeadership,
  AboutTimeline 
} from '@/components/landing/about'
```

### Auth Components

```javascript
import { 
  AuthLayout, 
  LoginForm, 
  RegisterForm 
} from '@/components/auth'
```

## 📝 Complete Component Example

```javascript
// BookingManagement.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Services
import { bookingService, paymentService } from '@/services'

// Hooks
import { useAuth, useApi, useBookingMetrics } from '@/hooks'

// Components
import { AppLayout, PageHeader } from '@/components/dashboard'
import { 
  BookingCard, 
  BookingFilters, 
  BookingStats,
  AssignDriverModal 
} from '@/components/bookings'
import { Button, Badge } from '@/components/ui'
import { LoadingScreen } from '@/components/common'

// Utils
import { formatCurrency, formatDate, handleError } from '@/utils'

// Constants
import { STATUS_COLORS, BADGE_COLORS } from '@/constants'

export default function BookingManagement() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: bookings, loading } = useApi('/bookings')
  const { metrics } = useBookingMetrics()
  
  // Component logic...
  
  return (
    <AppLayout>
      <PageHeader title="Bookings" />
      <BookingStats metrics={metrics} />
      <BookingFilters onFilter={handleFilter} />
      {/* ... */}
    </AppLayout>
  )
}
```

## 🔄 Migration Examples

### Before (Old Pattern)
```javascript
import bookingService from '../../../services/bookingService'
import authService from '../../../services/authService'
import BookingCard from '../../bookings/BookingCard'
import BookingFilters from '../../bookings/BookingFilters'
import { formatCurrency } from '../../../utils/formatters'
import { validateEmail } from '../../../utils/validators'
import LoadingScreen from '../../common/LoadingScreen'
```

### After (New Pattern)
```javascript
import { bookingService, authService } from '@/services'
import { BookingCard, BookingFilters } from '@/components/bookings'
import { formatCurrency, validateEmail } from '@/utils'
import { LoadingScreen } from '@/components/common'
```

## 🎨 Import Organization Template

```javascript
// 1. External dependencies (React, libraries)
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

// 2. Services
import { bookingService, paymentService } from '@/services'

// 3. Hooks
import { useAuth, useApi } from '@/hooks'

// 4. Components (grouped by feature)
import { AppLayout, PageHeader } from '@/components/dashboard'
import { BookingCard, BookingFilters } from '@/components/bookings'
import { Button, Badge } from '@/components/ui'

// 5. Utils
import { formatCurrency, handleError } from '@/utils'

// 6. Constants
import { STATUS_COLORS } from '@/constants'

// 7. Types (if using TypeScript)
// import type { Booking, Payment } from '@/types'
```

## ⚡ Quick Tips

1. **Always use barrel exports** - Import from folder index, not individual files
2. **Group imports logically** - External → Services → Hooks → Components → Utils → Constants
3. **Use path aliases** - `@/` instead of relative paths `../../../`
4. **Named imports only** - Avoid default imports when barrel exports exist
5. **One import per category** - Combine multiple imports from same source

## 🚫 Common Mistakes to Avoid

```javascript
// ❌ Don't mix import styles
import { bookingService } from '@/services'
import authService from '@/services/authService'  // Inconsistent!

// ✅ Do use consistent barrel imports
import { bookingService, authService } from '@/services'

// ❌ Don't import from nested files directly
import BookingCard from '@/components/bookings/BookingCard'

// ✅ Do use barrel exports
import { BookingCard } from '@/components/bookings'

// ❌ Don't use relative paths for shared code
import { formatCurrency } from '../../../utils/formatters'

// ✅ Do use path aliases
import { formatCurrency } from '@/utils'
```

## 📚 Additional Resources

- See `CODEBASE_ORGANIZATION.md` for detailed structure
- Check `PROJECT_STRUCTURE.md` for folder hierarchy
- Review individual `index.js` files for available exports
