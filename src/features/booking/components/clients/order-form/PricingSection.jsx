import OrderFormSection from './OrderFormSection'
import OrderFormInput from './OrderFormInput'
import OrderFormSelect from './OrderFormSelect'

export default function PricingSection({ formData, setFormData }) {
  return (
    <OrderFormSection title="Pricing & Payment">
      <OrderFormInput
        label="Base Price (₦)"
        type="number"
        value={formData.basePrice}
        onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
        required
      />
      <OrderFormInput
        label="Additional Charges (₦)"
        type="number"
        value={formData.additionalCharges}
        onChange={(e) => setFormData({ ...formData, additionalCharges: e.target.value })}
        placeholder="0"
      />
      <OrderFormInput
        label="Discount (%)"
        type="number"
        step="0.1"
        value={formData.discount}
        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
        placeholder="0"
      />
      <OrderFormSelect
        label="Payment Method"
        value={formData.paymentMethod}
        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
        options={[
          { value: 'cash', label: 'Cash' },
          { value: 'bank_transfer', label: 'Bank Transfer' },
          { value: 'credit', label: 'Credit' },
          { value: 'online', label: 'Online Payment' }
        ]}
        placeholder="Select method..."
        required
      />
      <OrderFormSelect
        label="Payment Terms"
        value={formData.paymentTerms}
        onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
        options={[
          { value: 'prepaid', label: 'Prepaid' },
          { value: 'cod', label: 'Cash on Delivery' },
          { value: 'net30', label: 'Net 30 Days' },
          { value: 'net60', label: 'Net 60 Days' }
        ]}
        placeholder="Select terms..."
        required
      />
    </OrderFormSection>
  )
}
