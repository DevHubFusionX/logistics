import httpClient from './httpClient'

const uploadService = {
  // Document upload
  uploadDocument: (file, type, bookingId) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    formData.append('bookingId', bookingId)

    return httpClient.request('/uploads/document', {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    })
  },

  // Proof of payment upload
  uploadPaymentProof: (file, paymentId) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('paymentId', paymentId)

    return httpClient.request('/uploads/payment-proof', {
      method: 'POST',
      body: formData,
      headers: {}
    })
  },

  // Profile picture upload
  uploadProfilePicture: (file) => {
    const formData = new FormData()
    formData.append('file', file)

    return httpClient.request('/uploads/profile-picture', {
      method: 'POST',
      body: formData,
      headers: {}
    })
  },

  // Get uploaded documents
  getDocuments: (bookingId) =>
    httpClient.request(`/uploads/documents/${bookingId}`),

  // Delete document
  deleteDocument: (documentId) =>
    httpClient.request(`/uploads/document/${documentId}`, {
      method: 'DELETE'
    })
}

export default uploadService
