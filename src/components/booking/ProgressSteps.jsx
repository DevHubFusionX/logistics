export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between min-w-max sm:min-w-0">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center relative">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                currentStep >= s.num 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-200' 
                  : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}>
                <s.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs sm:text-sm mt-2.5 font-semibold whitespace-nowrap transition-colors ${
                currentStep >= s.num ? 'text-blue-600' : 'text-gray-400'
              }`}>{s.name}</span>
              {currentStep === s.num && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
              )}
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-3 sm:mx-4 relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  currentStep > s.num ? 'bg-gradient-to-r from-blue-600 to-blue-500 w-full' : 'w-0'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
