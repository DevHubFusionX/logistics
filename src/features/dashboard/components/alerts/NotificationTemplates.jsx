import { useState } from 'react'
import { Mail, MessageSquare, Bell, Edit, Trash2 } from 'lucide-react'

const mockTemplates = [
  {
    id: 1,
    name: 'Vehicle Offline Alert',
    channel: 'email',
    subject: 'URGENT: Vehicle {{vehicle_id}} is offline',
    content: 'Vehicle {{vehicle_id}} has been offline for {{duration}} minutes. Please investigate immediately.',
    variables: ['vehicle_id', 'duration', 'location']
  },
  {
    id: 2,
    name: 'Delivery Delay SMS',
    channel: 'sms',
    content: 'Shipment {{shipment_id}} is delayed by {{delay_hours}}h. New ETA: {{new_eta}}',
    variables: ['shipment_id', 'delay_hours', 'new_eta']
  },
  {
    id: 3,
    name: 'Customs Hold Push',
    channel: 'push',
    title: 'Customs Hold Alert',
    content: 'Shipment {{shipment_id}} held at {{location}} customs',
    variables: ['shipment_id', 'location']
  }
]

const channelIcons = {
  email: Mail,
  sms: MessageSquare,
  push: Bell
}

export default function NotificationTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = (template) => {
    setSelectedTemplate(template)
    setIsEditing(true)
  }

  const handleDelete = (templateId) => {
    console.log('Delete template:', templateId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notification Templates</h3>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTemplates.map(template => {
          const IconComponent = channelIcons[template.channel]
          return (
            <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <IconComponent className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{template.channel}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleEdit(template)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(template.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {template.subject && (
                <div className="mb-2">
                  <p className="text-xs text-gray-500 mb-1">Subject:</p>
                  <p className="text-sm text-gray-700 truncate">{template.subject}</p>
                </div>
              )}
              
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Content:</p>
                <p className="text-sm text-gray-700 line-clamp-2">{template.content}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Variables:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.map(variable => (
                    <span key={variable} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedTemplate ? 'Edit Template' : 'Create Template'}
            </h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate?.name || ''}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., Vehicle Offline Alert"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                  <select 
                    defaultValue={selectedTemplate?.channel || 'email'}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="push">Push Notification</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject (Email only)</label>
                <input
                  type="text"
                  defaultValue={selectedTemplate?.subject || ''}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Alert subject with {{variables}}"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={4}
                  defaultValue={selectedTemplate?.content || ''}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Message content with {{variables}}"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Variables</label>
                <div className="text-sm text-gray-600">
                  <p>Use these variables in your template: {'{'}{'{'} vehicle_id {'}'}{'}'},  {'{'}{'{'} shipment_id {'}'}{'}'},  {'{'}{'{'} location {'}'}{'}'},  {'{'}{'{'} duration {'}'}{'}'},  {'{'}{'{'} eta {'}'}{'}'}  </p>
                </div>
              </div>
            </form>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  setIsEditing(false)
                  setSelectedTemplate(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}