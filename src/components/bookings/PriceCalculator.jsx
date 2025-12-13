import { useState } from 'react'
import { Calculator, Truck, MapPin, AlertCircle, CheckCircle } from 'lucide-react'
import { bookingService } from '@/services'

export default function PriceCalculator() {
    const [city, setCity] = useState('')
    const [truckSize, setTruckSize] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleCalculate = async (e) => {
        e.preventDefault()
        if (!city || !truckSize) return

        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const response = await bookingService.getPrices(city, truckSize)
            if (response && response.error) {
                setError(response.message || 'Failed to calculate price')
            } else if (response && response.data) {
                setResult(response.data)
            } else {
                // Fallback if response structure is different than expected 200 OK wrapper
                // The documentation showed 200 OK with data object
                setResult(response)
            }
        } catch (err) {
            setError(err.message || 'An error occurred while calculating price')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Price Calculator</h2>
                    <p className="text-sm text-gray-600">Get an instant delivery estimate</p>
                </div>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Enugu"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Truck Size (Tons)
                    </label>
                    <div className="relative">
                        <Truck className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                            type="number"
                            value={truckSize}
                            onChange={(e) => setTruckSize(e.target.value)}
                            placeholder="e.g. 5"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !city || !truckSize}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        'Calculate Price'
                    )}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start gap-2 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-green-900">Estimated Price</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-700">
                        ₦{result.price?.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                        *This is an estimate. Final price may vary based on exact details.
                    </p>
                </div>
            )}
        </div>
    )
}
