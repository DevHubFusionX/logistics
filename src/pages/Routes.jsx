import { PageHeader } from '../components/dashboard'
import { Map, Navigation } from 'lucide-react'

export default function Routes() {
  return (
    <>
      <PageHeader
        title="Routes & Live Map"
        subtitle="Real-time tracking and route optimization"
      />

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Map & Routes</h3>
        <p className="text-gray-600 mb-6">Interactive mapping and route optimization coming soon...</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto">
          <Navigation className="w-4 h-4" />
          Plan Route
        </button>
      </div>
    </>
  )
}