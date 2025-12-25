export default function FormInput({ label, type = 'text', value, onChange, error, placeholder, required = true }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none ${error
            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-200 bg-white hover:border-blue-300'
          }`}
        required={required}
      />
      {error && typeof error === 'string' && (
        <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1 animate-fadeIn">
          <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
          {error}
        </p>
      )}
    </div>
  )
}
