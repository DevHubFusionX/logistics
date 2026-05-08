import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building, Save, ArrowLeft, Edit, Shield, Calendar, Award, RefreshCw, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProfileQuery, useUpdateProfileMutation } from '../../hooks/queries/useAuthQueries'

export default function ManageProfile() {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-bold animate-pulse">Accessing Secure Profile...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-red-50">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-gray-900 mb-2">Sync Failed</h3>
          <p className="text-gray-500 mb-6 font-medium">We couldn't synchronize your profile data. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
          >
            <RefreshCw className="w-5 h-5" /> Reconnect Now
          </button>
        </div>
      </div>
    )
  }

  const displayData = isEditing ? editedData : profileData

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100/50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-4">
            <Link to="/my-bookings">
              <button className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
            </Link>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Profile & Identity</h1>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Account Management</p>
                </div>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setEditedData(null)
                      }}
                      className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-100 text-gray-500 rounded-2xl hover:bg-gray-50 transition-all font-bold"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={updateMutation.isPending}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all font-bold disabled:opacity-50"
                    >
                      {updateMutation.isPending ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                      {updateMutation.isPending ? 'Saving...' : 'Commit Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-2xl hover:bg-blue-600 shadow-xl shadow-gray-100 transition-all font-bold"
                  >
                    <Edit className="w-5 h-5" />
                    Modify Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Summary Side */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-50 text-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                <span className="text-blue-600 font-black text-4xl">
                  {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1 leading-tight">{profileData.firstName} {profileData.lastName}</h2>
              <p className="text-xs font-black text-blue-600/60 uppercase tracking-widest mb-6">{profileData.clientCategory || 'Global Member'}</p>

              <div className="space-y-3 text-left">
                <div className={`p-4 rounded-2xl border-2 transition-all ${profileData.verified ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <Shield className={`w-5 h-5 ${profileData.verified ? 'text-green-600' : 'text-yellow-600'}`} />
                    <span className={`font-black text-[10px] uppercase tracking-widest ${profileData.verified ? 'text-green-700' : 'text-yellow-700'}`}>
                      {profileData.verified ? 'Verified Identity' : 'Under Review'}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400">Compliance check completed via KYC</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border-2 border-transparent">
                  <div className="flex items-center gap-3 mb-1">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Partner Since</span>
                  </div>
                  <p className="text-sm font-black text-gray-800">{new Date(profileData.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-6 text-white shadow-2xl overflow-hidden relative group">
              <Award className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
              <h4 className="font-black text-lg mb-1 tracking-tight">Logistics Alpha</h4>
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-4">Elite Tier Status</p>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="h-full w-3/4 bg-blue-500"></div>
              </div>
              <p className="text-[10px] font-medium text-white/60 text-center">25 points until Diamond Tier</p>
            </div>
          </motion.div>

          {/* Detailed Info Side */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-50">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Personal Section */}
                <div className="md:col-span-2 flex items-center gap-3 border-b-2 border-gray-50 pb-6 mb-2">
                  <div className="p-3 bg-blue-50 rounded-2xl">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Account Credentials</h3>
                    <p className="text-sm font-bold text-gray-400">Personnel contact and identification data</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Legal First Name</label>
                  <input
                    type="text"
                    value={displayData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={`w-full px-5 py-4 border-2 rounded-2xl transition-all font-bold text-gray-900 focus:ring-4 focus:ring-blue-50 ${isEditing ? 'border-gray-100 bg-white focus:border-blue-600' : 'border-transparent bg-gray-50/50 cursor-not-allowed text-gray-500'}`}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Legal Last Name</label>
                  <input
                    type="text"
                    value={displayData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={`w-full px-5 py-4 border-2 rounded-2xl transition-all font-bold text-gray-900 focus:ring-4 focus:ring-blue-50 ${isEditing ? 'border-gray-100 bg-white focus:border-blue-600' : 'border-transparent bg-gray-50/50 cursor-not-allowed text-gray-500'}`}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Contact Email</label>
                  <input
                    type="email"
                    value={displayData.email}
                    className={`w-full px-5 py-4 border-2 rounded-2xl transition-all font-bold text-gray-900 border-transparent bg-gray-50/50 cursor-not-allowed text-gray-400`}
                    disabled={true}
                  />
                  <p className="text-[10px] font-bold text-gray-300 ml-1">* Email changes require support ticket</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mobile Line</label>
                  <input
                    type="tel"
                    value={displayData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    className={`w-full px-5 py-4 border-2 rounded-2xl transition-all font-bold text-gray-900 focus:ring-4 focus:ring-blue-50 ${isEditing ? 'border-gray-100 bg-white focus:border-blue-600' : 'border-transparent bg-gray-50/50 cursor-not-allowed text-gray-500'}`}
                    disabled={!isEditing}
                  />
                </div>

                {/* Company Section */}
                <div className="md:col-span-2 flex items-center gap-3 border-b-2 border-gray-50 pb-6 mt-6 mb-2">
                  <div className="p-3 bg-indigo-50 rounded-2xl">
                    <Building className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Organization Profile</h3>
                    <p className="text-sm font-bold text-gray-400">Logistics entity and business categorization</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Business Name</label>
                  <input
                    type="text"
                    value={displayData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className={`w-full px-5 py-4 border-2 rounded-2xl transition-all font-bold text-gray-900 focus:ring-4 focus:ring-blue-50 ${isEditing ? 'border-gray-100 bg-white focus:border-blue-600' : 'border-transparent bg-gray-50/50 cursor-not-allowed text-gray-500'}`}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Client Tier</label>
                  <select
                    value={displayData.clientCategory}
                    onChange={(e) => handleChange('clientCategory', e.target.value)}
                    className={`w-full px-5 py-4 border-2 rounded-2xl transition-all font-bold text-gray-900 focus:ring-4 focus:ring-blue-50 ${isEditing ? 'border-gray-100 bg-white focus:border-blue-600' : 'border-transparent bg-gray-50/50 cursor-not-allowed text-gray-500'}`}
                    disabled={!isEditing}
                  >
                    <option value="Enterprise">Enterprise Elite</option>
                    <option value="SME">Market SME</option>
                    <option value="Startup">Early Startup</option>
                    <option value="Individual">Personal Shipper</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
