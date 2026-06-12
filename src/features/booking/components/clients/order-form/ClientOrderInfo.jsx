import OrderFormSection from './OrderFormSection'
import OrderFormSelect from './OrderFormSelect'
import { clientsData } from '../clientsData'

export default function ClientOrderInfo({ formData, setFormData }) {
  return (
    <OrderFormSection title="Client & Order Information">
      <OrderFormSelect
        label="Select Client"
        value={formData.clientId}
        onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
        options={clientsData.map(c => ({ value: c.id, label: c.name }))}
        placeholder="Choose a client..."
        required
      />
      <OrderFormSelect
        label="Order Type"
        value={formData.orderType}
        onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
        options={[
          { value: 'standard', label: 'Standard Delivery' },
          { value: 'express', label: 'Express Delivery' },
          { value: 'scheduled', label: 'Scheduled Delivery' },
          { value: 'recurring', label: 'Recurring Order' }
        ]}
        placeholder="Select type..."
        required
      />
      <OrderFormSelect
        label="Priority Level"
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' }
        ]}
      />
    </OrderFormSection>
  )
}
