import React from 'react';

interface FormData {
  earnedLeave: string;
  serviceCompensation: string;
  deathCompensation: string;
  noticePay: string;
  others: string;
  advanceDeduction: string;
  totalDeductions: string;
  [key: string]: string;
}

interface CalculationDetailsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calculateTotal: () => string;
}

const CalculationDetails: React.FC<CalculationDetailsProps> = ({ formData, handleChange, calculateTotal }) => {
  return (
    <div className="border-2 border-black mb-6">
      <div className="bg-gray-200 p-3 border-b-2 border-black text-center font-bold">
        হিসাবের বিবরণ ও প্রাপ্য টাকার পরিমাণ
      </div>
      
      <table className="w-full">
        <tbody>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-blue-50">প্রাপ্য অর্জিত ছুটি</td>
            <td className="border-r border-black p-3 w-32">
              <input 
                name="earnedLeave"
                value={formData.earnedLeave}
                onChange={handleChange}
                className="w-full px-2 py-1 text-right focus:outline-none"
              />
            </td>
            <td className="p-3 text-sm w-20">টাকা</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-blue-50">চাকরি অবসানজনিত ক্ষতিপূরণ</td>
            <td className="border-r border-black p-3">
              <input 
                name="serviceCompensation"
                value={formData.serviceCompensation}
                onChange={handleChange}
                className="w-full px-2 py-1 text-right focus:outline-none"
              />
            </td>
            <td className="p-3 text-sm">টাকা</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-blue-50">মৃত্যুজনিত ক্ষতিপূরণ (মৃত্যুর ক্ষেত্রে)</td>
            <td className="border-r border-black p-3">
              <input 
                name="deathCompensation"
                value={formData.deathCompensation}
                onChange={handleChange}
                className="w-full px-2 py-1 text-right focus:outline-none"
              />
            </td>
            <td className="p-3 text-sm">টাকা</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-blue-50">নোটিশ পে (প্রযোজ্য ক্ষেত্রে)</td>
            <td className="border-r border-black p-3">
              <input 
                name="noticePay"
                value={formData.noticePay}
                onChange={handleChange}
                className="w-full px-2 py-1 text-right focus:outline-none"
              />
            </td>
            <td className="p-3 text-sm">টাকা</td>
          </tr>
          <tr className="border-b-2 border-black">
            <td className="border-r border-black p-3 font-semibold bg-blue-50">অন্যান্য (প্রযোজ্য ক্ষেত্রে)</td>
            <td className="border-r border-black p-3">
              <input 
                name="others"
                value={formData.others}
                onChange={handleChange}
                className="w-full px-2 py-1 text-right focus:outline-none"
              />
            </td>
            <td className="p-3 text-sm">টাকা</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-red-50">কর্তন (অগ্রিম গ্রহণ বাবদ)</td>
            <td className="border-r border-black p-3">
              <input 
                name="advanceDeduction"
                value={formData.advanceDeduction}
                onChange={handleChange}
                className="w-full px-2 py-1 text-right focus:outline-none"
              />
            </td>
            <td className="p-3 text-sm">টাকা</td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-red-50">কর্তন (নোটিশ বাবদ)</td>
            <td className="border-r border-black p-3">
              <input 
                type="number" 
                defaultValue="0" 
                className="w-full px-2 py-1 text-right focus:outline-none" 
              />
            </td>
            <td className="p-3 text-sm">টাকা</td>
          </tr>
          <tr className="border-b-2 border-black">
            <td className="border-r border-black p-3 font-semibold bg-red-50">অন্যান্য (প্রযোজ্য ক্ষেত্রে)</td>
            <td className="border-r border-black p-3">
              <input 
                type="number" 
                defaultValue="0" 
                className="w-full px-2 py-1 text-right focus:outline-none" 
              />
            </td>
            <td className="p-3 text-sm">টাকা</td>
          </tr>
          <tr className="border-b border-black bg-yellow-100">
            <td className="border-r border-black p-3 font-bold">মোট কর্তন =</td>
            <td className="border-r border-black p-3">
              <input 
                name="totalDeductions"
                value={formData.totalDeductions}
                readOnly
                className="w-full px-2 py-1 text-right font-bold bg-yellow-100 focus:outline-none"
              />
            </td>
            <td className="p-3 text-sm font-bold">টাকা</td>
          </tr>
          <tr className="bg-green-100">
            <td className="border-r border-black p-3 font-bold text-lg">সর্বমোট প্রাপ্য টাকার পরিমাণ</td>
            <td className="border-r border-black p-3">
              <div className="text-right font-bold text-lg px-2 py-1">{calculateTotal()}</div>
            </td>
            <td className="p-3 text-sm font-bold">টাকা</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CalculationDetails;