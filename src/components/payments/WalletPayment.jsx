import { useState, useEffect } from 'react'
import { Wallet, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { paymentService } from '@/services'
import toast from 'react-hot-toast'

export default function WalletPayment({ bookingId, amount, onSuccess, onError }) {
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchBalance()
  }, [])

  const fetchBalance = async () => {
    try {
      const response = await paymentService.getWalletBalance()
      setBalance(response.data.balance)
    } catch (error) {
      toast.error('Failed to fetch wallet balance')
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (balance < amount) {
      toast.error('Insufficient wallet balance')
      return
    }

    setProcessing(true)
    try {
      const response = await paymentService.payWithWallet(bookingId, amount)
      toast.success('Payment successful!')
      onSuccess(response.data)
    } catch (error) {
      toast.error(error.message || 'Payment failed')
      onError?.(error)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    )
  }

  const hasBalance = balance >= amount

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-gray-900">Wallet Balance</span>
          </div>
          <span className="text-2xl font-bold text-purple-600">₦{balance?.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Amount to Pay</span>
          <span className="font-semibold text-gray-900">₦{amount?.toLocaleString()}</span>
        </div>
      </div>

      {!hasBalance && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Insufficient Balance</p>
              <p className="text-xs text-red-700 mt-1">
                You need ₦{(amount - balance).toLocaleString()} more to complete this payment.
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={!hasBalance || processing}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Pay with Wallet
          </>
        )}
      </button>
    </div>
  )
}
