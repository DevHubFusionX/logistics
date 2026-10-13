import { useState } from 'react'
import {
  Package, Truck, Navigation, CheckCircle2,
  Phone, CreditCard, MapPin, ArrowRight
} from 'lucide-react'

const USER_STEPS = [
  {
    id: 1,
    title: '1. Book Your Shipment',
    statusBadge: 'Pending',
    statusBadgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Package,
    iconColor: 'bg-sky-600 text-white',
    heading: 'Submit what you want delivered',
    summary: 'Fill in your cargo details, pickup and dropoff locations, and your preferred temperature.',
    points: [
      'Click the "Book a shipment" button anywhere on your dashboard.',
      'Enter pickup and delivery addresses with sender/recipient contact details.',
      'Select your cargo type and cooling mode (Frozen, Chilled, or Ambient).',
      'See your clear upfront pricing before confirming.'
    ],
    tip: 'Your booking appears on your dashboard immediately with status "Pending" while our team prepares your truck.'
  },
  {
    id: 2,
    title: '2. Driver Assigned',
    statusBadge: 'Confirmed',
    statusBadgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: Truck,
    iconColor: 'bg-indigo-600 text-white',
    heading: 'A verified driver and truck are paired',
    summary: 'A temperature-controlled vehicle is assigned and pre-cooled for your cargo.',
    points: [
      'Your order status changes to "Confirmed".',
      'Your assigned driver’s name and phone number appear on your booking card.',
      'Use the green "Call" button on your table to speak with your driver directly.',
      'The driver heads to your pickup location at the scheduled time.'
    ],
    tip: 'You can check your driver’s details and phone number at any time from your dashboard.'
  },
  {
    id: 3,
    title: '3. Track Live on the Map',
    statusBadge: 'In Transit',
    statusBadgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Navigation,
    iconColor: 'bg-blue-600 text-white',
    heading: 'Watch your delivery move in real time',
    summary: 'As soon as the driver departs, live GPS tracking becomes active.',
    points: [
      'Status updates to "In Transit" when the driver leaves the pickup point.',
      'Click the "Live GPS" link on your booking to watch the vehicle location live.',
      'Your cargo temperature is continuously monitored to keep items fresh.',
      'Share the tracking link with your receiver so they know when to expect arrival.'
    ],
    tip: 'No need to guess where your driver is — live location updates are right on your screen.'
  },
  {
    id: 4,
    title: '4. Delivered Safely',
    statusBadge: 'Delivered',
    statusBadgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: CheckCircle2,
    iconColor: 'bg-emerald-600 text-white',
    heading: 'Delivery completed & confirmed',
    summary: 'Your items arrive safely at their destination.',
    points: [
      'The recipient inspects the goods and signs for receipt.',
      'Status changes to "Delivered" on your dashboard.',
      'Your digital delivery receipt and invoice are immediately available.',
      'Your shipment history and total spend stats are automatically updated.'
    ],
    tip: 'View and download invoices or order receipts anytime under your order details.'
  }
]

export default function UserTripGuide() {
  const [selectedStepId, setSelectedStepId] = useState(1)
  const currentStep = USER_STEPS.find(s => s.id === selectedStepId) || USER_STEPS[0]
  const Icon = currentStep.icon

  return (
    <div className="space-y-6">
      {/* Friendly Header Banner */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-800 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden shadow-md">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">How Your Delivery Works</h3>
        <p className="text-sm text-sky-100 mt-1 max-w-xl leading-relaxed">
          From booking to delivery in 4 simple steps. Track your driver, stay updated, and keep your goods fresh.
        </p>
      </div>

      {/* 4 Step Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {USER_STEPS.map((step) => {
          const StepIcon = step.icon
          const isActive = step.id === selectedStepId
          return (
            <button
              key={step.id}
              onClick={() => setSelectedStepId(step.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                isActive
                  ? 'bg-sky-50 border-sky-600 ring-2 ring-sky-600/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {step.id}
                </span>
                <StepIcon className={`w-4 h-4 ${isActive ? 'text-sky-700' : 'text-slate-400'}`} />
              </div>
              <p className={`text-xs font-bold ${isActive ? 'text-sky-950' : 'text-slate-700'}`}>
                {step.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* Step Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs ${currentStep.iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-slate-900">{currentStep.heading}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentStep.statusBadgeClass}`}>
                  Status: {currentStep.statusBadge}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentStep.summary}</p>
            </div>
          </div>
        </div>

        {/* What You Do / What Happens */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">What to expect</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentStep.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">
                  {idx + 1}
                </div>
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Helpful Tip Box */}
        <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 flex items-center justify-between gap-3 text-xs">
          <p className="text-sky-900 font-medium">
            <span className="font-bold">Good to know: </span>{currentStep.tip}
          </p>
          <button
            onClick={() => setSelectedStepId(prev => (prev % 4) + 1)}
            className="flex items-center gap-1 font-bold text-sky-700 hover:text-sky-900 flex-shrink-0 cursor-pointer"
          >
            <span>Next step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Helpful Dashboard Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Need to call your rider?</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Look for the phone icon on your order card to call your assigned driver anytime.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Navigation className="w-3.5 h-3.5 text-sky-600" />
            <span>Live GPS tracking</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Click "Live GPS" on any order that is In Transit to see the vehicle’s location on the map.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
            <span>Online payments</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Pay safely and instantly with Paystack using card, bank transfer, or USSD.
          </p>
        </div>
      </div>
    </div>
  )
}
