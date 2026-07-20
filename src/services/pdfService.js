/**
 * pdfService — STUB
 *
 * The backend does NOT have any /pdf/ routes.
 * All methods below are stubs that log a warning and resolve silently.
 * The downloadPDF helper is kept functional for any local blob downloads.
 */
const noOp = (name) => (...args) => {
  console.warn(`pdfService.${name}() called — no backend endpoint exists.`)
  return Promise.resolve(null)
}

const pdfService = {
  generateReceipt: noOp('generateReceipt'),
  generateInvoice: noOp('generateInvoice'),
  generateBookingConfirmation: noOp('generateBookingConfirmation'),
  generateDeliveryNote: noOp('generateDeliveryNote'),
  generateManifest: noOp('generateManifest'),

  // Local-only helper — still functional
  downloadPDF: (blob, filename) => {
    if (!blob) {
      console.warn('pdfService.downloadPDF called with no blob — skipping.')
      return
    }
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
