# Import Refactoring Guide

## 🎯 Quick Reference: Old vs New Imports

### Components

#### Drivers
```jsx
// ❌ OLD
import DriverStats from '../components/drivers/DriverStats'
import DriverFilters from '../components/drivers/DriverFilters'
import DriverTable from '../components/drivers/DriverTable'
import { mockDrivers } from '../components/drivers/driversData'

// ✅ NEW
import { DriverStats, DriverFilters, DriverTable, mockDrivers } from '../components/drivers'
```

#### Fleet
```jsx
// ❌ OLD
import FleetMap from '../components/fleet/FleetMap'
import FleetMetrics from '../components/fleet/FleetMetrics'
import VehicleCard from '../components/fleet/VehicleCard'

// ✅ NEW
import { FleetMap, FleetMetrics, VehicleCard } from '../components/fleet'
```

#### Dashboard
```jsx
// ❌ OLD
import { PageHeader } from '../components/dashboard/index'
import StatsCard from '../components/dashboard/widgets/StatsCard'
import KPICard from '../components/dashboard/widgets/KPICard'

// ✅ NEW
import { PageHeader, StatsCard, KPICard } from '../components/dashboard'
```

#### Temperature
```jsx
// ❌ OLD
import TemperatureGraph from '../components/temperature/TemperatureGraph'
import AlertCenter from '../components/temperature/AlertCenter'
import { mockTemperatureData } from '../components/temperature/temperatureData'

// ✅ NEW
import { TemperatureGraph, AlertCenter, mockTemperatureData } from '../components/temperature'
```

#### Shipments
```jsx
// ❌ OLD
import ShipmentTable from '../components/shipments/views/ShipmentTable'
import KanbanBoard from '../components/shipments/views/KanbanBoard'
import ShipmentFilters from '../components/shipments/components/ShipmentFilters'

// ✅ NEW
import { ShipmentTable, KanbanBoard, ShipmentFilters } from '../components/shipments'
```

#### Bookings
```jsx
// ❌ OLD
import BookingCard from '../components/bookings/BookingCard'
import AssignDriverModal from '../components/bookings/AssignDriverModal'

// ✅ NEW
import { BookingCard, AssignDriverModal } from '../components/bookings'
```

#### Payments
```jsx
// ❌ OLD
import PaymentsTable from '../components/payments/PaymentsTable'
import RevenueChart from '../components/payments/RevenueChart'
import { mockPayments } from '../components/payments/paymentsData'

// ✅ NEW
import { PaymentsTable, RevenueChart, mockPayments } from '../components/payments'
```

#### Reports
```jsx
// ❌ OLD
import FleetUsageChart from '../components/reports/FleetUsageChart'
import RevenueTrendChart from '../components/reports/RevenueTrendChart'
import { mockReportsData } from '../components/reports/reportsData'

// ✅ NEW
import { FleetUsageChart, RevenueTrendChart, mockReportsData } from '../components/reports'
```

#### Alerts
```jsx
// ❌ OLD
import AlertCard from '../components/alerts/AlertCard'
import AlertsDashboard from '../components/alerts/AlertsDashboard'
import { mockAlerts } from '../components/alerts/alertsData'

// ✅ NEW
import { AlertCard, AlertsDashboard, mockAlerts } from '../components/alerts'
```

#### Tasks
```jsx
// ❌ OLD
import TaskCard from '../components/tasks/TaskCard'
import KanbanBoard from '../components/tasks/KanbanBoard'
import { mockTasks } from '../components/tasks/tasksData'

// ✅ NEW
import { TaskCard, KanbanBoard, mockTasks } from '../components/tasks'
```

#### Clients
```jsx
// ❌ OLD
import ClientsTable from '../components/clients/ClientsTable'
import ClientDetail from '../components/clients/ClientDetail'
import { mockClients } from '../components/clients/clientsData'

// ✅ NEW
import { ClientsTable, ClientDetail, mockClients } from '../components/clients'
```

#### Users
```jsx
// ❌ OLD
import UsersTable from '../components/users/UsersTable'
import UserModal from '../components/users/UserModal'
import { mockUsers } from '../components/users/usersData'

// ✅ NEW
import { UsersTable, UserModal, mockUsers } from '../components/users'
```

#### Settings
```jsx
// ❌ OLD
import SystemSettings from '../components/settings/SystemSettings'
import NotificationsSettings from '../components/settings/NotificationsSettings'

// ✅ NEW
import { SystemSettings, NotificationsSettings } from '../components/settings'
```

#### Tracking
```jsx
// ❌ OLD
import TrackingMap from '../components/tracking/TrackingMap'
import StatusTimeline from '../components/tracking/StatusTimeline'
import DriverInfo from '../components/tracking/DriverInfo'

// ✅ NEW
import { TrackingMap, StatusTimeline, DriverInfo } from '../components/tracking'
```

