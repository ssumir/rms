import { useState, FormEvent } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FormData } from "../types/FinalSettlementTypes";

export default function FinalSettlementForm() {
  const [formData, setFormData] = useState<FormData>({
    employeeName: "Saiful Islam",
    cardNo: "",
    designation: "",
    joiningDate: "",
    lastAttendance: "",
    settlementDate: "",
    terminationType: "",
    serviceYears: "",
    totalDays: "",
    absentDays: "",
    basicWage: "",
    houseRent: "",
    foodAllowance: "",
    medicalAllowance: "",
    transportAllowance: "",
    totalDailyWage: "",
    earnedLeave: "",
    serviceCompensation: "",
    deathCompensation: "",
    noticePay: "",
    others: "",
    advanceDeduction: "",
    totalDeductions: "",
    companyName: "",
    companyAddress: "",
    section: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const earned = parseFloat(formData.earnedLeave) || 0;
    const service = parseFloat(formData.serviceCompensation) || 0;
    const death = parseFloat(formData.deathCompensation) || 0;
    const notice = parseFloat(formData.noticePay) || 0;
    const others = parseFloat(formData.others) || 0;
    const deductions = parseFloat(formData.totalDeductions) || 0;
    return (earned + service + death + notice + others - deductions).toFixed(2);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("ফর্ম সফলভাবে জমা হয়েছে!");
  };

  const renderWageRow = (label: string, name: keyof FormData) => (
    <tr className="border-b border-black" key={name}>
      <td className="w-1/2 p-3 font-semibold bg-gray-50 border-r border-black">
        {label}
      </td>
      <td className="w-1/3 p-3 border-r border-black">
        <input
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full px-2 py-1 text-right focus:outline-none"
        />
      </td>
      <td className="w-1/6 p-3 text-sm">টাকা</td>
    </tr>
  );

//   const formatDate = (value: string) => {
//     if (!value) return "";
//     const [year, month, day] = value.split("-");
//     return `${day}/${month}/${year}`;
//  };


  const renderCalculationRow = (label: string, name: keyof FormData, color = "") => (
    <tr className={`border-b border-black ${color}`} key={name}>
      <td className="border-r border-black p-3 font-semibold">{label}</td>
      <td className="border-r border-black p-3">
        <input
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full px-2 py-1 text-right focus:outline-none"
        />
      </td>
      <td className="p-3 text-sm">টাকা</td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl">
        <div className="print:p-10 print:bg-white print:text-black">
            {/* Header */}
        <div className="border-b-4 border-black p-6 bg-white text-center">
          <h1 className="text-2xl font-bold mb-2">
            কর্মী/কর্মচারীর চূড়ান্ত পাওনা হিসাবের বিবরণ
          </h1>
          <p className="text-sm font-semibold">
            শ্রম আইন এর সর্বশেষ সংশোধনী অনুযায়ী
          </p>

            <div className="flex items-center gap-2">
              <label className="font-semibold">তারিখঃ</label>
              <input
                name="settlementDate"
                type="date"
                value={formData.settlementDate}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

        </div>

        <div className="p-6">

          {/* Company Info Section */}
          <table className="w-full border border-gray-300 mb-6">
            <tbody>
              {[
                { label: "কারখানার নামঃ", name: "companyName" },
                { label: "কারখানার ঠিকানাঃ", name: "companyAddress" },
              ].map((item) => (
                <tr className="border-b border-gray-300" key={item.name}>
                  <td className="w-40 bg-gray-100 p-2 font-semibold border-r border-gray-300">
                    {item.label}
                  </td>
                  <td className="p-2">
                    <input
                      name={item.name}
                      value={formData[item.name as keyof FormData]}
                      onChange={handleChange}
                      className="w-full border-b-2 border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Employee Info Section */}
          <div className="border-2 border-black mb-6">
            <div className="bg-gray-200 p-3 border-b-2 border-black text-center font-bold">
              কর্মী তথ্য, চাকরিকাল ও নিষ্পত্তির ধরন
            </div>

            <table className="w-full">
              <tbody>
                {[
                  { label: "নাম", name: "employeeName" },
                  { label: "কার্ড নং", name: "cardNo" },
                  { label: "পদবিঃ", name: "designation" },
                  { label: "বিভাগ", name: "section" },
                ].map((item) => (
                  <tr className="border-b border-black" key={item.name}>
                    <td className="border-r border-black p-3 w-1/3 font-semibold bg-gray-50">
                      {item.label}
                    </td>
                    <td className="p-3 w-2/3">
                      <input
                        name={item.name}
                        value={formData[item.name as keyof FormData]}
                        onChange={handleChange}
                        className="w-full px-2 py-1 focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}

                {/* Date Fields */}
                {[
                  { label: "নিয়োগের তারিখ", name: "joiningDate" },
                  { label: "সর্বশেষ উপস্থিতির তারিখ", name: "lastAttendance" },
                ].map((item) => (
                  <tr className="border-b border-black" key={item.name}>
                    <td className="border-r border-black p-3 font-semibold bg-gray-50">
                      {item.label}
                    </td>
                    <td className="p-3">
                      <input
                        name={item.name}
                        type="date"
                        value={formData[item.name as keyof FormData]}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}

                {/* Termination Type */}
                <tr>
                  <td className="border-r border-black p-3 font-semibold bg-gray-50">
                    চাকরি নিষ্পত্তির ধরন
                  </td>
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

          {/* Service Duration Section */}
          <div className="border-2 border-black mb-6">
            <div className="bg-gray-200 p-3 border-b-2 border-black text-center font-bold">
              কর্মের মেয়াদকাল
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold mb-1 block">বছর</label>
                  <input
                    name="serviceYears"
                    value={formData.serviceYears}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">মাস</label>
                  <input
                    type="number"
                    defaultValue="0"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">দিন</label>
                  <input
                    type="number"
                    defaultValue="0"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    সর্বমোট ভাঙতি বছর
                  </label>
                  <input
                    readOnly
                    value={formData.serviceYears}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 border border-blue-200 rounded">
                <p className="text-sm font-semibold mb-3">
                  অবিচ্ছিন্নভাবে চাকুরির সময়কাল
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1 block">
                      সর্বমোট ভাঙতি দিন সমূহ
                    </label>
                    <input
                      name="totalDays"
                      value={formData.totalDays}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block">
                      অনুপস্থিতির দিন সমূহ
                    </label>
                    <input
                      name="absentDays"
                      value={formData.absentDays}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Wage Section */}
          <div className="border-2 border-black mb-6">
            <div className="bg-gray-200 p-3 border-b-2 border-black text-center font-bold">
              একদিনের মোট বেতন
            </div>

            <table className="w-full">
              <tbody>
                {renderWageRow("মূল বেতন", "basicWage")}
                {renderWageRow("বাড়ি ভাড়া", "houseRent")}
                {renderWageRow("খাদ্য ভাতা", "foodAllowance")}
                {renderWageRow("চিকিৎসা ভাতা", "medicalAllowance")}
                {renderWageRow("যাতায়াত ভাতা", "transportAllowance")}

                <tr className="bg-yellow-50">
                  <td className="border-r border-black p-3 font-bold">মোট বেতন</td>
                  <td className="border-r border-black p-3">
                    <input
                      name="totalDailyWage"
                      value={formData.totalDailyWage}
                      readOnly
                      className="w-full px-2 py-1 text-right font-bold bg-yellow-50 focus:outline-none"
                    />
                  </td>
                  <td className="p-3 text-sm font-bold">টাকা</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Calculation Table */}
          <div className="border-2 border-black mb-6">
            <div className="bg-gray-200 p-3 border-b-2 border-black text-center font-bold">
              হিসাবের বিবরণ ও প্রাপ্য টাকার পরিমাণ
            </div>

            <table className="w-full">
              <tbody>
                {renderCalculationRow("প্রাপ্য অর্জিত ছুটি", "earnedLeave", "bg-blue-50")}
                {renderCalculationRow("চাকরি অবসানজনিত ক্ষতিপূরণ", "serviceCompensation", "bg-blue-50")}
                {renderCalculationRow("মৃত্যুজনিত ক্ষতিপূরণ (মৃত্যুর ক্ষেত্রে)", "deathCompensation", "bg-blue-50")}
                {renderCalculationRow("নোটিশ পে (প্রযোজ্য ক্ষেত্রে)", "noticePay", "bg-blue-50")}
                {renderCalculationRow("অন্যান্য (প্রযোজ্য ক্ষেত্রে)", "others", "bg-blue-50")}
                
                <tr className="bg-green-100 border-b border-black">
                  <td className="border-r border-black p-3 font-bold text-lg">
                    মোট প্রাপ্য টাকার পরিমাণ (A)
                  </td>
                  <td className="border-r border-black p-3">
                    <div className="text-right font-bold text-lg px-2 py-1">
                      {calculateTotal()}
                    </div>
                  </td>
                  <td className="p-3 text-sm font-bold">টাকা</td>
                </tr>
                
                {/* Deductions */}
                {renderCalculationRow("কর্তন (অগ্রিম গ্রহণ বাবদ)", "advanceDeduction", "bg-red-50")}

                {/* Notice Deduction - Manual */}
                <tr className="border-b border-black bg-red-50">
                  <td className="border-r border-black p-3 font-semibold">
                    কর্তন (নোটিশ বাবদ)
                  </td>
                  <td className="border-r border-black p-3">
                    <input
                      type="number"
                      
                      className="w-full px-2 py-1 text-right focus:outline-none"
                    />
                  </td>
                  <td className="p-3 text-sm">টাকা</td>
                </tr>

                {/* Other Deduction */}
                <tr className="border-b-2 border-black bg-red-50">
                  <td className="border-r border-black p-3 font-semibold">
                    অন্যান্য (প্রযোজ্য ক্ষেত্রে)
                  </td>
                  <td className="border-r border-black p-3">
                    <input
                      type="number"
                      defaultValue="0"
                      className="w-full px-2 py-1 text-right focus:outline-none"
                    />
                  </td>
                  <td className="p-3 text-sm">টাকা</td>
                </tr>

                {/* Total Deduction */}
                <tr className="border-b border-black bg-yellow-100">
                  <td className="border-r border-black p-3 font-bold">
                    মোট কর্তনকৃত টাকার পরিমাণ (B)
                  </td>
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

                {/* Final Amount */}
                <tr className="bg-green-100">
                  <td className="border-r border-black p-3 font-bold text-lg">
                    সর্বমোট প্রাপ্য টাকার পরিমাণ (A-B)   
                  </td>
                  <td className="border-r border-black p-3">
                    <div className="text-right font-bold text-lg px-2 py-1">
                      {calculateTotal()}
                    </div>
                  </td>
                  <td className="p-3 text-sm font-bold">টাকা</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Declaration */}
          <div className="border-2 border-black bg-yellow-50 p-4 mb-6">
            <p className="text-sm leading-relaxed">
              উপরোক্ত হিসাবের বিবরণ দেখে ও বুঝে আমি সজ্ঞানে ঠাণ্ডা মস্তিষ্কে উপরোল্লেখিত টাকা গ্রহণ করিলাম।
              এক্ষেত্রে কোম্পানির নিকট আমার বা আমার মনোনীত নমিনীর আর কোন দাবি/পাওনা রইল না।
            </p>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {[
              { title: "প্রস্তুতকারিঃ", subtitle: "শ্রমিক/কর্মীর স্বাক্ষর" },
              { title: "নিলুফা আক্তার" },
              { title: "ব্যবস্থাপক", subtitle: "এইচ আর, এডমিন এন্ড কমপ্লায়েন্স" },
              { title: "মহা-ব্যবস্থাপক" },
            ].map((item, index) => (
              <div className="text-center" key={index}>
                <div className="border-t-2 border-black pt-2 mt-20">
                  <p className="text-sm font-semibold">{item.title}</p>
                  {item.subtitle && <p className="text-xs">{item.subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        

          {/* Submit Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t-2 border-gray-300">

            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              ফর্ম জমা দিন
            </button>
            <button 
                onClick={() => window.print()}
                className="no-print bg-blue-600 text-white px-4 py-2 rounded"
                >
                Print
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
