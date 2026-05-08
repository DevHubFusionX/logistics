import { Mail, MessageSquare, Bell, Save } from 'lucide-react'

export default function NotificationsSettings({ onSave }) {
  return (
    <div className="space-y-6">
      {/* Email Templates */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email Templates
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Alert Template</label>
            <textarea
              rows="3"
              defaultValue="Alert: Temperature violation detected on {truck_id}. Current: {temp}°C, Expected: {min_temp}°C - {max_temp}°C"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trip Completion Template</label>
            <textarea
              rows="3"
              defaultValue="Trip {trip_id} completed successfully. Delivered to {client} at {time}."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* SMS Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          SMS Alert Configuration
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMS Provider</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <option>Twilio</option>
              <option>Africa's Talking</option>
              <option>Termii</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sender ID</label>
            <input
              type="text"
              defaultValue="DARA-EXP"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Recipients (comma-separated)</label>
            <input
              type="text"
              placeholder="+234800000000, +234800000001"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Push Notifications
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Enable browser push notifications</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Notify on temperature violations</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Notify on trip delays</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Notify on maintenance due</span>
          </label>
        </div>
      </div>

      <button
        onClick={onSave}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Save className="w-4 h-4" />
        Save Notification Settings
      </button>
    </div>
  )
}
