export default function FormInput({ label, type = 'text', value, onChange, error, placeholder, required = true }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
        }`}
        required={required}
      />
    </div>
  )
}
