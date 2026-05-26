import { useState, useEffect } from 'react'
import { Mail, RefreshCw, ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-md w-full text-center space-y-6">

        {/* Icon */}
        <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-sky-700" />
        </div>

        {/* Heading */}
        <div>
          <h1 className="font-heading font-bold text-xl text-gray-900">Check your email</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            We sent a verification link to{' '}
            {email
              ? <span className="font-semibold text-gray-800">{email}</span>
              : 'your email address'
            }.
            {' '}Click the link to activate your account.
          </p>
        </div>

        {/* Steps */}
        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
          {[
            'Open your email inbox',
            'Find the email from Dara Express',
            'Click the verification link in the email',
            'Come back here and sign in',
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-sky-700 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-xs text-gray-600">{step}</p>
            </div>
          ))}
        </div>

        {/* Resent confirmation */}
        {resent && (
          <div className="flex items-center gap-2 justify-center text-emerald-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Verification link resent successfully
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <p className="text-xs text-gray-400">
            Didn't receive it? Check your spam folder or request a new link.
          </p>
          <button
            onClick={handleResend}
            disabled={resending || countdown > 0 || !email}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            {resending
              ? 'Sending…'
              : countdown > 0
                ? `Resend in ${countdown}s`
                : 'Resend verification link'
            }
          </button>

          <Link
            to="/auth/login"
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Go to sign in <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          Wrong email?{' '}
          <Link to="/auth/signup" className="text-sky-700 font-semibold hover:underline">
            Register again
          </Link>
        </p>
      </div>
    </div>
  )
}
