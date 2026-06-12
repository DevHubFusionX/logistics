import React from 'react';
import { Shield, Phone, MapPin, User } from 'lucide-react';

export default function GuarantorStep({ formData, onChange }) {
    const handleChange = (e) => {
        onChange(e.target.name, e.target.value);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3 mb-6">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-blue-900">Guarantor Information</h4>
                    <p className="text-xs text-blue-700/80">Please provide the details of a reliable person who can vouch for your integrity and professional conduct.</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" /> Guarantor Name
                    </label>
                    <input
                        type="text"
                        name="guarantorName"
                        value={formData.guarantorName || ''}
                        onChange={handleChange}
                        placeholder="Mary Smith"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" /> Guarantor Phone Number
                    </label>
                    <input
                        type="tel"
                        name="guarantorPhoneNumber"
                        value={formData.guarantorPhoneNumber || ''}
                        onChange={handleChange}
                        placeholder="+2348098765432"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" /> Guarantor Address
                    </label>
                    <textarea
                        name="guarantorAddress"
                        value={formData.guarantorAddress || ''}
                        onChange={handleChange}
                        placeholder="456 Secondary Street, Lagos, Nigeria"
                        rows="3"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none"
                        required
                    />
                </div>
            </div>
        </div>
    );
}
