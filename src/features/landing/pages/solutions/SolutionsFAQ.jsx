import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'How does Dara prevent cross-contamination between cargo types?',
    answer: 'Strictly partitioned multi-temperature zones and cleaning protocols between cargo switches. Food, pharma, and manufacturing inputs are never combined in a way that compromises GDP or food safety regulations.',
  },
  {
    question: 'What happens if a cooling unit malfunctions mid-transit?',
    answer: 'Dual back-up generators and automated deviation alerts. If telemetry detects a thermal shift exceeding 1.5°C, dispatch is notified instantly to execute route redirection or field swapping.',
  },
  {
    question: 'Can DaraOS telemetry integrate with our enterprise ERP?',
    answer: 'Yes. DaraOS supports webhooks, JSON feeds, and direct integrations with SAP, Oracle, and Microsoft Dynamics ERP platforms.',
  },
]

export default function SolutionsFAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="py-24 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: heading */}
          <div className="lg:sticky lg:top-32">
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-4">FAQ</span>
            <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-5xl leading-tight tracking-tight">
              Common questions.
            </h2>
            <p className="font-body-unique text-slate-400 text-sm leading-relaxed mt-5 max-w-xs">
              Everything you need to know about our cold-chain operations.
            </p>
          </div>

          {/* Right: accordion rows */}
          <div className="divide-y divide-slate-100">
            {faqs.map(({ question, answer }, idx) => {
              const isOpen = openIdx === idx
              return (
                <div key={question}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left cursor-pointer group"
                  >
                    <span className={`font-heading-unique font-bold text-sm sm:text-base leading-snug transition-colors ${isOpen ? 'text-[#0056B8]' : 'text-slate-900 group-hover:text-[#0056B8]'}`}>
                      {question}
                    </span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${isOpen ? 'bg-[#0056B8] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="font-body-unique text-slate-400 text-sm leading-relaxed pb-6">
                      {answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
