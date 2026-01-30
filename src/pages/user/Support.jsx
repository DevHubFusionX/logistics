import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle, Send, RefreshCw } from 'lucide-react'
import { useTicketsQuery, useCreateTicketMutation } from '../../hooks/queries/useSupportQueries'

export default function Support() {
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [filter, setFilter] = useState('all')
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  })

  const queryFilters = useMemo(() => ({
    ...(filter !== 'all' && { status: filter })
  }), [filter])

  const { data: tickets = [], isLoading, isError, refetch } = useTicketsQuery(queryFilters)
  const createTicketMutation = useCreateTicketMutation()

  const stats = useMemo(() => {
    return {
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress' || t.status === 'processing').length,
      resolved: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length
    }
  }, [tickets])

  const getStatusBadge = (status) => {
    const badges = {
      open: 'bg-blue-100 text-blue-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-green-100 text-green-700'
    }
    return badges[status] || 'bg-gray-100 text-gray-700'
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-blue-100 text-blue-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700'
    }
    return badges[priority] || 'bg-gray-100 text-gray-700'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTicketMutation.mutate(formData, {
      onSuccess: () => {
        setShowNewTicket(false)
        setFormData({ subject: '', category: '', priority: 'medium', description: '' })
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 animate-pulse font-medium">Loading support center...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-xl font-bold text-gray-900">Support Center Offline</h3>
        <p className="text-gray-500 max-w-sm">We're having trouble connecting to the support system. Please try again in a moment.</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all font-bold"
        >
          <RefreshCw className="w-4 h-4" /> Reconnect
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Support Center"
          subtitle="Get help with your shipments and account"
        />
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          title="Refresh tickets"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-600 rounded-xl">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Open Tickets</span>
          </div>
          <p className="text-4xl font-black text-gray-900">{stats.open}</p>
          <p className="text-xs font-bold text-blue-700/60 mt-1">Awaiting specialist response</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border border-yellow-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-500 rounded-xl">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600">Active</span>
          </div>
          <p className="text-4xl font-black text-gray-900">{stats.inProgress}</p>
          <p className="text-xs font-bold text-yellow-700/60 mt-1">Currently being handled</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-600 rounded-xl">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Resolved</span>
          </div>
          <p className="text-4xl font-black text-gray-900">{stats.resolved}</p>
          <p className="text-xs font-bold text-green-700/60 mt-1">Completed this period</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/50 p-2 rounded-2xl border border-gray-100">
        <div className="flex gap-2">
          {['all', 'open', 'in_progress', 'resolved'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2.5 rounded-xl transition-all font-bold text-sm capitalize ${filter === status
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 border border-blue-600'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNewTicket(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200"
        >
          <Plus className="w-5 h-5" />
          New Ticket
        </button>
      </div>

      <div className="grid gap-6">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all group cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-700 transition-colors">{ticket.subject}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{ticket.id}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-xs font-bold text-blue-600/60 uppercase tracking-tighter">{ticket.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadge(ticket.status)}`}>
                  {(ticket.status || 'unknown').replace('_', ' ')}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getPriorityBadge(ticket.priority)}`}>
                  {ticket.priority || 'MEDIUM'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center gap-6 text-xs font-bold text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Created: {ticket.createdAt || ticket.created_at}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Updated: {ticket.lastUpdate || 'Just now'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{ticket.messages?.length || 0} messages</span>
                </div>
              </div>
              <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all font-bold text-sm shadow-lg shadow-gray-100">
                View Conversations
              </button>
            </div>
          </div>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <MessageSquare className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Clear History</h3>
          <p className="text-gray-500 max-w-xs font-medium">You don't have any support tickets in this category. Need help with anything?</p>
          <button onClick={() => setShowNewTicket(true)} className="mt-6 text-blue-600 font-bold hover:underline underline-offset-4">Create your first ticket</button>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity" onClick={() => setShowNewTicket(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col scale-100 transition-transform">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white shrink-0">
              <h3 className="text-2xl font-black tracking-tight">Open Support Request</h3>
              <p className="text-blue-100 text-sm mt-1">Our team typically responds within 2 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Detailed Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all font-medium"
                  placeholder="e.g. Shipment BK-1029 delay in Lagos"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Problem Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all font-bold"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="delivery">Delivery Issues</option>
                    <option value="temperature">Temperature & Handling</option>
                    <option value="billing">Invoicing & Payments</option>
                    <option value="technical">App Technical Issue</option>
                    <option value="other">General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Severity Level</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all font-bold"
                  >
                    <option value="low">Standard Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Urgency</option>
                    <option value="critical">Critical (Immediate Care)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all resize-none font-medium"
                  rows="5"
                  placeholder="Tell us more about the situation..."
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewTicket(false)}
                  className="flex-1 px-4 py-4 border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-500"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={createTicketMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-xl shadow-blue-100 disabled:opacity-50"
                >
                  {createTicketMutation.isPending ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {createTicketMutation.isPending ? 'Sending...' : 'Transmit Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
