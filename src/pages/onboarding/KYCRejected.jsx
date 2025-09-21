import { motion } from 'framer-motion'
import { XCircle, AlertTriangle, Edit, Mail, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function KYCRejected() {
  const rejectionReasons = [
    "Business registration document is unclear or expired",
    "Tax ID verification failed - please provide updated documentation",
    "Business address proof is required",
    "Director identification documents need to be resubmitted"
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div 
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <XCircle className="w-10 h-10 text-red-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Requires Updates
          </h1>
          
          <p className="text-lg text-gray-600">
            We've reviewed your submission and need additional information to complete your account verification.
          </p>
        </motion.div>

        <motion.div 
          className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Issues Found</h3>
          </div>
          
          <ul className="space-y-3">
            {rejectionReasons.map((reason, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{reason}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="bg-sky-50 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-sky-600" />
            <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
          </div>
          
          <div className="space-y-3 text-gray-700">
            <p>1. Review the issues listed above</p>
            <p>2. Gather the required updated documents</p>
            <p>3. Resubmit your application with corrections</p>
            <p>4. Our team will review within 24-48 hours</p>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/onboarding/profile-setup" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-semibold">
                <Edit className="w-5 h-5" />
                Update Application
              </button>
            </Link>
            
            <a href="mailto:kyc@doralogistics.com" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5" />
                Contact KYC Team
              </button>
            </a>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-2">
              Questions about the requirements?
            </p>
            <p className="text-gray-500 text-sm">
              Our KYC team is available Monday-Friday, 9 AM - 6 PM EST
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}