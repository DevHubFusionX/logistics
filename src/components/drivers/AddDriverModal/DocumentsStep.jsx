import React, { useRef } from 'react';
import { Upload, FileText, Image, CheckCircle, AlertCircle } from 'lucide-react';

const FileInput = ({ label, name, value, onChange, accept = "image/*,application/pdf" }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange(name, file);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> {label}
                </span>
                {value && <CheckCircle className="w-4 h-4 text-green-500" />}
            </label>
            <div
                onClick={() => fileInputRef.current.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-4 transition-all duration-200 ${value
                        ? 'border-green-200 bg-green-50/30'
                        : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
            >
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className={`p-2 rounded-full ${value ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                        <Upload className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-semibold text-gray-700">
                            {value ? value.name : 'Click to upload'}
                        </p>
                        <p className="text-[10px] text-gray-400">
                            {value ? `${(value.size / 1024 / 1024).toFixed(2)} MB` : 'Max size 5MB'}
                        </p>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default function DocumentsStep({ formData, onChange }) {
    const documents = [
        { name: 'ninSlip', label: 'NIN Slip' },
        { name: 'driversLicense', label: 'Driver\'s License' },
        { name: 'passportPhoto', label: 'Passport Photo' },
        { name: 'truckDrivingCertification', label: 'Truck Driving Certification' },
        { name: 'medicalFitnessCertificate', label: 'Medical Fitness Certificate' },
        { name: 'drugTestReport', label: 'Drug Test Report' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                    <h4 className="text-sm font-semibold text-amber-900">Required Documents</h4>
                    <p className="text-xs text-amber-700/80">Please upload clear scanned copies or clear photos of the following documents. Formats: JPG, PNG, PDF.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc) => (
                    <FileInput
                        key={doc.name}
                        name={doc.name}
                        label={doc.label}
                        value={formData[doc.name]}
                        onChange={onChange}
                    />
                ))}
            </div>
        </div>
    );
}
