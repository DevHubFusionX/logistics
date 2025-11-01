import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Logistics?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10">
            Let our experts design a tailored solution that fits your specific requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/signup"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all"
              style={{ color: '#0056B8' }}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}