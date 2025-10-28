import { X, Building2, Mail, Phone, MapPin, DollarSign, Package, CreditCard, Settings } from 'lucide-react'
import { clientShipments, paymentHistory } from './clientsData'

export default function ClientDetail({ client, onClose }) {
  const shipments = clientShipments[client.id] || []
  const payments = paymentHistory[client.id] || []

  const getStatusBadge = (status) => {
    const styles = {
      'in-transit': 'bg-blue-100 text-blue-700',
      'delivered': 'bg-green-100 text-green-700',
      'paid': 'bg-green-100 text-green-700',
      'overdue': 'bg-red-100 text-red-700'
    }
    return `px-3 py-1 rounded-full text-xs font-semibold uppercase ${styles[status]}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{client.industry}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              Company Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">{client.address}</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Account Officer</span>
                <p className="font-semibold text-gray-900">{client.accountOfficer}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              Revenue Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <div className="text-3xl font-bold text-green-600">₦{(client.revenue / 1000000).toFixed(2)}M</div>
                <div className="text-sm text-gray-500 mt-1">Total Revenue</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-3xl font-bold text-gray-900">{client.totalTrips}</div>
                <div className="text-sm text-gray-500 mt-1">Total Trips</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              Custom Pricing Configuration
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 text-xs">Base Rate</span>
                <p className="font-bold text-gray-900 text-lg">₦{client.customPricing.baseRate.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Discount</span>
                <p className="font-bold text-green-600 text-lg">{client.customPricing.discount}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-700" />
              Recent Shipments
            </h3>
            <div className="space-y-3">
              {shipments.map(shipment => (
                <div key={shipment.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{shipment.id}</span>
                    <span className={getStatusBadge(shipment.status)}>
                      {shipment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{shipment.route}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{shipment.date}</span>
                    <span className="font-bold text-gray-900">₦{shipment.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-700" />
              Payment History
            </h3>
            <div className="space-y-3">
              {payments.map(payment => (
                <div key={payment.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{payment.id}</span>
                    <span className={getStatusBadge(payment.status)}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{payment.date} • {payment.method}</span>
                    <span className="font-bold text-gray-900">₦{payment.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
