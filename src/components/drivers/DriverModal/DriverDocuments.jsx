import { Upload, FileText, Download } from 'lucide-react'
import { DRIVER_DOCUMENTS } from '../driversData'

export default function DriverDocuments({ driver }) {
  const documents = DRIVER_DOCUMENTS[driver.id] || []

  return (
    <div className="space-y-4">
      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
        <Upload className="w-4 h-4" />
        Upload Document
      </button>
      <div className="space-y-3">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{doc.type}</p>
                  <p className="text-xs text-gray-500">{doc.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  doc.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {doc.status}
                </span>
                <button className="text-blue-600 hover:text-blue-700">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Uploaded: {doc.uploadDate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
