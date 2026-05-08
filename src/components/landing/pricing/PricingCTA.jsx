import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'

export default function PricingCTA() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10">
            Join 10,000+ businesses that trust Dara Express for their shipping needs.
            Start your 14-day free trial today—no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/signup"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
              style={{ color: '#0056B8' }}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              Talk to Sales
            </Link>
          </div>
          <p className="text-white/90 text-sm mt-6">
            ✓ No credit card required  ✓ Cancel anytime  ✓ 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  )
}
