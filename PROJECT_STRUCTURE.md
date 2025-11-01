# Project Structure & Import Guide

## 📁 Organized Folder Structure

### ✅ Components (Feature-Based Organization)

```
src/components/
├── alerts/              # Alert management components
│   ├── index.js        # ✅ Barrel export
│   └── alertsData.js   # Mock data
│
├── auth/               # Authentication components
│   ├── index.js        # ✅ Barrel export
│   └── ...
│
├── bookings/           # Booking management
│   ├── index.js        # ✅ Barrel export
│   └── ...
│
├── clients/            # Client management
│   ├── index.js        # ✅ Barrel export
│   └── clientsData.js
│
├── customers/          # Customer components
│   ├── index.js        # ✅ Barrel export
│   └── customersData.js
│
├── dashboard/          # Dashboard components
│   ├── index.js        # ✅ Barrel export
│   ├── components/     # Reusable dashboard components
│   ├── layout/         # Layout components (Sidebar, Header, etc.)
│   ├── sections/       # Dashboard sections
│   ├── widgets/        # Dashboard widgets
│   ├── hooks/          # Dashboard-specific hooks
│   └── utils/          # Dashboard utilities
│
├── drivers/            # Driver management
│   ├── index.js        # ✅ Barrel export
│   ├── DriverModal/    # Complex modal with sub-components
│   └── driversData.js
│
├── fleet/              # Fleet management
│   ├── index.js        # ✅ Barrel export
│   └── fleetData.js
│
├── orders/             # Order management
│   ├── index.js        # ✅ Barrel export
│   └── ...
│
├── payments/           # Payment components
│   ├── index.js        # ✅ Barrel export
│   └── paymentsData.js
│
├── pricing/            # Pricing management
│   ├── index.js        # ✅ Barrel export
│   └── ...
│
├── reports/            # Reporting & analytics
│   ├── index.js        # ✅ Barrel export
│   └── reportsData.js
│
├── settings/           # Settings components
│   ├── index.js        # ✅ Barrel export
│   └── ...
│
├── shipments/          # Shipment management
│   ├── index.js        # ✅ Barrel export
│   ├── components/     # Shipment sub-components
│   └── views/          # Different views (Kanban, Table)
│
├── tasks/              # Task management
│   ├── index.js        # ✅ Barrel export
│   └── tasksData.js
│
├── temperature/        # Temperature monitoring
│   ├── index.js        # ✅ Barrel export
│   └── temperatureData.js
│
├── tracking/           # Shipment tracking
│   ├── index.js        # ✅ Barrel export
│   └── ...
│
├── ui/                 # Reusable UI components
│   ├── index.js        # ✅ Barrel export (basic UI)
│   └── advanced/       # Advanced UI components
│       └── index.js    # ✅ Barrel export
│
├── user/               # User profile components
│   ├── index.js        # ✅ Barrel export
│   └── ...
│
├── users/              # User management (admin)
│   ├── index.js        # ✅ Barrel export
│   └── usersData.js
│
└── warehouses/         # Warehouse management
    ├── index.js        # ✅ Barrel export
    └── ...
```

### ✅ Other Organized Folders

```
src/
├── hooks/              # Custom React hooks
│   ├── index.js        # ✅ Barrel export
│   ├── useAuth.jsx
│   ├── useApi.js
│   └── ...
│
├── utils/              # Utility functions
│   ├── index.js        # ✅ Barrel export
│   ├── formatters.js
│   ├── validators.js
│   ├── sanitize.js
│   └── ...
│
├── services/           # API services
│   ├── index.js        # ✅ Barrel export
│   ├── authService.js
│   ├── bookingService.js
│   └── ...
│
├── constants/          # App constants
│   ├── index.js        # ✅ Barrel export
│   ├── navigation.js
│   └── ...
│
├── contexts/           # React contexts
│   └── AuthContext.jsx
│
├── pages/              # Page components
│   ├── auth/
│   ├── booking/
│   ├── fleet/
│   ├── onboarding/
│   ├── shipments/
│   ├── tracking/
│   └── ...
│
└── routes/             # Route configuration
    └── AppRoutes.jsx
```

