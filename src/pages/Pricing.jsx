import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Star, Calculator, Phone, Zap, Shield, TrendingUp, ArrowRight, HelpCircle, ChevronDown, Users, MapPin, Clock, Package } from 'lucide-react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [openFaq, setOpenFaq] = useState(null)
  const plans = [
    {
      name: "Starter",
      monthlyPrice: 15000,
      annualPrice: 12000,
      description: "Perfect for small Nigerian businesses starting their logistics journey",
      features: [
        "Up to 100 shipments/month",
        "All 36 states coverage",
        "Real-time SMS tracking",
        "WhatsApp support (same day)",
        "Standard delivery (2-5 days)",
        "Online dashboard access",
        "Package insurance included"
      ],
      icon: Zap,
      color: "from-green-400 to-emerald-600",
      popular: false,
      savings: "Save ₦36,000/year"
    },
    {
      name: "Business",
      monthlyPrice: 45000,
      annualPrice: 36000,
      description: "Ideal for growing Nigerian businesses with regular shipping needs",
      features: [
        "Up to 500 shipments/month",
        "Same-day delivery in major cities",
        "Priority phone & WhatsApp support",
        "Express delivery options",
        "Advanced analytics dashboard",
        "API integration",
        "20% bulk shipping discounts",
        "Dedicated account manager"
      ],
      icon: TrendingUp,
      color: "from-sky-400 to-blue-600",
      popular: true,
      savings: "Save ₦108,000/year"
    },
    {
      name: "Enterprise",
      monthlyPrice: null,
      annualPrice: null,
      description: "Custom solutions for large Nigerian enterprises and corporations",
      features: [
        "Unlimited shipments",
        "Nationwide coverage + international",
        "Dedicated logistics team",
        "24/7 premium support",
        "Custom API integrations",
        "White-label solutions",
        "Volume-based pricing",
        "99.5% delivery guarantee"
      ],
      icon: Shield,
      color: "from-purple-400 to-indigo-600",
      popular: false,
      savings: "Custom pricing"
    }
  ]

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise plans."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! All plans come with a 14-day free trial. No credit card required to start."
    },
    {
      question: "What happens if I exceed my shipment limit?",
      answer: "You'll be charged a small overage fee per additional shipment, or you can upgrade to the next tier for better rates."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service."
    }
  ]

  const services = [
    { name: "Standard Delivery", price: "₦1,200", unit: "per package", time: "2-5 days" },
    { name: "Express Delivery", price: "₦2,500", unit: "per package", time: "Same day" },
    { name: "Freight Shipping", price: "₦15,000", unit: "per shipment", time: "3-7 days" },
    { name: "International Shipping", price: "₦8,500", unit: "per package", time: "7-14 days" },
    { name: "Warehouse Storage", price: "₦500", unit: "per sq ft/month", time: "Monthly" },
    { name: "Insurance Coverage", price: "2%", unit: "of cargo value", time: "Per shipment" }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-sky-200 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-100 text-sky-700 rounded-full text-sm font-bold mb-8"
          >
            <Users className="w-4 h-4" />
            Trusted by 1,000+ Nigerian businesses
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
          >
            Pricing That
            <br />
            <span className="text-sky-600">Makes Sense</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed"
          >
            Transparent pricing designed for Nigerian businesses. No hidden fees, no surprises.
            Pay in Naira and scale as your business grows.
          </motion.p>
          
          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl mb-4"
          >
            <motion.button
              onClick={() => setBillingCycle('monthly')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setBillingCycle('annual')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
            </motion.button>
          </motion.div>
          {billingCycle === 'annual' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full inline-block"
            >
              🎉 Save up to 25% with annual billing
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible pricing options designed for Nigerian businesses of all sizes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: plan.popular ? 1 : 1.02 }}
                  className={`bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl relative ${
                    plan.popular
                      ? 'border-sky-500 shadow-xl scale-105'
                      : 'border-gray-200 hover:border-sky-200'
                  }`}
                >
                  {plan.popular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="bg-sky-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                        <Star className="w-4 h-4 fill-white" />
                        MOST POPULAR
                      </div>
                    </motion.div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-8">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className={`w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    {price ? (
                      <>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-4xl font-black text-gray-900">₦{price.toLocaleString()}</span>
                          <span className="text-gray-600 font-medium">/month</span>
                        </div>
                        {billingCycle === 'annual' && (
                          <div className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full inline-block">
                            {plan.savings}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-black text-gray-900 mb-2">Custom</div>
                        <div className="text-sm text-sky-600 font-semibold">{plan.savings}</div>
                      </>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to={plan.name === 'Enterprise' ? '/contact' : '/booking/request'}
                      className={`block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${
                        plan.popular
                          ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg hover:shadow-xl'
                          : 'border-2 border-gray-300 text-gray-700 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50'
                      }`}
                    >
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pay-Per-Use Pricing */}
      <section className="bg-gradient-to-br from-gray-50 to-sky-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Pay-As-You-Ship Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              No monthly commitments? No problem. Pay only for what you ship with our transparent Nigerian pricing.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors text-lg">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">{service.unit}</p>
                    <p className="text-xs text-sky-600 font-semibold">{service.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-sky-600">
                      {service.price}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Get Quote
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/booking/request"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-sky-600 rounded-xl font-bold hover:shadow-xl transition-all border-2 border-sky-200 hover:border-sky-300"
              >
                <Calculator className="w-5 h-5" />
                Calculate Your Shipping Cost
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-2xl mb-4">
                <HelpCircle className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:border-sky-200 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-lg sm:text-xl text-sky-100 mb-10">
              Join 10,000+ businesses that trust Dara Express for their shipping needs.
              Start your 14-day free trial today—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                Talk to Sales
              </Link>
            </div>
            <p className="text-sky-100 text-sm mt-6">
              ✓ No credit card required  ✓ Cancel anytime  ✓ 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}