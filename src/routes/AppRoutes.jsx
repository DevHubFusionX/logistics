import { lazy, Suspense } from 'react'
import { useRoutes, Outlet } from 'react-router-dom'
import { ProtectedRoute } from '../components/common'
import PublicLayout from '../components/layout/PublicLayout'
import AuthLayout from '../components/layout/AuthLayout'
import DashboardLayout from '../components/layout/DashboardLayout'
import ScrollToTop from '../components/common/ScrollToTop'

// Common Loading Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-sky-100 border-t-sky-600 animate-spin" />
      <span className="text-xs text-sky-700 font-semibold tracking-wide">Loading…</span>
    </div>
  </div>
)

// Shared Suspense Wrapper
const SuspenseLayout = () => (
  <Suspense fallback={<PageLoader />}>
    <Outlet />
  </Suspense>
)

// ============================================================================
// LAZY COMPONENT IMPORTS (Grouped logically)
// ============================================================================

// --- Public Pages ---
const Home = lazy(() => import('../pages/public/Home'))
const Services = lazy(() => import('../pages/public/Services'))
const About = lazy(() => import('../pages/public/About'))
const NotFound = lazy(() => import('../pages/public/NotFound'))
const Tracking = lazy(() => import('../pages/public/Tracking'))
const BookingCalculatorPage = lazy(() => import('../pages/public/BookingCalculatorPage'))
const Portfolio = lazy(() => import('../pages/public/Portfolio'))
const Team = lazy(() => import('../pages/public/Team'))
const Blog = lazy(() => import('../pages/public/Blog'))
const BlogPost = lazy(() => import('../pages/public/BlogPost'))
const Contact = lazy(() => import('../pages/public/Contact'))
const Privacy = lazy(() => import('../pages/public/Privacy'))

// --- Auth Pages ---
const SignUp = lazy(() => import('../pages/auth/SignUp'))
const MobileSignUp = lazy(() => import('../pages/auth/MobileSignUp'))
const Login = lazy(() => import('../pages/auth/Login'))
const AdminLogin = lazy(() => import('../pages/auth/AdminLogin'))
const ManagerLogin = lazy(() => import('../pages/auth/ManagerLogin'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))
const VerifyEmail = lazy(() => import('../pages/auth/VerifyEmail'))
const VerifyOTP = lazy(() => import('../pages/auth/VerifyOTP'))

// --- Customer Dashboard Pages ---
const BookingRequest = lazy(() => import('../pages/booking/BookingRequest'))
const Quotation = lazy(() => import('../pages/booking/Quotation'))
const Payment = lazy(() => import('../pages/booking/Payment'))
const Confirmation = lazy(() => import('../pages/booking/Confirmation'))
const TrackShipment = lazy(() => import('../pages/tracking/TrackShipment'))
const ShipmentTracking = lazy(() => import('../pages/tracking/ShipmentTracking'))
const DriverApp = lazy(() => import('../pages/user/DriverApp'))
const Invoice = lazy(() => import('../pages/tracking/Invoice'))
const ManageProfile = lazy(() => import('../pages/user/ManageProfile'))
const MyBookings = lazy(() => import('../pages/user/MyBookings'))
const PaymentHistory = lazy(() => import('../pages/user/PaymentHistory'))
const MyTemperature = lazy(() => import('../pages/user/MyTemperature'))
const MyAnalytics = lazy(() => import('../pages/user/MyAnalytics'))
const Support = lazy(() => import('../pages/user/Support'))
const TicketDetail = lazy(() => import('../pages/user/TicketDetail'))
const BookingStatusGuide = lazy(() => import('../pages/user/BookingStatusGuide'))
const AddressBook = lazy(() => import('../pages/user/AddressBook'))

// --- Admin Dashboard Pages ---
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

// ============================================================================
// ROUTE CONFIGURATION TREE
// ============================================================================

