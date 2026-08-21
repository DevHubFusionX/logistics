import { Link } from 'react-router-dom'

export default function SolutionsCTA() {
  return (
    <section className="py-24 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="bg-[#0056B8] rounded-3xl px-10 py-16 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: headline */}
          <h2 className="font-heading-unique font-extrabold text-white leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Ready to safeguard<br />your cold chain?
          </h2>

          {/* Right: desc + buttons */}
          <div className="flex flex-col gap-6 items-start lg:items-end">
            <p className="font-body-unique text-blue-100 text-sm leading-relaxed max-w-sm lg:text-right">
              Scale your distribution network, monitor temperature compliance, and reduce product spoilage — all in one platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/auth/signup"
                className="px-7 py-3 bg-white text-[#0056B8] font-bold text-sm rounded-full hover:bg-blue-50 transition-colors font-body-unique"
              >
                Get Started Free
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3 border border-white/30 text-white font-bold text-sm rounded-full hover:bg-white/10 transition-colors font-body-unique"
              >
                Contact Sales
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
