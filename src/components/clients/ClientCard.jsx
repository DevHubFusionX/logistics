import React from 'react'
import { Eye, Mail, Phone, MapPin, Building2, TrendingUp, ArrowUpRight, MoreHorizontal, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

const ClientCard = ({ client, onViewClient }) => {
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'text-purple-600 bg-purple-50 border-purple-100'
            case 'driver': return 'text-blue-600 bg-blue-50 border-blue-100'
            default: return 'text-emerald-600 bg-emerald-50 border-emerald-100'
        }
    }

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />

            <div className="relative">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        {client.avatar ? (
                            <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-xl object-cover shadow-lg border border-white" />
                        ) : (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200">
                                {client.name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {client.name}
                            </h3>
                            <p className="text-[11px] text-gray-500 flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {client.industry}
                            </p>
                        </div>
                    </div>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-2 text-[13px] text-gray-600">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-600">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span>{client.phone || 'No phone'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Joined Date</p>
                        <span className="text-xs font-bold text-gray-700">{client.lastActive}</span>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Status</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getRoleColor(client.role)}`}>
                            {client.role || 'user'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                        onClick={() => onViewClient(client)}
                        className="flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 font-medium group/btn shadow-md hover:shadow-blue-200"
                    >
                        <Eye className="w-4 h-4" />
                        Profile
                    </button>
                    <Link
                        to={`/admin/customers/${client.id}/bookings`}
                        className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all duration-300 font-medium group/btn shadow-sm"
                    >
                        <Package className="w-4 h-4" />
                        Bookings
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ClientCard)
