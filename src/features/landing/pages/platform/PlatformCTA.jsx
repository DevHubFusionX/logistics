import { Link } from 'react-router-dom'

export default function PlatformCTA({ onBookDemo }) {
  return (
    <section className="bg-slate-50/50 py-24 border-t border-slate-100 select-none text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-4.5xl leading-tight mb-6 tracking-tight">
          Experience the intelligence layer of cold-chain logistics
        </h2>
        <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Start orchestrating your refrigerated capacity, securing delivery compliance, and monitoring cargo temperature in real time.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Link
            to="/auth/signup"
            className="font-body-unique px-8 py-3.5 bg-[#0056B8] hover:bg-[#004aad] text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
          >
            Try DaraOS for free
          </Link>
          <button
            onClick={onBookDemo}
            className="font-body-unique px-8 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold rounded-full text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
          >
            Book a demo
          </button>
        </div>
      </div>
    </section>
  )
}
