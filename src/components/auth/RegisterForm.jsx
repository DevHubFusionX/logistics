import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, MapPin, Building, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useToast } from '../ui/advanced'

export default function RegisterForm() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { showToast, ToastContainer } = useToast()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    companyName: '',
    clientCategory: 'Enterprise',
    verified: false,
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)

  const validatePassword = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handlePasswordChange = (password) => {
    setFormData({ ...formData, password })
    setPasswordStrength(validatePassword(password))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setFieldErrors({})

    // Validation
    const errors = {}
    if (!formData.firstName) errors.firstName = 'First name is required'
    if (!formData.lastName) errors.lastName = 'Last name is required'
    if (!formData.email) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format'
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required'
    if (!formData.companyName) errors.companyName = 'Company name is required'
    if (!formData.address) errors.address = 'Address is required'
    if (!formData.password) errors.password = 'Password is required'
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters'
    else if (passwordStrength < 3) errors.password = 'Password is too weak'

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setError('Please fix the errors below')
      showToast.error('Validation failed', 'Please check all required fields')
      setLoading(false)
      return
    }

    try {
      const response = await register(formData)
      
      if (response.data?.token) {
        setSuccess('Account created successfully! Redirecting to dashboard...')
        setError('')
        showToast.success('Account created', 'Welcome to Dara Logistics!')
        setTimeout(() => {
          navigate('/dashboard', { 
            state: { message: 'Welcome to Dara Logistics!' }
          })
        }, 1500)
      }
    } catch (error) {
      if (error.message.includes('email') && error.message.includes('exists')) {
        setFieldErrors({ email: 'Email already registered' })
        setError('An account with this email already exists. Please use a different email or try logging in.')
        showToast.error('Email exists', 'This email is already registered')
      } else if (error.message.includes('validation')) {
        setError('Please check all fields and try again.')
        showToast.error('Validation error', 'Please check all fields')
      } else if (error.message.includes('network')) {
        setError('Connection error. Please check your internet and try again.')
        showToast.error('Connection error', 'Please check your internet')
      } else {
        setError(error.message || 'Registration failed. Please try again.')
        showToast.error('Registration failed', error.message || 'Please try again')
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Start shipping smarter today</p>
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

      {success && (
        <motion.div 
          className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
          {success}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value })
                  setFieldErrors({ ...fieldErrors, firstName: '' })
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                  fieldErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="First name"
                required
              />
            </div>
            {fieldErrors.firstName && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value })
                  setFieldErrors({ ...fieldErrors, lastName: '' })
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                  fieldErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Last name"
                required
              />
            </div>
            {fieldErrors.lastName && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        <div>
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
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your business email"
              required
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value })
                setFieldErrors({ ...fieldErrors, phoneNumber: '' })
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                fieldErrors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter phone number"
              required
            />
          </div>
          {fieldErrors.phoneNumber && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => {
                setFormData({ ...formData, companyName: e.target.value })
                setFieldErrors({ ...fieldErrors, companyName: '' })
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                fieldErrors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Your company name"
              required
            />
          </div>
          {fieldErrors.companyName && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.companyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value })
                setFieldErrors({ ...fieldErrors, address: '' })
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                fieldErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Your address"
              required
            />
          </div>
          {fieldErrors.address && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => {
                handlePasswordChange(e.target.value)
                setFieldErrors({ ...fieldErrors, password: '' })
              }}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Create password"
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
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
          )}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-600">Password strength:</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((level) => (
                    <div 
                      key={level}
                      className={`w-4 h-1 rounded-full ${
                        passwordStrength >= level 
                          ? passwordStrength <= 2 ? 'bg-red-400' 
                            : passwordStrength <= 3 ? 'bg-yellow-400' 
                            : 'bg-green-400'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs ${
                  passwordStrength <= 2 ? 'text-red-500' 
                    : passwordStrength <= 3 ? 'text-yellow-500' 
                    : 'text-green-500'
                }`}>
                  {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                </span>
              </div>
            </div>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-sky-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="opacity-90">Creating Account</span>
            </div>
          ) : (
            'Join Dara Logistics'
          )}
        </motion.button>
      </form>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-sky-600 hover:text-sky-700 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
      <ToastContainer />
    </motion.div>
  )
}