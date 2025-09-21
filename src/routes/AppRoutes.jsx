import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Pricing from '../pages/Pricing'
import About from '../pages/About'
import Services from '../pages/Services'
import SignUp from '../pages/auth/SignUp'
import Login from '../pages/auth/Login'
import VerifyOTP from '../pages/auth/VerifyOTP'
import ProfileSetup from '../pages/onboarding/ProfileSetup'
import KYCPending from '../pages/onboarding/KYCPending'
import KYCRejected from '../pages/onboarding/KYCRejected'
import Dashboard from '../pages/Dashboard'
import BookingRequest from '../pages/booking/BookingRequest'
import Quotation from '../pages/booking/Quotation'
import Payment from '../pages/booking/Payment'
import Confirmation from '../pages/booking/Confirmation'
import TrackShipment from '../pages/tracking/TrackShipment'
import Invoice from '../pages/tracking/Invoice'
import ManageProfile from '../pages/ManageProfile'
import Reports from '../pages/Reports'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/verify-otp" element={<VerifyOTP />} />
      <Route path="/onboarding/profile-setup" element={<ProfileSetup />} />
      <Route path="/onboarding/kyc-pending" element={<KYCPending />} />
      <Route path="/onboarding/kyc-rejected" element={<KYCRejected />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/booking/request" element={<BookingRequest />} />
      <Route path="/booking/quotation" element={<Quotation />} />
      <Route path="/booking/payment" element={<Payment />} />
      <Route path="/booking/confirmation" element={<Confirmation />} />
      <Route path="/track" element={<TrackShipment />} />
      <Route path="/tracking" element={<TrackShipment />} />
      <Route path="/invoice/:id" element={<Invoice />} />
      <Route path="/profile" element={<ManageProfile />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  )
}