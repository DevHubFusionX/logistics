import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../components/common'
import { AppLayout } from '../components/dashboard'

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

// Public Pages (Eager load for SEO)
import Home from '../pages/Home'
import Services from '../pages/Services'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Tracking from '../pages/Tracking'

// Auth Pages (Eager load)
import SignUp from '../pages/auth/SignUp'
import Login from '../pages/auth/Login'

// Lazy Load Dashboard Pages
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Shipments = lazy(() => import('../pages/shipments/Shipments'))
const Fleet = lazy(() => import('../pages/Fleet'))
const RoutesPage = lazy(() => import('../pages/Routes'))
const Warehouses = lazy(() => import('../pages/Warehouses'))
const Orders = lazy(() => import('../pages/Orders'))
const Customers = lazy(() => import('../pages/Customers'))
const Drivers = lazy(() => import('../pages/Drivers'))
const Trips = lazy(() => import('../pages/Trips'))
const Reports = lazy(() => import('../pages/Reports'))
const Alerts = lazy(() => import('../pages/Alerts'))
const Tasks = lazy(() => import('../pages/Tasks'))
const Temperature = lazy(() => import('../pages/Temperature'))
const Payments = lazy(() => import('../pages/Payments'))
const Settings = lazy(() => import('../pages/Settings'))
const UserRoles = lazy(() => import('../pages/UserRoles'))
const PricingManagement = lazy(() => import('../pages/PricingManagement'))
const BookingsManagement = lazy(() => import('../pages/BookingsManagement'))
const Reconciliation = lazy(() => import('../pages/Reconciliation'))
const User = lazy(() => import('../pages/User'))

// Lazy Load Booking & Tracking
const BookingRequest = lazy(() => import('../pages/booking/BookingRequest'))
const Quotation = lazy(() => import('../pages/booking/Quotation'))
const Payment = lazy(() => import('../pages/booking/Payment'))
const Confirmation = lazy(() => import('../pages/booking/Confirmation'))
const TrackShipment = lazy(() => import('../pages/tracking/TrackShipment'))
const Invoice = lazy(() => import('../pages/tracking/Invoice'))
const ShipmentTracking = lazy(() => import('../pages/tracking/ShipmentTracking'))

// Lazy Load User Pages
const ManageProfile = lazy(() => import('../pages/ManageProfile'))
const MyBookings = lazy(() => import('../pages/MyBookings'))
const BookingStatusGuide = lazy(() => import('../pages/BookingStatusGuide'))
const AddressBook = lazy(() => import('../pages/AddressBook'))
const MyTemperature = lazy(() => import('../pages/MyTemperature'))
const Support = lazy(() => import('../pages/Support'))
const MyAnalytics = lazy(() => import('../pages/MyAnalytics'))
const DriverApp = lazy(() => import('../pages/DriverApp'))
const PaymentHistory = lazy(() => import('../pages/PaymentHistory'))
const BookingCalculatorPage = lazy(() => import('../pages/BookingCalculatorPage'))

// Lazy Load Public Pages
const Portfolio = lazy(() => import('../pages/Portfolio'))
const Team = lazy(() => import('../pages/Team'))
const Blog = lazy(() => import('../pages/Blog'))
const Contact = lazy(() => import('../pages/Contact'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))
const VerifyOTP = lazy(() => import('../pages/auth/VerifyOTP'))

