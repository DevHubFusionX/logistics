# Codebase Organization Guide

## 📁 Project Structure

```
logistics/
├── src/
│   ├── components/        # React components (organized by feature)
│   ├── pages/            # Page-level components
│   ├── services/         # API service layer
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── constants/        # Constants and configurations
│   ├── contexts/         # React contexts
│   ├── routes/           # Route definitions
│   ├── styles/           # Global styles
│   └── i18n/             # Internationalization
```

## 🎯 Import Standards

### ✅ Correct Import Patterns

```javascript
// Services - Use named imports from barrel export
import { bookingService, authService, httpClient } from '@/services'

// Hooks - Use named imports
import { useAuth, useApi, useBookingDraft } from '@/hooks'

// Utils - Use named imports
import { formatCurrency, validateEmail, handleError } from '@/utils'

// Constants - Use named imports
import { COLORS, STATUS_COLORS, BADGE_COLORS } from '@/constants'

// Components - Use named imports from feature folders
import { BookingCard, BookingFilters, BookingStats } from '@/components/bookings'
import { Navbar, Footer, LoadingScreen } from '@/components/common'
import { StatsCard, KPICard } from '@/components/dashboard'
```

### ❌ Avoid These Patterns

```javascript
// DON'T: Direct file imports when barrel exports exist
import bookingService from '@/services/bookingService'
import BookingCard from '@/components/bookings/BookingCard'

// DON'T: Mixing import styles
import { bookingService } from '@/services'
import authService from '@/services/authService'
```

## 📦 Component Organization

### Feature-Based Structure

Each feature folder contains:
- Component files (`.jsx`)
- `index.js` (barrel export)
- Data files (if needed)
- Sub-folders for complex features

Example:
```
components/
├── bookings/
│   ├── index.js              # Exports all booking components
│   ├── BookingCard.jsx
│   ├── BookingFilters.jsx
│   ├── BookingStats.jsx
│   └── AssignDriverModal.jsx
```

### Barrel Export Pattern

Every component folder has an `index.js`:

```javascript
// components/bookings/index.js
export { default as BookingCard } from './BookingCard'
export { default as BookingFilters } from './BookingFilters'
export { default as BookingStats } from './BookingStats'
export { default as AssignDriverModal } from './AssignDriverModal'
```

## 🔧 Services Layer

### Service Structure

```javascript
// services/bookingService.js
import httpClient from './httpClient'

const bookingService = {
  createBooking: (data) => 
    httpClient.request('/bookings/', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  
  getBookings: (params) => 
    httpClient.request('/bookings/users', {}, params),
  
  // ... other methods
}

export default bookingService
```

### Central Export

```javascript
// services/index.js
export { default as authService } from './authService'
export { default as bookingService } from './bookingService'
export { default as httpClient } from './httpClient'
// ... all services
```

## 🪝 Hooks Organization

### Custom Hooks

```javascript
// hooks/useBookingDraft.js
export const useBookingDraft = () => {
  // Hook implementation
  return { saveDraft, loadDraft, clearDraft }
}
```

### Central Export

```javascript
// hooks/index.js
export { useApi, useMutation } from './useApi'
export { useAuth, AuthProvider } from './useAuth'
export { useBookingDraft } from './useBookingDraft'
```

## 🛠️ Utils Organization

### Utility Functions

```javascript
// utils/formatters.js
export const formatCurrency = (amount) => { /* ... */ }
export const formatDate = (date) => { /* ... */ }
export const formatPhone = (phone) => { /* ... */ }
```

### Central Export

```javascript
// utils/index.js
export * from './formatters'
export * from './validators'
export * from './helpers'
```

## 📋 Constants Organization

```javascript
// constants/index.js
export const COLORS = { /* ... */ }
export const STATUS_COLORS = { /* ... */ }
export const BADGE_COLORS = { /* ... */ }
```

## 🎨 Component Categories

### 1. Common Components (`components/common/`)
- Navbar, Footer
- LoadingScreen, ErrorFallback
- ProtectedRoute, RoleSwitcher

### 2. Dashboard Components (`components/dashboard/`)
- Layout components (AppLayout, Sidebar)
- Widgets (StatsCard, KPICard)
- Sections (StatsSection, ActivityFeed)

### 3. Feature Components
- `components/bookings/` - Booking management
- `components/fleet/` - Fleet management
- `components/drivers/` - Driver management
- `components/trips/` - Trip management
- `components/payments/` - Payment processing
- `components/temperature/` - Temperature monitoring
- `components/tracking/` - Shipment tracking

### 4. Landing Components (`components/landing/`)
- Hero sections
- About, Services, Contact
- Pricing, Testimonials

### 5. UI Components (`components/ui/`)
- Badge, Button
- FeatureCard, ServiceCard
- SectionHeader

## 🚀 Best Practices

### 1. Always Use Barrel Exports
```javascript
// ✅ Good
import { BookingCard, BookingFilters } from '@/components/bookings'

// ❌ Bad
import BookingCard from '@/components/bookings/BookingCard'
```

### 2. Group Related Imports
```javascript
// External dependencies
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Services
import { bookingService, paymentService } from '@/services'

// Hooks
import { useAuth, useApi } from '@/hooks'

// Components
import { BookingCard, BookingFilters } from '@/components/bookings'
import { Button, Badge } from '@/components/ui'

// Utils
import { formatCurrency, validateEmail } from '@/utils'
```

### 3. Consistent Naming
- Components: PascalCase (`BookingCard.jsx`)
- Services: camelCase with 'Service' suffix (`bookingService.js`)
- Hooks: camelCase with 'use' prefix (`useBookingDraft.js`)
- Utils: camelCase (`formatters.js`)
- Constants: UPPER_SNAKE_CASE (`STATUS_COLORS`)

### 4. File Organization
```
feature/
├── index.js           # Barrel export (always first)
├── Component1.jsx     # Main components
├── Component2.jsx
├── featureData.js     # Data/constants
└── subfolder/         # Complex sub-features
    ├── index.js
    └── SubComponent.jsx
```

## 📝 Quick Reference

### Import Cheat Sheet

| Type | Import From | Example |
|------|-------------|---------|
| Services | `@/services` | `import { bookingService } from '@/services'` |
| Hooks | `@/hooks` | `import { useAuth } from '@/hooks'` |
| Utils | `@/utils` | `import { formatCurrency } from '@/utils'` |
| Constants | `@/constants` | `import { COLORS } from '@/constants'` |
| Common UI | `@/components/common` | `import { Navbar } from '@/components/common'` |
| Dashboard | `@/components/dashboard` | `import { StatsCard } from '@/components/dashboard'` |
| Feature | `@/components/{feature}` | `import { BookingCard } from '@/components/bookings'` |

## 🔄 Migration Guide

When refactoring existing code:

1. **Identify the import type** (service, hook, component, util)
2. **Check if barrel export exists** in the folder's `index.js`
3. **Update to use named import** from the barrel export
4. **Group imports** by category
5. **Remove unused imports**

Example refactor:
```javascript
// Before
import bookingService from '../services/bookingService'
import BookingCard from '../components/bookings/BookingCard'
import { formatCurrency } from '../utils/formatters'

// After
import { bookingService } from '@/services'
import { BookingCard } from '@/components/bookings'
import { formatCurrency } from '@/utils'
```

## ✨ Benefits

1. **Cleaner imports** - Single line per feature
2. **Better maintainability** - Easy to refactor
3. **Consistent patterns** - Team alignment
4. **Easier navigation** - Clear structure
5. **Reduced coupling** - Abstraction through barrels
