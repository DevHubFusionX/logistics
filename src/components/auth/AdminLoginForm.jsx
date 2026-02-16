import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useToast } from '../ui/advanced'

const MIN_PASSWORD_LENGTH = 8

export default function AdminLoginForm() {
    const navigate = useNavigate()
    const { adminLogin } = useAuth()
    const { showToast, ToastContainer } = useToast()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
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
            const response = await adminLogin(formData)
            const payload = response.data?.data

            if (payload?.token) {
                setError('')
                showToast.success('Admin access granted', 'Loading dashboard...')

                setTimeout(() => {
                    navigate('/dashboard')
                }, 800)
            } else {
                const missingField = !response.data ? 'Response body' : !payload?.token ? 'Token' : 'User'
                setError(`Login succeeded but ${missingField} is missing. Please contact support.`)
                showToast.error('Login failed', `Missing ${missingField}`)
            }
        } catch (error) {
            if (error.message.includes('401') || error.message.includes('unauthorized')) {
                setError('Invalid administrative credentials.')
                showToast.error('Access Denied', 'Invalid credentials')
            } else {
                setError(error.message || 'Administrative login failed.')
                showToast.error('Login Error', error.message || 'Technical issue')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            className="max-w-md w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-sky-200">
                    <ShieldCheck className="w-8 h-8 text-sky-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h2>
                <p className="text-gray-600 font-medium">Authentication for administrative staff</p>
            </motion.div>

            {error && (
                <motion.div
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                            className={`w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium transition-all ${fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-sky-400'}`}
                            placeholder="admin@dera.com"
                            required
                        />
                    </div>
                    {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
                </div>

                <div>
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
                            className={`w-full pl-10 pr-12 py-4 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium transition-all ${fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-sky-400'}`}
                            placeholder="••••••••"
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
                    {fieldErrors.password && <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>}
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sky-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-sky-700 transition-all shadow-lg shadow-sky-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Authenticating...
                        </div>
                    ) : 'Authorized Login'}
                </motion.button>
            </form>
            <ToastContainer />
        </motion.div>
    )
}
