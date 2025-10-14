import { motion } from 'framer-motion'
import { User, Mail, Phone, Building } from 'lucide-react'

export default function CustomerInfo({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ [field]: value })
  }

  const handlePersonChange = (person, field, value) => {
    onChange({
      [person]: { ...data[person], [field]: value }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Information</h3>
        <p className="text-gray-600">Tell us about yourself and contact persons</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name / Business Name
          </label>
          <input
            type="text"
            value={data.fullNameOrBusiness}
            onChange={(e) => handleChange('fullNameOrBusiness', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="John Logistics Ltd"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Type
          </label>
          <select
            value={data.customerType}
            onChange={(e) => handleChange('customerType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={data.contactPhone}
              onChange={(e) => handleChange('contactPhone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="+2348012345678"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="info@company.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Pickup Person</h4>
          <div className="space-y-4">
            <input
              type="text"
              value={data.pickupPerson.name}
              onChange={(e) => handlePersonChange('pickupPerson', 'name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Pickup person name"
              required
            />
            <input
              type="tel"
              value={data.pickupPerson.phone}
              onChange={(e) => handlePersonChange('pickupPerson', 'phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Pickup person phone"
              required
            />
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Receiver Person</h4>
          <div className="space-y-4">
            <input
              type="text"
              value={data.receiverPerson.name}
              onChange={(e) => handlePersonChange('receiverPerson', 'name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Receiver name"
              required
            />
            <input
              type="tel"
              value={data.receiverPerson.phone}
              onChange={(e) => handlePersonChange('receiverPerson', 'phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Receiver phone"
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}