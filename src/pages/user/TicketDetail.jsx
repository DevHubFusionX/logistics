import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { ArrowLeft, Send, Clock, CheckCircle, AlertCircle, RefreshCw, MessageCircle, Tag, Info } from 'lucide-react'
import { useTicketQuery, useAddTicketMessageMutation, useResolveTicketMutation } from '../../hooks/queries/useSupportQueries'
import { useAuthState } from '../../hooks/useAuth'

const statusStyles = {
    open: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Open' },
    in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' },
    resolved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Resolved' },
    closed: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Closed' },
}

const priorityStyles = {
    low: { bg: 'bg-gray-100', text: 'text-gray-600' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    high: { bg: 'bg-orange-100', text: 'text-orange-700' },
    urgent: { bg: 'bg-red-100', text: 'text-red-700' },
}

export default function TicketDetail() {
    const { ticketId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuthState()
    const [reply, setReply] = useState('')
    const messagesEndRef = useRef(null)

    const { data: ticket, isLoading, isError, refetch } = useTicketQuery(ticketId)
    const replyMutation = useAddTicketMessageMutation()
    const resolveMutation = useResolveTicketMutation()

    const messages = ticket?.messages || ticket?.conversation || []

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    // Escape key to go back
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') navigate('/support') }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [navigate])

    const handleSendReply = (e) => {
        e.preventDefault()
        if (!reply.trim()) return
        replyMutation.mutate(
            { ticketId, message: reply.trim() },
            { onSuccess: () => setReply('') }
        )
    }

    const handleResolve = () => {
        resolveMutation.mutate(ticketId)
    }

    if (isLoading) {
        return (
            <div className="space-y-6 pb-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                        <div className="h-6 w-64 bg-gray-200 rounded" />
                        <div className="h-4 w-48 bg-gray-200 rounded" />
                        <div className="h-32 bg-gray-100 rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError || !ticket) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
                <h3 className="text-lg font-bold text-gray-900">Ticket not found</h3>
                <p className="text-gray-500 text-sm">We couldn't load this ticket. It may have been deleted.</p>
                <div className="flex gap-3">
                    <button onClick={() => navigate('/support')} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Back to Support</button>
                    <button onClick={() => refetch()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Retry</button>
                </div>
            </div>
        )
    }

    const status = statusStyles[ticket.status] || statusStyles.open
    const priority = priorityStyles[ticket.priority] || priorityStyles.medium
    const isClosed = ticket.status === 'resolved' || ticket.status === 'closed'

    return (
        <div className="space-y-6 pb-6">
            {/* Back button */}
            <button
                onClick={() => navigate('/support')}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Support Center
            </button>

            {/* Ticket Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold text-gray-900">{ticket.subject || 'Untitled Ticket'}</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {new Date(ticket.createdAt || ticket.created_at).toLocaleDateString()}
                            </span>
                            {ticket.category && (
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3.5 h-3.5" />
                                    {ticket.category}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${priority.bg} ${priority.text}`}>
                            {ticket.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${status.bg} ${status.text}`}>
                            {status.label}
                        </span>
                    </div>
                </div>

                {ticket.description && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Info className="w-4 h-4 text-gray-400" />
                            <span className="text-xs font-semibold text-gray-500 uppercase">Description</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
                    </div>
                )}

                {/* Resolve button */}
                {!isClosed && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleResolve}
                            disabled={resolveMutation.isPending}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                        >
                            <CheckCircle className="w-4 h-4" />
                            {resolveMutation.isPending ? 'Resolving...' : 'Mark as Resolved'}
                        </button>
                    </div>
                )}
            </div>

            {/* Conversation */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gray-500" />
                        Conversation
                    </h2>
                    <button onClick={() => refetch()} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md transition-colors">
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                    {messages.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No messages yet. Start the conversation below.</p>
                        </div>
                    )}
                    {messages.map((msg, i) => {
                        const isMe = msg.sender === user?.id || msg.sender === user?._id || msg.role === 'user'
                        return (
                            <div key={msg.id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${isMe
                                        ? 'bg-blue-600 text-white rounded-br-md'
                                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{msg.content || msg.message || msg.text}</p>
                                    <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                                        {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Reply input */}
                {!isClosed ? (
                    <form onSubmit={handleSendReply} className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-end gap-3">
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type your reply…"
                                rows={2}
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm bg-white"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSendReply(e)
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                disabled={!reply.trim() || replyMutation.isPending}
                                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                {replyMutation.isPending ? (
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="px-6 py-4 border-t border-gray-100 bg-green-50 text-center">
                        <p className="text-sm font-medium text-green-700">This ticket has been resolved. Open a new ticket if you need further help.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
