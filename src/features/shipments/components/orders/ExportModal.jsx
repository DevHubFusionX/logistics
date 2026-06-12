import { X, Download, FileText, Package } from 'lucide-react'

export default function ExportModal({ isOpen, onClose, orderId, type }) {
  if (!isOpen) return null

  const handleExport = (format) => {
    // Simulate export functionality
    const filename = `${type}-${orderId}.${format}`
    console.log(`Exporting ${filename}`)
    
    // Create mock download
    const element = document.createElement('a')
    element.href = '#'
    element.download = filename
    element.click()
    
    onClose()
  }

  const getTitle = () => {
    return type === 'picklist' ? 'Export Pick List' : 'Export Manifest'
  }

  const getIcon = () => {
    return type === 'picklist' ? <FileText className="w-6 h-6" /> : <Package className="w-6 h-6" />
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center min-w-0 flex-1">
            <div className="flex-shrink-0">{getIcon()}</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 ml-2 truncate">{getTitle()}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-sm text-gray-600 truncate">Order #{orderId}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {type === 'picklist' 
              ? 'Generate pick list for warehouse operations'
              : 'Generate shipping manifest for dispatch'
            }
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={() => handleExport('pdf')}
            className="w-full flex items-center justify-center px-4 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as PDF
          </button>
          
          <button
            onClick={() => handleExport('csv')}
            className="w-full flex items-center justify-center px-4 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as CSV
          </button>

          {type === 'picklist' && (
            <button
              onClick={() => handleExport('label')}
              className="w-full flex items-center justify-center px-4 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <Download className="w-4 h-4 mr-2" />
              Print Labels
            </button>
          )}
        </div>
      </div>
    </div>
  )
}