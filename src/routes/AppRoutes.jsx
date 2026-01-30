import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../components/common'
import PublicLayout from '../components/layout/PublicLayout'
import AuthLayout from '../components/layout/AuthLayout'
import DashboardLayout from '../components/layout/DashboardLayout'

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

// Public Pages (Eager load for SEO)
import Home from '../pages/public/Home'
import Services from '../pages/public/Services'
import About from '../pages/public/About'
import NotFound from '../pages/public/NotFound'
import Tracking from '../pages/public/Tracking'

// Auth Pages (Eager load)
import SignUp from '../pages/auth/SignUp'
import Login from '../pages/auth/Login'

// Lazy Load Dashboard Pages
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'))
const Shipments = lazy(() => import('../pages/shipments/Shipments'))
const Fleet = lazy(() => import('../pages/dashboard/Fleet'))
const RoutesPage = lazy(() => import('../pages/dashboard/Routes'))
const Warehouses = lazy(() => import('../pages/dashboard/Warehouses'))
const Orders = lazy(() => import('../pages/dashboard/Orders'))
const Customers = lazy(() => import('../pages/admin/Customers'))
const Drivers = lazy(() => import('../pages/admin/Drivers'))
const Trips = lazy(() => import('../pages/dashboard/Trips'))
const Reports = lazy(() => import('../pages/dashboard/Reports'))
const Alerts = lazy(() => import('../pages/dashboard/Alerts'))
const Tasks = lazy(() => import('../pages/dashboard/Tasks'))
const Temperature = lazy(() => import('../pages/dashboard/Temperature'))
const Payments = lazy(() => import('../pages/dashboard/Payments'))
const Settings = lazy(() => import('../pages/dashboard/Settings'))
const UserRoles = lazy(() => import('../pages/admin/UserRoles'))
const PricingManagement = lazy(() => import('../pages/admin/PricingManagement'))
const BookingsManagement = lazy(() => import('../pages/admin/BookingsManagement'))
const Reconciliation = lazy(() => import('../pages/admin/Reconciliation'))
const User = lazy(() => import('../pages/user/User'))

// Lazy Load Booking & Tracking
const BookingRequest = lazy(() => import('../pages/booking/BookingRequest'))
const Quotation = lazy(() => import('../pages/booking/Quotation'))
const Payment = lazy(() => import('../pages/booking/Payment'))
const Confirmation = lazy(() => import('../pages/booking/Confirmation'))
const TrackShipment = lazy(() => import('../pages/tracking/TrackShipment'))
const Invoice = lazy(() => import('../pages/tracking/Invoice'))
const ShipmentTracking = lazy(() => import('../pages/tracking/ShipmentTracking'))

// Lazy Load User Pages
const ManageProfile = lazy(() => import('../pages/user/ManageProfile'))
const MyBookings = lazy(() => import('../pages/user/MyBookings'))
const BookingStatusGuide = lazy(() => import('../pages/user/BookingStatusGuide'))
const AddressBook = lazy(() => import('../pages/user/AddressBook'))
const MyTemperature = lazy(() => import('../pages/user/MyTemperature'))
const Support = lazy(() => import('../pages/user/Support'))
const MyAnalytics = lazy(() => import('../pages/user/MyAnalytics'))
const DriverApp = lazy(() => import('../pages/user/DriverApp'))
const PaymentHistory = lazy(() => import('../pages/user/PaymentHistory'))
const BookingCalculatorPage = lazy(() => import('../pages/public/BookingCalculatorPage'))

// Lazy Load Public Pages
const Portfolio = lazy(() => import('../pages/public/Portfolio'))
const Team = lazy(() => import('../pages/public/Team'))
const Blog = lazy(() => import('../pages/public/Blog'))
const Contact = lazy(() => import('../pages/public/Contact'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))
const VerifyOTP = lazy(() => import('../pages/auth/VerifyOTP'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes with Navbar/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/booking-calculator" element={<BookingCalculatorPage />} />
        </Route>

        {/* Auth Routes - No Navbar/Footer, specialized layout */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/verify-otp" element={<VerifyOTP />} />
        </Route>

        {/* Dashboard & Protected Routes - Uses AppLayout with Sidebar */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          {/* Booking Routes */}
          <Route path="/booking/request" element={<BookingRequest />} />
          <Route path="/booking/quotation" element={<Quotation />} />
          <Route path="/booking/payment" element={<Payment />} />
          <Route path="/booking/confirmation" element={<Confirmation />} />

          {/* Tracking Routes */}
          <Route path="/tracking/track" element={<TrackShipment />} />
          <Route path="/tracking/:id" element={<ShipmentTracking />} />
          <Route path="/driver-app" element={<DriverApp />} />
          <Route path="/tracking/invoice" element={<Invoice />} />
          <Route path="/tracking/invoice/:id" element={<Invoice />} />

          {/* Core Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/overview" element={<Dashboard />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/shipments/*" element={<Shipments />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/warehouses/*" element={<Warehouses />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/reconciliation" element={<Reconciliation />} />
          <Route path="/pricing-management" element={<PricingManagement />} />
          <Route path="/bookings-management" element={<BookingsManagement />} />
          <Route path="/integrations" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/settings/roles" element={<UserRoles />} />
          <Route path="/help" element={<Dashboard />} />
          <Route path="/user" element={<User />} />

          {/* User Specific Routes */}
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/my-temperature" element={<MyTemperature />} />
          <Route path="/my-analytics" element={<MyAnalytics />} />
          <Route path="/support" element={<Support />} />
          <Route path="/booking-status-guide" element={<BookingStatusGuide />} />
          <Route path="/address-book" element={<AddressBook />} />
        </Route>

        {/* 404 Not Found - Catch all */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Suspense>
  )
}