import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, RefreshCw } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/advanced'

export default function VerifyOTP() {
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isResending, setIsResending] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      setError('')

      // Auto-focus next input
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpCode = otp.join('')

    // Validation
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits')
      showToast.error('Incomplete OTP', 'Please enter all 6 digits')
      return
    }

    setLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      showToast.success('Verification successful', 'Redirecting to dashboard...')
      setTimeout(() => {
        navigate('/my-bookings')
      }, 1000)
    }, 2000)
  }

  const handleResend = async () => {
    setIsResending(true)
    setError('')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsResending(false)
    setTimeLeft(300)
    showToast.success('Code resent', 'Check your email for the new code')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Account</h2>
          <p className="text-gray-600 mt-2">Enter the 6-digit code sent to your email</p>
          {error && (
            <motion.p
              className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="flex justify-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-600 mb-2">Time remaining: {formatTime(timeLeft)}</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || isResending}
              className="text-sky-500 hover:text-sky-600 font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? 'Resending...' : 'Resend Code'}
            </button>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-sky-400 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Account'
            )}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/auth/login" className="text-sky-500 hover:text-sky-600 font-medium">
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  )
}