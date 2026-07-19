import { FileText, Download, ExternalLink, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react'

export default function DocumentsTab({ documents }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {documents.map((doc, idx) => {
                    const hasUrl = !!doc.url
                    const isImg = hasUrl && doc.url.match(/\.(jpg|jpeg|png|webp|gif)/i)

                    return (
                        <div 
                            key={idx} 
                            className={`group flex flex-col bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                                hasUrl 
                                    ? 'border-slate-100 hover:border-sky-300 hover:shadow-lg shadow-sm' 
                                    : 'border-slate-200 bg-slate-50/30 opacity-75'
                            }`}
                        >
                            {/* Document Preview Box */}
                            <div className="relative aspect-[16/10] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                                {hasUrl ? (
                                    isImg ? (
                                        <img 
                                            src={doc.url} 
                                            alt={doc.label} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-3 bg-sky-50 rounded-2xl text-sky-600">
                                                <FileText className="w-8 h-8" />
                                            </div>
                                            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">PDF Document</span>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-slate-100 rounded-2xl text-slate-400">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">No File Attached</span>
                                    </div>
                                )}

                                {/* Overlay controls for hover */}
                                {hasUrl && (
                                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center gap-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <a 
                                            href={doc.url} 
                                            download 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 bg-white rounded-xl text-slate-700 hover:bg-slate-50 hover:text-sky-600 hover:scale-105 active:scale-95 transition-all shadow-xl"
                                            title="Download File"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>
                                        <a 
                                            href={doc.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2.5 bg-white rounded-xl text-slate-700 hover:bg-slate-50 hover:text-sky-600 hover:scale-105 active:scale-95 transition-all shadow-xl"
                                            title="Open in new tab"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Details Footer */}
                            <div className="p-4 flex-grow flex flex-col justify-between">
                                <div>
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                                        doc.type === 'Photo' 
                                            ? 'bg-purple-50 text-purple-600 border border-purple-100'
                                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                    }`}>
                                        {doc.type}
                                    </span>
                                    <h5 className="text-sm font-bold text-slate-800 mt-2 line-clamp-1 group-hover:text-sky-600 transition-colors">
                                        {doc.label}
                                    </h5>
                                </div>
                                
                                <div className="mt-3.5 pt-3 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        {hasUrl ? (
                                            <>
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Verified File</span>
                                            </>
                                        ) : (
                                            <>
                                                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Pending Upload</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
