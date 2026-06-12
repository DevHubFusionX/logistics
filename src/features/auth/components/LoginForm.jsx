import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../hooks/useAuthQueries'
import { useAuthStore } from '../../../stores/authStore'
import authService from '../services/authService'
import { useFormValidation } from '../../../hooks/useFormValidation'
import { useToast } from '../../../components/ui'
import { useSecurityLockout } from '../hooks/useSecurityLockout'

export default function LoginForm() {
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  const { mutate: login, isPending: isLoggingIn, reset: resetMutation } = useLoginMutation()
  const { setAuth } = useAuthStore()

  const {
    fieldErrors,
    clearFieldError,
    validateEmail,
    validatePassword,
    setFieldError
  } = useFormValidation()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Use DRY security lockout hook
  const { lockoutTime, isLocked, registerFailure, resetAttempts } = useSecurityLockout('user_portal', 5, 60000)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isLocked) {
      showToast.error('Too many attempts', `Please try again in ${Math.ceil(lockoutTime / 1000)}s`)
      return
    }

    resetMutation()

    // Validation
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError || passwordError) {
      if (emailError) setFieldError('email', emailError)
      if (passwordError) setFieldError('password', passwordError)
      return
    }

    login(formData, {
      onSuccess: (response) => {
        resetAttempts()
        const payload = response?.data?.data
        const loggedInUser = payload?.user || payload?.admin

        // Block unverified users — backend returns verified: false
        if (loggedInUser?.verified === false) {
          sessionStorage.setItem('pending_verification_email', formData.email)
          // Trigger a fresh verification email
          authService.resendVerificationLink(formData.email).catch(() => {})
          navigate('/auth/verify-email')
          return
        }

        // Verified — set session and redirect
        if (payload?.token && loggedInUser) {
          setAuth(loggedInUser, payload.token, rememberMe)
        }

        const { getIsAdmin } = useAuthStore.getState()
        showToast.success('Welcome back!', 'Redirecting to your dashboard...')
        setTimeout(() => {
          navigate(getIsAdmin() ? '/dashboard' : '/my-bookings')
        }, 800)
      },
      onError: (err) => {
        const msg = err.message?.toLowerCase() || ''
        const lockoutTriggered = registerFailure()
        if (lockoutTriggered) {
          showToast.error('Security Alert', 'Too many failed attempts. Account locked for 60 seconds.')
        } else if (
          msg.includes('not verified') ||
          msg.includes('verify your email') ||
          msg.includes('email not verified') ||
          msg.includes('account not verified')
        ) {
          sessionStorage.setItem('pending_verification_email', formData.email)
          authService.resendVerificationLink(formData.email).catch(() => {})
          navigate('/auth/verify-email')
        } else {
          showToast.error('Login Failed', err.message || 'Invalid credentials')
        }
      }
    })
  }

  return (
    <motion.div
      className="max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Access your logistics command center</p>
      </div>

      {isLocked && (
        <motion.div
          className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>Security Lock: Try again in {Math.ceil(lockoutTime / 1000)} seconds</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="email-field">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                clearFieldError('email')
              }}
              className={`w-full pl-10 pr-4 py-4 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 font-medium text-lg transition-all ${
                fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Enter your email"
              required
              disabled={isLoggingIn || isLocked}
            />
          </div>
          {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
        </div>

        <div className="password-field">
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <Link to="/auth/forgot-password" className="text-sky-600 hover:text-sky-700 text-sm font-semibold">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                clearFieldError('password')
              }}
              className={`w-full pl-10 pr-12 py-4 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 font-medium text-lg transition-all ${
                fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Enter your password"
              required
              disabled={isLoggingIn || isLocked}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {fieldErrors.password && <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>}
        </div>

        <div className="flex items-center remember-me">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600 font-medium cursor-pointer">
            Keep me signed in
          </label>
        </div>

        <motion.button
          type="submit"
          disabled={isLoggingIn || isLocked}
          className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-sky-500 hover:to-blue-600 transition-all shadow-lg shadow-sky-100 disabled:opacity-50"
          whileHover={{ scale: isLoggingIn || isLocked ? 1 : 1.01 }}
          whileTap={{ scale: isLoggingIn || isLocked ? 1 : 0.99 }}
        >
          {isLoggingIn ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying Credentials...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </motion.button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="text-gray-600">
          Not a member?{' '}
          <Link to="/auth/signup" className="text-sky-600 hover:text-sky-700 font-bold">
            Create an account
          </Link>
        </p>
      </div>
      <ToastContainer />
    </motion.div>
  )
}