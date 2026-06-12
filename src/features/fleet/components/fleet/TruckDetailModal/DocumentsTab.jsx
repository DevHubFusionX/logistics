import { FileText, Download, ExternalLink } from 'lucide-react'

export default function DocumentsTab({ documents }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc, idx) => (
                    <div key={idx} className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                        {doc.url ? (
                            <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
                                {doc.url.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                                    <img src={doc.url} alt={doc.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText className="w-12 h-12 text-blue-300" />
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-tighter">PDF Document</span>
                                    </div>
                                )}
                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-white rounded-lg text-blue-600 hover:scale-110 transition-transform shadow-lg"><Download className="w-4 h-4" /></button>
                                        <button className="p-2 bg-white rounded-lg text-blue-600 hover:scale-110 transition-transform shadow-lg"><ExternalLink className="w-4 h-4" /></button>
                                    </div>
                                </a>
                            </div>
                        ) : (
                            <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center border-b border-gray-100">
                                <FileText className="w-8 h-8 text-gray-300" />
                            </div>
                        )}
                        <div className="p-4 bg-white ring-1 ring-gray-50">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{doc.type}</span>
                            <h5 className="text-sm font-bold text-gray-900 mt-1 truncate">{doc.label}</h5>
                            {!doc.url && <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-medium italic select-none">Not uploaded yet</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
