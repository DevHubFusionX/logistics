import { useState } from 'react'
import { Lock, Shield, Key, Smartphone, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react'

export default function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }, 1500)
  }

  return (
    <div className="divide-y divide-gray-100">
      {/* Change Password Header */}
      <div className="p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6 border-b border-gray-50 pb-8 mb-8">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl lg:rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
            <Key className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg lg:text-xl font-black text-gray-900 tracking-tight">Authentication Credentials</h3>
            <p className="text-[11px] lg:text-xs font-medium text-gray-500 mt-1 leading-relaxed">Ensure your account remains secure by maintaining a robust password.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="max-w-xl space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Verify Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95 disabled:opacity-50"
          >
            {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
            {isUpdating ? 'Synchronizing...' : 'Commit New Password'}
          </button>
        </form>
      </div>

      {/* Security Features */}
      <div className="p-8 lg:p-10 space-y-4">
        <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">Security Protocols</h4>

        <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100 group hover:border-blue-100 hover:bg-white transition-all duration-300">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm transition-transform group-hover:scale-105">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900">Multi-Factor Authentication (2FA)</h4>
              <p className="text-[11px] font-bold text-gray-400 mt-0.5">Add a second layer of verification for secure access.</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100 group hover:border-rose-100 hover:bg-white transition-all duration-300">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm transition-transform group-hover:scale-105">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900">Session Vulnerability Check</h4>
              <p className="text-[11px] font-bold text-gray-400 mt-0.5"> Lagos, Nigeria • Last active: Just now • Windows PC </p>
            </div>
          </div>
          <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest py-2 px-4 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100">
            Terminate
          </button>
        </div>
      </div>
    </div>
  )
}
