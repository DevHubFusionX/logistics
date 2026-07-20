/**
 * validationService — STUB
 *
 * The backend does NOT have any /validation/ routes.
 * Address validation, geocoding, and distance calculation are done client-side
 * or deferred to booking-time server validation.
 *
 * All methods below are stubs that log a warning and resolve silently.
 */
const noOp = (name) => (...args) => {
  console.warn(`validationService.${name}() called — no backend endpoint exists.`)
  return Promise.resolve({ data: null, valid: true, message: 'Not implemented — validation skipped' })
}

const validationService = {
  validateAddress: noOp('validateAddress'),
  geocodeAddress: noOp('geocodeAddress'),
  calculateDistance: noOp('calculateDistance'),
  validatePhone: noOp('validatePhone'),
  validateEmail: noOp('validateEmail'),
}

export default validationService