const routesConfig = [
  // 1. Public Pages (Shared layout, covered by single Suspense)
  {
    element: <Suspense fallback={<PageLoader />}><PublicLayout /></Suspense>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/services', element: <Services /> },
      { path: '/about', element: <About /> },
      { path: '/portfolio', element: <Portfolio /> },
      { path: '/team', element: <Team /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:slug', element: <BlogPost /> },
      { path: '/contact', element: <Contact /> },
      { path: '/tracking', element: <Tracking /> },
      { path: '/booking-calculator', element: <BookingCalculatorPage /> },
      { path: '/privacy', element: <Privacy /> }
    ]
  },

  // 2. Auth Pages (Shared layout, covered by single Suspense)
  {
    element: <Suspense fallback={<PageLoader />}><AuthLayout /></Suspense>,
    children: [
      { path: '/auth/signup', element: <SignUp /> },
      { path: '/sign-up/mobile/user', element: <MobileSignUp /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/admin/login', element: <AdminLogin /> },
      { path: '/auth/admin/managers/login', element: <ManagerLogin /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/reset-password', element: <ResetPassword /> },
      { path: '/auth/verify-email', element: <VerifyEmail /> },
      { path: '/auth/verify-otp', element: <VerifyOTP /> }
    ]
  },

  // 3. Customer Dashboard Routes (Protected, nested Suspense inside layout)
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <SuspenseLayout />,
        children: [
          { path: '/booking/request', element: <BookingRequest /> },
          { path: '/booking/quotation', element: <Quotation /> },
          { path: '/booking/payment', element: <Payment /> },
          { path: '/booking/confirmation', element: <Confirmation /> },
          { path: '/tracking/track', element: <TrackShipment /> },
          { path: '/tracking/:id', element: <ShipmentTracking /> },
          { path: '/driver-app', element: <DriverApp /> },
          { path: '/tracking/invoice', element: <Invoice /> },
          { path: '/tracking/invoice/:id', element: <Invoice /> },
          { path: '/profile', element: <ManageProfile /> },
          { path: '/my-bookings', element: <MyBookings /> },
          { path: '/payment-history', element: <PaymentHistory /> },
          { path: '/my-temperature', element: <MyTemperature /> },
          { path: '/my-analytics', element: <MyAnalytics /> },
          { path: '/support', element: <Support /> },
          { path: '/support/:ticketId', element: <TicketDetail /> },
          { path: '/booking-status-guide', element: <BookingStatusGuide /> },
          { path: '/address-book', element: <AddressBook /> }
        ]
      }
    ]
  },

  // 4. Admin Dashboard Routes (Protected, nested Suspense inside layouts)
  {
    element: (
      <ProtectedRoute allowedRoles={['Super Admin', 'admin', 'Dispatcher', 'Admin Manager', 'manager']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // Base Admin Pages
      {
        element: <SuspenseLayout />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/dashboard/overview', element: <Dashboard /> },
          { path: '/admin/orders-list', element: <OrdersTable /> },
          { path: '/temperature', element: <Temperature /> },
          { path: '/pricing-management', element: <PricingManagement /> },
          { path: '/user', element: <User /> }
        ]
      },
      // Admin/Dispatcher/Manager Core Operations
      {
        element: (
          <ProtectedRoute allowedRoles={['Super Admin', 'admin', 'Dispatcher']}>
            <SuspenseLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: '/fleet', element: <Fleet /> },
          { path: '/shipments', element: <Shipments /> },
          { path: '/shipments/*', element: <Shipments /> },
          { path: '/routes', element: <RoutesPage /> },
          { path: '/warehouses', element: <Warehouses /> },
          { path: '/warehouses/*', element: <Warehouses /> },
          { path: '/orders', element: <Orders /> },
          { path: '/customers', element: <Customers /> },
          { path: '/trips', element: <Trips /> },
          { path: '/reports', element: <Reports /> },
          { path: '/alerts', element: <Alerts /> },
          { path: '/tasks', element: <Tasks /> },
          { path: '/payments', element: <Payments /> },
          { path: '/payments/reconciliation', element: <Reconciliation /> },
          { path: '/bookings-management', element: <BookingsManagement /> },
          { path: '/admin/customers/:id/bookings', element: <AdminUserBookings /> },
          { path: '/settings', element: <Settings /> },
          { path: '/settings/*', element: <Settings /> }
        ]
      },
      // Super Admin / Admin Settings Roles
      {
        path: '/settings/roles',
        element: (
          <ProtectedRoute allowedRoles={['Super Admin', 'admin']}>
            <SuspenseLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <UserRoles /> }
        ]
      },
      // Super Admin / Admin / Dispatcher Drivers Management
      {
        path: '/drivers',
        element: (
          <ProtectedRoute allowedRoles={['Super Admin', 'admin', 'Dispatcher']}>
            <SuspenseLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Drivers /> }
        ]
      }
    ]
  },

  // 5. Wildcard 404 Route (Direct full screen rendering)
  {
    path: '*',
    element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense>
  }
]

export default function AppRoutes() {
  const routesElement = useRoutes(routesConfig)
  return (
    <>
      <ScrollToTop />
      {routesElement}
    </>
  )
}