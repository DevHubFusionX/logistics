export default function PaymentMethodButton({ icon: Icon, title, subtitle, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
        isSelected
          ? 'border-sky-700 bg-sky-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
        isSelected ? 'bg-sky-700 text-white' : 'bg-gray-100 text-gray-500'
      }`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${isSelected ? 'text-sky-700' : 'text-gray-800'}`}>{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
        isSelected ? 'border-sky-700' : 'border-gray-300'
      }`}>
        {isSelected && <div className="w-2 h-2 rounded-full bg-sky-700" />}
      </div>
    </button>
  )
}
