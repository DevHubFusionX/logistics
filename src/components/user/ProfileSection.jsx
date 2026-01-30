import { useState } from 'react'
import { User, Building, Mail, Phone, Save, Camera, RefreshCw, AlertCircle, Lock } from 'lucide-react'
import { useProfileQuery, useUpdateProfileMutation } from '../../hooks/queries/useAuthQueries'

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(null)

  const { data: profileData, isLoading, isError, refetch } = useProfileQuery()
  const updateMutation = useUpdateProfileMutation()

  const handleEdit = () => {
    setEditedData({ ...profileData })
    setIsEditing(true)
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
      <div className="flex flex-col items-center justify-center p-12">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Synchronizing Identity...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-rose-50/50 rounded-3xl border border-rose-100 m-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
        <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Profile Sync Collision</h3>
        <p className="text-xs text-gray-500 mb-6 font-medium">Failed to retrieve authoritative identity data from the vault.</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-100"
        >
          Re-establish Connection
        </button>
      </div>
    )
  }

  const displayData = isEditing ? editedData : profileData

  return (
    <div className="divide-y divide-gray-100">
      {/* Identity Visual Section */}
      <div className="p-8 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="relative group shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-blue-200 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
              {profileData.avatar ? (
                <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover rounded-3xl" />
              ) : (
                <span>{profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}</span>
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl shadow-xl border border-gray-100 hover:scale-110 active:scale-95 transition-all text-blue-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-2">Verified Professional Account</p>
            </div>
            <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-md">
              Your profile is visible to other enterprise users and logistics partners. Keep your information updated for seamless communication.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={handleEdit}
              className="px-8 py-3 bg-gray-900 text-white rounded-[1.2rem] hover:bg-blue-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95 shrink-0"
            >
              Modify Secrets
            </button>
          )}
        </div>
      </div>

      {/* Attributes Section */}
      <div className="p-8 lg:p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {/* Personality */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Personal Attributes</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Legal Given Name</label>
                <input
                  type="text"
                  value={displayData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-5 py-3 rounded-xl transition-all font-bold text-sm ${isEditing
                    ? 'bg-white border-2 border-gray-100 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-50'
                    : 'bg-gray-50/50 border-2 border-transparent text-gray-500 cursor-not-allowed'
                    }`}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Legal Surname</label>
                <input
                  type="text"
                  value={displayData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-5 py-3 rounded-xl transition-all font-bold text-sm ${isEditing
                    ? 'bg-white border-2 border-gray-100 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-50'
                    : 'bg-gray-50/50 border-2 border-transparent text-gray-500 cursor-not-allowed'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-indigo-600" />
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Contact Channels</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 text-rose-500">Immutable Email Identifier</label>
                <div className="relative">
                  <input
                    type="email"
                    value={displayData.email}
                    disabled={true}
                    className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border-2 border-transparent font-bold text-sm text-gray-400 cursor-not-allowed"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Secure Mobile Connection</label>
                <input
                  type="tel"
                  value={displayData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  disabled={!isEditing}
                  placeholder="+234 000 000 0000"
                  className={`w-full px-5 py-3 rounded-xl transition-all font-bold text-sm ${isEditing
                    ? 'bg-white border-2 border-gray-100 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-50'
                    : 'bg-gray-50/50 border-2 border-transparent text-gray-500 cursor-not-allowed'
                    }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Context */}
        <div className="pt-10 border-t border-gray-50">
          <div className="flex items-center gap-2 mb-6">
            <Building className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Business Intelligence Context</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Entity Name</label>
              <input
                type="text"
                value={displayData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-5 py-3 rounded-xl transition-all font-bold text-sm ${isEditing
                  ? 'bg-white border-2 border-gray-100 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-50'
                  : 'bg-gray-50/50 border-2 border-transparent text-gray-500 cursor-not-allowed'
                  }`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Enterprise Subscription Tier</label>
              <select
                value={displayData.clientCategory}
                onChange={(e) => handleChange('clientCategory', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-5 py-3 rounded-xl transition-all font-bold text-sm ${isEditing
                  ? 'bg-white border-2 border-gray-100 text-gray-900 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 appearance-none'
                  : 'bg-gray-50/50 border-2 border-transparent text-gray-500 cursor-not-allowed'
                  }`}
              >
                <option value="Enterprise">Enterprise Alpha</option>
                <option value="SME">Market SME</option>
                <option value="Startup">Early Startup</option>
                <option value="Individual">Personal Tier</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save/Discard Actions */}
        {isEditing && (
          <div className="flex items-center gap-4 pt-10 border-t border-gray-100 sticky bottom-0 bg-white/80 backdrop-blur-md pb-4">
            <button
              onClick={() => {
                setIsEditing(false)
                setEditedData(null)
              }}
              className="px-8 py-3 rounded-xl hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest text-gray-400 border border-gray-200"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="flex items-center gap-3 px-10 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all font-black text-[10px] uppercase tracking-widest disabled:opacity-50 active:scale-95"
            >
              {updateMutation.isPending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {updateMutation.isPending ? 'Syncing...' : 'Save Updates'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
