import { useState } from 'react'
import { Filter, Plus } from 'lucide-react'
import AlertCard from './AlertCard'
import { mockAlerts, alertSeverities } from './alertsData'

export default function AlertsDashboard({ onCreateRule }) {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('created')

  const filteredAlerts = mockAlerts.filter(alert => 
    filter === 'all' || alert.severity === filter
  )

  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (sortBy === 'created') return b.createdAt - a.createdAt
    if (sortBy === 'sla') return a.slaDeadline - b.slaDeadline
    if (sortBy === 'severity') {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      return severityOrder[b.severity] - severityOrder[a.severity]
    }
    return 0
  })

  const handleAssign = (alertId) => {
    console.log('Assign alert:', alertId)
  }

  const handleResolve = (alertId) => {
    console.log('Resolve alert:', alertId)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(alertSeverities).map(([key, severity]) => {
          const count = mockAlerts.filter(alert => alert.severity === key).length
          return (
            <div key={key} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{severity.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${severity.color}`}></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="created">Sort by Created</option>
            <option value="sla">Sort by SLA</option>
            <option value="severity">Sort by Severity</option>
          </select>
        </div>
        <button 
          onClick={onCreateRule}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create Alert Rule
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {sortedAlerts.map(alert => (
          <AlertCard 
            key={alert.id}
            alert={alert}
            onAssign={handleAssign}
            onResolve={handleResolve}
          />
        ))}
      </div>
    </div>
  )
}