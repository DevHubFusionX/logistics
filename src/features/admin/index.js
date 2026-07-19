// ── Services ─────────────────────────────────────────────────────────────────
export { default as adminService }         from './services/adminService'
export { default as adminOrderService }    from './services/adminOrderService'
export { default as clientService }        from './services/clientService'
export { default as driverService }        from './services/driverService'
export { default as fleetService }         from './services/fleetService'
export { default as tripService }          from './services/tripService'
export { default as reportService }        from './services/reportService'
export { default as reconciliationService} from './services/reconciliationService'
export { default as pricingService }       from './services/pricingService'

// ── Hooks ─────────────────────────────────────────────────────────────────────
export {
  useCustomersQuery,
  useClientShipmentsQuery,
  useDriversQuery,
  useDriverQuery,
  useDriverTripsQuery,
  useManagersQuery,
  useFleetQuery,
  useTripsQuery,
  usePricingRulesQuery,
  useClientOverridesQuery,
  usePricingAuditQuery,
  usePricingMutations,
  useMoneyAnalyticsQuery,
  useOrderAnalyticsQuery,
  useTruckAnalyticsQuery,
  useAdminMutations,
} from './hooks/queries/useAdminQueries'

export {
  useOrderQuery,
  useOrdersTableQuery,
  useOrderMutations,
} from './hooks/queries/useOrderQueries'

// ── Pages ─────────────────────────────────────────────────────────────────────
export { default as AdminTrips }          from './pages/trips/AdminTrips'
export { default as AdminUserBookings }   from './pages/bookings/AdminUserBookings'
export { default as BookingsManagement }  from './pages/bookings/BookingsManagement'
export { default as Customers }           from './pages/customers/Customers'
export { default as Drivers }             from './pages/drivers/Drivers'
export { default as OrdersTable }         from './pages/orders/OrdersTable'
export { default as PricingManagement }   from './pages/pricing/PricingManagement'
export { default as Reconciliation }      from './pages/payments/Reconciliation'
export { default as UserRoles }           from './pages/users/UserRoles'

// ── Booking Components ────────────────────────────────────────────────────────
export { default as AssignDriverModal }   from './components/bookings/AssignDriverModal'
export { default as BookingCard }         from './components/bookings/BookingCard'
export { default as BookingCancellation } from './components/bookings/BookingCancellation'
export { default as BookingDetailsModal } from './components/bookings/BookingDetailsModal'
export { default as BookingFilters }      from './components/bookings/BookingFilters'
export { default as BookingModification } from './components/bookings/BookingModification'
export { default as BookingStats }        from './components/bookings/BookingStats'
export { default as EmptyBookings }       from './components/bookings/EmptyBookings'
export { default as MetricCard }          from './components/bookings/MetricCard'
export { default as PaymentSelectionModal } from './components/bookings/PaymentSelectionModal'
export { default as PriceCalculator }     from './components/bookings/PriceCalculator'

// ── Driver Components ─────────────────────────────────────────────────────────
export { default as DriverCard }          from './components/drivers/DriverCard'
export { default as DriverFilters }       from './components/drivers/DriverFilters'
export { default as DriverStats }         from './components/drivers/DriverStats'
export { default as DriverTable }         from './components/drivers/DriverTable'
export { default as AddDriverModal }      from './components/drivers/AddDriverModal'
export { default as DriverModal }         from './components/drivers/DriverModal/index'

// ── Fleet Components ──────────────────────────────────────────────────────────
export { default as AddTruckModal }       from './components/fleet/AddTruckModal'
export { default as FleetFilters }        from './components/fleet/FleetFilters'
export { default as FleetMetrics }        from './components/fleet/FleetMetrics'
export { default as MaintenanceCalendar } from './components/fleet/MaintenanceCalendar'
export { default as TruckDetailModal }    from './components/fleet/TruckDetailModal'

// ── Order Components ──────────────────────────────────────────────────────────
export { default as OrderDetailsModal }   from './components/orders/OrderDetailsModal'
export { default as OrderFormModal }      from './components/orders/OrderFormModal'
export { default as OrdersTableRow }      from './components/orders/OrdersTableRow'

// ── Settings Components ───────────────────────────────────────────────────────
export { default as AuditLogs }           from './components/settings/AuditLogs'
export { default as CreateManagerModal }  from './components/settings/CreateManagerModal'
export { default as IntegrationsSettings} from './components/settings/IntegrationsSettings'
export { default as ManagersSettings }    from './components/settings/ManagersSettings'
export { default as NotificationsSettings } from './components/settings/NotificationsSettings'
export { default as SystemSettings }      from './components/settings/SystemSettings'
export { default as TemperatureThresholds } from './components/settings/TemperatureThresholds'

// ── User Components ───────────────────────────────────────────────────────────
export { default as ActivityLogs }        from './components/users/ActivityLogs'
export { default as RolesCard }           from './components/users/RolesCard'
export { default as UserModal }           from './components/users/UserModal'
export { default as UsersTable }          from './components/users/UsersTable'
