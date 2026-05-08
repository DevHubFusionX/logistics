import httpClient from './httpClient'

const notificationService = {
  // Email notifications
  sendBookingConfirmation: (bookingId, email) =>
    httpClient.request('/notifications/email/booking-confirmation', {
      method: 'POST',
      body: JSON.stringify({ bookingId, email })
    }),

  sendPaymentConfirmation: (paymentId, email) =>
    httpClient.request('/notifications/email/payment-confirmation', {
      method: 'POST',
      body: JSON.stringify({ paymentId, email })
    }),

  sendDeliveryNotification: (bookingId, email) =>
    httpClient.request('/notifications/email/delivery-notification', {
      method: 'POST',
      body: JSON.stringify({ bookingId, email })
    }),

  // SMS notifications
  sendBookingSMS: (bookingId, phone) =>
    httpClient.request('/notifications/sms/booking', {
      method: 'POST',
      body: JSON.stringify({ bookingId, phone })
    }),

  sendDeliverySMS: (bookingId, phone) =>
    httpClient.request('/notifications/sms/delivery', {
      method: 'POST',
      body: JSON.stringify({ bookingId, phone })
    }),

  sendDriverAssignedSMS: (bookingId, phone) =>
    httpClient.request('/notifications/sms/driver-assigned', {
      method: 'POST',
      body: JSON.stringify({ bookingId, phone })
    }),

  // Notification preferences
  getPreferences: () =>
    httpClient.request('/notifications/preferences'),

  updatePreferences: (preferences) =>
    httpClient.request('/notifications/preferences', {
      method: 'PATCH',
      body: JSON.stringify(preferences)
    })
}

export default notificationService
