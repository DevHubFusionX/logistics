import { useState, useEffect } from 'react'
import { RefreshCw, ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/features/auth'
import authService from '@/features/auth/services/authService'
import toast from 'react-hot-toast'

export default function VerifyEmail() {
  const email = sessionStorage.getItem('pending_verification_email') || ''
  const [resending, setResending] = useState(false)
  const [resent, setResent]       = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleResend = async () => {
    if (!email || countdown > 0) return
    setResending(true)
    try {
      await authService.resendVerificationLink(email)
      setResent(true)
      setCountdown(60)
      toast.success('Verification link resent!')
    } catch (err) {
      toast.error(err.message || 'Failed to resend. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Complete account setup to access real-time dispatch, cold chain logistics tools, and delivery tracking."
    >
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center lg:text-left mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We sent a verification link to{' '}
            {email ? (
              <span className="font-semibold text-gray-900 break-all">{email}</span>
            ) : (
              'your registered email'
            )}
            . Please click the link to activate your account.
          </p>
        </div>

        {/* Steps */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Steps</h4>
          {[
            'Open your email inbox',
            'Find the verification email from Dara Logistics',
            'Click the activation link inside the email',
            'Return here to sign in and begin shipping'
          ].map((step, i) => (
            <div key={i} className="flex gap-3.5">
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        {/* Resent confirmation */}
        {resent && (
          <div className="mb-6 flex items-center gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-left">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-emerald-700">Verification link resent successfully</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <Link
            to="/auth/login"
            className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-sky-500 hover:to-blue-600 transition-all shadow-lg shadow-sky-100 flex items-center justify-center gap-2"
          >
            Go to Sign In <ArrowRight className="w-5 h-5" />
          </Link>

          <button
            onClick={handleResend}
            disabled={resending || countdown > 0 || !email}
            className="w-full flex items-center justify-center gap-2 py-3.5 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            {resending
              ? 'Sending...'
              : countdown > 0
                ? `Resend in ${countdown}s`
                : 'Resend verification link'
            }
          </button>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Wrong email address?{' '}
              <Link to="/auth/signup" className="text-sky-600 font-bold hover:underline">
                Register again
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  )
}
