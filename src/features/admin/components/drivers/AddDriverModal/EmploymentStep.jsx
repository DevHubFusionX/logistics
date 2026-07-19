import React from 'react';
import { Briefcase } from 'lucide-react';

export default function EmploymentStep({ formData, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
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
          onChange={handleChange}
          placeholder="5"
          min="0"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-400" /> Previous Company (optional)
        </label>
        <input
          type="text"
          name="previousCompany"
          value={formData.previousCompany || ''}
          onChange={handleChange}
          placeholder="e.g. ABC Logistics Ltd"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
        />
      </div>
    </div>
  );
}
