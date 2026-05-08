import { useState } from 'react'
import { Calculator, TrendingUp, RefreshCw, AlertCircle, MapPin, Package, Truck } from 'lucide-react'
import pricingService from '../../services/pricingService'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const NIGERIAN_CITIES = [
  'Lagos', 'Abuja', 'Port Harcourt', 'Enugu', 'Kano', 'Ibadan',
  'Benin City', 'Warri', 'Kaduna', 'Jos', 'Calabar', 'Owerri',
  'Uyo', 'Abeokuta', 'Onitsha', 'Asaba'
]

export default function PricingSimulator() {
  const { isAdmin } = useAuth()
  const [weight, setWeight] = useState(10)
  const [destination, setDestination] = useState('Enugu')
  const [isLoading, setIsLoading] = useState(false)
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState(null)

  const handleCalculate = async () => {
    if (weight <= 0 || !destination) {
      toast.error('Please enter valid weight and destination')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Access different pricing tiers or logic for admin users.
      const response = await pricingService.calculatePrice(destination, weight, isAdmin)
      // httpClient returns { data: { error, message, data: { price } } }
      const apiBody = response.data
      if (apiBody?.error) throw new Error(apiBody.message || 'Failed to calculate price')

      const price = apiBody.data?.price || 0
      const tax = price * 0.075 // 7.5% VAT
      const subtotal = price - tax

      setQuote({
        destination,
        weight,
        subtotal: subtotal,
        tax: tax,
        total: price
      })
    } catch (err) {
      setError(err.message || 'Failed to calculate price')
      toast.error('Failed to calculate price')
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (value) => {
    return `₦${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Live Price Calculator</h3>
        <p className="text-sm text-gray-600 mt-1">
          Calculate shipping costs using real-time pricing configurations from the database
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              Destination City
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium bg-white"
            >
              {NIGERIAN_CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              Weight (Tons)
            </label>
            <div className="relative">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                placeholder="0"
                min="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs uppercase">tons</span>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={isLoading || weight <= 0 || !destination}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
            {isLoading ? 'Calculating...' : 'Calculate Price'}
          </button>
        </div>

        {/* Results */}
        <div className="relative">
          {error && (
            <div className="absolute inset-0 bg-red-50/90 backdrop-blur-[2px] rounded-2xl border border-red-100 p-6 flex flex-col items-center justify-center text-center z-10">
              <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
              <p className="text-red-900 font-bold">Calculation Failed</p>
              <p className="text-red-700 text-xs mt-1">{error}</p>
            </div>
          )}

          {quote ? (
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-xl shadow-emerald-100 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <TrendingUp className="w-5 h-5 text-emerald-200" />
                <h4 className="font-bold text-lg">Price Quote</h4>
              </div>

              <div className="space-y-3 text-sm flex-1">
                <div className="flex justify-between items-center opacity-80">
                  <span>Destination</span>
                  <span className="font-bold capitalize">{quote.destination}</span>
                </div>
                <div className="flex justify-between items-center opacity-80">
                  <span>Weight</span>
                  <span className="font-mono font-bold">{quote.weight} tons</span>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <div className="flex justify-between items-center mb-2 opacity-80">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold">{formatCurrency(quote.subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 opacity-80">
                    <span>VAT (7.5%)</span>
                    <span className="font-mono font-bold">{formatCurrency(quote.tax)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/20">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-3xl font-black">{formatCurrency(quote.total)}</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[10px] text-emerald-200 italic text-center">
                * Price calculated from live API pricing
              </p>
            </div>
          ) : (
            <div className="h-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="text-gray-900 font-bold">Ready to Calculate</h4>
              <p className="text-xs text-gray-500 mt-2 max-w-[220px]">
                Select a destination city and enter the weight, then click calculate to get an instant price quote
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
