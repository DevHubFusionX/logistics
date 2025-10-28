import { PageHeader } from '../components/dashboard'
import { CheckCircle, Clock, Truck, AlertTriangle, XCircle, ThermometerSnowflake, Package } from 'lucide-react'

export default function BookingStatusGuide() {
  const statuses = [
    {
      status: 'Pending',
      icon: Clock,
      color: 'yellow',
      meaning: 'Waiting for approval',
      description: 'Your booking request has been received and is being reviewed by our team. We will confirm availability and assign a driver shortly.',
      customerAction: 'No action needed. You will be notified once confirmed.',
      bgColor: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      status: 'Confirmed',
      icon: CheckCircle,
      color: 'blue',
      meaning: 'Truck + driver assigned',
      description: 'Your booking has been confirmed! A truck and driver have been assigned to your shipment. You will receive driver details and estimated pickup time.',
      customerAction: 'Prepare your cargo for pickup at the scheduled time.',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      status: 'In Transit',
      icon: Truck,
      color: 'green',
      meaning: 'Delivery underway',
      description: 'Your shipment is on the move! The driver has picked up your cargo and is en route to the delivery location. Track real-time location and ETA.',
      customerAction: 'Track your shipment in real-time. Prepare to receive delivery.',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      status: 'Temperature Alert',
      icon: ThermometerSnowflake,
      color: 'orange',
      meaning: 'Monitoring warning',
      description: 'Temperature deviation detected for cold chain shipments. Our team is monitoring and taking corrective action to maintain required temperature.',
      customerAction: 'We are handling this. You will be updated on resolution.',
      bgColor: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      status: 'Delivered',
      icon: Package,
      color: 'gray',
      meaning: 'Successfully completed',
      description: 'Your shipment has been successfully delivered! Proof of delivery (POD) has been captured. Invoice will be generated and sent to you.',
      customerAction: 'Download your invoice and provide feedback.',
      bgColor: 'from-gray-50 to-slate-50',
      borderColor: 'border-gray-200',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      status: 'Cancelled',
      icon: XCircle,
      color: 'red',
      meaning: 'Customer or Support cancelled',
      description: 'This booking has been cancelled. If you cancelled, no charges apply. If cancelled by us, you will be notified of the reason.',
      customerAction: 'Contact support if you have questions about cancellation.',
      bgColor: 'from-red-50 to-rose-50',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      status: 'Failed',
      icon: AlertTriangle,
      color: 'red',
      meaning: 'Delivery could not complete',
      description: 'Delivery attempt was unsuccessful. This could be due to address issues, recipient unavailable, or other delivery obstacles.',
      customerAction: 'Contact support to reschedule or resolve delivery issues.',
      bgColor: 'from-red-50 to-orange-50',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ]

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Booking Status Guide"
        subtitle="Understand what each booking status means and what actions you need to take"
      />

      <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Track Your Booking</h3>
        <p className="text-gray-700 mb-4">
          Every booking goes through different stages from creation to delivery. You can track your booking status in real-time from the "My Bookings" page.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span>Status updates are automatic and you'll receive notifications at each stage</span>
        </div>
      </div>

      <div className="grid gap-4">
        {statuses.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={item.status}
              className={`bg-gradient-to-r ${item.bgColor} rounded-xl border ${item.borderColor} p-6 shadow-sm`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 ${item.iconBg} rounded-lg flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.status}</h3>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm font-medium text-gray-700">{item.meaning}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{item.description}</p>
                  <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-1">What you should do:</p>
                    <p className="text-sm text-gray-700">{item.customerAction}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Typical Booking Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-yellow-600">1</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Pending Review</p>
              <p className="text-sm text-gray-600">Usually takes 15-30 minutes</p>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-gray-200 h-6"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-blue-600">2</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Confirmed</p>
              <p className="text-sm text-gray-600">Driver assigned, ready for pickup</p>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-gray-200 h-6"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-green-600">3</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">In Transit</p>
              <p className="text-sm text-gray-600">Delivery in progress (track in real-time)</p>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-gray-200 h-6"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-gray-600">4</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Delivered</p>
              <p className="text-sm text-gray-600">Shipment completed, invoice generated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-700 mb-4">
          If you have questions about your booking status or need assistance, our support team is here to help.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="tel:+2348001234567" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
            Call Support
          </a>
          <a href="mailto:support@daralogistics.com" className="px-4 py-2 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors font-medium">
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}
