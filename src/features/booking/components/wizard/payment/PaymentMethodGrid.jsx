import { CreditCard, Building2 } from 'lucide-react'
import PaymentMethodButton from './PaymentMethodButton'
import { PAYMENT_METHODS } from '@/utils/paymentValidation'

const METHODS = [
  { id: PAYMENT_METHODS.CARD,          icon: CreditCard, title: 'Pay with Paystack',  subtitle: 'Card, bank transfer & USSD' },
  { id: PAYMENT_METHODS.BANK_TRANSFER, icon: Building2,  title: 'Bank transfer',      subtitle: 'Upload proof of payment' },
]

export default function PaymentMethodGrid({ selectedMethod, onMethodChange }) {
  return (
    <div className="space-y-2">
      {METHODS.map(m => (
        <PaymentMethodButton
          key={m.id}
          icon={m.icon}
          title={m.title}
          subtitle={m.subtitle}
          isSelected={selectedMethod === m.id}
          onClick={() => onMethodChange(m.id)}
        />
      ))}
    </div>
  )
}
