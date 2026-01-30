import { CreditCard, Building2, Banknote } from 'lucide-react'
import PaymentMethodButton from './PaymentMethodButton'
import { PAYMENT_METHODS } from '../../../utils/paymentValidation'

export default function PaymentMethodGrid({ selectedMethod, onMethodChange }) {
  const methods = [
    { id: PAYMENT_METHODS.CARD, icon: CreditCard, title: 'Paystack', subtitle: 'Pay securely online' },
    { id: PAYMENT_METHODS.BANK_TRANSFER, icon: Building2, title: 'Bank Transfer', subtitle: 'Upload payment proof' },
    { id: PAYMENT_METHODS.CASH, icon: Banknote, title: 'Cash Payment', subtitle: 'Pay on delivery' }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
      {methods.map((method) => (
        <PaymentMethodButton
          key={method.id}
          icon={method.icon}
          title={method.title}
          subtitle={method.subtitle}
          isSelected={selectedMethod === method.id}
          onClick={() => onMethodChange(method.id)}
        />
      ))}
    </div>
  )
}
