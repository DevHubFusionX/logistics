/**
 * notificationService — STUB
 *
 * The backend does NOT have any /notifications/ routes.
 * Email and SMS notifications are handled server-side automatically
 * when bookings are created/updated.
 *
 * All methods below are stubs that log a warning and resolve silently.
 */
const noOp = (name) => (...args) => {
  console.warn(`notificationService.${name}() called — no backend endpoint exists. This is a no-op.`)
  return Promise.resolve({ data: null, message: 'Not implemented' })
}

const notificationService = {
  sendBookingConfirmation: noOp('sendBookingConfirmation'),
  sendPaymentConfirmation: noOp('sendPaymentConfirmation'),
  sendDeliveryNotification: noOp('sendDeliveryNotification'),
  sendBookingSMS: noOp('sendBookingSMS'),
  sendDeliverySMS: noOp('sendDeliverySMS'),
  sendDriverAssignedSMS: noOp('sendDriverAssignedSMS'),
  getPreferences: noOp('getPreferences'),
  updatePreferences: noOp('updatePreferences'),
}

export default notificationService
