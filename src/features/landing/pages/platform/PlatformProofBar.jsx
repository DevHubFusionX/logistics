export default function PlatformProofBar() {
  return (
    <div className="bg-slate-50/50 border-y border-slate-100 py-6 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12 text-center text-slate-500 font-heading-unique text-xs sm:text-sm tracking-widest uppercase font-semibold">
        <span>
          <span className="text-[#0056B8] font-bold">120+</span> Partner Reefer Assets
        </span>
        <span className="hidden md:inline text-slate-200 font-light">|</span>
        <span>
          <span className="text-[#0056B8] font-bold">Real-Time</span> Visibility
        </span>
        <span className="hidden md:inline text-slate-200 font-light">|</span>
        <span>
          <span className="text-[#0056B8] font-bold">Temperature</span> Monitoring
        </span>
        <span className="hidden md:inline text-slate-200 font-light">|</span>
        <span>
          <span className="text-[#0056B8] font-bold">36-State</span> Coverage
        </span>
      </div>
    </div>
  )
}
