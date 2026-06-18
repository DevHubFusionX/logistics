import { useState } from 'react'
import { MapPin, Book, Search, X } from 'lucide-react'
import { useAddressesQuery } from '@/hooks/queries/useAddressQueries'

export default function AddressBookSelector({ onSelect, type = 'pickup', currentCity }) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const { data: addresses = [], isLoading } = useAddressesQuery()

    const filteredAddresses = addresses.filter(addr => {
        const searchLower = search.toLowerCase()
        return (
            addr.label?.toLowerCase().includes(searchLower) ||
            addr.street?.toLowerCase().includes(searchLower) ||
            addr.city?.toLowerCase().includes(searchLower) ||
            addr.contact_name?.toLowerCase().includes(searchLower)
        )
    })

    // Filter by city if currentCity is provided (optional behavior)
    const cityMatchedAddresses = currentCity
        ? filteredAddresses.filter(addr => addr.city === currentCity)
        : filteredAddresses

    if (addresses.length === 0 && !isLoading) return null

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-xs font-bold text-sky-750 hover:text-sky-800 bg-sky-50 px-3 py-1.5 rounded-xl transition-all border border-sky-100/40 mb-2 shadow-sm duration-200 cursor-pointer"
            >
                <Book className="w-3.5 h-3.5" />
                Select from Address Book
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-10 left-0 w-full sm:w-80 bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-gray-100 z-[70] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-[400px] flex flex-col">
                        <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h4 className="font-bold text-gray-905 text-sm flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-sky-600" />
                                Your Saved Addresses
                            </h4>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-2 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search saved addresses..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:ring-4 focus:ring-sky-500/5 focus:border-sky-400 outline-none transition-all duration-200"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar">
                            {isLoading ? (
                                <div className="p-8 text-center">
                                    <div className="w-6 h-6 border-2 border-sky-600/30 border-t-sky-600 rounded-full animate-spin mx-auto mb-2" />
                                    <p className="text-xs text-gray-400">Loading addresses...</p>
                                </div>
                            ) : cityMatchedAddresses.length > 0 ? (
                                cityMatchedAddresses.map(addr => (
                                    <button
                                        key={addr.id}
                                        type="button"
                                        onClick={() => {
                                            onSelect(addr)
                                            setIsOpen(false)
                                        }}
                                        className="w-full text-left p-3 rounded-lg hover:bg-sky-50/50 group transition-all border border-transparent hover:border-sky-100/30"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-gray-900 text-xs group-hover:text-sky-750">{addr.label}</span>
                                            {addr.is_default && (
                                                <span className="text-[10px] font-bold bg-green-50 text-green-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Default</span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-gray-500 font-medium mb-1 line-clamp-1">{addr.contact_name}</p>
                                        <p className="text-[10px] text-gray-400 line-clamp-1">{addr.street}, {addr.city}</p>
                                    </button>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-xs text-gray-400 italic">No matching addresses found{currentCity ? ` in ${currentCity}` : ''}.</p>
                                </div>
                            )}
                        </div>

                        {currentCity && filteredAddresses.length > cityMatchedAddresses.length && (
                            <div className="p-2 bg-amber-50/30 border-t border-amber-100/30">
                                <p className="text-[10px] text-amber-700 text-center font-medium">
                                    Other addresses are hidden because they don't match {currentCity}.
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
