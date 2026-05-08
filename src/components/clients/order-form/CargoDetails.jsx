import OrderFormSection from './OrderFormSection'
import OrderFormInput from './OrderFormInput'
import OrderFormSelect from './OrderFormSelect'

export default function CargoDetails({ formData, setFormData }) {
  return (
    <OrderFormSection title="Cargo Details">
      <OrderFormSelect
        label="Cargo Type"
        value={formData.cargoType}
        onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
        options={[
          { value: 'perishable', label: 'Perishable Goods' },
          { value: 'frozen', label: 'Frozen Foods' },
          { value: 'pharmaceutical', label: 'Pharmaceutical' },
          { value: 'general', label: 'General Cargo' }
        ]}
        placeholder="Select type..."
        required
      />
      <OrderFormInput
        label="Temperature Required (°C)"
        type="number"
        value={formData.temperatureRequired}
        onChange={(e) => setFormData({ ...formData, temperatureRequired: e.target.value })}
        placeholder="e.g., -18"
      />
      <OrderFormInput
        label="Weight (kg)"
        type="number"
        step="0.1"
        value={formData.weight}
        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        required
      />
      <OrderFormInput
        label="Volume (m³)"
        type="number"
        step="0.1"
        value={formData.volume}
        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
        required
      />
      <OrderFormInput
        label="Quantity/Units"
        type="number"
        value={formData.quantity}
        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
        required
      />
      <OrderFormInput
        label="Cargo Description"
        type="textarea"
        value={formData.cargoDescription}
        onChange={(e) => setFormData({ ...formData, cargoDescription: e.target.value })}
        placeholder="Describe the cargo..."
        fullWidth
      />
    </OrderFormSection>
  )
}
