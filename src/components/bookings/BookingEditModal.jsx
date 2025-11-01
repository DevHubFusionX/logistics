export default function BookingEditModal({ booking, onClose, onSave, onUpdate, saving }) {
  if (!booking) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Edit Booking</h3>
            <p className="text-sm text-gray-600">{booking.bookingId || booking._id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-2xl text-gray-500">&times;</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Pickup Location</h4>
            <div className="space-y-3">
              <input type="text" placeholder="Address" value={booking.pickupLocation?.address || ''} onChange={(e) => onSave({...booking, pickupLocation: {...booking.pickupLocation, address: e.target.value}})} className="w-full px-3 py-2 border rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="City" value={booking.pickupLocation?.city || ''} onChange={(e) => onSave({...booking, pickupLocation: {...booking.pickupLocation, city: e.target.value}})} className="w-full px-3 py-2 border rounded-lg" />
                <input type="text" placeholder="State" value={booking.pickupLocation?.state || ''} onChange={(e) => onSave({...booking, pickupLocation: {...booking.pickupLocation, state: e.target.value}})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Delivery Location</h4>
            <div className="space-y-3">
              <input type="text" placeholder="Address" value={booking.dropoffLocation?.address || ''} onChange={(e) => onSave({...booking, dropoffLocation: {...booking.dropoffLocation, address: e.target.value}})} className="w-full px-3 py-2 border rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="City" value={booking.dropoffLocation?.city || ''} onChange={(e) => onSave({...booking, dropoffLocation: {...booking.dropoffLocation, city: e.target.value}})} className="w-full px-3 py-2 border rounded-lg" />
                <input type="text" placeholder="State" value={booking.dropoffLocation?.state || ''} onChange={(e) => onSave({...booking, dropoffLocation: {...booking.dropoffLocation, state: e.target.value}})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Cargo Details</h4>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Goods Type" value={booking.goodsType || ''} onChange={(e) => onSave({...booking, goodsType: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="number" placeholder="Weight (kg)" value={booking.cargoWeightKg || ''} onChange={(e) => onSave({...booking, cargoWeightKg: parseFloat(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="number" placeholder="Quantity" value={booking.quantity || ''} onChange={(e) => onSave({...booking, quantity: parseInt(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
              <input type="text" placeholder="Vehicle Type" value={booking.vehicleType || ''} onChange={(e) => onSave({...booking, vehicleType: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex gap-4 mt-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={booking.isFragile || false} onChange={(e) => onSave({...booking, isFragile: e.target.checked})} />
                <span className="text-sm">Fragile</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={booking.isPerishable || false} onChange={(e) => onSave({...booking, isPerishable: e.target.checked})} />
                <span className="text-sm">Perishable</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Notes</h4>
            <textarea value={booking.notes || ''} onChange={(e) => onSave({...booking, notes: e.target.value})} rows="3" className="w-full px-3 py-2 border rounded-lg" placeholder="Additional notes..." />
          </div>
        </div>

        <div className="border-t px-6 py-4 flex gap-3">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={onUpdate} disabled={saving} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
