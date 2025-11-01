# 🎯 Import Examples - Quick Reference

## Real-World Examples from Your Project

### Example 1: Drivers Page (✅ Already Updated)

```jsx
// File: src/pages/Drivers.jsx

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

export default function Drivers() {
  // Component logic...
}
```

**Benefits:**
- 6 import statements instead of 11 (45% reduction)
- All driver-related imports in one place
- Easy to see dependencies at a glance

---

### Example 2: Fleet Page (To Be Updated)

```jsx
// File: src/pages/Fleet.jsx

// ❌ BEFORE (Verbose)
import { useState } from 'react'
import PageHeader from '../components/dashboard/layout/PageHeader'
import FleetMap from '../components/fleet/FleetMap'
import FleetMetrics from '../components/fleet/FleetMetrics'
import FleetFilters from '../components/fleet/FleetFilters'
import VehicleCard from '../components/fleet/VehicleCard'
import AddTruckModal from '../components/fleet/AddTruckModal'
import TruckDetailModal from '../components/fleet/TruckDetailModal'
import MaintenanceAlerts from '../components/fleet/MaintenanceAlerts'
import { mockFleet } from '../components/fleet/fleetData'
import { useToast } from '../components/ui/advanced/Toast'
import { formatCurrency } from '../utils/formatters'

// ✅ AFTER (Clean)
import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { 
  FleetMap, 
  FleetMetrics, 
  FleetFilters,
  VehicleCard,
  AddTruckModal,
  TruckDetailModal,
  MaintenanceAlerts,
  mockFleet 
} from '../components/fleet'
import { useToast } from '../components/ui/advanced'
import { formatCurrency } from '../utils'
```

---

### Example 3: Temperature Monitoring Page

```jsx
// File: src/pages/Temperature.jsx

// ✅ NEW PATTERN
import { useState, useEffect } from 'react'
import { PageHeader } from '../components/dashboard'
import { 
  TemperatureGraph, 
  TemperatureTable,
  AlertCenter,
  ComplianceReport,
  TemperatureTrend,
  mockTemperatureData 
} from '../components/temperature'
import { useToast } from '../components/ui/advanced'
import { formatTemperature, formatDate } from '../utils'
import { temperatureService } from '../services'

export default function Temperature() {
  const [data, setData] = useState(mockTemperatureData)
  const { showToast } = useToast()
  
  // Component logic...
}
```

---

### Example 4: Dashboard Page

```jsx
// File: src/pages/Dashboard.jsx

// ✅ NEW PATTERN
import { useState, useEffect } from 'react'
import { 
  PageHeader,
  StatsSection,
  KPIRibbon,
  LiveMap,
  ActivityFeed,
  OperationalInsights,
  useDashboardData 
} from '../components/dashboard'
import { LoadingSkeleton } from '../components/ui/advanced'
import { dashboardService } from '../services'

export default function Dashboard() {
  const { stats, loading } = useDashboardData()
  
  if (loading) return <LoadingSkeleton />
  
  return (
    <div>
      <PageHeader title="Dashboard" />
      <StatsSection data={stats} />
      <KPIRibbon />
      <LiveMap />
      <ActivityFeed />
      <OperationalInsights />
    </div>
  )
}
```

---

### Example 5: Shipments Page

```jsx
// File: src/pages/shipments/Shipments.jsx

// ✅ NEW PATTERN
import { useState } from 'react'
import { PageHeader } from '../../components/dashboard'
import { 
  ShipmentTable, 
  KanbanBoard,
  ShipmentFilters,
  ShipmentSidebar,
  CreateShipmentModal 
} from '../../components/shipments'
import { useToast } from '../../components/ui/advanced'
import { useAuth } from '../../hooks'

export default function Shipments() {
  const [view, setView] = useState('table')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()
  
  return (
    <div>
      <PageHeader title="Shipments" />
      <ShipmentFilters />
      {view === 'table' ? <ShipmentTable /> : <KanbanBoard />}
      <CreateShipmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
```

---

### Example 6: Payments Page

```jsx
// File: src/pages/Payments.jsx

// ✅ NEW PATTERN
import { useState, useEffect } from 'react'
import { PageHeader } from '../components/dashboard'
import { 
  PaymentsTable, 
  RevenueChart,
  OutstandingPayments,
  mockPayments 
} from '../components/payments'
import { Chart, useToast } from '../components/ui/advanced'
import { formatCurrency, formatDate } from '../utils'
import { paymentService } from '../services'

export default function Payments() {
  const [payments, setPayments] = useState(mockPayments)
  const { showToast } = useToast()
  
  const handlePayment = async (id) => {
    try {
      await paymentService.processPayment(id)
      showToast.success('Payment processed')
    } catch (error) {
      showToast.error('Payment failed')
    }
  }
  
  return (
    <div>
      <PageHeader title="Payments" />
      <RevenueChart data={payments} />
      <OutstandingPayments />
      <PaymentsTable 
        data={payments} 
        onProcess={handlePayment} 
      />
    </div>
  )
}
```

---

### Example 7: Reports Page

