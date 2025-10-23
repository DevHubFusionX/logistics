import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Star, Calculator, Phone, Zap, Shield, TrendingUp, ArrowRight, HelpCircle, ChevronDown } from 'lucide-react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [openFaq, setOpenFaq] = useState(null)
  const plans = [
    {
      name: "Starter",
      monthlyPrice: 29,
      annualPrice: 23,
      description: "Perfect for small businesses starting their logistics journey",
      features: [
        "Up to 50 shipments/month",
        "Domestic shipping only",
        "Basic tracking",
        "Email support (24h response)",
        "Standard delivery times",
        "Online dashboard access"
      ],
      icon: Zap,
      color: "from-green-400 to-emerald-600",
      popular: false
    },
    {
      name: "Professional",
      monthlyPrice: 89,
      annualPrice: 71,
      description: "Ideal for growing businesses with regular shipping volume",
      features: [
        "Up to 500 shipments/month",
        "Domestic & international shipping",
        "Real-time GPS tracking",
        "Priority phone support (4h response)",
        "Express delivery options",
        "Advanced analytics dashboard",
        "API integration",
        "15% bulk shipping discounts"
      ],
      icon: TrendingUp,
      color: "from-sky-400 to-blue-600",
      popular: true
    },
    {
      name: "Enterprise",
      monthlyPrice: null,
      annualPrice: null,
      description: "Tailored solutions for large-scale logistics operations",
      features: [
        "Unlimited shipments",
        "Global shipping network (200+ countries)",
        "Dedicated account manager",
        "24/7 premium support (1h response)",
        "Custom API integrations",
        "White-label solutions",
        "Volume-based pricing",
        "99.9% SLA guarantees"
      ],
      icon: Shield,
      color: "from-purple-400 to-indigo-600",
      popular: false
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
    { name: "Domestic Ground", price: "$8.99", unit: "per package" },
    { name: "Express Overnight", price: "$24.99", unit: "per package" },
    { name: "International Standard", price: "$19.99", unit: "per package" },
    { name: "International Express", price: "$49.99", unit: "per package" },
    { name: "Freight (per 100 lbs)", price: "$89.99", unit: "per 100 lbs" },
    { name: "Warehouse Storage", price: "$2.50", unit: "per sq ft/month" }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-sky-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Trusted by 10,000+ businesses worldwide
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. No hidden fees, no surprises.
            Scale up or down as your shipping needs change.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl mb-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
            </button>
          </div>
          {billingCycle === 'annual' && (
            <div className="text-sm text-green-600 font-medium">
              🎉 Save 20% with annual billing
            </div>
          )}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                    plan.popular
                      ? 'border-sky-500 shadow-xl scale-105 relative'
                      : 'border-gray-200 hover:border-sky-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    {price ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-bold text-gray-900">${price}</span>
                          <span className="text-gray-600">/month</span>
                        </div>
                        {billingCycle === 'annual' && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            ${plan.monthlyPrice * 12} billed annually
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-gray-900">Custom</div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to={plan.name === 'Enterprise' ? '/contact' : '/auth/signup'}
                    className={`block w-full py-3.5 rounded-xl font-semibold text-center transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                        : 'border-2 border-gray-300 text-gray-700 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50'
                    }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pay-Per-Use Pricing */}
      <section className="bg-gradient-to-br from-gray-50 to-sky-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pay-As-You-Go Pricing
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              No monthly commitments? No problem. Pay only for what you ship with our flexible pricing options.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-sky-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-gray-500">{service.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                      {service.price}
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <button className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 rounded-xl font-semibold hover:shadow-xl transition-all border-2 border-sky-200 hover:border-sky-300"
            >
              <Calculator className="w-5 h-5" />
              Calculate Your Shipping Cost
            </Link>
          </div>
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