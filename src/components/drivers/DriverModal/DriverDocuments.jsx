import { FileText, Download, ExternalLink, Image, CheckCircle } from 'lucide-react'

const DOCUMENT_LABELS = {
  ninSlip: 'NIN Slip',
  driversLicense: "Driver's License",
  passportPhoto: 'Passport Photo',
  truckDrivingCertification: 'Truck Driving Certification',
  medicalFitnessCertificate: 'Medical Fitness Certificate',
  drugTestReport: 'Drug Test Report'
}

export default function DriverDocuments({ driver }) {
  // Extract documents from driver data
  const documents = Object.entries(DOCUMENT_LABELS)
    .map(([key, label]) => {
      const doc = driver[key]
      if (!doc || !doc.url) return null
      return {
        key,
        label,
        url: doc.url,
        publicId: doc.publicId
      }
    })
    .filter(Boolean)

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-blue-700">{documents.length}</span> document(s) uploaded for this driver.
        </p>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No documents uploaded yet</p>
          <p className="text-sm mt-1">Documents will appear here once uploaded.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {documents.map(doc => (
            <div key={doc.key} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all group">
              {/* Preview thumbnail */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                <img
                  src={doc.url}
                  alt={doc.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="absolute inset-0 items-center justify-center hidden bg-gray-100">
                  <Image className="w-8 h-8 text-gray-300" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <p className="font-medium text-gray-900 text-sm truncate">{doc.label}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={doc.url}
                    download
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
