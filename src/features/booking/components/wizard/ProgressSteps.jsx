export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4">
      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Step {currentStep} of {steps.length}
          </p>
          <p className="text-sm font-heading font-bold text-gray-900 mt-0.5">
            {steps.find(s => s.num === currentStep)?.name}
          </p>
        </div>
        <div className="flex gap-1.5">
          {steps.map(s => (
            <div
              key={s.num}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s.num === currentStep ? 'w-6 bg-sky-700' :
                s.num < currentStep  ? 'w-3 bg-sky-300' : 'w-3 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex items-center">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                s.num < currentStep  ? 'bg-sky-700 text-white' :
                s.num === currentStep ? 'bg-sky-700 text-white ring-4 ring-sky-100' :
                'bg-gray-100 text-gray-400'
              }`}>
                <s.icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-semibold transition-colors ${
                s.num <= currentStep ? 'text-sky-700' : 'text-gray-400'
              }`}>
                {s.name}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-px mx-3 mb-5 relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <div className={`absolute inset-0 rounded-full bg-sky-700 transition-all duration-500 ${
                  currentStep > s.num ? 'w-full' : 'w-0'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
