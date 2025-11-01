import { useState } from 'react'
import {motion} from 'framer-motion'
import { Zap, Shield, TrendingUp } from 'lucide-react'
import { PricingHero, PricingPlans, PayPerUse, PricingFAQ, PricingCTA } from '../components/landing/pricing'

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
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
            
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
      <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
      <PricingPlans plans={plans} billingCycle={billingCycle} />
      <PayPerUse services={services} />
      <PricingFAQ faqs={faqs} openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <PricingCTA />
    </div>
  )
}
