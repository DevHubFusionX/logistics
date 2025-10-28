import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AppLayout from '../components/dashboard/layout/AppLayout'

// Public Pages
import Home from '../pages/Home'
import Services from '../pages/Services'
import Pricing from '../pages/Pricing'
import About from '../pages/About'
import Portfolio from '../pages/Portfolio'
import Team from '../pages/Team'
import Blog from '../pages/Blog'
import Contact from '../pages/Contact'

// Auth Pages
import SignUp from '../pages/auth/SignUp'
import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'
import VerifyOTP from '../pages/auth/VerifyOTP'

// Onboarding Pages


// Dashboard Pages
import Dashboard from '../pages/Dashboard'
import Shipments from '../pages/shipments/Shipments'
import Fleet from '../pages/Fleet'
import RoutesPage from '../pages/Routes'
import Warehouses from '../pages/Warehouses'
import Orders from '../pages/Orders'
import Customers from '../pages/Customers'


// Booking & Tracking Pages
import BookingRequest from '../pages/booking/BookingRequest'
import Quotation from '../pages/booking/Quotation'
import Payment from '../pages/booking/Payment'
import Confirmation from '../pages/booking/Confirmation'
import TrackShipment from '../pages/tracking/TrackShipment'
import Invoice from '../pages/tracking/Invoice'

// User Pages
import ManageProfile from '../pages/ManageProfile'
import Reports from '../pages/Reports'
import Alerts from '../pages/Alerts'
import Tasks from '../pages/Tasks'
import Drivers from '../pages/Drivers'
import Trips from '../pages/Trips'
import User from '../pages/User'
import Temperature from '../pages/Temperature'
import Payments from '../pages/Payments'
import Reconciliation from '../pages/Reconciliation'
import Settings from '../pages/Settings'
import UserRoles from '../pages/UserRoles'
import PricingManagement from '../pages/PricingManagement'
import BookingsManagement from '../pages/BookingsManagement'
import ShipmentTracking from '../pages/tracking/ShipmentTracking'
import DriverApp from '../pages/DriverApp'
import MyBookings from '../pages/MyBookings'
import BookingStatusGuide from '../pages/BookingStatusGuide'

const DashboardRoute = ({ children }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
)

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/pricing" element={<Pricing />} />
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
      
      {/* Booking Routes */}
      <Route path="/booking/request" element={<DashboardRoute><BookingRequest /></DashboardRoute>} />
      <Route path="/booking/quotation" element={<DashboardRoute><Quotation /></DashboardRoute>} />
      <Route path="/booking/payment" element={<DashboardRoute><Payment /></DashboardRoute>} />
      <Route path="/booking/confirmation" element={<DashboardRoute><Confirmation /></DashboardRoute>} />
      
      {/* Tracking Routes */}
      <Route path="/tracking/track" element={<DashboardRoute><TrackShipment /></DashboardRoute>} />
      <Route path="/tracking/:id" element={<DashboardRoute><ShipmentTracking /></DashboardRoute>} />
      <Route path="/driver-app" element={<DashboardRoute><DriverApp /></DashboardRoute>} />
      <Route path="/tracking/invoice" element={<DashboardRoute><Invoice /></DashboardRoute>} />
      <Route path="/tracking/invoice/:id" element={<DashboardRoute><Invoice /></DashboardRoute>} />
      
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
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
      <Route path="/booking-status-guide" element={<DashboardRoute><BookingStatusGuide /></DashboardRoute>} />
      
    </Routes>
  )
}