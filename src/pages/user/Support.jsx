import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import {
  Plus, MessageSquare, Clock, CheckCircle, AlertCircle, Search,
  RefreshCw, Send, Filter, ChevronRight
} from 'lucide-react'
import { useTicketsQuery, useCreateTicketMutation } from '../../hooks/queries/useSupportQueries'
import { TicketSkeleton, StatCardSkeleton } from '../../components/common/SkeletonLoaders'

const statusConfig = {
  open: { icon: AlertCircle, color: 'yellow', label: 'Open' },
  in_progress: { icon: Clock, color: 'blue', label: 'In Progress' },
  resolved: { icon: CheckCircle, color: 'green', label: 'Resolved' },
}

export default function Support() {
  const navigate = useNavigate()
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState({
    subject: '', category: '', priority: 'medium', description: ''
  })

  const queryFilters = useMemo(() => {
    const f = {}
    if (filter !== 'all') f.status = filter
    return f
  }, [filter])

  const { data: tickets = [], isLoading, isError, refetch } = useTicketsQuery(queryFilters)
  const createTicketMutation = useCreateTicketMutation()

  // Search
  const filteredTickets = useMemo(() => {
    if (!search.trim()) return tickets
    const q = search.toLowerCase()
    return tickets.filter(t =>
      (t.subject || '').toLowerCase().includes(q) ||
      (t.id || '').toLowerCase().includes(q) ||
      (t.category || '').toLowerCase().includes(q)
    )
  }, [tickets, search])

  // Stats
  const stats = useMemo(() => ({
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  }), [tickets])

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showNewTicket) setShowNewTicket(false)
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [showNewTicket])

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
      <div className="space-y-6 pb-6">
        <PageHeader title="Support Center" subtitle="Get help and track your support tickets" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => <TicketSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <div className="p-4 bg-red-50 rounded-full"><AlertCircle className="w-8 h-8 text-red-500" /></div>
        <h3 className="text-lg font-bold text-gray-900">Could not load tickets</h3>
        <button onClick={() => refetch()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">Retry</button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-end justify-between">
        <PageHeader title="Support Center" subtitle="Get help and track your support tickets" />
        <button
          onClick={() => setShowNewTicket(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200"
        >
          <Plus className="w-5 h-5" />
          New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Open', count: stats.open, color: 'yellow', icon: AlertCircle },
          { label: 'In Progress', count: stats.inProgress, color: 'blue', icon: Clock },
          { label: 'Resolved', count: stats.resolved, color: 'green', icon: CheckCircle },
        ].map(stat => (
          <div key={stat.label} className={`bg-${stat.color}-50 rounded-xl border border-${stat.color}-200 p-5`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wide text-gray-600">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tickets by subject or ID…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 rounded-xl">
          <Filter className="w-4 h-4 text-gray-400 ml-2 mr-1" />
          {['all', 'open', 'in_progress', 'resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket List */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {search.trim() ? 'No matching tickets' : 'No tickets yet'}
          </h3>
          <p className="text-gray-500 text-sm">
            {search.trim()
              ? 'Try a different search or clear filters.'
              : 'Open a support ticket and our team will respond shortly.'
            }
          </p>
          {search.trim() ? (
            <button onClick={() => { setSearch(''); setFilter('all') }} className="mt-3 text-sm text-blue-600 font-semibold hover:underline">Clear search</button>
          ) : (
            <button onClick={() => setShowNewTicket(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Ticket</button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map(ticket => {
            const cfg = statusConfig[ticket.status] || statusConfig.open
            const StatusIcon = cfg.icon
            return (
              <div key={ticket.id || ticket._id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${cfg.color}-50 rounded-2xl`}>
                      <StatusIcon className={`w-6 h-6 text-${cfg.color}-500`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{ticket.subject || 'Untitled'}</h3>
                      <span className="text-xs text-gray-500">
                        {ticket.id?.slice(0, 8).toUpperCase()} · {new Date(ticket.createdAt || ticket.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2.5 py-0.5 bg-${cfg.color}-100 text-${cfg.color}-700 rounded-full text-[10px] font-bold uppercase`}>
                      {cfg.label}
                    </span>
                    {ticket.priority && (
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase">
                        {ticket.priority}
                      </span>
                    )}
                  </div>
                </div>

                {ticket.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{ticket.description}</p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    {ticket.category && <span className="font-medium">{ticket.category}</span>}
                  </span>
                  <button
                    onClick={() => navigate(`/support/${ticket.id || ticket._id}`)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    View Conversation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Result count */}
      {filteredTickets.length > 0 && (
        <div className="text-center text-xs font-medium text-gray-400">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowNewTicket(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-900">New Support Ticket</h3>
              <button onClick={() => setShowNewTicket(false)} className="text-gray-400 hover:text-gray-600">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief summary of your issue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment Issue</option>
                    <option value="delivery">Delivery Issue</option>
                    <option value="account">Account Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your issue in detail"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewTicket(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createTicketMutation.isPending}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {createTicketMutation.isPending && <RefreshCw className="w-4 h-4 animate-spin" />}
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
