import { useState } from 'react'
import { Smartphone, Send, Camera, FileText, CheckCircle, Clock, MapPin } from 'lucide-react'

const mockMobileActions = [
  {
    id: 1,
    taskId: 2,
    driver: 'John Smith',
    action: 'Task Sent',
    timestamp: '10:15 AM',
    status: 'delivered'
  },
  {
    id: 2,
    taskId: 3,
    driver: 'Sarah Johnson',
    action: 'Photo Uploaded',
    timestamp: '11:30 AM',
    status: 'confirmed'
  },
  {
    id: 3,
    taskId: 4,
    driver: 'Mike Wilson',
    action: 'Signature Captured',
    timestamp: '02:45 PM',
    status: 'completed'
  }
]

export default function MobileIntegration({ onSendTask }) {
  const [selectedTask, setSelectedTask] = useState(null)
  const [message, setMessage] = useState('')

  const handleSendToMobile = () => {
    if (selectedTask && message) {
      onSendTask(selectedTask, message)
      setMessage('')
      setSelectedTask(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Send Task to Mobile */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Send Task to Mobile App</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Task</label>
            <select
              value={selectedTask || ''}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Choose a task...</option>
              <option value="1">Pickup - Electronics Shipment</option>
              <option value="2">Delivery - Medical Supplies</option>
              <option value="3">Pickup & Delivery - Documents</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Special instructions for the driver..."
            />
          </div>
          
          <button
            onClick={handleSendToMobile}
            disabled={!selectedTask || !message}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Send to Driver App
          </button>
        </div>
      </div>

      {/* Mobile App Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Mobile App Activity</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {mockMobileActions.map(action => {
              const actionIcons = {
                'Task Sent': Send,
                'Photo Uploaded': Camera,
                'Signature Captured': FileText
              }
              
              const statusColors = {
                delivered: 'text-blue-600 bg-blue-50',
                confirmed: 'text-yellow-600 bg-yellow-50',
                completed: 'text-green-600 bg-green-50'
              }
              
              const ActionIcon = actionIcons[action.action] || CheckCircle
              
              return (
                <div key={action.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                  <div className={`p-2 rounded-lg ${statusColors[action.status]}`}>
                    <ActionIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{action.action}</h4>
                      <span className="text-sm text-gray-500">{action.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600">Driver: {action.driver}</p>
                    <p className="text-xs text-gray-500">Task ID: #{action.taskId}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mobile App Integration Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Connected Drivers</h4>
            <p className="text-2xl font-bold text-green-600">3</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Active Tasks</h4>
            <p className="text-2xl font-bold text-blue-600">7</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Live Tracking</h4>
            <p className="text-2xl font-bold text-yellow-600">5</p>
          </div>
        </div>
      </div>

      {/* Photo & Signature Requirements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmation Requirements</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-gray-500" />
              <div>
                <h4 className="font-medium text-gray-900">Photo Confirmation</h4>
                <p className="text-sm text-gray-600">Required for pickup and delivery</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-500" />
              <div>
                <h4 className="font-medium text-gray-900">Digital Signature</h4>
                <p className="text-sm text-gray-600">Required for delivery completion</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}