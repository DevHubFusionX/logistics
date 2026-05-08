// Payment method validation utilities

export const PAYMENT_METHODS = {
  CARD: 'card',
  WALLET: 'wallet',
  BANK_TRANSFER: 'bank_transfer',
  CASH: 'cash',
  PAY_LATER: 'pay_later'
}

export const validatePaymentMethod = (method) => {
  return Object.values(PAYMENT_METHODS).includes(method)
}

export const validateBankTransfer = (data) => {
  const errors = {}
  
  if (!data.bankName?.trim()) {
    errors.bankName = 'Bank name is required'
  }
  
  if (!data.accountNumber?.trim()) {
    errors.accountNumber = 'Account number is required'
  } else if (!/^\d{10}$/.test(data.accountNumber)) {
    errors.accountNumber = 'Account number must be 10 digits'
  }
  
  if (!data.transactionRef?.trim()) {
    errors.transactionRef = 'Transaction reference is required'
  }
  
  if (!data.amount || data.amount <= 0) {
    errors.amount = 'Valid amount is required'
  }
  
  if (!data.proof) {
    errors.proof = 'Payment proof is required'
  }
  
  return errors
}

export const validateFileUpload = (file) => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
  
  if (!file) {
    return 'File is required'
  }
  
  if (file.size > maxSize) {
    return 'File size must be less than 5MB'
  }
  
  if (!allowedTypes.includes(file.type)) {
    return 'Only JPG, PNG, and PDF files are allowed'
  }
  
  return null
}

export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
