export default function FormInput({ label, type = 'text', value, onChange, error, placeholder, required = true }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all
          ${error
            ? 'border border-red-300 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-100'
            : 'border border-gray-200 bg-white text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
          }`}
      />
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  )
}
