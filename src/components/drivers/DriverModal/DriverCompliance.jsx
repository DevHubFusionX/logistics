import { Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export default function DriverCompliance({ driver }) {
  const isActive = driver.status === 'active'
  const isVerified = driver.isVerified

  // Check which documents are uploaded
  const documentChecks = [
    { label: 'NIN Slip', uploaded: !!driver.ninSlip?.url || !!driver.ninSlipUrl },
    { label: "Driver's License", uploaded: !!driver.driversLicense?.url || !!driver.driversLicenseUrl },
    { label: 'Passport Photo', uploaded: !!driver.passportPhoto?.url || !!driver.passportPhotoUrl },
    { label: 'Truck Driving Certification', uploaded: !!driver.truckDrivingCertification?.url },
    { label: 'Medical Fitness Certificate', uploaded: !!driver.medicalFitnessCertificate?.url || !!driver.medicalCertUrl },
    { label: 'Drug Test Report', uploaded: !!driver.drugTestReport?.url }
  ]

  const uploadedCount = documentChecks.filter(d => d.uploaded).length
  const totalDocs = documentChecks.length
  const allDocsUploaded = uploadedCount === totalDocs

  return (
    <div className="space-y-5">
      {/* Overall Status */}
      <div className={`rounded-xl p-5 border ${allDocsUploaded && isVerified ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200'}`}>
        <div className="flex items-center gap-3">
          {allDocsUploaded && isVerified ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          )}
          <div>
            <h3 className="font-semibold text-gray-900">
              {allDocsUploaded && isVerified ? 'Fully Compliant' : 'Compliance Incomplete'}
            </h3>
            <p className="text-sm text-gray-600 mt-0.5">
              {uploadedCount}/{totalDocs} documents uploaded
            </p>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Verification Status
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Account Status:</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Identity Verified:</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isVerified ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {isVerified ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Document Checklist */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Document Checklist</h3>
        <div className="space-y-3">
          {documentChecks.map(doc => (
            <div key={doc.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-700">{doc.label}</span>
              {doc.uploaded ? (
                <div className="flex items-center gap-1.5 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Uploaded</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-red-500">
                  <XCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Missing</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
