import { motion } from 'framer-motion'
import { Package, Weight, Thermometer } from 'lucide-react'

export default function CargoInfo({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Cargo Information</h3>
        <p className="text-gray-600">Details about your shipment</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goods Type
          </label>
          <select
            value={data.goodsType}
            onChange={(e) => handleChange('goodsType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={data.quantity}
            onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Number of items"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Weight className="w-4 h-4 inline mr-1" />
            Cargo Weight (kg)
          </label>
          <input
            type="number"
            value={data.cargoWeightKg}
            onChange={(e) => handleChange('cargoWeightKg', parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Weight in kilograms"
            min="0.1"
            step="0.1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Thermometer className="w-4 h-4 inline mr-1" />
            Temperature Control (°C)
          </label>
          <input
            type="number"
            value={data.tempControlCelsius}
            onChange={(e) => handleChange('tempControlCelsius', parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Required temperature"
            step="0.1"
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Special Requirements</h4>
        <div className="flex gap-6">
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
        </div>
      </div>
    </div>
  )
}