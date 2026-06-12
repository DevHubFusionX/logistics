import { useState } from 'react'
import { FileText, Download, Mail, Loader } from 'lucide-react'
import { paymentService } from '@/services'
import toast from 'react-hot-toast'

export default function InvoiceGenerator({ bookingId, email }) {
  const [downloading, setDownloading] = useState(false)
  const [emailing, setEmailing] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await paymentService.generateInvoice(bookingId)
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `invoice-${bookingId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Invoice downloaded successfully!')
    } catch (error) {
      toast.error('Failed to download invoice')
    } finally {
      setDownloading(false)
    }
  }

  const handleEmail = async () => {
    if (!email) {
      toast.error('Email address is required')
      return
    }

    setEmailing(true)
    try {
      await paymentService.emailInvoice(bookingId, email)
      toast.success(`Invoice sent to ${email}`)
    } catch (error) {
      toast.error('Failed to send invoice')
    } finally {
      setEmailing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Invoice</h3>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          {downloading ? <Loader className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Download
        </button>

        <button
          onClick={handleEmail}
          disabled={emailing || !email}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
        >
          {emailing ? <Loader className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
          Email
        </button>
      </div>
    </div>
  )
}
