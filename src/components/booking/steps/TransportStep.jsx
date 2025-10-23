import { motion } from 'framer-motion'
import { Truck, Plane, Ship } from 'lucide-react'

export default function TransportStep({ data, onChange }) {
  const transportModes = [
    {
      id: 'truck',
      name: 'Ground Transport',
      icon: Truck,
      description: 'Road transport for domestic deliveries',
      features: ['Door-to-door delivery', 'Flexible scheduling', 'Cost-effective']
    },
    {
      id: 'air',
      name: 'Air Freight',
      icon: Plane,
      description: 'Fast air transport for urgent shipments',
      features: ['Fastest delivery', 'International reach', 'Time-sensitive goods']
    },
    {
      id: 'sea',
      name: 'Sea Freight',
      icon: Ship,
      description: 'Ocean transport for bulk shipments',
      features: ['Large capacity', 'International shipping', 'Cost-effective for bulk']
    }
  ]

  const handleSelect = (vehicleType) => {
    onChange({ vehicleType })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Transport Mode</h3>
        <p className="text-gray-600">Select the best transport option for your shipment</p>
      </div>

      <div className="space-y-4">
        {transportModes.map((mode) => {
          const IconComponent = mode.icon
          const isSelected = data.vehicleType === mode.id
          
          return (
            <motion.div
              key={mode.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? 'border-sky-500 bg-sky-50'
                  : 'border-gray-200 hover:border-sky-300 hover:bg-gray-50'
              }`}
              onClick={() => handleSelect(mode.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-sky-500' : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-6 h-6 ${
                    isSelected ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{mode.name}</h4>
                  <p className="text-gray-600 mb-3">{mode.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {mode.features.map((feature, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isSelected
                            ? 'bg-sky-100 text-sky-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {isSelected && (
                  <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}