import { AppLayout, PageHeader } from '../components/dashboard'
import { Truck, Plus } from 'lucide-react'

export default function Fleet() {
  return (
    <AppLayout>
      <PageHeader 
        title="Fleet Management" 
        subtitle="Manage your vehicles, drivers, and maintenance schedules"
      />
      
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Fleet Management</h3>
        <p className="text-gray-600 mb-6">Comprehensive fleet management coming soon...</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>
    </AppLayout>
  )
}