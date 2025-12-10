import React from 'react';

interface FormData {
  employeeName: string;
  cardNo: string;
  designation: string;
  section: string;
  joiningDate: string;
  lastAttendance: string;
  terminationType: string;
  [key: string]: string;
}

interface EmployeeInfoProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ formData, handleChange }) => {
  return (
    <div className="border-2 border-black mb-6">
      <div className="bg-gray-200 p-3 border-b-2 border-black text-center font-bold">
        কর্মী তথ্য, চাকরিকাল ও নিষ্পত্তির ধরন
      </div>
      
      <table className="w-full">
        <tbody>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 w-1/3 font-semibold bg-gray-50">নাম</td>
            <td className="p-3 w-2/3">
              <input 
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="w-full px-2 py-1 focus:outline-none"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-gray-50">কার্ড নং</td>
            <td className="p-3">
              <input 
                name="cardNo"
                value={formData.cardNo}
                onChange={handleChange}
                className="w-full px-2 py-1 focus:outline-none"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-gray-50">পদবিঃ সি.</td>
            <td className="p-3">
              <input 
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-2 py-1 focus:outline-none"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-gray-50">বিভাগ</td>
            <td className="p-3">
              <input 
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-2 py-1 focus:outline-none"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-gray-50">নিয়োগের তারিখ</td>
            <td className="p-3">
              <input 
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                className="w-full px-2 py-1 focus:outline-none border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-3 font-semibold bg-gray-50">সর্বশেষ উপস্থিতির তারিখ</td>
            <td className="p-3">
              <input 
                name="lastAttendance"
                type="date"
                value={formData.lastAttendance}
                onChange={handleChange}
                className="w-full px-2 py-1 focus:outline-none border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr>
            <td className="border-r border-black p-3 font-semibold bg-gray-50">চাকরি নিষ্পত্তির ধরন</td>
            <td className="p-3">
              <input 
                name="terminationType"
                value={formData.terminationType}
                onChange={handleChange}
                className="w-full px-2 py-1 focus:outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeInfo;