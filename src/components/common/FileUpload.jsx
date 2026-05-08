import { useState } from 'react'
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react'
import { uploadService } from '@/services'
import toast from 'react-hot-toast'

export default function FileUpload({ 
  onUploadSuccess, 
  acceptedTypes = 'image/*,.pdf',
  maxSize = 5 * 1024 * 1024, // 5MB
  type = 'document',
  bookingId 
}) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    if (selectedFile.size > maxSize) {
      toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`)
      return
    }

    setFile(selectedFile)

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file')
      return
    }

    setUploading(true)
    try {
      const response = await uploadService.uploadDocument(file, type, bookingId)
      toast.success('File uploaded successfully')
      onUploadSuccess?.(response.data)
      setFile(null)
      setPreview(null)
    } catch (error) {
      toast.error(error.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        
        {!file ? (
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {acceptedTypes.includes('image') ? 'PNG, JPG' : ''} 
              {acceptedTypes.includes('pdf') ? ', PDF' : ''} 
              {' '}(max {maxSize / 1024 / 1024}MB)
            </p>
          </label>
        ) : (
          <div className="space-y-4">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
            ) : (
              <File className="w-12 h-12 text-blue-600 mx-auto" />
            )}
            
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <button
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700"
                disabled={uploading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
      </div>

      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
        >
          {uploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload File
            </>
          )}
        </button>
      )}
    </div>
  )
}
