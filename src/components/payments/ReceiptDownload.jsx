import { useState } from 'react'
import { Download, Mail, Loader, CheckCircle } from 'lucide-react'
import { paymentService } from '@/services'
import toast from 'react-hot-toast'

export default function ReceiptDownload({ paymentId, email, type = 'receipt' }) {
  const [downloading, setDownloading] = useState(false)
  const [emailing, setEmailing] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = type === 'invoice' 
        ? await paymentService.generateInvoice(paymentId)
        : await paymentService.downloadReceipt(paymentId)
      
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${type}-${paymentId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      toast.success(`${type === 'invoice' ? 'Invoice' : 'Receipt'} downloaded successfully!`)
    } catch (error) {
      toast.error(`Failed to download ${type}`)
      console.error('Download error:', error)
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
      type === 'invoice'
        ? await paymentService.emailInvoice(paymentId, email)
        : await paymentService.emailReceipt(paymentId, email)
      
      toast.success(`${type === 'invoice' ? 'Invoice' : 'Receipt'} sent to ${email}`)
    } catch (error) {
      toast.error(`Failed to send ${type}`)
      console.error('Email error:', error)
    } finally {
      setEmailing(false)
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {downloading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        <span className="text-sm">Download</span>
      </button>

      <button
        onClick={handleEmail}
        disabled={emailing || !email}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {emailing ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Mail className="w-4 h-4" />
        )}
        <span className="text-sm">Email</span>
      </button>
    </div>
  )
}
