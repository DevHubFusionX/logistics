import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import { useToast } from '../../components/ui/advanced'
import authService from '../../services/authService'

function ResetPasswordForm() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { showToast, ToastContainer } = useToast()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    // token_hash is passed by Supabase in the redirect URL
    const tokenHash = searchParams.get('token_hash')

    useEffect(() => {
        if (!tokenHash) {
            setError('Invalid or missing reset token. Please request a new reset link.')
            showToast.error('Invalid link', 'The password reset link is missing its authentication token.')
        }
    }, [tokenHash, showToast])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!tokenHash) return

        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            const response = await authService.resetPassword(tokenHash, password)

            if (response.status === 200) {
                setSuccess(true)
                showToast.success('Success', 'Your password has been reset successfully.')
                setTimeout(() => navigate('/auth/login'), 3000)
            } else {
                throw new Error(response.data?.message || 'Failed to reset password')
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.')
            showToast.error('Reset failed', err.message)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <motion.div
                className="max-w-md w-full text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset!</h2>
                <p className="text-gray-600 mb-8">
                    Your password has been successfully updated. Redirecting you to login...
                </p>
                <Link
                    to="/auth/login"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold uppercase text-xs tracking-widest"
                >
                    Click here if not redirected
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h2>
                <p className="text-gray-600">Please choose a strong password you haven't used before.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError('')
                            }}
                            className={`w-full pl-10 pr-4 py-4 border rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 font-medium text-lg transition-all ${error && !confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50/30'
                                }`}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setError('')
                            }}
                            className={`w-full pl-10 pr-4 py-4 border rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 font-medium text-lg transition-all ${error && password === confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50/30'
                                }`}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && (
                        <p className="mt-3 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2 animate-shake">
                            {error}
                        </p>
                    )}
                </div>

                <motion.button
                    type="submit"
                    disabled={loading || !tokenHash}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-100 disabled:opacity-50 flex items-center justify-center gap-3"
                    whileHover={{ scale: loading || !tokenHash ? 1 : 1.01 }}
                    whileTap={{ scale: loading || !tokenHash ? 1 : 0.99 }}
                >
                    {loading ? (
                        <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        'Set New Password'
                    )}
                </motion.button>
            </form>

            <div className="mt-8 text-center">
                <Link
                    to="/auth/login"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 font-black text-[10px] uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Login
                </Link>
            </div>
            <ToastContainer />
        </motion.div>
    )
}

export default function ResetPassword() {
    return (
        <AuthLayout
            title="Secure Account Recovery"
            subtitle="Complete your security protocol by establishing a new authentication secret."
        >
            <ResetPasswordForm />
        </AuthLayout>
    )
}
