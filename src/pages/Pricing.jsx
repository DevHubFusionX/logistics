import { Check, Star, Calculator, Phone } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses with basic shipping needs",
      features: [
        "Up to 50 shipments/month",
        "Domestic shipping only",
        "Basic tracking",
        "Email support",
        "Standard delivery times",
        "Online dashboard"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$89",
      period: "/month",
      description: "Ideal for growing businesses with regular shipping volume",
      features: [
        "Up to 500 shipments/month",
        "Domestic & international",
        "Real-time GPS tracking",
        "Priority phone support",
        "Express delivery options",
        "Advanced analytics",
        "API integration",
        "Bulk shipping discounts"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large-scale logistics operations",
      features: [
        "Unlimited shipments",
        "Global shipping network",
        "Dedicated account manager",
        "24/7 premium support",
        "Custom integrations",
        "White-label solutions",
        "Volume-based pricing",
        "SLA guarantees"
      ],
      popular: false
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
    <div className="pt-32">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. No hidden fees, no surprises.
            Scale up or down as your shipping needs change.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Monthly
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors">
              Annual (Save 20%)
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-lg relative ${plan.popular ? 'ring-2 ring-sky-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${plan.popular
                  ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg'
                  : 'border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white'
                  }`}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pay-Per-Use Pricing */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pay-Per-Use Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No monthly commitments? No problem. Pay only for what you ship with our flexible pricing options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-sky-200 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-sky-500">{service.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sky-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Dara Logistics for their shipping needs.
            Start with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center gap-2 bg-white text-sky-500 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              <Calculator className="w-5 h-5" />
              Calculate Shipping Cost
            </button>
            <button className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-sky-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              <Phone className="w-5 h-5" />
              Speak with Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}