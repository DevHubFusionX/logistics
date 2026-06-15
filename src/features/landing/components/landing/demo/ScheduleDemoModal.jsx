import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    X, CheckCircle2, User, Mail, Phone, Building, 
    Briefcase, Globe, ChevronDown, Clock, Shield, Zap
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function ScheduleDemoModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
        industry: ''
    })
    const [selectedProducts, setSelectedProducts] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const toggleProduct = (product) => {
        setSelectedProducts(prev => 
            prev.includes(product)
                ? prev.filter(p => p !== product)
                : [...prev, product]
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const productsString = selectedProducts.length > 0 
            ? selectedProducts.join(', ') 
            : 'Not specified'

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
                    subject: `New Demo Request from ${formData.fullName}`,
                    from_name: 'DARA Express Demo Form',
                    to: 'contact@daraexpress.com',
                    ...formData,
                    productsOfInterest: productsString,
                    message: `
Demo Request Details:
---------------------
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phoneNumber}
Company: ${formData.company}
Job Title: ${formData.jobTitle}
Industry: ${formData.industry}
Products of Interest: ${productsString}
                    `.trim()
                })
            })

            const data = await response.json()

            if (data.success) {
                setIsSuccess(true)
                toast.success('Demo scheduled successfully!')
            } else {
                throw new Error(data.message || 'Submission failed')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        onClose()
        // Reset states after animation completes
        setTimeout(() => {
            setIsSuccess(false)
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                company: '',
                jobTitle: '',
                industry: ''
            })
            setSelectedProducts([])
        }, 300)
    }

    const industries = [
        'Pharmaceuticals',
        'Healthcare',
        'Agriculture & Fresh Foods',
        'Retail & E-commerce',
        'Chemical Manufacturing',
        'FMCG',
        'Other'
    ]

    const products = [
        { id: 'storage', label: '❄️ Cold Storage' },
        { id: 'transit', label: '🚛 Reefer Haulage' },
        { id: 'lastmile', label: '📦 Last-Mile' },
        { id: 'enterprise', label: '💼 Enterprise' }
    ]

    // Form items configuration for rendering inputs dynamically with icons
    const formFields = [
        { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: User, required: true, gridClass: 'col-span-2' },
        { name: 'email', label: 'Business Email', type: 'email', placeholder: 'john@company.com', icon: Mail, required: true, gridClass: 'col-span-2' },
        { name: 'company', label: 'Company', type: 'text', placeholder: 'Company Name', icon: Building, required: true, gridClass: 'col-span-1' },
        { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'e.g. Logistics Lead', icon: Briefcase, required: true, gridClass: 'col-span-1' },
        { name: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: '+234...', icon: Phone, required: true, gridClass: 'col-span-1' }
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    {/* Backdrop with custom blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="relative w-full max-w-md md:max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 my-4 md:my-8"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-30"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* LEFT COLUMN: BRANDING & BENEFIT VALUES */}
                        <div className="hidden md:flex md:w-[40%] bg-[#0056B8] p-8 text-white relative flex-col justify-between overflow-hidden">
                            {/* Decorative Glows */}
                            <div className="absolute top-[-10%] right-[-10%] w-72 h-72 rounded-full bg-blue-500/25 blur-3xl pointer-events-none" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-emerald-500/20 blur-3xl pointer-events-none" />

                            {/* Middle Headline & Benefits */}
                            <div className="relative z-10 space-y-6 my-auto">
                                <h3 className="font-heading-unique text-2xl sm:text-3xl font-extrabold leading-tight">
                                    See how DARA optimizes your Cold Chain.
                                </h3>
                                <p className="font-body-unique text-blue-100/90 text-sm leading-relaxed">
                                    Experience real-time temperature tracking, instant dispatches, and automated reporting designed to safeguard your cargo.
                                </p>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-white/10 rounded-lg text-emerald-400 border border-white/5 mt-0.5">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">15-Minute Live Walkthrough</h4>
                                            <p className="text-[11px] text-blue-150">A quick look at custom dashboards and real-time alerts.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-white/10 rounded-lg text-emerald-400 border border-white/5 mt-0.5">
                                            <Shield className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">Expert Logistics Consultation</h4>
                                            <p className="text-[11px] text-blue-150">Direct advice on pharma, food, or chemical transport setups.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-white/10 rounded-lg text-emerald-400 border border-white/5 mt-0.5">
                                            <Zap className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">Custom Pricing & Models</h4>
                                            <p className="text-[11px] text-blue-150">Tailored corporate rates fitting your logistics budgets.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Footer Trust */}
                            <div className="relative z-10 pt-8 mt-6 border-t border-white/10">
                                <p className="text-[10px] text-blue-200/70 font-semibold tracking-wider uppercase">
                                    Trusted Nationwide
                                </p>
                                <p className="text-[11px] text-white/80 mt-1">
                                    Powering pharmaceutical and food haulage in 36 states.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: FORM OR SUCCESS STATE */}
                        <div className="w-full md:w-[60%] bg-slate-50/50 p-5 sm:p-8 flex flex-col justify-center">
                            {isSuccess ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-4 py-8"
                                >
                                    <div className="flex justify-center">
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                                            className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm"
                                        >
                                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                        </motion.div>
                                    </div>
                                    <div className="space-y-2 max-w-md mx-auto">
                                        <h3 className="font-heading-unique text-2xl font-bold text-slate-900">
                                            Request Confirmed!
                                        </h3>
                                        <p className="font-body-unique text-slate-600 text-sm leading-relaxed">
                                            Thanks for reaching out, <span className="font-bold text-slate-800">{formData.fullName}</span>. 
                                            We've sent a summary to <span className="font-semibold text-slate-800">{formData.email}</span>.
                                        </p>
                                        <p className="font-body-unique text-slate-500 text-xs leading-relaxed pt-2">
                                            A cold-chain specialist will contact you at <span className="font-semibold text-slate-800">{formData.phoneNumber}</span> within the hour to coordinate a suitable time.
                                        </p>
                                    </div>
                                    <div className="pt-6">
                                        <button
                                            onClick={handleClose}
                                            className="px-8 py-3 bg-[#0056B8] text-white rounded-full font-bold text-sm hover:bg-blue-700 shadow-md transition-all active:scale-[0.98]"
                                        >
                                            Done
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="space-y-4 sm:space-y-5">
                                    <div>
                                        <h3 className="font-heading-unique text-xl sm:text-2xl font-bold text-slate-900">
                                            Schedule a Demo
                                        </h3>
                                        <p className="font-body-unique text-slate-500 text-xs mt-0.5">
                                            Fill in your details below and we will contact you shortly.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Dynamic Grid Inputs */}
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                            {formFields.map((field) => {
                                                const IconComponent = field.icon
                                                return (
                                                    <div key={field.name} className={`space-y-1 ${field.gridClass}`}>
                                                        <label className="text-[10px] font-bold text-slate-600 tracking-wide">
                                                            {field.label}
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                                <IconComponent className="w-3.5 h-3.5" />
                                                            </div>
                                                            <input
                                                                required={field.required}
                                                                type={field.type}
                                                                name={field.name}
                                                                value={formData[field.name]}
                                                                onChange={handleInputChange}
                                                                placeholder={field.placeholder}
                                                                className="w-full pl-9 pr-3.5 py-2 sm:py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#0056B8] transition-all outline-none text-slate-800 placeholder-slate-400 shadow-sm shadow-slate-100/50"
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                            {/* Custom Dropdown for Industry */}
                                            <div className="space-y-1 col-span-1">
                                                <label className="text-[10px] font-bold text-slate-600 tracking-wide">
                                                    Industry
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                        <Globe className="w-3.5 h-3.5" />
                                                    </div>
                                                    <select
                                                        required
                                                        name="industry"
                                                        value={formData.industry}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-9 pr-9 py-2 sm:py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#0056B8] transition-all outline-none text-slate-800 appearance-none shadow-sm shadow-slate-100/50"
                                                    >
                                                        <option value="" className="text-slate-400">Select Industry</option>
                                                        {industries.map(item => (
                                                            <option key={item} value={item} className="text-slate-800">{item}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                                                        <ChevronDown className="w-3.5 h-3.5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Products of Interest: Premium Selection Pills */}
                                        <div className="space-y-2 pt-1">
                                            <label className="text-[10px] font-bold text-slate-600 tracking-wide block">
                                                Products of Interest <span className="text-slate-450 font-normal">(select all that apply)</span>
                                            </label>
                                            <div className="flex flex-wrap gap-1.5">
                                                {products.map(prod => {
                                                    const isSelected = selectedProducts.includes(prod.label)
                                                    return (
                                                        <motion.button
                                                            key={prod.id}
                                                            type="button"
                                                            whileHover={{ y: -1 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            onClick={() => toggleProduct(prod.label)}
                                                            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                                                                isSelected 
                                                                    ? 'bg-[#0056B8]/5 border-[#0056B8] text-[#0056B8] font-bold shadow-sm shadow-[#0056B8]/5'
                                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 shadow-sm shadow-slate-100/50'
                                                            }`}
                                                        >
                                                            {prod.label}
                                                        </motion.button>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        {/* Form Actions */}
                                        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 mt-2">
                                            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
                                                🔒 Secure submission
                                            </span>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#0056B8] text-white rounded-full font-bold text-xs hover:bg-blue-700 shadow-md shadow-blue-900/10 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Request a Call'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
