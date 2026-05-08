import { Camera, FileText, Clock } from 'lucide-react'

export default function ProofOfDelivery({ title, proof, type }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {proof.photos.map((photo, index) => (
            <div key={index} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <p className="text-sm font-semibold text-gray-900">Signature</p>
          </div>
          <div className="h-24 bg-white rounded border border-gray-200 flex items-center justify-center">
            <p className="text-sm text-gray-500">Digital signature captured</p>
          </div>
        </div>

        {proof.notes && (
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Notes</p>
            <p className="text-sm text-gray-700">{proof.notes}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Captured at {proof.timestamp}</span>
        </div>
      </div>
    </div>
  )
}
