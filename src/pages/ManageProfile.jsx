import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building, Mail, Phone, MapPin, Save, ArrowLeft, Edit, Shield, Globe, Calendar, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ManageProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    // Personal Info
    fullName: 'John Doe',
    email: 'john.doe@abccorp.com',
    phone: '+1 (555) 123-4567',
    
    // Company Info
    companyName: 'ABC Corporation',
    businessType: 'Corporation',
    registrationNumber: 'REG-123456789',
    taxId: 'TAX-987654321',
    
    // Address
    address: '123 Business Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    
    // Contact Details
    contactPerson: 'John Doe',
    businessEmail: 'billing@abccorp.com',
    website: 'https://www.abccorp.com'
  })

  const handleSave = () => {
    setIsEditing(false)
    // Handle save logic here
    console.log('Profile updated:', profileData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Link to="/dashboard">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Company Profile Management</h1>
                  <p className="text-lg text-gray-600">Maintain accurate business information and account settings</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel Changes
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 shadow-lg transition-all font-medium"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 shadow-lg transition-all font-medium"
                >
                  <Edit className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-bold text-3xl">
                  {profileData.companyName.charAt(0)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.companyName}</h2>
              <p className="text-gray-600 text-lg mb-6">{profileData.businessType}</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-bold">KYC Verified</span>
                  </div>
                  <p className="text-green-700 text-sm">Account fully verified and compliant</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-800 font-bold">Premium Member</span>
                  </div>
                  <p className="text-blue-700 text-sm">Access to all logistics services</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-800 font-bold">Member Since</span>
                  </div>
                  <p className="text-purple-700 text-sm">January 2024</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div 
            className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-10">
              {/* Personal Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                    <p className="text-gray-600">Primary contact details and account holder information</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Full Name</label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
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
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
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
                    <p className="text-gray-600">Business registration details and corporate structure</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Legal Company Name</label>
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
                    <label className="block text-lg font-bold text-gray-900 mb-3">Business Structure</label>
                    <select
                      value={profileData.businessType}
                      onChange={(e) => setProfileData({...profileData, businessType: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    >
                      <option value="Corporation">Corporation</option>
                      <option value="LLC">Limited Liability Company (LLC)</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      <Shield className="w-5 h-5 inline mr-2 text-green-500" />
                      Business Registration Number
                    </label>
                    <input
                      type="text"
                      value={profileData.registrationNumber}
                      className="w-full px-5 py-4 border-2 border-green-200 rounded-xl bg-green-50 text-gray-700 font-medium"
                      disabled
                    />
                    <p className="text-sm text-green-600 mt-2">Verified and protected</p>
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      <Shield className="w-5 h-5 inline mr-2 text-green-500" />
                      Tax Identification Number
                    </label>
                    <input
                      type="text"
                      value={profileData.taxId}
                      className="w-full px-5 py-4 border-2 border-green-200 rounded-xl bg-green-50 text-gray-700 font-medium"
                      disabled
                    />
                    <p className="text-sm text-green-600 mt-2">Verified and protected</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Business Address</h3>
                    <p className="text-gray-600">Primary business location and mailing address</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-lg font-bold text-gray-900 mb-3">Street Address</label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">City</label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">State/Province</label>
                    <input
                      type="text"
                      value={profileData.state}
                      onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Postal Code</label>
                    <input
                      type="text"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Country</label>
                    <input
                      type="text"
                      value={profileData.country}
                      onChange={(e) => setProfileData({...profileData, country: e.target.value})}
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

              {/* Contact Information */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Business Contact Details</h3>
                    <p className="text-gray-600">Additional contact information and online presence</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Primary Contact Person</label>
                    <input
                      type="text"
                      value={profileData.contactPerson}
                      onChange={(e) => setProfileData({...profileData, contactPerson: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-3">Business Email</label>
                    <input
                      type="email"
                      value={profileData.businessEmail}
                      onChange={(e) => setProfileData({...profileData, businessEmail: e.target.value})}
                      className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-gray-900 ${
                        isEditing 
                          ? 'border-gray-200 focus:border-sky-500 bg-white' 
                          : 'border-gray-100 bg-gray-50'
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-lg font-bold text-gray-900 mb-3">
                      <Globe className="w-5 h-5 inline mr-2 text-sky-500" />
                      Company Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
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
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}