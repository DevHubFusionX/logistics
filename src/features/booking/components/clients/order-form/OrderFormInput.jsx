export default function OrderFormInput({ label, type = 'text', value, onChange, placeholder, required, step, rows, fullWidth }) {
  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
  
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows || 2}
          className={inputClass}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          step={step}
          className={inputClass}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  )
}
