import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '@/components/common/SEO'
import httpClient from '@/services/httpClient'

const ease = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease
    }
  }
}

const checkListItems = [
  "Talk about your custom temperature control needs with our specialists",
  "Hear about vaccine and pharma transport frameworks we've partnered with",
  "Learn how our real-time GPS reefer monitoring operations work"
]

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    origin: '',
    volume: '',
    requirement: '',
    consent: false
  })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      // Map frontend form fields to backend Contact model:
      // { name (required), email (required), phone (optional), subject (required), message (required) }
      const requirementLabels = {
        pharma: 'Pharmaceuticals & Vaccines Logistics',
        frozen: 'Frozen Foods & Cold Storage Transport',
        perishable: 'Fresh Fruits, Veggies & Perishables',
        haulage: 'Dedicated Fleet Refrigerated Haulage',
      }

      const payload = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone || undefined,
        subject: requirementLabels[form.requirement] || form.requirement || 'General Enquiry',
        message: [
          `Origin: ${form.origin || 'Not specified'}`,
          `Expected Volume: ${form.volume || 'Not specified'}`,
          `Website: ${form.website || 'Not provided'}`,
        ].join('\n'),
      }

      await httpClient.request('/contact/', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setSent(true)
    } catch (err) {
      console.error('Contact form submission failed:', err)
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Contact Darafort— Get a Cold Chain Logistics Quote Nigeria"
        description="Get a free cold chain logistics quote from Darafort— Nigeria's #1 reefer truck company. Contact us for pharma transport, frozen food haulage, and refrigerated logistics across Lagos, Abuja and all 36 states."
        keywords="contact Dara Express, cold chain quote Nigeria, logistics quote Lagos, freight quote Nigeria, refrigerated transport quote, reefer truck hire Nigeria, logistics inquiry Nigeria"
        canonical="/contact"
        breadcrumbs={[{ name: 'Contact', url: '/contact' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          'name': 'Contact Dara Express',
          'description': 'Get a free cold chain logistics quote from Dara Express. Contact us for pharma transport, frozen food haulage, and refrigerated logistics across Nigeria.',
          'url': 'https://daraexpress.com/contact',
          'mainEntity': {
            '@type': 'LocalBusiness',
            'name': 'Dara Express',
            'telephone': '+2349054610119',
            'email': 'hello@daraexpress.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'MJS House, 366 Murtala Muhammed Road, Yaba',
              'addressLocality': 'Lagos',
              'addressRegion': 'Lagos State',
              'addressCountry': 'NG'
            }
          }
        }}
      />

      {/* Main Section */}
      <section className="bg-slate-50 min-h-screen pt-28 pb-16 md:py-24 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column: Headline & Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex flex-col items-start text-left pt-4 lg:pt-8"
          >
            <motion.p
              variants={itemVariants}
              className="text-[#0056B8] font-bold text-xs tracking-[0.2em] uppercase mb-4"
            >
              Contact Us
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-heading-unique font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
            >
              Speak to our cold chain experts.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8"
            >
              Submitting an enquiry is the fastest way to get a logistics consultation. If you'd like to discuss custom cold storage, pharma distribution, or nationwide logistics routes, our team is ready to guide you.
            </motion.p>

            {/* Checklist */}
            <div className="space-y-4">
              {checkListItems.map((text, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3.5 text-left"
                >
                  <div className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-blue-50 text-[#0056B8] flex-shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="font-body-unique text-slate-700 text-sm font-medium leading-relaxed">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Floating Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease }}
            className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] w-full"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col items-center justify-center py-20 text-center gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shadow-inner">
                  <ArrowUpRight className="w-6 h-6 text-[#0056B8]" />
                </div>
                <h2 className="font-heading-unique font-bold text-slate-900 text-2xl">
                  Enquiry received!
                </h2>
                <p className="font-body-unique text-slate-500 text-sm max-w-sm leading-relaxed">
                  Thank you for reaching out. A cold chain specialist will contact you shortly to guide you.
                </p>
                <Link
                  to="/"
                  className="font-body-unique inline-flex items-center gap-2 px-6 py-3 bg-[#0056B8] hover:bg-blue-700 text-white font-bold rounded-sm text-xs sm:text-sm transition-all"
                >
                  Return to Home
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left font-body-unique">

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">First name*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adebayo"
                      value={form.firstName}
                      onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#0056B8] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">Last name*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ogundimu"
                      value={form.lastName}
                      onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#0056B8] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">Work email*</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#0056B8] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">Phone number*</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#0056B8] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Company Website */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">Your company website*</label>
                  <input
                    type="url"
                    required
                    placeholder="https://company.com"
                    value={form.website}
                    onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#0056B8] focus:bg-white transition-all"
                  />
                </div>

                {/* Origin & Expected Volume */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">Origin Region*</label>
                    <select
                      required
                      value={form.origin}
                      onChange={e => setForm(f => ({ ...f, origin: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-700 text-sm focus:outline-none focus:border-[#0056B8] focus:bg-white transition-all cursor-pointer appearance-none"
                    >
                      <option value="">Select origin</option>
                      <option value="lagos">Lagos Region</option>
                      <option value="abuja">Abuja Region</option>
                      <option value="south-south">Port Harcourt / South Region</option>
                      <option value="north">Kano / North Region</option>
                      <option value="international">West Africa / International</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">Expected Monthly Volume*</label>
                    <select
                      required
                      value={form.volume}
                      onChange={e => setForm(f => ({ ...f, volume: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-700 text-sm focus:outline-none focus:border-[#0056B8] focus:bg-white transition-all cursor-pointer appearance-none"
                    >
                      <option value="">Select volume</option>
                      <option value="small">Less than 5 tons</option>
                      <option value="medium">5 - 20 tons</option>
                      <option value="large">More than 20 tons</option>
                    </select>
                  </div>
                </div>

                {/* Requirement Category */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">What best describes your business requirements?*</label>
                  <select
                    required
                    value={form.requirement}
                    onChange={e => setForm(f => ({ ...f, requirement: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-700 text-sm focus:outline-none focus:border-[#0056B8] focus:bg-white transition-all cursor-pointer appearance-none"
                  >
                    <option value="">Select requirement type</option>
                    <option value="pharma">Pharmaceuticals & Vaccines Logistics</option>
                    <option value="frozen">Frozen Foods & Cold Storage Transport</option>
                    <option value="perishable">Fresh Fruits, Veggies & Perishables</option>
                    <option value="haulage">Dedicated Fleet Refrigerated Haulage</option>
                  </select>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={form.consent}
                    onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                    className="w-4 h-4 rounded border-slate-300 text-[#0056B8] focus:ring-[#0056B8] mt-1 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-slate-500 text-xs leading-relaxed cursor-pointer select-none">
                    Yes, I'd like to receive updates, offers, and insights from Dara. I can unsubscribe anytime.
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-[#0056B8] hover:bg-[#004bb0] text-white font-bold rounded-sm text-sm transition-all active:scale-[0.98] shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting && (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {submitting ? 'Sending…' : 'Submit'}
                  </button>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* Office Locations Map Section (Bottom) */}
      <section className="h-[360px] sm:h-[440px] relative overflow-hidden bg-slate-100">
        <iframe
          title="DarafortLocation"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7!2d3.3792!3d6.5095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c5!2sMJS+House+366+Murtala+Muhammed+Road+Yaba+Lagos!5e0!3m2!1sen!2sng!4v1"
          className="absolute inset-0 w-full h-full border-0 grayscale opacity-85"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* HQ Coordinates overlay */}
        <div className="absolute bottom-6 left-6 right-6 sm:left-14 sm:right-auto bg-white/95 backdrop-blur border border-slate-100 rounded-2xl px-6 py-4 shadow-xl max-w-sm text-left">
          <p className="text-[#0056B8] text-[10px] font-bold tracking-widest uppercase mb-1">Headquarters</p>
          <p className="font-heading-unique font-bold text-slate-800 text-sm">MJS House, 366 Murtala Muhammed Road, Yaba, Lagos</p>
          <a
            href="https://maps.google.com/?q=MJS+House+366+Murtala+Muhammed+Road+Yaba+Lagos+Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#0056B8] text-xs font-semibold mt-1 hover:underline transition-colors"
          >
            Get directions <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </section>
    </>
  )
}
