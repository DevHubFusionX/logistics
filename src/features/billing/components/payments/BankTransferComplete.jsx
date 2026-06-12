import { useState } from 'react'
import { Building2, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { paymentService, uploadService } from '@/services'
import { FileUpload } from '@/components/common'
import toast from 'react-hot-toast'

export default function BankTransferComplete({ bookingId, amount, onSuccess }) {
  const [formData, setFormData] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    transferReference: '',
    transferDate: '',
    proofOfPayment: null
  })
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  const bankDetails = {
    bankName: 'First Bank of Nigeria',
    accountName: 'Dara Logistics Ltd',
    accountNumber: '1234567890',
    sortCode: '011'
  }

  const handleFileUpload = (data) => {
    setFormData({ ...formData, proofOfPayment: data.url })
    toast.success('File uploaded successfully')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.proofOfPayment) {
      toast.error('Please upload proof of payment')
      return
    }

    setLoading(true)
    try {
      const submitData = new FormData()
      submitData.append('bookingId', bookingId)
      submitData.append('amount', amount)
      submitData.append('accountName', formData.accountName)
      submitData.append('accountNumber', formData.accountNumber)
      submitData.append('bankName', formData.bankName)
      submitData.append('transferReference', formData.transferReference)
      submitData.append('transferDate', formData.transferDate)
      submitData.append('proofOfPayment', formData.proofOfPayment)

      const response = await paymentService.submitBankTransfer(submitData)
      toast.success('Bank transfer details submitted successfully')
      onSuccess(response.data)
    } catch (error) {
      toast.error(error.message || 'Failed to submit transfer details')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Bank Transfer Details</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Bank Name:</span>
            <span className="font-semibold text-gray-900">{bankDetails.bankName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Name:</span>
            <span className="font-semibold text-gray-900">{bankDetails.accountName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Number:</span>
            <span className="font-mono font-semibold text-gray-900">{bankDetails.accountNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sort Code:</span>
            <span className="font-mono font-semibold text-gray-900">{bankDetails.sortCode}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
            <span>Amount to Transfer:</span>
            <span className="text-blue-600">₦{amount?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Important</p>
            <p>After making the transfer, please fill the form below and upload proof of payment for verification.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h4 className="font-semibold text-gray-900 mb-4">Transfer Confirmation</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Account Name
            </label>
            <input
              type="text"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Account Number
            </label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Bank Name
          </label>
          <input
            type="text"
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transfer Reference
            </label>
            <input
              type="text"
              value={formData.transferReference}
              onChange={(e) => setFormData({ ...formData, transferReference: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., TRF123456"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transfer Date
            </label>
            <input
              type="date"
              value={formData.transferDate}
              onChange={(e) => setFormData({ ...formData, transferDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Proof of Payment
          </label>
          <FileUpload
            onUploadSuccess={handleFileUpload}
            acceptedTypes="image/*,.pdf"
            type="payment-proof"
            bookingId={bookingId}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Submit Transfer Details
            </>
          )}
        </button>
      </form>
    </div>
  )
}
