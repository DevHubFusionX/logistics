export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 overflow-x-auto">
      <div className="flex items-center justify-between min-w-max sm:min-w-0">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${
                currentStep >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <s.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className={`text-xs sm:text-sm mt-2 font-medium whitespace-nowrap ${
                currentStep >= s.num ? 'text-blue-600' : 'text-gray-500'
              }`}>{s.name}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 sm:mx-4 transition-colors ${
                currentStep > s.num ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
