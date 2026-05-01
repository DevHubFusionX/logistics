import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, AlertTriangle, Fingerprint, KeyRound, ArrowRight } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useManagerLoginMutation } from '../../hooks/queries/useAuthQueries'
import { useFormValidation } from '../../hooks/useFormValidation'
import { useToast } from '../ui/advanced'

const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 180000 // 3 minutes for managers

export default function ManagerLoginForm() {
    const navigate = useNavigate()
    const { showToast, ToastContainer } = useToast()
    const { mutate: login, isPending: isLoading, reset } = useManagerLoginMutation()

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
    const [loadingMessage, setLoadingMessage] = useState('Authenticating...')
    const [focusedField, setFocusedField] = useState(null)

    useEffect(() => {
        const loadingMessages = [
            'Establishing Secure Channel...',
            'Verifying Manager Credentials...',
            'Checking Authorization Level...',
            'Loading Operations Dashboard...'
        ]
        let interval
        if (isLoading) {
            let i = 0
            interval = setInterval(() => {
                i = (i + 1) % loadingMessages.length
                setLoadingMessage(loadingMessages[i])
            }, 1000)
        } else {
            setLoadingMessage('Authenticating...')
        }
        return () => clearInterval(interval)
    }, [isLoading])

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

        const emailError = validateEmail(formData.email)
        const passwordError = validatePassword(formData.password)

        if (emailError || passwordError) {
            if (emailError) setFieldError('email', emailError)
            if (passwordError) setFieldError('password', passwordError)
            return
        }

        login(formData, {
            onSuccess: () => {
                showToast.success('Manager access granted', 'Loading operations dashboard...')
                setTimeout(() => navigate('/dashboard'), 800)
            },
            onError: (err) => {
                const newAttempts = attempts + 1
                setAttempts(newAttempts)

                if (newAttempts >= MAX_ATTEMPTS) {
                    setLockoutTime(LOCKOUT_TIME)
                    setAttempts(0)
                    showToast.error('Security Alert', 'Manager access locked due to multiple failed attempts.')
                } else {
                    showToast.error('Access Denied', err.message || 'Invalid manager credentials')
                }
            }
        })
    }

    return (
        <div className="min-h-screen w-full flex" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Left Panel - Branding */}
            <motion.div
                className="hidden lg:flex lg:w-[48%] relative overflow-hidden flex-col justify-between"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                    background: 'linear-gradient(160deg, #0c1222 0%, #0f1a30 40%, #0a152a 70%, #061020 100%)',
                }}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Glow orbs */}
                    <motion.div
                        className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-60 h-60 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />

                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Animated scan line */}
                    <motion.div
                        className="absolute left-0 right-0 h-px"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(14,165,233,0.3) 50%, transparent 100%)',
                        }}
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 p-10 xl:p-14 flex flex-col h-full">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center gap-3 mb-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <img
                            src="/assets/img/Dara.svg"
                            alt="Dara Express"
                            className="w-28 h-28 xl:w-36 xl:h-36 object-contain filter brightness-0 invert"
                        />
                    </motion.div>

                    {/* Center Content */}
                    <div className="flex-1 flex flex-col justify-center -mt-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(56,189,248,0.1))', border: '1px solid rgba(14,165,233,0.3)' }}>
                                    <KeyRound className="w-5 h-5 text-sky-400" />
                                </div>
                                <span className="text-sky-400/80 text-sm font-semibold tracking-widest uppercase">Manager Portal</span>
                            </div>

                            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                                Operations
                                <br />
                                <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                                    Command Center
                                </span>
                            </h1>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-10">
                                Secure access portal for authorized management staff. Monitor fleet operations, oversee logistics, and manage teams.
                            </p>
                        </motion.div>

                        {/* Security features */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {[
                                { icon: ShieldCheck, label: 'End-to-End Encryption', desc: 'Military-grade security' },
                                { icon: Fingerprint, label: 'Multi-Factor Ready', desc: 'Enhanced authentication' },
                                { icon: KeyRound, label: 'Role-Based Access', desc: 'Granular permissions' },
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-center gap-4 p-3 rounded-xl"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + idx * 0.1 }}
                                    whileHover={{
                                        background: 'rgba(14,165,233,0.05)',
                                        borderColor: 'rgba(14,165,233,0.15)',
                                    }}
                                >
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(14,165,233,0.1)' }}>
                                        <feature.icon className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">{feature.label}</p>
                                        <p className="text-slate-500 text-xs">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Bottom */}
                    <motion.div
                        className="mt-auto pt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="flex items-center gap-2 text-slate-600 text-xs">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>System Status: All Services Operational</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Panel - Login Form */}
            <div
                className="w-full lg:w-[52%] flex items-center justify-center p-6 sm:p-8 lg:p-12"
                style={{
                    background: 'linear-gradient(180deg, #fafbfc 0%, #f0f4f8 100%)',
                }}
            >
                <motion.div
                    className="w-full max-w-[440px]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Mobile Logo */}
                    <motion.div
                        className="lg:hidden flex items-center justify-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <img
                            src="/assets/img/Dara.svg"
                            alt="Dara Express"
                            className="w-24 h-24 object-contain"
                        />
                    </motion.div>

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #0c4a6e, #0369a1)',
                                    boxShadow: '0 8px 24px rgba(3, 105, 161, 0.25)',
                                }}
                            >
                                <KeyRound className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manager Login</h2>
                                <p className="text-sm text-slate-500 font-medium">Authorized management access</p>
                            </div>
                        </div>
                    </div>

                    {/* Lockout Warning */}
                    <AnimatePresence>
                        {lockoutTime > 0 && (
                            <motion.div
                                className="mb-6 p-4 rounded-xl flex items-center gap-3"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04))',
                                    border: '1px solid rgba(239,68,68,0.2)',
                                }}
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                            >
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(239,68,68,0.1)' }}>
                                    <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-red-700 text-sm font-bold">Security Lock Active</p>
                                    <p className="text-red-600/70 text-xs">Retry in {Math.ceil(lockoutTime / 1000)} seconds</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center rounded-l-xl pointer-events-none z-10 transition-colors duration-200"
                                    style={{
                                        background: focusedField === 'email' ? 'rgba(14,165,233,0.08)' : 'rgba(0,0,0,0.02)',
                                        borderRight: focusedField === 'email' ? '1px solid rgba(14,165,233,0.2)' : '1px solid rgba(0,0,0,0.06)',
                                    }}
                                >
                                    <Mail className={`w-[18px] h-[18px] transition-colors duration-200 ${focusedField === 'email' ? 'text-sky-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    id="manager-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value })
                                        clearFieldError('email')
                                    }}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-14 pr-4 py-3.5 border rounded-xl font-medium transition-all duration-200 outline-none text-gray-900"
                                    style={{
                                        borderColor: fieldErrors.email ? '#fca5a5' : focusedField === 'email' ? '#0ea5e9' : '#e2e8f0',
                                        boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(14,165,233,0.1)' : 'none',
                                        background: fieldErrors.email ? '#fef2f2' : '#fff',
                                        fontSize: '15px',
                                    }}
                                    placeholder="manager@daraexpress.com"
                                    required
                                    disabled={isLoading || lockoutTime > 0}
                                />
                            </div>
                            <AnimatePresence>
                                {fieldErrors.email && (
                                    <motion.p
                                        className="mt-1.5 text-sm text-red-600 font-medium"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                    >
                                        {fieldErrors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center rounded-l-xl pointer-events-none z-10 transition-colors duration-200"
                                    style={{
                                        background: focusedField === 'password' ? 'rgba(14,165,233,0.08)' : 'rgba(0,0,0,0.02)',
                                        borderRight: focusedField === 'password' ? '1px solid rgba(14,165,233,0.2)' : '1px solid rgba(0,0,0,0.06)',
                                    }}
                                >
                                    <Lock className={`w-[18px] h-[18px] transition-colors duration-200 ${focusedField === 'password' ? 'text-sky-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    id="manager-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value })
                                        clearFieldError('password')
                                    }}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-14 pr-12 py-3.5 border rounded-xl font-medium transition-all duration-200 outline-none text-gray-900"
                                    style={{
                                        borderColor: fieldErrors.password ? '#fca5a5' : focusedField === 'password' ? '#0ea5e9' : '#e2e8f0',
                                        boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(14,165,233,0.1)' : 'none',
                                        background: fieldErrors.password ? '#fef2f2' : '#fff',
                                        fontSize: '15px',
                                    }}
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading || lockoutTime > 0}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                                >
                                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {fieldErrors.password && (
                                    <motion.p
                                        className="mt-1.5 text-sm text-red-600 font-medium"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                    >
                                        {fieldErrors.password}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading || lockoutTime > 0}
                            className="w-full relative overflow-hidden text-white py-4 rounded-xl font-bold text-base transition-all disabled:opacity-50 cursor-pointer"
                            style={{
                                background: isLoading
                                    ? 'linear-gradient(135deg, #0c4a6e, #075985)'
                                    : 'linear-gradient(135deg, #0c4a6e, #0369a1)',
                                boxShadow: isLoading
                                    ? 'none'
                                    : '0 8px 28px rgba(3, 105, 161, 0.3), 0 2px 8px rgba(0,0,0,0.1)',
                            }}
                            whileHover={!isLoading && lockoutTime <= 0 ? {
                                scale: 1.01,
                                boxShadow: '0 12px 32px rgba(3, 105, 161, 0.4), 0 4px 12px rgba(0,0,0,0.15)',
                            } : {}}
                            whileTap={!isLoading && lockoutTime <= 0 ? { scale: 0.99 } : {}}
                        >
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-0.5">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                            className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                                        />
                                        <motion.span
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={loadingMessage}
                                            className="text-sm tracking-wide font-semibold"
                                        >
                                            {loadingMessage}
                                        </motion.span>
                                    </div>
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-[3px]"
                                        style={{ background: 'linear-gradient(90deg, #38bdf8, #7dd3fc)' }}
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 3, ease: 'easeInOut' }}
                                    />
                                </div>
                            ) : (
                                <span className="flex items-center justify-center gap-2.5">
                                    <ShieldCheck className="w-5 h-5" />
                                    Sign In to Manager Portal
                                    <ArrowRight className="w-4 h-4 opacity-60" />
                                </span>
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-7">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" style={{ borderColor: '#e2e8f0' }} />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider" style={{ background: 'linear-gradient(180deg, #fafbfc, #f0f4f8)' }}>
                                Other portals
                            </span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-center gap-6">
                        <Link
                            to="/auth/admin/login"
                            className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-semibold flex items-center gap-1.5"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Admin Portal
                        </Link>
                        <div className="w-px h-4 bg-slate-200" />
                        <Link
                            to="/auth/login"
                            className="text-sm text-slate-500 hover:text-sky-600 transition-colors font-semibold"
                        >
                            User Login
                        </Link>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400">
                            Protected by enterprise-grade security • Dara Express © {new Date().getFullYear()}
                        </p>
                    </div>
                </motion.div>
            </div>

            <ToastContainer />
        </div>
    )
}
