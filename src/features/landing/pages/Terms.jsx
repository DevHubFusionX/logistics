import { motion } from 'framer-motion'
import SEO from '@/components/common/SEO'

const ease = [0.16, 1, 0.3, 1]

export default function Terms() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using the Darafortwebsite, platform, and mobile application (operated by DaraFort Global Services), you agree to be bound by these Terms of Service, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.`,
    },
    {
      title: '2. Logistics Services & Cargo Requirements',
      content: `• Booking: All booking requests placed on our platform are subject to verification, capacity availability, and rate adjustments.
      • Temperature Control: Customers must specify the exact temperature control ranges required for the cargo. While we guarantee ±0.1°C telemetry precision under ordinary operating limits, we are not liable for temperature excursions resulting from pre-existing cargo condition or improper loading configuration by the sender.
      • Prohibited Items: We do not transport hazardous materials, contraband, illegal substances, or unregistered pharmaceuticals. Senders must guarantee the legality and safety of all items shipped.`,
    },
    {
      title: '3. Payments, Billing & Cancellation',
      content: `• Rates and Fees: Rates calculated on our booking page are estimates based on standard routes and current fuel indices. Final invoices may vary based on actual route redirections or extended waiting times at loading/unloading points.
      • Payments: Payments must be made via authorized channels (e.g., Paystack) or pre-approved bank transfers before cargo dispatch.
      • Cancellation Policy: Cancelled orders are subject to cancellation fees depending on the timing of the request and whether dispatch crews have already been assigned or mobilised.`,
    },
    {
      title: '4. Limitation of Liability',
      content: `Darafortand its partners will not be held liable for:
      • Indirect, incidental, or consequential damages resulting from delays in transit caused by force majeure event (including but not limited to severe weather, port congestion, civil unrest, or road construction).
      • Spoilage of cargo where instructions or temperature tolerances were incorrectly declared during booking.
      • Maximum liability for verified loss or damage during transit is limited to the declared value of the cargo up to the maximum liability cap covered by our transit insurance.`,
    },
    {
      title: '5. Intellectual Property Rights',
      content: `All content, graphics, trademark, codebase, user interfaces, design systems, and telemetry tracking technologies displayed on our platform are the exclusive property of DaraFort Global Services. You may not copy, reverse engineer, or redistribute any part of our platform without prior written consent.`,
    },
    {
      title: '6. Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. You irrevocably submit to the exclusive jurisdiction of the courts located in Lagos State for the resolution of any legal disputes.`,
    },
  ]

  return (
    <>
      <SEO
        title="Terms of Service — Dara Express"
        description="Read the terms and conditions for booking shipments, logistics services, payments, and cargo rules with Dara Express."
        keywords="terms of service, Darafortterms, logistics conditions Nigeria, cold chain terms"
        canonical="/terms"
        breadcrumbs={[{ name: 'Terms of Service', url: '/terms' }]}
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
              Legal Agreement
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
            >
              Terms & Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-body-unique text-slate-500 text-sm sm:text-base"
            >
              Last updated: June 18, 2026. Please review these terms carefully before booking logistics services.
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
              These Terms of Service govern your use of the cold chain and haulage logistics services provided by Dara Express. By requesting a quote, booking a truck, or using our live telemetry portals, you agree to comply with and be bound by these provisions.
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

          {/* Footer Warning / Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-12 bg-blue-50/50 border border-blue-100/50 rounded-3xl p-6 sm:p-8 text-center"
          >
            <p className="font-body-unique text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              If you have any questions or require specific transit insurance endorsements for high-value cargo, please contact our logistics compliance desk at{' '}
              <a href="mailto:legal@daraexpress.com" className="text-[#0056B8] font-bold hover:underline">
                legal@daraexpress.com
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
