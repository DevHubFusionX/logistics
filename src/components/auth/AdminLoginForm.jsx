import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useAdminLoginMutation } from '../../hooks/queries/useAuthQueries'
import { useFormValidation } from '../../hooks/useFormValidation'
import { useToast } from '../ui/advanced'

const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 120000 // 2 minutes for admins

export default function AdminLoginForm() {
    const navigate = useNavigate()
    const { showToast, ToastContainer } = useToast()
    const { mutate: login, isLoading, reset } = useAdminLoginMutation()

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
    const [attempts, setAttempts] = useState(0)
    const [lockoutTime, setLockoutTime] = useState(0)

    useEffect(() => {
        if (lockoutTime > 0) {
            const timer = setInterval(() => {
                setLockoutTime((prev) => Math.max(0, prev - 1000))
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [lockoutTime])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (lockoutTime > 0) {
            showToast.error('Access Temporarily Blocked', `Too many attempts. Retry in ${Math.ceil(lockoutTime / 1000)}s`)
            return
        }

        reset()

        // Validation
        const emailError = validateEmail(formData.email)
        const passwordError = validatePassword(formData.password)

        if (emailError || passwordError) {
            if (emailError) setFieldError('email', emailError)
            if (passwordError) setFieldError('password', passwordError)
            return
        }

        login(formData, {
            onSuccess: () => {
                showToast.success('Admin access granted', 'Loading dashboard...')
                setTimeout(() => navigate('/dashboard'), 800)
            },
            onError: (err) => {
                const newAttempts = attempts + 1
                setAttempts(newAttempts)

                if (newAttempts >= MAX_ATTEMPTS) {
                    setLockoutTime(LOCKOUT_TIME)
                    setAttempts(0)
                    showToast.error('Critical Security Alert', 'Administrative access blocked due to multiple failures.')
                } else {
                    showToast.error('Access Denied', err.message || 'Invalid administrative credentials')
                }
            }
        })
    }

    return (
        <motion.div
            className="max-w-md w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-sky-200">
                    <ShieldCheck className="w-8 h-8 text-sky-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h2>
                <p className="text-gray-600 font-medium">Authentication for administrative staff</p>
            </div>

            {lockoutTime > 0 && (
                <motion.div
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-3 font-semibold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                    <span>Security Lock: {Math.ceil(lockoutTime / 1000)}s remaining</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                                clearFieldError('email')
                            }}
                            className={`w-full pl-10 pr-4 py-4 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 font-medium transition-all ${fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-sky-300'
                                }`}
                            placeholder="admin@dera.com"
                            required
                            disabled={isLoading || lockoutTime > 0}
                        />
                    </div>
                    {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Secure Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value })
                                clearFieldError('password')
                            }}
                            className={`w-full pl-10 pr-12 py-4 border rounded-xl focus:ring-4 focus:ring-sky-50 focus:border-sky-500 font-medium transition-all ${fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-sky-300'
                                }`}
                            placeholder="••••••••"
                            required
                            disabled={isLoading || lockoutTime > 0}
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
                    disabled={isLoading || lockoutTime > 0}
                    className="w-full bg-sky-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-sky-950 transition-all shadow-xl shadow-sky-100 disabled:opacity-50"
                    whileHover={{ scale: isLoading || lockoutTime > 0 ? 1 : 1.01 }}
                    whileTap={{ scale: isLoading || lockoutTime > 0 ? 1 : 0.99 }}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Authenticating...</span>
                        </div>
                    ) : 'Authorized Login'}
                </motion.button>
            </form>
            <div className="mt-6 text-center">
                <Link to="/auth/login" className="text-sm text-gray-500 hover:text-sky-600 transition-colors font-medium">
                    Standard User Login
                </Link>
            </div>
            <ToastContainer />
        </motion.div>
    )
}
