import { Package, Weight, Thermometer } from 'lucide-react'

export default function CargoStep({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Cargo Details</h3>
        <p className="text-gray-600">Tell us about your shipment</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goods Type *
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={data.goodsType}
              onChange={(e) => handleChange('goodsType', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              required
            >
              <option value="">Select goods type</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Machinery">Machinery</option>
              <option value="Documents">Documents</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Weight className="w-4 h-4 inline mr-1" />
            Cargo Weight (kg) *
          </label>
          <input
            type="number"
            value={data.cargoWeightKg}
            onChange={(e) => handleChange('cargoWeightKg', parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="50"
            min="0.1"
            step="0.1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity *
          </label>
          <input
            type="number"
            value={data.quantity}
            onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="3"
            min="1"
            required
          />
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Special Requirements</h4>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.isFragile}
                onChange={(e) => handleChange('isFragile', e.target.checked)}
                className="rounded border-gray-300 text-sky-500 focus:ring-sky-500"
              />
              <span className="ml-2 text-sm text-gray-700">Fragile Items</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.isPerishable}
                onChange={(e) => handleChange('isPerishable', e.target.checked)}
                className="rounded border-gray-300 text-sky-500 focus:ring-sky-500"
              />
              <span className="ml-2 text-sm text-gray-700">Perishable Goods</span>
            </label>

            {data.isPerishable && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Thermometer className="w-4 h-4 inline mr-1" />
                  Required Temperature (°C)
                </label>
                <input
                  type="number"
                  value={data.tempControlCelsius}
                  onChange={(e) => handleChange('tempControlCelsius', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="5"
                  step="0.1"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}