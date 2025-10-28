import { Plug, Key, Save } from 'lucide-react'

export default function IntegrationsSettings({ onSave }) {
  return (
    <div className="space-y-6">
      {/* IoT Sensor API */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plug className="w-5 h-5" />
          IoT Sensor API
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
            <input
              type="url"
              placeholder="https://api.iotsensor.com/v1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-600">Enable real-time temperature monitoring</span>
          </div>
        </div>
      </div>

      {/* GPS Tracker API */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Plug className="w-5 h-5" />
          GPS Tracker API
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
            <input
              type="url"
              placeholder="https://api.gpstracker.com/v1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-600">Enable live vehicle tracking</span>
          </div>
        </div>
      </div>

      {/* Paystack Integration */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Key className="w-5 h-5" />
          Paystack Integration
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Public Key</label>
            <input
              type="text"
              placeholder="pk_test_••••••••••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
            <input
              type="password"
              placeholder="sk_test_••••••••••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-600">Enable live mode (production)</span>
          </div>
        </div>
      </div>

      <button
        onClick={onSave}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Save className="w-4 h-4" />
        Save Integration Keys
      </button>
    </div>
  )
}
