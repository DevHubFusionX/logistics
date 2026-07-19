import { useState } from 'react'
import { User, Building2, Mail, Phone, Shield, Calendar, Edit2, Save, X, RefreshCw, AlertCircle } from 'lucide-react'
import { useProfileQuery, useUpdateProfileMutation } from '@/features/auth'

function Field({ label, value, name, type = 'text', disabled, editing, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value || ''}
        disabled={disabled || !editing}
        onChange={e => onChange?.(name, e.target.value)}
        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all outline-none
          ${editing && !disabled
            ? 'bg-white border border-gray-200 text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
            : 'bg-gray-50 border border-transparent text-gray-600 cursor-default'
          }`}
      />
    </div>
  )
}

export default function ManageProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(null)

  const { data: profileData, isLoading, isError, refetch } = useProfileQuery()
  const updateMutation = useUpdateProfileMutation()

  const handleEdit = () => {
    setEditedData({ ...profileData })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData(null)
  }

  const handleSave = () => {
    updateMutation.mutate(editedData, {
      onSuccess: () => {
        setIsEditing(false)
        setEditedData(null)
      }
    })
  }

  const handleChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-sky-100 border-t-sky-600 animate-spin" />
          <span className="text-xs text-gray-400 font-semibold tracking-wide uppercase">Loading profile…</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-xs">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium mb-4">Couldn't load your profile.</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-700 text-white text-sm font-semibold rounded-xl hover:bg-sky-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Try again
          </button>
        </div>
      </div>
    )
  }

  const data = isEditing ? editedData : profileData
  const initials = `${profileData.firstName?.[0] || ''}${profileData.lastName?.[0] || ''}`.toUpperCase()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-xl text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your personal and business information</p>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-sky-700 rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-60"
              >
                {updateMutation.isPending
                  ? <RefreshCw className="w-4 h-4 animate-spin" />
                  : <Save className="w-4 h-4" />}
                {updateMutation.isPending ? 'Saving…' : 'Save changes'}
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-sky-700 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
            >
              <Edit2 className="w-4 h-4" /> Edit profile
            </button>
          )}
        </div>
      </div>

      {/* Avatar + identity card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-sky-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-heading font-bold text-xl">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-gray-900 text-lg leading-tight">
            {profileData.firstName} {profileData.lastName}
          </p>
          <p className="text-sm text-gray-400 mt-0.5 truncate">{profileData.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold
              ${profileData.verified ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
              <Shield className="w-3 h-3" />
              {profileData.verified ? 'Verified' : 'Pending verification'}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700">
              {profileData.clientCategory || 'Customer'}
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0">
          <Calendar className="w-3.5 h-3.5" />
          Member since {new Date(profileData.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Personal info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <User className="w-4 h-4 text-sky-700" />
          <h2 className="font-heading font-semibold text-gray-900 text-sm">Personal information</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="First name" name="firstName" value={data.firstName} editing={isEditing} onChange={handleChange} />
          <Field label="Last name" name="lastName" value={data.lastName} editing={isEditing} onChange={handleChange} />
          <Field label="Email address" name="email" type="email" value={data.email} editing={isEditing} disabled onChange={handleChange} />
          <Field label="Phone number" name="phoneNumber" type="tel" value={data.phoneNumber} editing={isEditing} onChange={handleChange} />
        </div>
        {isEditing && (
          <p className="mt-3 text-xs text-gray-400 flex items-center gap-1">
            <Mail className="w-3 h-3" /> Email changes require a support request.
          </p>
        )}
      </div>

      {/* Business info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Building2 className="w-4 h-4 text-sky-700" />
          <h2 className="font-heading font-semibold text-gray-900 text-sm">Business information</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Company name" name="companyName" value={data.companyName} editing={isEditing} onChange={handleChange} />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Client category</label>
            <select
              value={data.clientCategory || ''}
              disabled={!isEditing}
              onChange={e => handleChange('clientCategory', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all outline-none
                ${isEditing
                  ? 'bg-white border border-gray-200 text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                  : 'bg-gray-50 border border-transparent text-gray-600 cursor-default'
                }`}
            >
              <option value="Enterprise">Enterprise</option>
              <option value="SME">SME</option>
              <option value="Startup">Startup</option>
              <option value="Individual">Individual</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  )
}
