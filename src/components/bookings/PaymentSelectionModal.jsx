import { X } from 'lucide-react'
import PaymentSelection from '../booking/PaymentSelection'

export default function PaymentSelectionModal({
    booking,
    user,
    paymentMethod,
    setPaymentMethod,
    onSuccess,
    onClose
}) {
    if (!booking) return null

    const bookingId = booking.id || booking.tracking_number || booking._id
    const amount = booking.shipping_fee || booking.calculatedPrice || booking.totalCost || booking.estimatedCost || booking.amount

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 custom-scrollbar">
                {/* Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Payment Selection</h3>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mt-1">Booking: {bookingId}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8">
                    <PaymentSelection
                        bookingId={bookingId}
                        estimatedCost={amount}
                        email={user?.email || booking.email}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        onPaymentSuccess={onSuccess}
                        onPaymentClose={onClose}
                        onPayLater={() => onSuccess()} // For cash/bank transfer local confirmation
                        onBack={onClose}
                    />
                </div>
            </div>
        </div>
    )
}
