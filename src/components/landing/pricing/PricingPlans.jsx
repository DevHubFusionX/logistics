import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, Star } from 'lucide-react'

export default function PricingPlans({ plans, billingCycle }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900 mb-4">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl relative ${
                  plan.popular
                    ? 'border-primary shadow-xl scale-105'
                    : 'border-gray-200 hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Star className="w-4 h-4 fill-white" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{plan.description}</p>
                </div>

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
                      <div className="text-sm text-primary font-semibold">{plan.savings}</div>
                    </>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.name === 'Enterprise' ? '/contact' : '/booking/request'}
                  className={`block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${
                    plan.popular
                      ? 'text-white shadow-lg hover:shadow-xl'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary hover:bg-blue-50'
                  }`}
                  style={plan.popular ? { backgroundColor: '#00843D' } : {}}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
