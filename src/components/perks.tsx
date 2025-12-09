import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaHome, FaBaby, FaFileAlt, FaPlus, FaArrowLeft, FaCalculator } from "react-icons/fa";


// Type for benefit info in ServiceAgeCalculator
interface BenefitInfo {
  years: number;
  maternityLeave: string;
  leavePay: string;
  medicalAllowance: string;
  bonus: string;
  additionalBenefits: string[];
  gratuity: string;
  serviceAward: string;
}

// Type for FinalSettlementForm data
interface FormData {
  employeeName: string;
  cardNo: string;
  designation: string;
  joiningDate: string;
  lastAttendance: string;
  settlementDate: string;
  terminationType: string;
  serviceYears: string;
  totalDays: string;
  absentDays: string;
  basicWage: string;
  houseRent: string;
  foodAllowance: string;
  medicalAllowance: string;
  transportAllowance: string;
  totalDailyWage: string;
  earnedLeave: string;
  serviceCompensation: string;
  deathCompensation: string;
  noticePay: string;
  others: string;
  advanceDeduction: string;
  totalDeductions: string;
  companyName: string;
  companyAddress: string;
  section: string;
}

const PerksApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [benefitInfo, setBenefitInfo] = useState<BenefitInfo | null>(null);

  // Navigation Component
  const Navigation: React.FC = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <FaHome className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">Rewards Management System</h1>
          </div>
          {currentPage !== 'dashboard' && (
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  // Dashboard Component
  const Dashboard: React.FC = () => {
    const cards = [
      {
        id: 'maternity',
        title: 'Maternity Benefit',
        titleBn: 'মাতৃত্বকালীন সুবিধা',
        icon: FaBaby,
        color: 'from-pink-500 to-rose-500',
        description: 'Calculate maternity leave and benefits based on service duration',
        descriptionBn: 'সেবা সময়কালের ভিত্তিতে মাতৃত্বকালীন ছুটি এবং সুবিধা গণনা করুন',
      },
      {
        id: 'settlement',
        title: 'Final Settlement',
        titleBn: 'চূড়ান্ত নিষ্পত্তি',
        icon: FaFileAlt,
        color: 'from-blue-500 to-cyan-500',
        description: 'Process employee final settlement and dues calculation',
        descriptionBn: 'কর্মচারী চূড়ান্ত নিষ্পত্তি এবং বকেয়া গণনা প্রক্রিয়া',
      },
      {
        id: 'extra',
        title: 'Extra Services',
        titleBn: 'অতিরিক্ত সেবা',
        icon: FaPlus,
        color: 'from-purple-500 to-indigo-500',
        description: 'Additional employee benefits and services',
        descriptionBn: 'অতিরিক্ত কর্মচারী সুবিধা এবং সেবা',
      },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Welcome to Reward Dashboard</h2>
            <p className="text-lg text-gray-600">রিওয়ার্ডস ড্যাশবোর্ডে স্বাগতম - Select a service to continue</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setCurrentPage(card.id)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden">
                    <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                      <div className="flex justify-center mb-4">
                        <div className="bg-white bg-opacity-20 p-4 rounded-full">
                          <Icon className="w-12 h-12" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-center mb-1">{card.title}</h3>
                      <p className="text-center text-sm opacity-90">{card.titleBn}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-2">{card.description}</p>
                      <p className="text-gray-600 text-sm">{card.descriptionBn}</p>
                      <div className="mt-4 text-center">
                        <span className="text-blue-600 font-semibold group-hover:underline">Open Module →</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Service Age Calculator Component
  const ServiceAgeCalculator: React.FC = () => {
    const [serviceYears, setServiceYears] = useState<string>('');
    const [showBenefits, setShowBenefits] = useState<boolean>(false);

    const calculateBenefits = () => {
      const years = parseFloat(serviceYears);
      if (years >= 0) {
        const benefits: BenefitInfo = {
          years: years,
          maternityLeave: years < 1 ? '8 weeks (56 days)' : '16 weeks (112 days)',
          leavePay: years < 1 ? 'Average wage for 8 weeks' : 'Full pay for 16 weeks',
          medicalAllowance: years < 1 ? '৳ 5,000' : years < 3 ? '৳ 10,000' : '৳ 15,000',
          bonus: years < 1 ? 'Not Eligible' : years < 3 ? '50% of basic' : '100% of basic',
          additionalBenefits:
            years < 3
              ? ['Basic medical coverage', 'Standard transport allowance']
              : ['Premium medical coverage', 'Enhanced transport allowance', 'Child care support', 'Extended leave option'],
          gratuity: years < 5 ? 'Not Eligible' : `${Math.floor(years)} months of basic salary`,
          serviceAward: years >= 10 ? 'Long Service Award - ৳ 50,000' : years >= 5 ? 'Service Award - ৳ 25,000' : 'Not Eligible',
        };
        setBenefitInfo(benefits);
        setShowBenefits(true);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaCalculator className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Service Age Benefit Calculator
              </h2>
              <p className="text-gray-600">সেবা বয়স সুবিধা ক্যালকুলেটর</p>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Enter Service Duration (Years) / সেবা সময়কাল (বছর) লিখুন
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  step="0.5"
                  value={serviceYears}
                  onChange={(e) => setServiceYears(e.target.value)}
                  placeholder="e.g., 3.5"
                  className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={calculateBenefits}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  Calculate
                </button>
              </div>
            </div>

            {showBenefits && benefitInfo && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-2">
                    Service Duration: {benefitInfo.years} Years
                  </h3>
                  <p className="text-blue-100">সেবা সময়কাল: {benefitInfo.years} বছর</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-pink-50 border-2 border-pink-200 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-pink-800 mb-3 flex items-center">
                      <FaBaby className="w-5 h-5 mr-2" />
                      Maternity Leave / মাতৃত্বকালীন ছুটি
                    </h4>
                    <p className="text-2xl font-bold text-pink-600 mb-1">
                      {benefitInfo.maternityLeave}
                    </p>
                    <p className="text-sm text-gray-600">{benefitInfo.leavePay}</p>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-green-800 mb-3">
                      Medical Allowance / চিকিৎসা ভাতা
                    </h4>
                    <p className="text-2xl font-bold text-green-600">
                      {benefitInfo.medicalAllowance}
                    </p>
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-purple-800 mb-3">
                      Maternity Bonus / মাতৃত্ব বোনাস
                    </h4>
                    <p className="text-2xl font-bold text-purple-600">
                      {benefitInfo.bonus}
                    </p>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-yellow-800 mb-3">
                      Gratuity / গ্র্যাচুইটি
                    </h4>
                    <p className="text-xl font-bold text-yellow-600">
                      {benefitInfo.gratuity}
                    </p>
                  </div>
                </div>

                {benefitInfo.serviceAward !== 'Not Eligible' && (
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-6 rounded-xl">
                    <h4 className="text-xl font-bold mb-2">🏆 {benefitInfo.serviceAward}</h4>
                    <p className="text-amber-100">Long Service Recognition</p>
                  </div>
                )}

                <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-blue-800 mb-4">
                    Additional Benefits / অতিরিক্ত সুবিধা
                  </h4>
                  <ul className="space-y-2">
                    {benefitInfo.additionalBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-2">📋 Eligibility Criteria:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• <strong>Less than 1 year:</strong> Basic benefits only</li>
                    <li>• <strong>1-3 years:</strong> Standard maternity benefits + basic medical</li>
                    <li>• <strong>3+ years:</strong> Enhanced benefits + premium medical + child care</li>
                    <li>• <strong>5+ years:</strong> Gratuity eligible + service awards</li>
                    <li>• <strong>10+ years:</strong> Long service award + maximum benefits</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Final Settlement Form Component
  const FinalSettlementForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      employeeName: 'নিলুফা আক্তার',
      cardNo: '26131',
      designation: 'অপারেটর',
      joiningDate: '2017-05-13',
      lastAttendance: '2025-11-20',
      settlementDate: '2025-05-27',
      terminationType: 'ইস্তফা (২৭)',
      serviceYears: '8.5',
      totalDays: '187',
      absentDays: '0',
      basicWage: '9145',
      houseRent: '4573',
      foodAllowance: '1250',
      medicalAllowance: '750',
      transportAllowance: '450',
      totalDailyWage: '16168',
      earnedLeave: '16168',
      serviceCompensation: '38868',
      deathCompensation: '0',
      noticePay: '0',
      others: '0',
      advanceDeduction: '18291',
      totalDeductions: '18291',
      companyName: 'দি মোহাম্মদী লি. (স্যাম্পল)',
      companyAddress: '32, লক্ষীপুরা, চান্দনা, জয়দেবপুর, গাজীপুর-1700',
      section: 'সুইং',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
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
      console.log('Form Data:', formData);
      alert('ফর্ম সফলভাবে জমা হয়েছে!');
    };

    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl">
          <div className="border-b-4 border-black p-6 text-center bg-white">
            <h1 className="text-2xl font-bold mb-2">কর্মী/কর্মচারীর চূড়ান্ত পাওনা হিসাবের বিবরণ</h1>
            <p className="text-sm font-semibold">শ্রম আইন অনুযায়ী মালিকের অধীনে</p>
          </div>

          <div className="p-6">
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

            <div className="border-2 border-black mb-6">
              <div className="bg-gray-200 p-3 border-b-2 border-black text-center font-bold">
                কর্মের মেয়াদকাল
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">বছর</label>
                    <input 
                      name="serviceYears"
                      value={formData.serviceYears}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">মাস</label>
                    <input type="number" defaultValue="0" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">দিন</label>
                    <input type="number" defaultValue="0" className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">সর্বমোট ভাঙতি বছর</label>
                    <input 
                      value={formData.serviceYears}
                      readOnly
                      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <p className="text-sm font-semibold mb-3">অবিচ্ছিন্নভাবে চাকুরির সময়কাল</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">সর্বমোট ভাঙতি দিন সমূহ</label>
                      <input 
                        name="totalDays"
                        value={formData.totalDays}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">অনুপস্থিতির দিন সমূহ</label>
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

            <div className="border-2 border-black mb-6">
              <div className="bg-gray-200 p-3 border-b-2 border-black text-center font-bold">
                একদিনের মোট বেতন
              </div>
              <table className="w-full">
                <tbody>
                  {[
                    { label: 'মূল বেতন', name: 'basicWage' },
                    { label: 'বাড়ি ভাড়া', name: 'houseRent' },
                    { label: 'খাদ্য ভাতা', name: 'foodAllowance' },
                    { label: 'চিকিৎসা ভাতা', name: 'medicalAllowance' },
                    { label: 'যাতায়াত ভাতা', name: 'transportAllowance' }
                  ].map((item) => (
                    <tr key={item.name} className="border-b border-black">
                      <td className="border-r border-black p-3 w-1/2 font-semibold bg-gray-50">{item.label}</td>
                      <td className="border-r border-black p-3 w-1/3">
                        <input 
                          name={item.name}
                          value={formData[item.name as keyof FormData]}
                          onChange={handleChange}
                          className="w-full px-2 py-1 text-right focus:outline-none"
                        />
                      </td>
                      <td className="p-3 w-1/6 text-sm">টাকা</td>
                    </tr>
                  ))}
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
                      <input type="number" defaultValue="0" className="w-full px-2 py-1 text-right focus:outline-none" />
                    </td>
                    <td className="p-3 text-sm">টাকা</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="border-r border-black p-3 font-semibold bg-red-50">অন্যান্য (প্রযোজ্য ক্ষেত্রে)</td>
                    <td className="border-r border-black p-3">
                      <input type="number" defaultValue="0" className="w-full px-2 py-1 text-right focus:outline-none" />
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

            <div className="border-2 border-black bg-yellow-50 p-4 mb-6">
              <p className="text-sm leading-relaxed">
                উপরোক্ত হিসাবের বিবরণ দেখে ও বুঝে আমি সজ্ঞানে ঠাণ্ডা মস্তিষ্কে উপরোল্লেখিত টাকা গ্রহণ করিলাম। 
                এক্ষেত্রে কোম্পানির নিকট আমার বা আমার মনোনীত নমিনীর আর কোন দাবি/পাওনা রইল না।
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="border-t-2 border-black pt-2 mt-20">
                  <p className="text-sm font-semibold">প্রস্তুতকারিঃ</p>
                  <p className="text-xs">শ্রমিক/কর্মীর স্বাক্ষর</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-black pt-2 mt-20">
                  <p className="text-sm font-semibold">নিলুফা আক্তার</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-black pt-2 mt-20">
                  <p className="text-sm font-semibold">ব্যবস্থাপক</p>
                  <p className="text-xs">এইচ আর, এডমিন এন্ড কমপ্লায়েন্স</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-black pt-2 mt-20">
                  <p className="text-sm font-semibold">মহা-ব্যবস্থাপক</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t-2 border-gray-300">
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
              
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                ফর্ম জমা দিন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Extra Services Component
  const ExtraServices: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Extra Services & Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Leave Management', desc: 'Track and manage all types of leaves', color: 'blue' },
              { title: 'Provident Fund', desc: 'Calculate PF contributions and benefits', color: 'green' },
              { title: 'Insurance', desc: 'Employee insurance and coverage details', color: 'purple' },
              { title: 'Loan Management', desc: 'Staff loan tracking and repayment', color: 'orange' },
            ].map((service, idx) => (
              <div key={idx} className="bg-gray-50 border-2 border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'maternity':
        return <ServiceAgeCalculator />;
      case 'settlement':
        return <FinalSettlementForm />;
      case 'extra':
        return <ExtraServices />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderPage()}
    </div>
  );
};

export default PerksApp;