## 🎯 Import Patterns (Before vs After)

### ❌ Before (Verbose & Inconsistent)

```jsx
import { PageHeader } from '../components/dashboard/index'
import { useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { mockDrivers } from '../components/drivers/driversData'
import { sanitizeInput } from '../utils/sanitize'
import DriverStats from '../components/drivers/DriverStats'
import DriverFilters from '../components/drivers/DriverFilters'
import DriverTable from '../components/drivers/DriverTable'
import DriverModal from '../components/drivers/DriverModal'
import AddDriverModal from '../components/drivers/AddDriverModal'
```

### ✅ After (Clean & Organized)

```jsx
import { useState, useMemo } from 'react'
import { PageHeader } from '../components/dashboard'
import { useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks'
import { sanitizeInput } from '../utils'
import { 
  DriverStats, 
  DriverFilters, 
  DriverTable, 
  DriverModal, 
  AddDriverModal,
  mockDrivers 
} from '../components/drivers'
```

## 📋 Import Examples by Feature

### Dashboard Components
```jsx
import { 
  PageHeader, 
  Sidebar, 
  TopHeader,
  StatsCard,
  KPICard,
  ActivityFeed 
} from '../components/dashboard'
```

### UI Components
```jsx
// Basic UI
import { Badge, Button, ServiceCard } from '../components/ui'

// Advanced UI
import { useToast, Chart, LoadingSkeleton } from '../components/ui/advanced'
```

### Hooks
```jsx
import { useAuth, useApi, useLogisticsShortcuts } from '../hooks'
```

### Utils
```jsx
import { sanitizeInput, formatCurrency, validateEmail } from '../utils'
```

### Services
```jsx
import { authService, bookingService, fleetService } from '../services'
```

### Fleet Components
```jsx
import { 
  FleetMap, 
  FleetMetrics, 
  VehicleCard,
  AddTruckModal,
  mockFleet 
} from '../components/fleet'
```

### Temperature Monitoring
```jsx
import { 
  TemperatureGraph, 
  AlertCenter,
  ComplianceReport,
  mockTemperatureData 
} from '../components/temperature'
```

### Shipments
```jsx
import { 
  ShipmentTable, 
  KanbanBoard,
  ShipmentFilters,
  CreateShipmentModal 
} from '../components/shipments'
```

## 🎨 Benefits of This Structure

### 1. **Cleaner Imports**
- Single import statement per feature
- Grouped related components
- Easier to read and maintain

### 2. **Better Organization**
- Feature-based folder structure
- Clear separation of concerns
- Data files co-located with components

### 3. **Improved Maintainability**
- Easy to find components
- Consistent import patterns
- Scalable architecture

### 4. **Developer Experience**
- Better IDE autocomplete
- Faster navigation
- Reduced cognitive load

## 🔄 Migration Guide

### Step 1: Update Imports in Your Files
Replace old import patterns with new barrel exports:

```jsx
// Old
import DriverStats from '../components/drivers/DriverStats'

// New
import { DriverStats } from '../components/drivers'
```

### Step 2: Group Related Imports
```jsx
// Instead of multiple lines
import Component1 from '../components/feature/Component1'
import Component2 from '../components/feature/Component2'
import Component3 from '../components/feature/Component3'

// Use single grouped import
import { Component1, Component2, Component3 } from '../components/feature'
```

### Step 3: Use Consistent Patterns
Always import from the folder level, not individual files:
```jsx
// ✅ Good
import { DriverStats } from '../components/drivers'

// ❌ Avoid
import DriverStats from '../components/drivers/DriverStats'
```

## 📝 Notes

- All barrel exports (index.js) are now in place
- Mock data is exported alongside components
- Consistent naming conventions throughout
- Ready for tree-shaking optimization
- Follows React best practices

## 🚀 Next Steps

1. Update remaining page components to use new imports
2. Consider adding TypeScript for better type safety
3. Add PropTypes validation where missing
4. Document component APIs
5. Create Storybook for component showcase
