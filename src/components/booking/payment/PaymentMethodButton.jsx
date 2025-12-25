export default function PaymentMethodButton({ icon: Icon, title, subtitle, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 border-2 rounded-lg transition-all hover:scale-105 active:scale-95 ${
        isSelected ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </button>
  )
}
