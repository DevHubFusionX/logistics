import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ScheduleDemoModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
        industry: '',
        productsOfInterest: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

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
                    message: `
Demo Request Details:
---------------------
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phoneNumber}
Company: ${formData.company}
Job Title: ${formData.jobTitle}
Industry: ${formData.industry}
Products of Interest: ${formData.productsOfInterest || 'Not specified'}
                    `.trim()
                })
            })

            const data = await response.json()

            if (data.success) {
                setIsSuccess(true)
                toast.success('Demo scheduled successfully!')
                setTimeout(() => {
                    onClose()
                    setIsSuccess(false)
                    setFormData({
                        fullName: '',
                        email: '',
                        phoneNumber: '',
                        company: '',
                        jobTitle: '',
                        industry: '',
                        productsOfInterest: ''
                    })
                }, 3000)
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

    const industries = [
        'Pharmaceuticals',
        'Healthcare',
        'Agriculture',
        'Retail & E-commerce',
        'Manufacturing',
        'Other'
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-[calc(100%-1rem)] sm:w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {isSuccess ? (
                            <div className="p-6 sm:p-10 text-center space-y-3">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                                    </div>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Thank You!</h2>
                                <p className="text-slate-600 text-base sm:text-lg">
                                    Your demo request has been received. We'll contact you shortly.
                                </p>
                                <div className="pt-4">
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                                <div className="mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Schedule a Demo</h2>
                                    <p className="text-slate-500 mt-1 text-sm sm:text-base font-medium">Kindly fill the form below</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        {/* Full Name */}
                                        <div className="space-y-1">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. John Doe"
                                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Email</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="john@company.com"
                                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                            />
                                        </div>

                                        {/* Phone Number */}
                                        <div className="space-y-1">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="+234..."
                                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                            />
                                        </div>

                                        {/* Company */}
                                        <div className="space-y-1">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Company</label>
                                            <input
                                                required
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                placeholder="Company Name"
                                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                            />
                                        </div>

                                        {/* Job Title */}
                                        <div className="space-y-1">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Job Title</label>
                                            <input
                                                required
                                                type="text"
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Operations Manager"
                                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                            />
                                        </div>

                                        {/* Industry */}
                                        <div className="space-y-1">
                                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Industry</label>
                                            <select
                                                required
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none"
                                            >
                                                <option value="">Select Industry</option>
                                                {industries.map(item => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Products of Interest */}
                                    <div className="space-y-1">
                                        <label className="text-xs sm:text-sm font-semibold text-slate-700">
                                            Products of interest (optional)
                                        </label>
                                        <textarea
                                            rows="2"
                                            name="productsOfInterest"
                                            value={formData.productsOfInterest}
                                            onChange={handleInputChange}
                                            placeholder="Tell us about your requirements..."
                                            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end pt-2 sm:pt-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full sm:w-auto px-8 py-2.5 sm:py-3 bg-[#1e3a8a] text-white rounded-full font-bold text-base sm:text-lg hover:bg-[#1e3a8a]/90 shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
