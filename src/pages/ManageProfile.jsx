import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Building, Mail, Phone, MapPin, Save, ArrowLeft, Edit, Shield, Calendar, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import authService from '../services/authService'

export default function ManageProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await authService.getProfile()
      if (response.data) {
        setProfileData({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
          phoneNumber: response.data.phoneNumber || '',
          companyName: response.data.companyName || '',
          clientCategory: response.data.clientCategory || '',
          verified: response.data.verified || false,
          createdAt: response.data.createdAt || '',
          updatedAt: response.data.updatedAt || ''
        })
      }
    } catch (error) {
      setError('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log('Profile updated:', profileData)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchProfile} className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!profileData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            {/* Back Button */}
            <Link to="/dashboard">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Back to Dashboard</span>
              </button>
            </Link>
            
            {/* Main Header Content */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Profile Management</h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">Manage your account information</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 shadow-lg transition-all font-medium text-sm sm:text-base"
                    >
                      <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 shadow-lg transition-all font-medium text-sm sm:text-base"
                  >
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
          {/* Profile Summary */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                <span className="text-white font-bold text-2xl md:text-3xl">
                  {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{profileData.companyName}</h2>
              <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6">{profileData.clientCategory}</p>
              
              <div className="space-y-3 md:space-y-4">
                <div className={`p-3 md:p-4 rounded-lg md:rounded-xl border ${profileData.verified ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'}`}>
                  <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                    <Shield className={`w-4 h-4 md:w-5 md:h-5 ${profileData.verified ? 'text-green-600' : 'text-yellow-600'}`} />
                    <span className={`font-bold text-sm md:text-base ${profileData.verified ? 'text-green-800' : 'text-yellow-800'}`}>
                      {profileData.verified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </div>
                  <p className={`text-xs md:text-sm ${profileData.verified ? 'text-green-700' : 'text-yellow-700'}`}>
                    {profileData.verified ? 'Account fully verified' : 'Verification in progress'}
                  </p>
                </div>
                
                <div className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg md:rounded-xl border border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    <span className="text-blue-800 font-bold text-sm md:text-base">Active Member</span>
                  </div>
                  <p className="text-blue-700 text-xs md:text-sm">Access to logistics services</p>
                </div>
                
                <div className="p-3 md:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg md:rounded-xl border border-purple-200">
                  <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                    <span className="text-purple-800 font-bold text-sm md:text-base">Member Since</span>
                  </div>
                  <p className="text-purple-700 text-xs md:text-sm">{new Date(profileData.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div 
            className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-8 md:space-y-10">
              {/* Personal Information */}
              <div>
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Personal Information</h3>
                    <p className="text-sm md:text-base text-gray-600">Your account details and contact information</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className={`w-full px-4 md:px-5 py-3 md:py-4 border-2 rounded-lg md:rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Company Information</h3>
                    <p className="text-gray-600">Business details and company profile</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Company Name</label>
                    <input
                      type="text"
                      value={profileData.companyName}
                      onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Client Category</label>
                    <select
                      value={profileData.clientCategory}
                      onChange={(e) => setProfileData({...profileData, clientCategory: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    >
                      <option value="Enterprise">Enterprise</option>
                      <option value="SME">Small & Medium Enterprise</option>
                      <option value="Startup">Startup</option>
                      <option value="Individual">Individual</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}