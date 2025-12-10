import { useState, FormEvent, useEffect} from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FormData } from "../types/FinalSettlementTypes";

export default function FinalSettlementForm() {
  const [formData, setFormData] = useState<FormData>({
    employeeName: "সাইফুল ইসলাম",
    cardNo: "",
    designation: "",
    joiningDate: "",
    lastAttendance: "",
    settlementDate: new Date().toISOString().split('T')[0],
    terminationType: "ইস্তফা (২৭)",
    serviceYears: "0",
    benefitYears: "0",
    serviceMonths: "0",
    serviceDays: "0",
    totalDays: "0",
    absentDays: "0",
    basicWage: "0",
    houseRent: "0",
    foodAllowance: "1250",
    medicalAllowance: "750",
    transportAllowance: "450",
    totalDailyWage: "0",
    earnedLeave: "0",
    serviceCompensation: "0",
    deathCompensation: "0",
    noticePay: "0",
    others: "0",
    advanceDeduction: "0",
    noticeDeduction: "0",
    otherDeduction: "0",
    totalDeductions: "0",
    companyName: "",
    companyAddress: "",
    section: "",
  });

  // Calculate service duration when dates change
  useEffect(() => {
    if (formData.joiningDate && formData.lastAttendance) {
      const joining = new Date(formData.joiningDate);
      const last = new Date(formData.lastAttendance);
      
      if (last >= joining) {
        let years = last.getFullYear() - joining.getFullYear();
        let months = last.getMonth() - joining.getMonth();
        let days = last.getDate() - joining.getDate();

        if (days < 0) {
          months--;
          const prevMonth = new Date(last.getFullYear(), last.getMonth(), 0);
          days += prevMonth.getDate();
        }

        if (months < 0) {
          years--;
          months += 12;
        }

        setFormData(prev => ({
          ...prev,
          serviceYears: years.toString(),
          serviceMonths: months.toString(),
          serviceDays: days.toString()
        }));
      }
    }
  }, [formData.joiningDate, formData.lastAttendance]);

  // Calculate totalDays whenever serviceMonths, serviceDays, or absentDays change
  useEffect(() => {
    const months = parseInt(formData.serviceMonths) || 0;
    const days = parseInt(formData.serviceDays) || 0;
    const absent = parseInt(formData.absentDays) || 0;
    
    const total = ((months * 30) + days) - absent;
    
    setFormData(prev => ({
      ...prev,
      totalDays: Math.max(0, total).toString()
    }));
  }, [formData.serviceMonths, formData.serviceDays, formData.absentDays]);

  // Calculate benefitYears whenever serviceYears or totalDays change
  useEffect(() => {
    const years = parseInt(formData.serviceYears) || 0;
    const total = parseInt(formData.totalDays) || 0;
    
    let benefit = years;
    if (total >= 240) {
      benefit += 1;
    } else if (total >= 120) {
      benefit += 0.5;
    }
    
    setFormData(prev => ({
      ...prev,
      benefitYears: benefit.toString()
    }));
  }, [formData.serviceYears, formData.totalDays]);

  // Calculate wages when totalDailyWage changes
  useEffect(() => {
    const totalWage = parseFloat(formData.totalDailyWage) || 0;
    const food = parseFloat(formData.foodAllowance) || 0;
    const medical = parseFloat(formData.medicalAllowance) || 0;
    const transport = parseFloat(formData.transportAllowance) || 0;

    if (totalWage > 0) {
      const basic = (totalWage - (food + medical + transport)) / 1.5;
      const house = basic / 2;

      setFormData(prev => ({
        ...prev,
        basicWage: basic.toFixed(2),
        houseRent: house.toFixed(2)
      }));
    }
  }, [formData.totalDailyWage, formData.foodAllowance, formData.medicalAllowance, formData.transportAllowance]);


  // Calculate service compensation based on termination type and benefit years
useEffect(() => {
  if (formData.terminationType === "ইস্তফা (২৭)") {
    const benefit = parseFloat(formData.benefitYears) || 0;
    const totalWage = parseFloat(formData.totalDailyWage) || 0;
    const dailyWage = totalWage / 30;
    let compensation = 0;

    if (benefit === 3) {
      compensation = benefit * 7 * dailyWage;
    } else if (benefit > 3 && benefit < 10) {
      compensation = benefit * 15 * dailyWage;
    } else if (benefit >= 10) {
      compensation = benefit * 30 * dailyWage;
    }

    setFormData(prev => ({
      ...prev,
      serviceCompensation: compensation.toFixed(2)
    }));
  }
}, [formData.terminationType, formData.benefitYears, formData.totalDailyWage]);

  // Calculate total deductions
  useEffect(() => {
    const advance = parseFloat(formData.advanceDeduction) || 0;
    const notice = parseFloat(formData.noticeDeduction) || 0;
    const other = parseFloat(formData.otherDeduction) || 0;
    
    const total = advance + notice + other;
    
    setFormData(prev => ({
      ...prev,
      totalDeductions: total.toFixed(2)
    }));
  }, [formData.advanceDeduction, formData.noticeDeduction, formData.otherDeduction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotalReceivable = (): string => {
    const earned = parseFloat(formData.earnedLeave) || 0;
    const service = parseFloat(formData.serviceCompensation) || 0;
    const death = parseFloat(formData.deathCompensation) || 0;
    const notice = parseFloat(formData.noticePay) || 0;
    const others = parseFloat(formData.others) || 0;
    
    return (earned + service + death + notice + others).toFixed(2);
  };

  const calculateFinalTotal = (): string => {
    const receivable = parseFloat(calculateTotalReceivable());
    const deductions = parseFloat(formData.totalDeductions) || 0;
    return (receivable - deductions).toFixed(2);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("ফর্ম সফলভাবে জমা হয়েছে!");
  };

  const renderWageRow = (label: string, name: keyof FormData, readOnly: boolean = false) => (
    <tr className="border-b border-black" key={name}>
      <td className="w-1/2 p-3 font-semibold bg-gray-50 border-r border-black">
        {label}
      </td>
      <td className="w-1/3 p-3 border-r border-black">
        <input
          name={name}
          value={formData[name]}
          onChange={handleChange}
          readOnly={readOnly}
          className={`w-full px-2 py-1 text-right focus:outline-none ${readOnly ? 'bg-gray-100' : ''}`}
        />
      </td>
      <td className="w-1/6 p-3 text-sm">টাকা</td>
    </tr>
  );

  const renderCalculationRow = (label: string, name: keyof FormData, color: string = "") => (
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
          <div className="border-b-4 border-black p-6 bg-white">
            <h1 className="text-2xl font-bold mb-2 text-center">
              কর্মীর চূড়ান্ত পাওনা হিসাবের বিবরণ
            </h1>
            <p className="text-sm font-semibold text-center mb-4">
              শ্রম আইন এর সর্বশেষ সংশোধনী ২০২৫ অনুযায়ী
            </p>

            <div className="flex items-center justify-center gap-2">
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
                কর্মীর অফিসিয়াল  তথ্য, চাকরিকাল ও নিষ্পত্তির ধরন
              </div>

              <table className="w-full">
                <tbody>
                  {[
                    { label: "নাম", name: "employeeName" },
                    { label: "কার্ড নং", name: "cardNo" },
                    { label: "পদবি", name: "designation" },
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
                      readOnly
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">মাস</label>
                    <input
                      name="serviceMonths"
                      value={formData.serviceMonths}
                      readOnly
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">দিন</label>
                    <input
                      name="serviceDays"
                      value={formData.serviceDays}
                      readOnly
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      সর্বমোট সুবিধা প্রাপ্ত বছর
                    </label>
                    <input
                      readOnly
                      name="benefitYears"
                      value={formData.benefitYears}
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-blue-100 font-semibold"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 border border-blue-200 rounded">
                  <p className="text-sm font-semibold mb-3">
                    অসম্পূর্ণ বছরের ক্ষেত্রে ছয় মাস ও এক বছর গণনা 
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium mb-1 block">
                        অসম্পূর্ণ বছরের সর্বমোট দিন সমূহ
                      </label>
                      <input
                        name="totalDays"
                        value={formData.totalDays}
                        readOnly
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium mb-1 block">
                        অসম্পূর্ণ বছরে অনুপস্থিতির দিন সমূহ
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
                সর্বশেষ ধার্যকৃত মাসিক মোট মজুরি বা বেতনের বিবরণ
              </div>

              <table className="w-full">
                <tbody>
                  <tr className="border-b border-black bg-yellow-50">
                    <td className="w-1/2 p-3 font-bold border-r border-black">
                      মোট মজুরি বা বেতন
                    </td>
                    <td className="w-1/3 p-3 border-r border-black">
                      <input
                        name="totalDailyWage"
                        value={formData.totalDailyWage}
                        onChange={handleChange}
                        className="w-full px-2 py-1 text-right font-bold bg-yellow-50 focus:outline-none"
                      />
                    </td>
                    <td className="w-1/6 p-3 text-sm font-bold">টাকা</td>
                  </tr>
                  {renderWageRow("মূল মজুরি বা বেতন", "basicWage", true)}
                  {renderWageRow("বাড়ি ভাড়া", "houseRent", true)}
                  {renderWageRow("খাদ্য ভাতা", "foodAllowance")}
                  {renderWageRow("চিকিৎসা ভাতা", "medicalAllowance")}
                  {renderWageRow("যাতায়াত ভাতা", "transportAllowance")}
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
                  
                  <tr className="bg-green-100 border-b-2 border-black">
                    <td className="border-r border-black p-3 font-bold text-lg">
                      মোট প্রাপ্য টাকার পরিমাণ (A)
                    </td>
                    <td className="border-r border-black p-3">
                      <div className="text-right font-bold text-lg px-2 py-1">
                        {calculateTotalReceivable()}
                      </div>
                    </td>
                    <td className="p-3 text-sm font-bold">টাকা</td>
                  </tr>
                  
                  {/* Deductions */}
                  {renderCalculationRow("কর্তন (অগ্রিম গ্রহণ বাবদ)", "advanceDeduction", "bg-red-50")}
                  {renderCalculationRow("কর্তন (নোটিশ বাবদ)", "noticeDeduction", "bg-red-50")}
                  {renderCalculationRow("অন্যান্য (প্রযোজ্য ক্ষেত্রে)", "otherDeduction", "bg-red-50")}

                  {/* Total Deduction */}
                  <tr className="border-b-2 border-black bg-yellow-100">
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
                  <tr className="bg-green-200">
                    <td className="border-r border-black p-3 font-bold text-lg">
                      সর্বমোট প্রাপ্য টাকার পরিমাণ (A-B)
                    </td>
                    <td className="border-r border-black p-3">
                      <div className="text-right font-bold text-lg px-2 py-1">
                        {calculateFinalTotal()}
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
                { title: formData.employeeName || "কর্মচারীর নাম" },
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
                className="no-print bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all"
              >
                প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}