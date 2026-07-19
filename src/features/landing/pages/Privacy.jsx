import { motion } from 'framer-motion'
import SEO from '@/components/common/SEO'

const ease = [0.16, 1, 0.3, 1]

export default function Privacy() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information to provide better services to our users. This includes:
      • Personal Identification Information: Name, email address, phone number, and company details when you register, request a quote, or contact us.
      • Logistics & Shipment Data: Origin and destination addresses, cargo details, temperature requirements, and receiver details.
      • Device and Usage Data: IP address, browser type, operating system, pages visited, and time spent on our platform via cookies and tracking technologies.`,
    },
    {
      title: '2. How We Use Your Information',
      content: `Darafortuses the collected data for various purposes:
      • To process, calculate, and coordinate your shipment bookings.
      • To monitor cargo temperature logs and provide real-time GPS tracking status.
      • To send invoices, payment confirmations, and support ticket updates.
      • To improve our platform functionality, user experience, and customer service.
      • To comply with legal obligations and prevent fraudulent activity.`,
    },
    {
      title: '3. Data Security and Telemetry',
      content: `We implement robust physical, technical, and administrative security measures to protect your personal and shipment information.
      • Encryption: All data in transit is encrypted using Secure Socket Layer (SSL/TLS) technology.
      • Telemetry Privacy: Live temperature telemetry and GPS tracking details are accessible only to authorized personnel and the specific customer booking the shipment.
      • No Selling of Data: We do not sell, rent, or trade your personal data to third parties for marketing purposes.`,
    },
    {
      title: '4. Cookies Policy',
      content: `Cookies are small text files placed on your device to help analyze web traffic and customize your experience.
      • Essential Cookies: Necessary for authorization, secure log-in, and maintaining active booking sessions.
      • Analytics Cookies: Help us understand how visitors interact with our website to optimize platform performance.
      • You can choose to accept or decline cookies. Declining cookies may prevent you from taking full advantage of some platform features.`,
    },
    {
      title: '5. Your Rights and Choices',
      content: `Depending on your location, you may have the following rights regarding your personal information:
      • The right to access, update, or delete the personal details we hold about you.
      • The right to withdraw consent at any time where we rely on your consent to process information.
      • The right to lodge a complaint with a data protection authority if you believe your privacy rights have been violated.`,
    },
    {
      title: '6. Contact Us',
      content: `If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us:
      • Email: privacy@daraexpress.com
      • Phone: +234 811 577 9007
      • Address: MJS House, 366 Murtala Muhammed Road, Yaba, Lagos, Nigeria.`,
    },
  ]

  return (
    <>
      <SEO
        title="Privacy Policy — Dara Express"
        description="Learn how Darafortcollects, protects, and uses your personal and shipment information. Our commitment to privacy, cold chain transparency, and data security."
        keywords="privacy policy, Darafortprivacy, data security logistics Nigeria, cold chain privacy"
        canonical="/privacy"
        breadcrumbs={[{ name: 'Privacy Policy', url: '/privacy' }]}
      />

      <div className="bg-slate-50 min-h-screen pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="text-[#0056B8] font-bold text-xs tracking-[0.2em] uppercase mb-3"
            >
              Legal & Compliance
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-body-unique text-slate-500 text-sm sm:text-base"
            >
              Last updated: June 18, 2026. Please read this policy to understand our commitment to your privacy.
            </motion.p>
          </div>

          {/* Intro Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-[0_15px_30px_rgba(0,0,0,0.01)] mb-12"
          >
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed">
              At Darafort(operated by DaraFort Global Services), protecting your privacy and securing your operational data is fundamental to how we build our logistics products. This Privacy Policy describes how we collect, store, and process information from our website visitors, customers, and partners.
            </p>
          </motion.div>

          {/* Sections list */}
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.2), ease }}
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-[0_15px_30px_rgba(0,0,0,0.015)]"
              >
                <h2 className="font-heading-unique font-bold text-slate-800 text-lg sm:text-xl mb-4">
                  {section.title}
                </h2>
                <div className="font-body-unique text-slate-500 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Summary / Contact Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-12 bg-blue-50/50 border border-blue-100/50 rounded-3xl p-6 sm:p-8 text-center"
          >
            <p className="font-body-unique text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              We periodically update our policies to align with national logistics regulations and global data privacy standards. Continuing to use Darafortservices signifies your consent to any changes.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
