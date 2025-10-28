import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { MapPin, Package, CheckCircle, Clock, Truck, User, Phone, Camera, FileText, Star } from 'lucide-react'
import TrackingMap from '../../components/tracking/TrackingMap'
import StatusTimeline from '../../components/tracking/StatusTimeline'
import DriverInfo from '../../components/tracking/DriverInfo'
import ProofOfDelivery from '../../components/tracking/ProofOfDelivery'
import RatingModal from '../../components/tracking/RatingModal'

const mockShipment = {
  id: 'BK-1705234567',
  status: 'in_transit',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '+234-xxx-xxxx',
  pickupAddress: '123 Main St, Lagos',
  deliveryAddress: '456 Oak Ave, Abuja',
  weight: 100,
  cargoType: 'general',
  serviceType: 'standard',
  amount: 302.40,
  createdAt: '2025-01-15 10:30:00',
  pickupDate: '2025-01-16 09:00:00',
  estimatedDelivery: '2025-01-18 14:00:00',
  driver: {
    id: 'DRV-001',
    name: 'Ahmed Ibrahim',
    phone: '+234-801-234-5678',
    rating: 4.8,
    trips: 523,
    vehicle: 'Toyota Hiace',
    plate: 'ABC-123-XY',
    photo: null
  },
  currentLocation: {
    lat: 8.6753,
    lng: 7.3986,
    city: 'Lokoja',
    timestamp: '2025-01-17 14:30:00'
  },
  timeline: [
    { status: 'booking_created', label: 'Booking Created', timestamp: '2025-01-15 10:30:00', completed: true },
    { status: 'payment_confirmed', label: 'Payment Confirmed', timestamp: '2025-01-15 10:31:00', completed: true },
    { status: 'driver_assigned', label: 'Driver Assigned', timestamp: '2025-01-15 11:00:00', completed: true, actor: 'Admin' },
    { status: 'driver_accepted', label: 'Driver Accepted', timestamp: '2025-01-15 11:15:00', completed: true, actor: 'Ahmed Ibrahim' },
    { status: 'picked_up', label: 'Pickup Completed', timestamp: '2025-01-16 09:15:00', completed: true, actor: 'Ahmed Ibrahim', photos: 4 },
    { status: 'departed', label: 'Departed Lagos', timestamp: '2025-01-16 10:00:00', completed: true },
    { status: 'checkpoint_1', label: 'Reached Ibadan', timestamp: '2025-01-16 14:30:00', completed: true },
    { status: 'checkpoint_2', label: 'Reached Lokoja', timestamp: '2025-01-17 08:00:00', completed: true },
    { status: 'in_transit', label: 'In Transit to Abuja', timestamp: '2025-01-17 14:30:00', completed: true, current: true },
    { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: null, completed: false },
    { status: 'delivered', label: 'Delivered', timestamp: null, completed: false }
  ],
  pickupProof: {
    photos: ['pickup1.jpg', 'pickup2.jpg', 'pickup3.jpg', 'pickup4.jpg'],
    signature: 'customer_signature.png',
    notes: 'Cargo in good condition. Properly secured.',
    timestamp: '2025-01-16 09:15:00'
  },
  deliveryProof: null
}

export default function ShipmentTracking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shipment] = useState(mockShipment)
  const [showRating, setShowRating] = useState(false)

  const isDelivered = shipment.status === 'delivered'
  const canRate = isDelivered && !shipment.rating

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Track Shipment"
        subtitle={`Booking ID: ${shipment.id}`}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TrackingMap shipment={shipment} />

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Shipment Journey</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                shipment.status === 'delivered' ? 'bg-green-100 text-green-700' :
                shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {shipment.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            <StatusTimeline timeline={shipment.timeline} />
          </div>

          {shipment.pickupProof && (
            <ProofOfDelivery 
              title="Pickup Proof" 
              proof={shipment.pickupProof}
              type="pickup"
            />
          )}

          {shipment.deliveryProof && (
            <ProofOfDelivery 
              title="Delivery Proof" 
              proof={shipment.deliveryProof}
              type="delivery"
            />
          )}
        </div>

        <div className="space-y-6">
          <DriverInfo driver={shipment.driver} />

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Shipment Details</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">From</p>
                <p className="font-semibold text-gray-900">{shipment.pickupAddress}</p>
              </div>
              <div>
                <p className="text-gray-600">To</p>
                <p className="font-semibold text-gray-900">{shipment.deliveryAddress}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                <div>
                  <p className="text-gray-600">Weight</p>
                  <p className="font-semibold">{shipment.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-600">Service</p>
                  <p className="font-semibold capitalize">{shipment.serviceType}</p>
                </div>
              </div>
              <div className="pt-3 border-t">
                <p className="text-gray-600">Estimated Delivery</p>
                <p className="font-semibold text-blue-600">{shipment.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {canRate && (
            <button
              onClick={() => setShowRating(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Star className="w-5 h-5" />
              Rate Your Experience
            </button>
          )}
        </div>
      </div>

      {showRating && (
        <RatingModal
          shipment={shipment}
          onClose={() => setShowRating(false)}
        />
      )}
    </div>
  )
}
