import React from 'react';
import { Landmark, CreditCard, User, ShieldCheck } from 'lucide-react';

export default function BankDetailsStep({ formData, onChange }) {
    const handleChange = (e) => {
        onChange(e.target.name, e.target.value);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="p-4 bg-green-50/50 rounded-xl border border-green-100 flex items-start gap-3 mb-6">
                <Landmark className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-green-900">Payment & Bank Details</h4>
                    <p className="text-xs text-green-700/80">Provide the bank account details where your earnings will be remitted. Ensure the information matches your registered name.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-gray-400" /> Bank Name
                    </label>
                    <input
                        type="text"
                        name="bankName"
                        value={formData.bankName || ''}
                        onChange={handleChange}
                        placeholder="Select or enter bank name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" /> Account Name
                    </label>
                    <input
                        type="text"
                        name="accountName"
                        value={formData.accountName || ''}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" /> Account Number
                    </label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber || ''}
                        onChange={handleChange}
                        placeholder="0123456789"
                        maxLength="10"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                        required
                    />
                </div>
            </div>
        </div>
    );
}
