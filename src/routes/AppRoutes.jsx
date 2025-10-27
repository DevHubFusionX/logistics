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
import ProfileSetup from '../pages/onboarding/ProfileSetup'
import KYCPending from '../pages/onboarding/KYCPending'
import KYCRejected from '../pages/onboarding/KYCRejected'

// Dashboard Pages
import Dashboard from '../pages/Dashboard'
import Shipments from '../pages/shipments/Shipments'
import Fleet from '../pages/fleet/Fleet'
import RoutesPage from '../pages/Routes'
import Warehouses from '../pages/Warehouses'
import Orders from '../pages/Orders'
import Customers from '../pages/Customers'

// Booking Pages
import BookingRequest from '../pages/booking/BookingRequest'
import Quotation from '../pages/booking/Quotation'
import Payment from '../pages/booking/Payment'
import Confirmation from '../pages/booking/Confirmation'

// Tracking Pages
import TrackShipment from '../pages/tracking/TrackShipment'
import Invoice from '../pages/tracking/Invoice'

// User Pages
import ManageProfile from '../pages/ManageProfile'
import MyBookings from '../pages/MyBookings'
import BookingDetail from '../pages/BookingDetail'
import Reports from '../pages/Reports'
import Alerts from '../pages/Alerts'
import Tasks from '../pages/Tasks'
import User from '../pages/User'

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
      
      {/* Onboarding Routes */}
      <Route path="/onboarding/profile-setup" element={<ProfileSetup />} />
      <Route path="/onboarding/kyc-pending" element={<KYCPending />} />
      <Route path="/onboarding/kyc-rejected" element={<KYCRejected />} />
      
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
      <Route path="/drivers" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
      <Route path="/analytics" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
      <Route path="/alerts" element={<DashboardRoute><Alerts /></DashboardRoute>} />
      <Route path="/tasks" element={<DashboardRoute><Tasks /></DashboardRoute>} />
      <Route path="/integrations" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
      <Route path="/settings" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
      <Route path="/settings/*" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
      <Route path="/help" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
      <Route path="/user" element={<DashboardRoute><User /></DashboardRoute>} />
      
      {/* Booking Routes */}
      <Route path="/booking/request" element={<ProtectedRoute><BookingRequest /></ProtectedRoute>} />
      <Route path="/booking/quotation" element={<ProtectedRoute><Quotation /></ProtectedRoute>} />
      <Route path="/booking/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path="/booking/confirmation" element={<ProtectedRoute><Confirmation /></ProtectedRoute>} />
      
      {/* Tracking Routes */}
      <Route path="/track" element={<TrackShipment />} />
      <Route path="/tracking" element={<TrackShipment />} />
      <Route path="/invoice/:id" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
      
      {/* User Routes */}
      <Route path="/profile" element={<ProtectedRoute><ManageProfile /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetail /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
    </Routes>
  )
}