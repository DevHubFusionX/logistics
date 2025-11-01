import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle, Send, Paperclip } from 'lucide-react'

export default function Support() {
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [filter, setFilter] = useState('all')
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  })

  const tickets = [
    {
      id: 'TKT-1001',
      subject: 'Delayed shipment inquiry',
      category: 'Delivery Issue',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15',
      lastUpdate: '2 hours ago',
      messages: 3
    },
    {
      id: 'TKT-1002',
      subject: 'Temperature alert notification',
      category: 'Temperature Issue',
      status: 'in_progress',
      priority: 'critical',
      createdAt: '2024-01-14',
      lastUpdate: '30 mins ago',
      messages: 5
    },
    {
      id: 'TKT-1003',
      subject: 'Invoice clarification needed',
      category: 'Billing',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-10',
      lastUpdate: '3 days ago',
      messages: 8
    }
  ]

  const filteredTickets = filter === 'all' 
    ? tickets 
    : tickets.filter(t => t.status === filter)

  const openCount = tickets.filter(t => t.status === 'open').length
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length

  const getStatusBadge = (status) => {
    const badges = {
      open: 'bg-blue-100 text-blue-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700'
    }
    return badges[status]
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700'
    }
    return badges[priority]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('New ticket:', formData)
    setShowNewTicket(false)
    setFormData({ subject: '', category: '', priority: 'medium', description: '' })
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Support Center"
        subtitle="Get help with your shipments and account"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600">Open</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{openCount}</p>
          <p className="text-sm text-gray-600 mt-1">Awaiting response</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600">In Progress</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{inProgressCount}</p>
          <p className="text-sm text-gray-600 mt-1">Being handled</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600">Resolved</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{resolvedCount}</p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {['all', 'open', 'in_progress', 'resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium capitalize ${
                filter === status
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNewTicket(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      <div className="grid gap-4">
        {filteredTickets.map(ticket => (
          <div key={ticket.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{ticket.subject}</h3>
                  <p className="text-sm text-gray-600">{ticket.id} • {ticket.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(ticket.status)}`}>
                  {ticket.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityBadge(ticket.priority)}`}>
                  {ticket.priority.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Created: {ticket.createdAt}</span>
                <span>Updated: {ticket.lastUpdate}</span>
                <span>{ticket.messages} messages</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                View Ticket
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600 mb-4">No support tickets match this filter</p>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNewTicket(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">Create Support Ticket</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="delivery">Delivery Issue</option>
                    <option value="temperature">Temperature Issue</option>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="6"
                  placeholder="Provide detailed information about your issue..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewTicket(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
