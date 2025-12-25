import OrderFormSection from './OrderFormSection'
import OrderFormInput from './OrderFormInput'

export default function AssignmentSection({ formData, setFormData }) {
  return (
    <OrderFormSection title="Assignment">
      <OrderFormInput
        label="Truck ID"
        value={formData.truckId}
        onChange={(e) => setFormData({ ...formData, truckId: e.target.value })}
        placeholder="DRA-017"
      />
      <OrderFormInput
        label="Driver ID"
        value={formData.driverId}
        onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
        placeholder="DRV-001"
      />
    </OrderFormSection>
  )
}
