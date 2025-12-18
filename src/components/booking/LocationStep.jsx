import { MapPin, ArrowRight, Navigation } from 'lucide-react'

export default function LocationStep({ formData, onChange, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Navigation className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Where are you shipping?</h3>
          <p className="text-gray-600">Select your pickup and delivery locations</p>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              Pickup Location
            </label>
            <select
              value={formData.pickupLocation.city}
              onChange={(e) => onChange('pickupLocation', 'city', e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm transition-all hover:border-gray-300 cursor-pointer"
              required
            >
              <option value="">Select pickup city...</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Warri">Warri</option>
              <option value="Benin City">Benin City</option>
              <option value="Enugu">Enugu</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>
          </div>

          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <div className="p-1.5 bg-orange-100 rounded-lg">
                <MapPin className="w-4 h-4 text-orange-600" />
              </div>
              Delivery Location
            </label>
            <select
              value={formData.dropoffLocation.city}
              onChange={(e) => onChange('dropoffLocation', 'city', e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base bg-white shadow-sm transition-all hover:border-gray-300 cursor-pointer"
              required
            >
              <option value="">Select delivery city...</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Warri">Warri</option>
              <option value="Benin City">Benin City</option>
              <option value="Enugu">Enugu</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!formData.pickupLocation.city || !formData.dropoffLocation.city}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-[0.98] transition-all font-semibold shadow-md text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
      >
        Continue <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  )
}