```jsx
// File: src/pages/Reports.jsx

// ✅ NEW PATTERN
import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { 
  FleetUsageChart,
  RevenueTrendChart,
  RevenueByClientChart,
  TripCountsChart,
  GeographicHeatmap,
  mockReportsData 
} from '../components/reports'
import { Chart } from '../components/ui/advanced'
import { reportService } from '../services'

export default function Reports() {
  const [dateRange, setDateRange] = useState('30d')
  const [data, setData] = useState(mockReportsData)
  
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" />
      
      <div className="grid grid-cols-2 gap-6">
        <RevenueTrendChart data={data.revenue} />
        <FleetUsageChart data={data.fleet} />
        <RevenueByClientChart data={data.clients} />
        <TripCountsChart data={data.trips} />
      </div>
      
      <GeographicHeatmap data={data.locations} />
    </div>
  )
}
```

---

### Example 8: Settings Page

```jsx
// File: src/pages/Settings.jsx

// ✅ NEW PATTERN
import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { 
  SystemSettings,
  NotificationsSettings,
  IntegrationsSettings,
  TemperatureThresholds,
  AuditLogs 
} from '../components/settings'
import { useAuth } from '../hooks'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('system')
  const { user } = useAuth()
  
  const tabs = {
    system: <SystemSettings />,
    notifications: <NotificationsSettings />,
    integrations: <IntegrationsSettings />,
    temperature: <TemperatureThresholds />,
    audit: <AuditLogs />
  }
  
  return (
    <div>
      <PageHeader title="Settings" />
      {tabs[activeTab]}
    </div>
  )
}
```

---

### Example 9: Booking Request Page

```jsx
// File: src/pages/booking/BookingRequest.jsx

// ✅ NEW PATTERN
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { BookingCard, MetricCard } from '../../components/bookings'
import { useToast } from '../../components/ui/advanced'
import { validateEmail, validatePhone } from '../../utils'
import { bookingService } from '../../services'

export default function BookingRequest() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({})
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail(formData.email)) {
      showToast.error('Invalid email')
      return
    }
    
    try {
      const result = await bookingService.createBooking(formData)
      showToast.success('Booking created')
      navigate('/booking/quotation', { state: { booking: result } })
    } catch (error) {
      showToast.error('Booking failed')
    }
  }
  
  return (
    <div>
      <PageHeader title="New Booking Request" />
      <BookingCard onSubmit={handleSubmit} />
    </div>
  )
}
```

---

### Example 10: User Profile Page

```jsx
// File: src/pages/User.jsx

// ✅ NEW PATTERN
import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { 
  ProfileSection,
  SecuritySection,
  NotificationSettings,
  BillingSection 
} from '../components/user'
import { useAuth } from '../hooks'
import { useToast } from '../components/ui/advanced'

export default function User() {
  const { user, updateProfile } = useAuth()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('profile')
  
  const handleUpdate = async (data) => {
    try {
      await updateProfile(data)
      showToast.success('Profile updated')
    } catch (error) {
      showToast.error('Update failed')
    }
  }
  
  return (
    <div>
      <PageHeader title="My Profile" />
      
      {activeTab === 'profile' && <ProfileSection user={user} onUpdate={handleUpdate} />}
      {activeTab === 'security' && <SecuritySection />}
      {activeTab === 'notifications' && <NotificationSettings />}
      {activeTab === 'billing' && <BillingSection />}
    </div>
  )
}
```

---

## 🎨 Import Pattern Summary

### Pattern 1: Single Feature
```jsx
import { Component1, Component2, data } from '../components/feature'
```

### Pattern 2: Multiple Features
```jsx
import { PageHeader } from '../components/dashboard'
import { FeatureComponent } from '../components/feature'
import { useCustomHook } from '../hooks'
import { utilFunction } from '../utils'
```

### Pattern 3: With Services
```jsx
import { Component } from '../components/feature'
import { service } from '../services'
import { useHook } from '../hooks'
```

### Pattern 4: Complex Page
```jsx
// React & Router
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Dashboard Layout
import { PageHeader } from '../components/dashboard'

// Feature Components
import { 
  Component1, 
  Component2, 
  Component3,
  mockData 
} from '../components/feature'

// UI Components
import { useToast, LoadingSkeleton } from '../components/ui/advanced'

// Hooks & Utils
import { useAuth } from '../hooks'
import { formatDate, validateInput } from '../utils'

// Services
import { featureService } from '../services'
```

---

## 💡 Pro Tips

1. **Group by source** - Keep imports from the same folder together
2. **Order matters** - React → Layout → Features → UI → Hooks → Utils → Services
3. **One feature per line** - Makes it easy to add/remove
4. **Include data** - Co-locate mock data with components
5. **Use destructuring** - Import only what you need

---

## 🚀 Quick Migration Checklist

For each page file:
- [ ] Identify all component imports
- [ ] Group by feature folder
- [ ] Replace with barrel imports
- [ ] Test the page
- [ ] Commit changes

**Estimated time per file:** 2-5 minutes
**Total files to update:** ~20 pages
**Total time:** 1-2 hours

---

## ✨ Result

Clean, maintainable, professional code that's easy to understand and modify!
