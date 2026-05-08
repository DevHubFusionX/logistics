export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-NG').format(new Date(date))
}

export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}