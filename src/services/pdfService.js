import httpClient from './httpClient'

const pdfService = {
  // Generate receipt PDF
  generateReceipt: (paymentId) =>
    httpClient.request(`/pdf/receipt/${paymentId}`, {
      responseType: 'blob'
    }),

  // Generate invoice PDF
  generateInvoice: (bookingId) =>
    httpClient.request(`/pdf/invoice/${bookingId}`, {
      responseType: 'blob'
    }),

  // Generate booking confirmation PDF
  generateBookingConfirmation: (bookingId) =>
    httpClient.request(`/pdf/booking-confirmation/${bookingId}`, {
      responseType: 'blob'
    }),

  // Generate delivery note PDF
  generateDeliveryNote: (bookingId) =>
    httpClient.request(`/pdf/delivery-note/${bookingId}`, {
      responseType: 'blob'
    }),

  // Generate manifest PDF
  generateManifest: (tripId) =>
    httpClient.request(`/pdf/manifest/${tripId}`, {
      responseType: 'blob'
    }),

  // Download helper
  downloadPDF: (blob, filename) => {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

export default pdfService
