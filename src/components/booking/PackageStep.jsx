import { Package, ArrowRight, ArrowLeft, Snowflake, Pill, Box, Truck } from 'lucide-react'

export default function PackageStep({ formData, onChange, onNext, onBack, loading }) {
  const truckSizes = [
    { label: '2 Tons', value: 2, tons: 2 },
    { label: '3 Tons', value: 3, tons: 3 },
    { label: '5 Tons', value: 5, tons: 5 },
    { label: '10 Tons', value: 10, tons: 10 },
    { label: '15 Tons', value: 15, tons: 15 },
    { label: '20 Tons', value: 20, tons: 20 }
  ]

  const packageTypes = [
    { label: 'Frozen Foods', type: 'Frozen Foods', icon: Snowflake, color: 'cyan' },
    { label: 'Pharmaceuticals', type: 'Pharmaceuticals', icon: Pill, color: 'red' },
    { label: 'General Cargo', type: 'General', icon: Box, color: 'gray' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-purple-600 rounded-2xl mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">What are you shipping?</h3>
          <p className="text-gray-600">Select your package type and weight</p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">Package Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {packageTypes.map((pkg) => {
                const Icon = pkg.icon
                const isSelected = formData.goodsType === pkg.type
                return (
                  <button
                    key={pkg.type}
                    type="button"
                    onClick={() => onChange('goodsType', pkg.type)}
                    className={`p-6 border-2 rounded-xl transition-all duration-200 text-center group hover:scale-105 active:scale-95 ${
                      isSelected
                        ? `border-${pkg.color}-600 bg-${pkg.color}-50 shadow-lg ring-2 ring-${pkg.color}-200`
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className={`inline-flex p-4 rounded-xl mb-3 ${
                      isSelected ? `bg-${pkg.color}-100` : 'bg-gray-100 group-hover:bg-purple-100'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        isSelected ? `text-${pkg.color}-600` : 'text-gray-600 group-hover:text-purple-600'
                      }`} />
                    </div>
                    <div className="text-sm font-semibold text-gray-700">{pkg.label}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
              <Truck className="w-4 h-4" />
              Truck Size
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {truckSizes.map((truck) => {
                const isSelected = formData.truckSize === truck.value
                return (
                  <button
                    key={truck.tons}
                    type="button"
                    onClick={() => {
                      onChange('truckSize', truck.value)
                      onChange('cargoWeightKg', truck.value * 1000)
                    }}
                    className={`p-4 border-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 shadow-lg ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className="text-base font-bold text-gray-800">{truck.label}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold flex items-center gap-2 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          type="submit"
          disabled={!formData.goodsType || !formData.truckSize || loading}
          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transition-all font-semibold shadow-md text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              Check Prices <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