#### Warehouses
```jsx
// ❌ OLD
import WarehouseCard from '../components/warehouses/WarehouseCard'
import InventoryTable from '../components/warehouses/InventoryTable'

// ✅ NEW
import { WarehouseCard, InventoryTable } from '../components/warehouses'
```

#### UI Components
```jsx
// ❌ OLD - Basic UI
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ServiceCard from '../components/ui/ServiceCard'

// ✅ NEW - Basic UI
import { Badge, Button, ServiceCard } from '../components/ui'

// ❌ OLD - Advanced UI
import { useToast } from '../components/ui/advanced/Toast'
import Chart from '../components/ui/advanced/Chart'
import LoadingSkeleton from '../components/ui/advanced/LoadingSkeleton'

// ✅ NEW - Advanced UI
import { useToast, Chart, LoadingSkeleton } from '../components/ui/advanced'
```

### Hooks

```jsx
// ❌ OLD
import { useAuth } from '../hooks/useAuth'
import useApi from '../hooks/useApi'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'

// ✅ NEW
import { useAuth, useApi, useLogisticsShortcuts } from '../hooks'
```

### Utils

```jsx
// ❌ OLD
import { sanitizeInput } from '../utils/sanitize'
import { formatCurrency } from '../utils/formatters'
import { validateEmail } from '../utils/validators'

// ✅ NEW
import { sanitizeInput, formatCurrency, validateEmail } from '../utils'
```

### Services

```jsx
// ❌ OLD
import authService from '../services/authService'
import bookingService from '../services/bookingService'
import fleetService from '../services/fleetService'

// ✅ NEW
import { authService, bookingService, fleetService } from '../services'
```

### Constants

```jsx
// ❌ OLD
import { COLORS } from '../constants/index'
import { STATUS_COLORS } from '../constants/index'

// ✅ NEW
import { COLORS, STATUS_COLORS } from '../constants'
```

## 🔍 Files That Need Updates

### High Priority Pages (Most Used)
1. ✅ `src/pages/Drivers.jsx` - UPDATED
2. `src/pages/Fleet.jsx`
3. `src/pages/Temperature.jsx`
4. `src/pages/Dashboard.jsx`
5. `src/pages/shipments/Shipments.jsx`
6. `src/pages/Payments.jsx`
7. `src/pages/Reports.jsx`
8. `src/pages/BookingsManagement.jsx`

### Medium Priority Pages
9. `src/pages/Alerts.jsx`
10. `src/pages/Tasks.jsx`
11. `src/pages/Orders.jsx`
12. `src/pages/Customers.jsx`
13. `src/pages/Settings.jsx`
14. `src/pages/Warehouses.jsx`
15. `src/pages/UserRoles.jsx`
16. `src/pages/PricingManagement.jsx`

### Tracking & Booking Pages
17. `src/pages/tracking/ShipmentTracking.jsx`
18. `src/pages/tracking/TrackShipment.jsx`
19. `src/pages/booking/BookingRequest.jsx`
20. `src/pages/booking/Quotation.jsx`

## 📝 Step-by-Step Migration Process

### For Each File:

1. **Identify all imports** from components, hooks, utils, services
2. **Group by source folder** (drivers, fleet, dashboard, etc.)
3. **Replace individual imports** with grouped barrel imports
4. **Test the file** to ensure no breaking changes
5. **Commit changes** with descriptive message

### Example Migration:

**Before:**
```jsx
import { useState } from 'react'
import PageHeader from '../components/dashboard/layout/PageHeader'
import FleetMap from '../components/fleet/FleetMap'
import FleetMetrics from '../components/fleet/FleetMetrics'
import VehicleCard from '../components/fleet/VehicleCard'
import { mockFleet } from '../components/fleet/fleetData'
import { useToast } from '../components/ui/advanced/Toast'
import { formatCurrency } from '../utils/formatters'
import fleetService from '../services/fleetService'
```

**After:**
```jsx
import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { FleetMap, FleetMetrics, VehicleCard, mockFleet } from '../components/fleet'
import { useToast } from '../components/ui/advanced'
import { formatCurrency } from '../utils'
import { fleetService } from '../services'
```

## ✅ Benefits Checklist

- [ ] Reduced import lines by ~50%
- [ ] Consistent import patterns across project
- [ ] Easier to add new components
- [ ] Better IDE autocomplete
- [ ] Improved code readability
- [ ] Faster development workflow
- [ ] Easier onboarding for new developers

## 🚨 Common Pitfalls to Avoid

1. **Don't mix old and new patterns** in the same file
2. **Update all imports** in a file at once
3. **Test after each file update** to catch issues early
4. **Check for circular dependencies** if imports fail
5. **Ensure barrel exports are complete** before updating imports

## 🎯 Quick Win: Update One Page at a Time

Start with the page you're currently working on, then gradually update others as you touch them. This incremental approach reduces risk and allows for easier testing.
