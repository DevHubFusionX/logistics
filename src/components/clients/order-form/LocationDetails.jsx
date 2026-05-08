import OrderFormSection from './OrderFormSection'
import OrderFormInput from './OrderFormInput'

export default function LocationDetails({ title, formData, setFormData, prefix }) {
  return (
    <OrderFormSection title={title}>
      <OrderFormInput
        label="Address"
        value={formData[`${prefix}Address`]}
        onChange={(e) => setFormData({ ...formData, [`${prefix}Address`]: e.target.value })}
        required
        fullWidth
      />
      <OrderFormInput
        label="City"
        value={formData[`${prefix}City`]}
        onChange={(e) => setFormData({ ...formData, [`${prefix}City`]: e.target.value })}
        required
      />
      <OrderFormInput
        label="State"
        value={formData[`${prefix}State`]}
        onChange={(e) => setFormData({ ...formData, [`${prefix}State`]: e.target.value })}
        required
      />
      <OrderFormInput
        label={prefix === 'origin' ? 'Pickup Date' : 'Expected Delivery Date'}
        type="date"
        value={formData[prefix === 'origin' ? 'pickupDate' : 'deliveryDate']}
        onChange={(e) => setFormData({ ...formData, [prefix === 'origin' ? 'pickupDate' : 'deliveryDate']: e.target.value })}
        required
      />
      <OrderFormInput
        label={prefix === 'origin' ? 'Pickup Time' : 'Expected Delivery Time'}
        type="time"
        value={formData[prefix === 'origin' ? 'pickupTime' : 'deliveryTime']}
        onChange={(e) => setFormData({ ...formData, [prefix === 'origin' ? 'pickupTime' : 'deliveryTime']: e.target.value })}
        required
      />
    </OrderFormSection>
  )
}
