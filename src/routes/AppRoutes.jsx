import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../components/common'
import PublicLayout from '../components/layout/PublicLayout'
import AuthLayout from '../components/layout/AuthLayout'
import DashboardLayout from '../components/layout/DashboardLayout'
import ScrollToTop from '../components/common/ScrollToTop'

// Loading Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-sky-100 border-t-sky-600 animate-spin" />
      <span className="text-xs text-sky-700 font-semibold tracking-wide">Loading…</span>
    </div>
  </div>
)

// Public Pages — lazy loaded, SEO handled by react-helmet in each page
const Home = lazy(() => import('../pages/public/Home'))
const Services = lazy(() => import('../pages/public/Services'))
const About = lazy(() => import('../pages/public/About'))
const NotFound = lazy(() => import('../pages/public/NotFound'))
const Tracking = lazy(() => import('../pages/public/Tracking'))

// Auth Pages
const SignUp = lazy(() => import('../pages/auth/SignUp'))
const Login = lazy(() => import('../pages/auth/Login'))

// Lazy Load Dashboard Pages
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'))
const Shipments = lazy(() => import('../pages/shipments/Shipments'))
const Fleet = lazy(() => import('../pages/dashboard/Fleet'))
const RoutesPage = lazy(() => import('../pages/dashboard/Routes'))
const Warehouses = lazy(() => import('../pages/dashboard/Warehouses'))
const Orders = lazy(() => import('../pages/dashboard/Orders'))
const OrdersTable = lazy(() => import('../pages/admin/OrdersTable'))
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
const AdminUserBookings = lazy(() => import('../pages/admin/AdminUserBookings'))
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
const TicketDetail = lazy(() => import('../pages/user/TicketDetail'))
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
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))
const VerifyOTP = lazy(() => import('../pages/auth/VerifyOTP'))

