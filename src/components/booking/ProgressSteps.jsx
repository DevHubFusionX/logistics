export default function ProgressSteps({ steps, currentStep }) {
  const currentStepName = steps.find(s => s.num === currentStep)?.name

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm">
      {/* Mobile Step Header */}
      <div className="sm:hidden flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Step {currentStep} of {steps.length}</p>
          <h2 className="text-xl font-bold text-gray-900 mt-1">{currentStepName}</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all shadow-sm duration-300 ${currentStep >= s.num
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-200 scale-110 sm:scale-100'
                  : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                <s.icon className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>

              <span className={`text-xs sm:text-sm mt-2.5 font-semibold whitespace-nowrap transition-colors hidden sm:block ${currentStep >= s.num ? 'text-blue-600' : 'text-gray-400'
                }`}>{s.name}</span>

              {/* Mobile Active Dot */}
              {currentStep === s.num && (
                <div className="sm:hidden absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
              )}

              {/* Desktop Pulse */}
              {currentStep === s.num && (
                <div className="hidden sm:block absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
              )}
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 sm:mx-4 relative">
                <div className="absolute inset-0 bg-gray-100 rounded-full" />
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${currentStep > s.num ? 'bg-gradient-to-r from-blue-600 to-blue-500 w-full' : 'w-0'
                  }`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
