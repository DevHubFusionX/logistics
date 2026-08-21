import { Network, Workflow, Rocket } from 'lucide-react'

export default function PlatformOnboarding() {
  const steps = [
    {
      icon: Network,
      title: 'Connect without disruption',
      sup: '¹',
      desc: 'DaraOS works with your current systems — no supplier onboarding, no integrations that drag.'
    },
    {
      icon: Workflow,
      title: 'Configure with purpose',
      sup: '²',
      desc: 'We align the platform to your workflows using proven logic, templates, and real-world data patterns.'
    },
    {
      icon: Rocket,
      title: 'Launch with support',
      sup: '³',
      desc: 'Our team guides your rollout from pilot to scale — with fast results and no mess.'
    }
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="text-left max-w-3xl">
          <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-none tracking-tight">
            Structured onboarding.
          </h2>
          <div className="font-heading-unique font-bold text-slate-400 text-3xl sm:text-4xl lg:text-5xl leading-none tracking-tight mt-1 mb-6">
            Clear outcomes.
          </div>
          <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed">
            A platform that works, no need for your external partners to use it — it's clarity for you
          </p>
        </div>

        {/* 3-Column Border-Separated Grid */}
        <div className="mt-16 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div 
                key={idx} 
                className="pt-10 pb-8 lg:py-12 lg:px-10 first:lg:pl-0 last:lg:pr-0 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-700 mb-8 border border-slate-100/50">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                
                <h3 className="font-heading-unique font-bold text-slate-900 text-lg sm:text-xl mb-4 flex items-start gap-0.5">
                  {step.title}
                  <sup className="text-[#E05A2B] text-xs font-bold leading-none select-none relative -top-1">
                    {step.sup}
                  </sup>
                </h3>
                
                <p className="font-body-unique text-slate-500 text-sm sm:text-[15px] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
