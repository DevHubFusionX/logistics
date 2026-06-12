import { useState } from 'react'
import { Save, X } from 'lucide-react'
import { alertTypes, alertSeverities, notificationChannels } from './alertsData'

export default function AlertRulesForm({ onSave, onCancel }) {
  const [rule, setRule] = useState({
    name: '',
    type: 'delayed_eta',
    severity: 'medium',
    conditions: {
      threshold: '',
      duration: '',
      unit: 'minutes'
    },
    notifications: [],
    assignTo: '',
    escalation: {
      enabled: false,
      after: 60,
      to: ''
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(rule)
  }

  const toggleNotification = (channel) => {
    setRule(prev => ({
      ...prev,
      notifications: prev.notifications.includes(channel)
        ? prev.notifications.filter(n => n !== channel)
        : [...prev.notifications, channel]
    }))
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Create Alert Rule</h3>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
            <input
              type="text"
              value={rule.name}
              onChange={(e) => setRule(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="e.g., Vehicle Offline Alert"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
            <select
              value={rule.type}
              onChange={(e) => setRule(prev => ({ ...prev, type: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              {alertTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Threshold</label>
            <input
              type="number"
              value={rule.conditions.threshold}
              onChange={(e) => setRule(prev => ({ 
                ...prev, 
                conditions: { ...prev.conditions, threshold: e.target.value }
              }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="15"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="number"
              value={rule.conditions.duration}
              onChange={(e) => setRule(prev => ({ 
                ...prev, 
                conditions: { ...prev.conditions, duration: e.target.value }
              }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
            <select
              value={rule.conditions.unit}
              onChange={(e) => setRule(prev => ({ 
                ...prev, 
                conditions: { ...prev.conditions, unit: e.target.value }
              }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="percent">Percent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={rule.severity}
              onChange={(e) => setRule(prev => ({ ...prev, severity: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              {Object.entries(alertSeverities).map(([key, severity]) => (
                <option key={key} value={key}>{severity.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
            <input
              type="text"
              value={rule.assignTo}
              onChange={(e) => setRule(prev => ({ ...prev, assignTo: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Team or person"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Notification Channels</label>
          <div className="flex gap-4">
            {notificationChannels.map(channel => (
              <label key={channel.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rule.notifications.includes(channel.id)}
                  onChange={() => toggleNotification(channel.id)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">{channel.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-4 mb-4">
            <input
              type="checkbox"
              id="escalation"
              checked={rule.escalation.enabled}
              onChange={(e) => setRule(prev => ({ 
                ...prev, 
                escalation: { ...prev.escalation, enabled: e.target.checked }
              }))}
              className="rounded border-gray-300 text-blue-600"
            />
            <label htmlFor="escalation" className="text-sm font-medium text-gray-700">
              Enable Escalation
            </label>
          </div>
          
          {rule.escalation.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Escalate after (minutes)</label>
                <input
                  type="number"
                  value={rule.escalation.after}
                  onChange={(e) => setRule(prev => ({ 
                    ...prev, 
                    escalation: { ...prev.escalation, after: parseInt(e.target.value) }
                  }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Escalate to</label>
                <input
                  type="text"
                  value={rule.escalation.to}
                  onChange={(e) => setRule(prev => ({ 
                    ...prev, 
                    escalation: { ...prev.escalation, to: e.target.value }
                  }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Manager or team"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Rule
          </button>
        </div>
      </form>
    </div>
  )
}