import { Thermometer, Plus, Save } from 'lucide-react'

export default function TemperatureThresholds({ onSave }) {
  const thresholds = [
    { product: 'Frozen Foods', min: -18, max: -15 },
    { product: 'Chilled Foods', min: 2, max: 5 },
    { product: 'Pharmaceuticals', min: 2, max: 8 },
    { product: 'Fresh Produce', min: 0, max: 4 }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            Temperature Thresholds by Product Type
          </h3>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        <div className="space-y-3">
          {thresholds.map((item, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Product Type</label>
                <input
                  type="text"
                  defaultValue={item.product}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Min Temp (°C)</label>
                <input
                  type="number"
                  defaultValue={item.min}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Max Temp (°C)</label>
                <input
                  type="number"
                  defaultValue={item.max}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Alert Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Send email alerts for temperature violations</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Send SMS alerts for critical violations</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Send push notifications</span>
          </label>
        </div>
      </div>

      <button
        onClick={onSave}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Save className="w-4 h-4" />
        Save Thresholds
      </button>
    </div>
  )
}