const AdminLogin = lazy(() => import('../pages/auth/AdminLogin'))
const ManagerLogin = lazy(() => import('../pages/auth/ManagerLogin'))

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="/services" element={<Suspense fallback={<PageLoader />}><Services /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="/portfolio" element={<Suspense fallback={<PageLoader />}><Portfolio /></Suspense>} />
          <Route path="/team" element={<Suspense fallback={<PageLoader />}><Team /></Suspense>} />
          <Route path="/blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="/tracking" element={<Suspense fallback={<PageLoader />}><Tracking /></Suspense>} />
          <Route path="/booking-calculator" element={<Suspense fallback={<PageLoader />}><BookingCalculatorPage /></Suspense>} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/signup" element={<Suspense fallback={<PageLoader />}><SignUp /></Suspense>} />
          <Route path="/auth/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
          <Route path="/auth/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
          <Route path="/auth/admin/managers/login" element={<Suspense fallback={<PageLoader />}><ManagerLogin /></Suspense>} />
          <Route path="/auth/forgot-password" element={<Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense>} />
          <Route path="/auth/reset-password" element={<Suspense fallback={<PageLoader />}><ResetPassword /></Suspense>} />
          <Route path="/auth/verify-otp" element={<Suspense fallback={<PageLoader />}><VerifyOTP /></Suspense>} />
        </Route>

        {/* Dashboard & Protected Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/booking/request" element={<Suspense fallback={<PageLoader />}><BookingRequest /></Suspense>} />
          <Route path="/booking/quotation" element={<Suspense fallback={<PageLoader />}><Quotation /></Suspense>} />
          <Route path="/booking/payment" element={<Suspense fallback={<PageLoader />}><Payment /></Suspense>} />
          <Route path="/booking/confirmation" element={<Suspense fallback={<PageLoader />}><Confirmation /></Suspense>} />
          <Route path="/tracking/track" element={<Suspense fallback={<PageLoader />}><TrackShipment /></Suspense>} />
          <Route path="/tracking/:id" element={<Suspense fallback={<PageLoader />}><ShipmentTracking /></Suspense>} />
          <Route path="/driver-app" element={<Suspense fallback={<PageLoader />}><DriverApp /></Suspense>} />
          <Route path="/tracking/invoice" element={<Suspense fallback={<PageLoader />}><Invoice /></Suspense>} />
          <Route path="/tracking/invoice/:id" element={<Suspense fallback={<PageLoader />}><Invoice /></Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<PageLoader />}><ManageProfile /></Suspense>} />
          <Route path="/my-bookings" element={<Suspense fallback={<PageLoader />}><MyBookings /></Suspense>} />
          <Route path="/payment-history" element={<Suspense fallback={<PageLoader />}><PaymentHistory /></Suspense>} />
          <Route path="/my-temperature" element={<Suspense fallback={<PageLoader />}><MyTemperature /></Suspense>} />
          <Route path="/my-analytics" element={<Suspense fallback={<PageLoader />}><MyAnalytics /></Suspense>} />
          <Route path="/support" element={<Suspense fallback={<PageLoader />}><Support /></Suspense>} />
          <Route path="/support/:ticketId" element={<Suspense fallback={<PageLoader />}><TicketDetail /></Suspense>} />
          <Route path="/booking-status-guide" element={<Suspense fallback={<PageLoader />}><BookingStatusGuide /></Suspense>} />
          <Route path="/address-book" element={<Suspense fallback={<PageLoader />}><AddressBook /></Suspense>} />
        </Route>

        {/* Admin Dashboard Protected Routes */}
        <Route element={
          <ProtectedRoute allowedRoles={['Super Admin', 'admin', 'Dispatcher', 'Admin Manager', 'manager']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
          <Route path="/dashboard/overview" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
          <Route path="/admin/orders-list" element={<Suspense fallback={<PageLoader />}><OrdersTable /></Suspense>} />
          <Route path="/temperature" element={<Suspense fallback={<PageLoader />}><Temperature /></Suspense>} />
          <Route path="/pricing-management" element={<Suspense fallback={<PageLoader />}><PricingManagement /></Suspense>} />
          <Route path="/user" element={<Suspense fallback={<PageLoader />}><User /></Suspense>} />

          <Route element={<ProtectedRoute allowedRoles={['Super Admin', 'admin', 'Dispatcher']} />}>
            <Route path="/fleet" element={<Suspense fallback={<PageLoader />}><Fleet /></Suspense>} />
            <Route path="/shipments" element={<Suspense fallback={<PageLoader />}><Shipments /></Suspense>} />
            <Route path="/shipments/*" element={<Suspense fallback={<PageLoader />}><Shipments /></Suspense>} />
            <Route path="/routes" element={<Suspense fallback={<PageLoader />}><RoutesPage /></Suspense>} />
            <Route path="/warehouses" element={<Suspense fallback={<PageLoader />}><Warehouses /></Suspense>} />
            <Route path="/warehouses/*" element={<Suspense fallback={<PageLoader />}><Warehouses /></Suspense>} />
            <Route path="/orders" element={<Suspense fallback={<PageLoader />}><Orders /></Suspense>} />
            <Route path="/customers" element={<Suspense fallback={<PageLoader />}><Customers /></Suspense>} />
            <Route path="/trips" element={<Suspense fallback={<PageLoader />}><Trips /></Suspense>} />
            <Route path="/reports" element={<Suspense fallback={<PageLoader />}><Reports /></Suspense>} />
            <Route path="/alerts" element={<Suspense fallback={<PageLoader />}><Alerts /></Suspense>} />
            <Route path="/tasks" element={<Suspense fallback={<PageLoader />}><Tasks /></Suspense>} />
            <Route path="/payments" element={<Suspense fallback={<PageLoader />}><Payments /></Suspense>} />
            <Route path="/payments/reconciliation" element={<Suspense fallback={<PageLoader />}><Reconciliation /></Suspense>} />
            <Route path="/bookings-management" element={<Suspense fallback={<PageLoader />}><BookingsManagement /></Suspense>} />
            <Route path="/admin/customers/:id/bookings" element={<Suspense fallback={<PageLoader />}><AdminUserBookings /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<PageLoader />}><Settings /></Suspense>} />
            <Route path="/settings/*" element={<Suspense fallback={<PageLoader />}><Settings /></Suspense>} />
          </Route>

          <Route path="/settings/roles" element={
            <ProtectedRoute allowedRoles={['Super Admin', 'admin']}>
              <Suspense fallback={<PageLoader />}><UserRoles /></Suspense>
            </ProtectedRoute>
          } />

          <Route path="/drivers" element={
            <ProtectedRoute allowedRoles={['Super Admin', 'admin', 'Dispatcher']}>
              <Suspense fallback={<PageLoader />}><Drivers /></Suspense>
            </ProtectedRoute>
          } />
        </Route>

        <Route path="*" element={<PublicLayout><Suspense fallback={<PageLoader />}><NotFound /></Suspense></PublicLayout>} />
      </Routes>
    </>
  )
}