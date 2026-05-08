import React, { useState } from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

export default function EmploymentStep({ formData, onChange }) {
    const [newCompany, setNewCompany] = useState('');

    const handleAddField = (e) => {
        onChange(e.target.name, e.target.value);
    };

    const addCompany = () => {
        if (newCompany.trim()) {
            const updatedCompanies = [...(formData.previousCompany || []), newCompany.trim()];
            onChange('previousCompany', updatedCompanies);
            setNewCompany('');
        }
    };

    const removeCompany = (index) => {
        const updatedCompanies = formData.previousCompany.filter((_, i) => i !== index);
        onChange('previousCompany', updatedCompanies);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" /> Years of Driving Experience
                </label>
                <input
                    type="number"
                    name="yearsOfDrivingExperience"
                    value={formData.yearsOfDrivingExperience || ''}
                    onChange={handleAddField}
                    placeholder="5"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                    required
                />
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" /> Previous Companies
                </label>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        placeholder="Add previous employer"
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                    />
                    <button
                        type="button"
                        onClick={addCompany}
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-2">
                    {formData.previousCompany?.map((company, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm animate-in zoom-in-95 duration-200"
                        >
                            <span className="text-sm text-gray-700 font-medium">{company}</span>
                            <button
                                type="button"
                                onClick={() => removeCompany(index)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {(!formData.previousCompany || formData.previousCompany.length === 0) && (
                        <p className="text-sm text-gray-400 text-center py-4 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            No previous companies added yet
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
