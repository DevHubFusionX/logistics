import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, RefreshCw, Mail } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import authService from '../../services/authService'
import { useToast } from '../../components/ui/advanced'

export default function VerifyOTP() {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast, ToastContainer } = useToast()

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(300)
  const [isResending, setIsResending] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  const email = location.state?.email || ''

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      setError('')

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text').slice(0, 6)
    if (/^[0-9]+$/.test(data)) {
      const newOtp = data.split('').concat(Array(6 - data.length).fill(''))
      setOtp(newOtp.slice(0, 6))
      inputRefs.current[Math.min(data.length, 5)].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpCode = otp.join('')

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }

    setLoading(true)
    setError('')

    try {
      await authService.verifyOTP(otpCode)
      showToast.success('Verification successful', 'Welcome to your dashboard!')
      setTimeout(() => navigate('/my-bookings'), 1000)
    } catch (err) {
      setError(err.message || 'Invalid verification code')
      showToast.error('Verification failed', err.message || 'The code you entered is invalid')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      showToast.error('Reference missing', 'No email address found to resend code to.')
      return
    }

    setIsResending(true)
    setError('')

    try {
      await authService.resendOTP(email)
      setTimeLeft(300)
      showToast.success('Code resent', 'Check your email for the new code')
    } catch (err) {
      showToast.error('Resend failed', err.message || 'Could not send a new code')
    } finally {
      setIsResending(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-sky-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Account Security</h2>
          <p className="text-gray-500 mt-3 font-medium">
            We've sent a 6-digit security code to your email address.
          </p>
          {email && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sky-600 bg-sky-50 py-2 px-4 rounded-full inline-flex font-semibold text-sm mx-auto">
              <Mail className="w-4 h-4" />
              {email}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-16 text-center text-2xl font-bold border-2 rounded-2xl focus:border-sky-500 focus:ring-4 focus:ring-sky-50 transition-all ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50/30'
                  }`}
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          {error && (
            <motion.p
              className="text-center text-sm font-bold text-red-600 bg-red-50 py-3 rounded-xl border border-red-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <div className="text-center">
            <div className="text-sm text-gray-400 font-semibold mb-4 tracking-wider uppercase">
              Time Remaining: <span className={timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-700'}>{formatTime(timeLeft)}</span>
            </div>
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 120 || isResending}
              className="group text-sky-600 hover:text-sky-700 font-bold text-sm disabled:text-gray-300 disabled:cursor-not-allowed flex items-center gap-2 mx-auto transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              {isResending ? 'Resending Code...' : 'Resend Security Code'}
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-sky-700 transition-all shadow-xl shadow-sky-100 disabled:opacity-50"
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              'Unlock Access'
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Link to="/auth/login" className="hover:text-sky-600 transition-colors">
            Back to Sign In
          </Link>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  )
}