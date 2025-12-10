import React from 'react';

interface FormData {
  companyName: string;
  companyAddress: string;
  [key: string]: string;
}

interface CompanyInfoProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ formData, handleChange }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-sm font-semibold mb-1">কারখানার নামঃ</label>
          <input 
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">কারখানার ঠিকানাঃ</label>
          <input 
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;