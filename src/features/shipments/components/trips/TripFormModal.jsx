import { X } from 'lucide-react'

const FormField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
)

const InputField = ({ label, ...props }) => (
  <FormField label={label}>
    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" {...props} />
  </FormField>
)

const SelectField = ({ label, options, ...props }) => (
  <FormField label={label}>
    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg" {...props}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </FormField>
)

export default function TripFormModal({ isOpen, onClose, onSubmit, trucks, drivers }) {
  if (!isOpen) return null

  const sanitize = (str) => String(str).replace(/[<>"'&]/g, '')

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Trip</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Origin" type="text" placeholder="Lagos Warehouse" />
                <InputField label="Destination" type="text" placeholder="Abuja Hub" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SelectField 
                  label="Assigned Truck"
                  options={[
                    { value: '', label: 'Select Truck' },
                    ...trucks.map(t => ({ value: t.id, label: `${sanitize(t.id)} - ${sanitize(t.tonnage)}T` }))
                  ]}
                />
                <SelectField 
                  label="Assigned Driver"
                  options={[
                    { value: '', label: 'Select Driver' },
                    ...drivers.map(d => ({ value: d.id, label: sanitize(d.name) }))
                  ]}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <InputField label="Cargo Type" type="text" placeholder="Pharmaceuticals" />
                <InputField label="Weight (kg)" type="number" placeholder="Enter weight" />
                <InputField label="Value (₦)" type="number" placeholder="5000000" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="Min Temperature (°C)" type="number" placeholder="2" />
                <InputField label="Max Temperature (°C)" type="number" placeholder="8" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="Expected Departure" type="datetime-local" />
                <InputField label="Expected ETA" type="datetime-local" />
              </div>

              <FormField label="Notes">
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="3" placeholder="Additional trip notes..." />
              </FormField>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
