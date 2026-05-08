import { useState } from 'react'
import { Upload, X, FileText, AlertCircle } from 'lucide-react'
import { validateBankTransfer, validateFileUpload, convertFileToBase64 } from '../../utils/paymentValidation'

export default function BankTransferForm({ bookingId, amount, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    transactionRef: '',
    amount: amount,
    proof: null
  })
  const [errors, setErrors] = useState({})
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const error = validateFileUpload(file)
    if (error) {
      setErrors({ ...errors, proof: error })
      return
    }

    setFormData({ ...formData, proof: file })
    setErrors({ ...errors, proof: null })

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleRemoveFile = () => {
    setFormData({ ...formData, proof: null })
    setPreviewUrl(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateBankTransfer(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const proofBase64 = await convertFileToBase64(formData.proof)
      const submitData = {
        ...formData,
        bookingId,
        proof: proofBase64
      }
      await onSubmit(submitData)
    } catch (error) {
      setErrors({ ...errors, proof: 'Failed to process file' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Bank Transfer Instructions</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>Bank:</strong> GTBank</p>
          <p><strong>Account Name:</strong> Dara Logistics Ltd</p>
          <p><strong>Account Number:</strong> 0123456789</p>
          <p><strong>Amount:</strong> ₦{amount?.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Bank Name</label>
        <input
          type="text"
          value={formData.bankName}
          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.bankName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., GTBank"
        />
        {errors.bankName && (
          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.bankName}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Account Number</label>
        <input
          type="text"
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.accountNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="10-digit account number"
          maxLength="10"
        />
        {errors.accountNumber && (
          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.accountNumber}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference</label>
        <input
          type="text"
          value={formData.transactionRef}
          onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.transactionRef ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Transaction reference from your bank"
        />
        {errors.transactionRef && (
          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.transactionRef}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Payment Proof</label>
        <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
          errors.proof ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
        }`}>
          {!formData.proof ? (
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload receipt or screenshot</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG, or PDF (max 5MB)</p>
            </label>
          ) : (
            <div className="space-y-2">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-h-32 mx-auto rounded" />
              ) : (
                <FileText className="w-8 h-8 text-blue-600 mx-auto" />
              )}
              <p className="text-sm font-medium text-gray-900">{formData.proof.name}</p>
              <p className="text-xs text-gray-500">{(formData.proof.size / 1024).toFixed(2)} KB</p>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-600 text-sm hover:underline flex items-center gap-1 mx-auto"
              >
                <X className="w-4 h-4" />
                Remove
              </button>
            </div>
          )}
        </div>
        {errors.proof && (
          <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.proof}
          </p>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> Your payment will be verified within 24 hours. You'll receive a confirmation email once approved.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Payment Proof'}
        </button>
      </div>
    </form>
  )
}
