export default function PaymentMethodButton({ icon: Icon, title, subtitle, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full p-4 border rounded-xl transition-all duration-200 text-left sm:text-center group ${isSelected
          ? 'border-blue-600 bg-blue-50/50 shadow-md ring-1 ring-blue-600'
          : 'border-gray-200 hover:border-blue-400 hover:shadow-sm bg-white'
        }`}
    >
      <div className="flex sm:flex-col items-center gap-4 sm:gap-3">
        <div className={`p-3 rounded-full transition-colors ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500'
          }`}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div>
          <p className={`font-bold text-sm sm:text-base ${isSelected ? 'text-blue-900' : 'text-gray-900'
            }`}>{title}</p>
          <p className={`text-xs sm:text-sm mt-0.5 ${isSelected ? 'text-blue-700' : 'text-gray-500'
            }`}>{subtitle}</p>
        </div>

        {/* Mobile checkmark indicator */}
        {isSelected && (
          <div className="ml-auto sm:hidden w-2 h-2 bg-blue-600 rounded-full" />
        )}
      </div>
    </button>
  )
}
