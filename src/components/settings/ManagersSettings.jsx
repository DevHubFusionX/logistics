import { useState } from 'react'
import { Plus, Search, Shield, Mail, Phone, MoreVertical, Trash2, Edit } from 'lucide-react'
import { useManagersQuery, useAdminMutations } from '../../hooks/queries/useAdminQueries'
import { useToast } from '../ui/advanced'
import CreateManagerModal from './CreateManagerModal'

export default function ManagersSettings() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const { showToast } = useToast()
    const { data: managers, isLoading } = useManagersQuery()
    const { deleteManager } = useAdminMutations()

    const filteredManagers = managers?.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this manager?')) {
            deleteManager.mutate(id)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Quick Share Link */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shield className="w-32 h-32 rotate-12" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Manager Access Portal</span>
                    </div>
                    <h4 className="text-xl font-black mb-2 tracking-tight">Share Access Link</h4>
                    <p className="text-slate-400 text-sm font-medium mb-6 max-w-md">Copy and share this secure entry point with your administrative team to grant them access to the command center.</p>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-blue-300 truncate">
                            {window.location.origin}/auth/admin/managers/login
                        </div>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/auth/admin/managers/login`);
                                showToast.success('Link Copied', 'The manager login URL has been copied to your clipboard.');
                            }}
                            className="px-6 py-3 bg-white text-gray-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all active:scale-95 whitespace-nowrap"
                        >
                            Copy Link
                        </button>
                    </div>
                </div>
            </div>

            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                        <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Manage Managers</h3>
                        <p className="text-sm text-slate-500 font-medium">Create and control administrative access</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold text-sm shadow-lg shadow-blue-100 whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        Add Manager
                    </button>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Manager</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-5"><div className="h-4 bg-slate-100 rounded w-32" /></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-slate-100 rounded w-48" /></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-slate-100 rounded w-16" /></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-slate-100 rounded w-24" /></td>
                                        <td className="px-6 py-5 text-right"><div className="h-4 bg-slate-100 rounded w-8 ml-auto" /></td>
                                    </tr>
                                ))
                            ) : filteredManagers?.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                                                <Shield className="w-6 h-6 text-slate-300" />
                                            </div>
                                            <p className="font-bold text-slate-900 text-lg">No Managers Found</p>
                                            <p className="text-slate-500 text-sm">Start by adding your first administrative manager.</p>
                                            <button 
                                                onClick={() => setShowCreateModal(true)}
                                                className="mt-4 text-blue-600 font-bold text-sm hover:underline"
                                            >
                                                Create your first manager
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredManagers?.map((manager) => (
                                    <tr key={manager.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    {manager.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{manager.name}</p>
                                                    <p className="text-xs text-slate-500">Operation Level</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {manager.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {manager.phone || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                manager.status === 'active' 
                                                ? 'bg-green-100 text-green-700 border border-green-200' 
                                                : 'bg-red-100 text-red-700 border border-red-200'
                                            }`}>
                                                {manager.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                                            {manager.joinedDate ? new Date(manager.joinedDate).toLocaleDateString() : 'Pending'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-white rounded-lg transition-colors shadow-sm text-slate-400 hover:text-blue-600 border border-transparent hover:border-blue-100">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(manager.id)}
                                                    className="p-2 hover:bg-white rounded-lg transition-colors shadow-sm text-slate-400 hover:text-red-600 border border-transparent hover:border-red-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showCreateModal && (
                <CreateManagerModal onClose={() => setShowCreateModal(false)} />
            )}
        </div>
    )
}
