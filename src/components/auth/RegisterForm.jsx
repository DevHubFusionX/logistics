import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, MapPin, Building, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../hooks/queries/useAuthQueries'
import { useFormValidation } from '../../hooks/useFormValidation'
import { useToast } from '../ui/advanced'

export default function RegisterForm() {
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  const { mutate: register, isLoading, reset } = useRegisterMutation()

  const {
    fieldErrors,
    clearFieldError,
    validateEmail,
    validatePassword,
    validatePasswordStrength,
    validateRequired,
    setFieldError
  } = useFormValidation()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    address: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handlePasswordChange = (password) => {
    setFormData({ ...formData, password })
    setPasswordStrength(validatePasswordStrength(password))
    clearFieldError('password')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    reset()

    // Combined Validation
    const errors = {}
    const emailErr = validateEmail(formData.email)
    const passErr = validatePassword(formData.password)
    const fnErr = validateRequired(formData.firstName, 'First Name')
    const lnErr = validateRequired(formData.lastName, 'Last Name')
    const phoneErr = validateRequired(formData.phoneNumber, 'Phone Number')
    const compErr = validateRequired(formData.companyName, 'Company Name')
    const addrErr = validateRequired(formData.address, 'Address')

    if (emailErr) errors.email = emailErr
    if (passErr) errors.password = passErr
    if (fnErr) errors.firstName = fnErr
    if (lnErr) errors.lastName = lnErr
    if (phoneErr) errors.phoneNumber = phoneErr
    if (compErr) errors.companyName = compErr
    if (addrErr) errors.address = addrErr

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!acceptTerms) {
      showToast.error('Registration Terms', 'You must accept the terms and conditions')
      return
    }

    if (Object.keys(errors).length > 0) {
      setFieldError(null, null) // dummy to trigger re-render of errors if needed
      // Actually set them properly
      Object.entries(errors).forEach(([field, msg]) => setFieldError(field, msg))
      return
    }

    // API expects specific structure
    const submissionData = {
      ...formData,
      clientCategory: 'Enterprise', // Default as per original code
      verified: false
    }
    delete submissionData.confirmPassword

    register(submissionData, {
      onSuccess: () => {
        showToast.success('Account created', 'Welcome to Dara Logistics!')
        setTimeout(() => navigate('/my-bookings'), 1500)
      },
      onError: (err) => {
        if (err.message?.includes('email')) {
          setFieldError('email', 'This email is already registered')
        } else {
          showToast.error('Registration failed', err.message || 'Please try again')
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">Start shipping smarter today</p>
      </div>

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
                  clearFieldError('firstName')
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 ${fieldErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                placeholder="First name"
                required
              />
            </div>
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
                  clearFieldError('lastName')
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 ${fieldErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                placeholder="Last name"
                required
              />
            </div>
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
                clearFieldError('email')
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 ${fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              placeholder="Enter your email"
              required
            />
          </div>
          {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
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
                clearFieldError('phoneNumber')
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 ${fieldErrors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => {
                  setFormData({ ...formData, companyName: e.target.value })
                  clearFieldError('companyName')
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 ${fieldErrors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                placeholder="Company name"
                required
              />
            </div>
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
                  clearFieldError('address')
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 ${fieldErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                placeholder="Business address"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Create Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 ${fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              placeholder="Strong password"
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
          {formData.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-6 h-1 rounded-full ${passwordStrength >= level
                      ? (passwordStrength <= 2 ? 'bg-red-400' : passwordStrength <= 3 ? 'bg-amber-400' : 'bg-green-500')
                      : 'bg-gray-100'}`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value })
                clearFieldError('confirmPassword')
              }}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 ${fieldErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              placeholder="Repeat password"
              required
            />
          </div>
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-start py-2">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
          />
          <label htmlFor="terms" className="ml-2 text-xs text-gray-500 leading-tight">
            I agree to the <Link to="/terms" className="text-sky-600 font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-sky-600 font-bold hover:underline">Privacy Policy</Link>.
          </label>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-sky-500 hover:to-blue-600 transition-all shadow-lg shadow-sky-100 disabled:opacity-50"
          whileHover={{ scale: isLoading ? 1 : 1.01 }}
          whileTap={{ scale: isLoading ? 1 : 0.99 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating your account...</span>
            </div>
          ) : 'Join Dara Logistics'}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-sky-600 font-bold">
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </motion.div>
  )
}