const DashboardRoute = ({ children }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
)

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOTP />} />

        {/* Public Tracking Route */}
        <Route path="/tracking" element={<Tracking />} />

        {/* Booking Routes */}
        <Route path="/booking/request" element={<DashboardRoute><BookingRequest /></DashboardRoute>} />
        <Route path="/booking/quotation" element={<DashboardRoute><Quotation /></DashboardRoute>} />
        <Route path="/booking/payment" element={<DashboardRoute><Payment /></DashboardRoute>} />
        <Route path="/booking/confirmation" element={<DashboardRoute><Confirmation /></DashboardRoute>} />

        {/* Tracking Routes */}
        <Route path="/booking-calculator" element={<BookingCalculatorPage />} />
        <Route path="/tracking/track" element={<DashboardRoute><TrackShipment /></DashboardRoute>} />
        <Route path="/tracking/:id" element={<DashboardRoute><ShipmentTracking /></DashboardRoute>} />
        <Route path="/driver-app" element={<DashboardRoute><DriverApp /></DashboardRoute>} />
        <Route path="/tracking/invoice" element={<DashboardRoute><Invoice /></DashboardRoute>} />
        <Route path="/tracking/invoice/:id" element={<DashboardRoute><Invoice /></DashboardRoute>} />


        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
        <Route path="/dashboard/overview" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
        <Route path="/shipments" element={<DashboardRoute><Shipments /></DashboardRoute>} />
        <Route path="/shipments/*" element={<DashboardRoute><Shipments /></DashboardRoute>} />
        <Route path="/fleet" element={<DashboardRoute><Fleet /></DashboardRoute>} />
        <Route path="/routes" element={<DashboardRoute><RoutesPage /></DashboardRoute>} />
        <Route path="/warehouses" element={<DashboardRoute><Warehouses /></DashboardRoute>} />
        <Route path="/warehouses/*" element={<DashboardRoute><Warehouses /></DashboardRoute>} />
        <Route path="/orders" element={<DashboardRoute><Orders /></DashboardRoute>} />
        <Route path="/customers" element={<DashboardRoute><Customers /></DashboardRoute>} />
        <Route path="/drivers" element={<DashboardRoute><Drivers /></DashboardRoute>} />
        <Route path="/trips" element={<DashboardRoute><Trips /></DashboardRoute>} />
        <Route path="/analytics" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
        <Route path="/reports" element={<DashboardRoute><Reports /></DashboardRoute>} />
        <Route path="/alerts" element={<DashboardRoute><Alerts /></DashboardRoute>} />
        <Route path="/tasks" element={<DashboardRoute><Tasks /></DashboardRoute>} />
        <Route path="/temperature" element={<DashboardRoute><Temperature /></DashboardRoute>} />
        <Route path="/payments" element={<DashboardRoute><Payments /></DashboardRoute>} />
        <Route path="/payments/reconciliation" element={<DashboardRoute><Reconciliation /></DashboardRoute>} />
        <Route path="/pricing-management" element={<DashboardRoute><PricingManagement /></DashboardRoute>} />
        <Route path="/bookings-management" element={<DashboardRoute><BookingsManagement /></DashboardRoute>} />
        <Route path="/integrations" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
        <Route path="/settings" element={<DashboardRoute><Settings /></DashboardRoute>} />
        <Route path="/settings/*" element={<DashboardRoute><Settings /></DashboardRoute>} />
        <Route path="/settings/roles" element={<DashboardRoute><UserRoles /></DashboardRoute>} />
        <Route path="/help" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
        <Route path="/user" element={<DashboardRoute><User /></DashboardRoute>} />




        {/* User Routes */}
        <Route path="/profile" element={<ProtectedRoute><ManageProfile /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<DashboardRoute><MyBookings /></DashboardRoute>} />
        <Route path="/payment-history" element={<DashboardRoute><PaymentHistory /></DashboardRoute>} />
        <Route path="/my-temperature" element={<DashboardRoute><MyTemperature /></DashboardRoute>} />
        <Route path="/my-analytics" element={<DashboardRoute><MyAnalytics /></DashboardRoute>} />
        <Route path="/support" element={<DashboardRoute><Support /></DashboardRoute>} />
        <Route path="/booking-status-guide" element={<DashboardRoute><BookingStatusGuide /></DashboardRoute>} />
        <Route path="/address-book" element={<DashboardRoute><AddressBook /></DashboardRoute>} />

        {/* 404 Not Found - Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}