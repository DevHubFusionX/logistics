import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useToast } from '../ui/advanced'

const MIN_PASSWORD_LENGTH = 8

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { showToast, ToastContainer } = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setFieldErrors({})

    // Validation
    const errors = {}
    if (!formData.email) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format'
    if (!formData.password) errors.password = 'Password is required'
    else if (formData.password.length < MIN_PASSWORD_LENGTH) errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setError('Please fix the errors below')
      showToast.error('Validation failed', 'Please check your input')
      setLoading(false)
      return
    }

    try {
      const response = await login(formData)

      if (response.data?.token) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        } else {
          localStorage.removeItem('rememberMe')
        }

        setError('')
        showToast.success('Login successful', 'Redirecting to dashboard...')
        setTimeout(() => {
          navigate('/my-bookings')
        }, 500)
      } else {
        setError('Invalid credentials. Please check your email and password.')
        showToast.error('Login failed', 'Invalid credentials')
      }
    } catch (error) {
      if (error.message.includes('401') || error.message.includes('unauthorized')) {
        setError('Invalid email or password. Please try again.')
        showToast.error('Login failed', 'Invalid credentials')
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        setError('Connection error. Please check your internet and try again.')
        showToast.error('Connection error', 'Please check your internet')
      } else {
        setError(error.message || 'Login failed. Please try again.')
        showToast.error('Login failed', error.message || 'Please try again')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="max-w-md w-full"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Access your logistics command center</p>
      </motion.div>

      {error && (
        <motion.div
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                setFieldErrors({ ...fieldErrors, email: '' })
              }}
              className={`w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-lg transition-all duration-200 hover:border-gray-400 ${fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              placeholder="Enter your email address"
              required
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                setFieldErrors({ ...fieldErrors, password: '' })
              }}
              className={`w-full pl-10 pr-12 py-4 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-lg transition-all duration-200 hover:border-gray-400 ${fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-sky-500 focus:ring-sky-500"
            />
            <span className="ml-2 text-sm text-gray-600 font-medium">Keep me signed in</span>
          </label>
          <Link to="/auth/forgot-password" className="text-sm text-sky-600 hover:text-sky-700 font-semibold transition-colors">
            Forgot password?
          </Link>
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-sky-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="opacity-90">Signing In</span>
            </div>
          ) : (
            'Sign In to Dashboard'
          )}
        </motion.button>
      </form>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-gray-600">
          New to Dara Logistics?{' '}
          <Link to="/auth/signup" className="text-sky-600 hover:text-sky-700 font-semibold transition-colors">
            Create your account
          </Link>
        </p>
      </motion.div>
      <ToastContainer />
    </motion.div>
  )
}