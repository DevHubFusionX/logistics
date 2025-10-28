import { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'
import { calculateQuote as calcQuote } from '../../utils/pricingEngine'

export default function PricingSimulator() {
  const [weight, setWeight] = useState(100)
  const [serviceType, setServiceType] = useState('standard')
  const [quote, setQuote] = useState(null)

  const calculateQuote = () => {
    const bookingData = { weight, serviceType }
    const result = calcQuote(bookingData)
    setQuote(result)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Price Calculator</h3>
        <p className="text-sm text-gray-600 mt-1">Simulate pricing with current configuration</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="standard">Standard (1.0×)</option>
              <option value="express">Express (1.5×)</option>
              <option value="overnight">Overnight (2.0×)</option>
            </select>
          </div>

          <button
            onClick={calculateQuote}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Calculator className="w-5 h-5" />
            Calculate Price
          </button>
        </div>

        {quote && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Estimated Quote</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price ({weight} kg × $2.50):</span>
                <span className="font-semibold">${quote.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Multiplier ({quote.serviceMultiplier}×):</span>
                <span className="font-semibold">${(quote.basePrice * quote.serviceMultiplier).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance (2%):</span>
                <span className="font-semibold">${quote.insurance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Handling Fee:</span>
                <span className="font-semibold">${quote.handling}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${quote.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%):</span>
                <span className="font-semibold">${quote.tax}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-blue-600">${quote.total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
