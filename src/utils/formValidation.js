// Form validation utilities for booking flow
// Validators imported from canonical module
import {
  validateEmail,
  validatePhone,
  validateWeight,
  validateQuantity,
  validateDate,
  validateBusinessHours,
  validateAddress
} from './validation'

// Re-export for backward compatibility
export { validateEmail, validatePhone, validateWeight, validateQuantity, validateDate, validateBusinessHours, validateAddress }

export const getValidationErrors = (formData) => {
  const errors = {}

  // Customer info
  if (!formData.fullNameOrBusiness?.trim()) {
    errors.fullNameOrBusiness = 'Business name is required'
  }
  if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format'
  }
  if (!validatePhone(formData.contactPhone)) {
    errors.contactPhone = 'Invalid phone (use +234XXXXXXXXXX or 0XXXXXXXXXX)'
  }

  // Pickup person
  if (!formData.pickupPerson?.name?.trim()) {
    errors.pickupPersonName = 'Pickup person name is required'
  }
  if (!validatePhone(formData.pickupPerson?.phone)) {
    errors.pickupPersonPhone = 'Invalid pickup phone number'
  }
  if (!validateEmail(formData.pickupPerson?.email)) {
    errors.pickupPersonEmail = 'Invalid pickup email'
  }

  // Receiver person
  if (!formData.receiverPerson?.name?.trim()) {
    errors.receiverPersonName = 'Receiver name is required'
  }
  if (!validatePhone(formData.receiverPerson?.phone)) {
    errors.receiverPersonPhone = 'Invalid receiver phone number'
  }
  if (!validateEmail(formData.receiverPerson?.email)) {
    errors.receiverPersonEmail = 'Invalid receiver email'
  }

  // Pickup location
  if (!validateAddress(formData.pickupLocation?.address)) {
    errors.pickupAddress = 'Address must be at least 10 characters'
  }
  if (!formData.pickupLocation?.city?.trim()) {
    errors.pickupCity = 'City is required'
  }
  if (!formData.pickupLocation?.state?.trim()) {
    errors.pickupState = 'State is required'
  }

  // Delivery location
  if (!validateAddress(formData.dropoffLocation?.address)) {
    errors.dropoffAddress = 'Address must be at least 10 characters'
  }
  if (!formData.dropoffLocation?.city?.trim()) {
    errors.dropoffCity = 'City is required'
  }
  if (!formData.dropoffLocation?.state?.trim()) {
    errors.dropoffState = 'State is required'
  }

  // Cargo details
  if (!formData.goodsType) {
    errors.goodsType = 'Goods type is required'
  }
  if (!validateWeight(formData.cargoWeightKg)) {
    errors.cargoWeightKg = 'Weight must be between 0.1 and 50,000 kg'
  }
  if (!validateQuantity(formData.quantity)) {
    errors.quantity = 'Quantity must be between 1 and 1,000'
  }
  if (!formData.vehicleType) {
    errors.vehicleType = 'Vehicle type is required'
  }

  // Dates
  if (!validateDate(formData.estimatedPickupDate)) {
    errors.estimatedPickupDate = 'Pickup date must be in the future (within 1 year)'
  } else if (!validateBusinessHours(formData.estimatedPickupDate)) {
    errors.estimatedPickupDate = 'Pickup must be Mon-Sat, 6 AM - 8 PM'
  }

  if (!validateDate(formData.estimatedDeliveryDate)) {
    errors.estimatedDeliveryDate = 'Delivery date must be in the future (within 1 year)'
  } else if (new Date(formData.estimatedDeliveryDate) <= new Date(formData.estimatedPickupDate)) {
    errors.estimatedDeliveryDate = 'Delivery date must be after pickup date'
  }

  return errors
}

export const validateField = (name, value, formData = {}) => {
  switch (name) {
    case 'email':
    case 'pickupPersonEmail':
    case 'receiverPersonEmail':
      return validateEmail(value) ? '' : 'Invalid email format'
    
    case 'contactPhone':
    case 'pickupPersonPhone':
    case 'receiverPersonPhone':
      return validatePhone(value) ? '' : 'Invalid phone number'
    
    case 'cargoWeightKg':
      return validateWeight(value) ? '' : 'Weight must be 0.1-50,000 kg'
    
    case 'quantity':
      return validateQuantity(value) ? '' : 'Quantity must be 1-1,000'
    
    case 'pickupAddress':
    case 'dropoffAddress':
      return validateAddress(value) ? '' : 'Address too short (min 10 chars)'
    
    case 'estimatedPickupDate':
      if (!validateDate(value)) return 'Date must be in the future'
      if (!validateBusinessHours(value)) return 'Mon-Sat, 6 AM - 8 PM only'
      return ''
    
    case 'estimatedDeliveryDate':
      if (!validateDate(value)) return 'Date must be in the future'
      if (formData.estimatedPickupDate && new Date(value) <= new Date(formData.estimatedPickupDate)) {
        return 'Must be after pickup date'
      }
      return ''
    
    default:
      return ''
  }
}
