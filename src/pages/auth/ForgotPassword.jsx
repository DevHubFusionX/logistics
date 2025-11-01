import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import { useToast } from '../../components/ui/advanced'

function ForgotPasswordForm() {
  const { showToast, ToastContainer } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email) {
      setError('Email is required')
      showToast.error('Validation error', 'Please enter your email')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format')
      showToast.error('Validation error', 'Please enter a valid email')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      showToast.success('Email sent', 'Check your inbox for reset instructions')
    }, 2000)
  }

  if (sent) {
    return (
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-8">
          We've sent password reset instructions to {email}
        </p>
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-gray-600">Enter your email to reset your password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              className={`w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-lg ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="your.email@company.com"
              required
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-sky-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
      <ToastContainer />
    </motion.div>
  )
}

export default function ForgotPassword() {
  return (
    <AuthLayout 
      title="Reset Your Password"
      subtitle="Don't worry, we'll help you get back into your account quickly and securely."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}