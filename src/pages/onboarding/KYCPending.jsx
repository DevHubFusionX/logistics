import { motion } from 'framer-motion'
import { Clock, FileCheck, Mail, Phone, Edit } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function KYCPending() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Clock className="w-10 h-10 text-yellow-600" />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Account Under Review
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Thank you for submitting your company information. Our team is currently reviewing your documents for KYC compliance.
        </motion.p>

        <motion.div
          className="bg-sky-50 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileCheck className="w-6 h-6 text-sky-600" />
            <h3 className="text-lg font-semibold text-gray-900">Review Process</h3>
          </div>

          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Documents received and validated</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">KYC verification in progress</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-gray-500">Final approval pending</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Expected Timeline</h4>
            <p className="text-gray-600 text-sm">2-3 business days</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Status Updates</h4>
            <p className="text-gray-600 text-sm">Via email & SMS</p>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding/edit-profile">
              <button className="flex items-center gap-2 px-6 py-3 border border-sky-500 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors">
                <Edit className="w-4 h-4" />
                Edit Information
              </button>
            </Link>

            <a href="mailto:support@Daralogistics.com">
              <button className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                <Mail className="w-4 h-4" />
                Contact Support
              </button>
            </a>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-2">Need immediate assistance?</p>
            <a href="tel:+18003672564" className="flex items-center justify-center gap-2 text-sky-600 hover:text-sky-700 font-medium">
              <Phone className="w-4 h-4" />
              +1 (800) Dara-LOG
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}