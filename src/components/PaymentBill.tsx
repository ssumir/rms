import React, { useState } from "react";
import { FormData } from "../types/FinalSettlementTypes";
import { toBanglaNumber, formatDate } from "../utils/bnEnDate";
import { translations } from "../context/LanguageContext";

interface PaymentBillProps {
  formData: FormData;
  totalReceivable: string;
  totalDeductions: string;
  netPayable: string;
}

type Language = 'bn' | 'en';

const PaymentBill: React.FC<PaymentBillProps> = ({ 
  formData, 
  totalReceivable, 
  totalDeductions, 
  netPayable 
}) => {
  const [lang, setLang] = useState<Language>('bn');

  const displayNumber = (num: string | number): string | number => 
    lang === 'bn' ? toBanglaNumber(num) : num;

  const displayDate = (date: string): string => 
    lang === 'bn' ? toBanglaNumber(formatDate(date)) : formatDate(date);

  const t = (key: keyof typeof translations.bn): string => translations[lang][key];

  const handlePrint = (): void => {
    window.print();
  };

  const earningsRows = [
    { 
      label: `${t('earnedLeave')} (${displayNumber(formData.elQty || 0)} ${t('days')})`, 
      value: formData.earnedLeave 
    },
    { label: t('serviceCompensation'), value: formData.serviceCompensation },
    { label: t('deathCompensation'), value: formData.deathCompensation },
    { label: t('noticePay'), value: formData.noticePay },
    { label: t('others'), value: formData.others },
  ];

  const deductionRows = [
    { label: t('advanceDeduction'), value: formData.advanceDeduction },
    { label: t('noticeDeduction'), value: formData.noticeDeduction },
    { label: t('otherDeduction'), value: formData.otherDeduction },
  ];

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          
          body * {
            visibility: hidden;
          }
          
          #payment-bill-container,
          #payment-bill-container * {
            visibility: visible;
          }
          
          #payment-bill-container {
            position: fixed !important;
            left: 0;
            top: 0;
            width: 210mm;
            max-height: 297mm;
            height: 297mm;
            margin: 0;
            padding: 10mm 15mm;
            background: white;
            box-sizing: border-box;
            font-size: 10pt;
            overflow: hidden;
            page-break-after: avoid;
            page-break-before: avoid;
            page-break-inside: avoid;
          }
          
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Language Toggle & Print Controls */}
      <div className="no-print mt-2 mb-2 flex justify-between items-center bg-purple-50 p-2 rounded-lg border-2 border-purple-300">
        <div className="flex gap-2">
          <button
            onClick={() => setLang('bn')}
            className={`px-4 py-2 rounded font-semibold transition-all ${
              lang === 'bn' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
            }`}
            aria-label="Switch to Bangla"
          >
            বাংলা (BN)
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded font-semibold transition-all ${
              lang === 'en' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
            }`}
            aria-label="Switch to English"
          >
            English (EN)
          </button>
        </div>
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all"
          aria-label="Print payment bill"
        >
          🖨️ {t('printBill')}
        </button>
      </div>

      {/* Payment Bill Content */}
      <div id="payment-bill-container" className="p-6 bg-white border-2 border-black">
        {/* Header */}
        <header className="text-center border-b-2 border-black pb-2 mb-4">
          <h2 className="text-xl font-bold">
            {formData.companyName || t('companyName')}
          </h2>
          <p className="text-sm">{formData.companyAddress || t('address')}</p>
          <h1 className="text-lg font-bold mt-1 uppercase border-2 border-black inline-block px-3 py-1">
            {t('paymentBill')}
          </h1>
        </header>

        {/* Employee Information */}
        <section className="flex justify-between mb-4 text-sm">
          <div>
            <p><strong>{t('employeeName')}:</strong> {formData.employeeName}</p>
            <p><strong>ID / Card No:</strong> {formData.cardNo}</p>
            <p><strong>{t('designation')}:</strong> {formData.designation}</p>
            <p><strong>{t('section')}:</strong> {formData.section}</p>
            <p><strong>{t('terminationType')}:</strong> {formData.terminationType}</p>
          </div>
          <div className="text-right">
            <p><strong>{t('date')}:</strong> {displayDate(formData.settlementDate)}</p>
            <p><strong>{t('joiningDate')}:</strong> {displayDate(formData.joiningDate)}</p>
            <p><strong>{t('lastAttendance')}:</strong> {displayDate(formData.lastAttendance)}</p>
            <p>
              <strong>{t('serviceDuration')}:</strong>{' '}
              {displayNumber(formData.serviceYears || 0)} {t('years')}{' '}
              {displayNumber(formData.serviceMonths || 0)} {t('months')}{' '}
              {displayNumber(formData.serviceDays || 0)} {t('days')}
            </p>
            <p>
              <strong>{t('benefitYears')}:</strong>{" "}
              {displayNumber(
                Number(formData.benefitYears) >= 3 ? formData.benefitYears : 0
              )}
            </p>
          </div>
        </section>

         {/* Employee Information */}
        <section className="flex justify-between mb-4 text-sm">
          <div>
            <p><strong>{t('employeeName')}:</strong> {formData.totalMonthlyWage}</p>
            <p><strong>ID / Card No:</strong> {formData.cardNo}</p>
            <p><strong>{t('designation')}:</strong> {formData.designation}</p>
            <p><strong>{t('section')}:</strong> {formData.section}</p>
          </div>
          <div className="text-right">
            <p><strong>{t('date')}:</strong> {displayDate(formData.settlementDate)}</p>
            <p><strong>{t('joiningDate')}:</strong> {displayDate(formData.joiningDate)}</p>
            <p><strong>{t('lastAttendance')}:</strong> {displayDate(formData.lastAttendance)}</p>
            <p>
              <strong>{t('benefitYears')}:</strong>{" "}
              {displayNumber(
                Number(formData.benefitYears) >= 3 ? formData.benefitYears : 0
              )}
            </p>
          </div>
        </section>

        {/* Payment Details Table */}
        <table className="w-full border-collapse border border-black mb-4 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black p-1.5 text-left">{t('description')}</th>
              <th className="border border-black p-1.5 text-right">{t('amount')}</th>
            </tr>
          </thead>
          <tbody>
            {/* Earnings Section */}
            <tr>
              <td className="border border-black p-1.5 font-bold bg-gray-100" colSpan={2}>
                {t('earnings')}
              </td>
            </tr>
            {earningsRows.map((item, index) => (
              parseFloat(item.value) > 0 && (
                <tr key={`earning-${index}`}>
                  <td className="border border-black p-1.5">{item.label}</td>
                  <td className="border border-black p-1.5 text-right">
                    {displayNumber(item.value)}
                  </td>
                </tr>
              )
            ))}
            <tr className="font-bold">
              <td className="border border-black p-1.5 text-right">
                {t('totalEarnings')}
              </td>
              <td className="border border-black p-1.5 text-right">
                {displayNumber(totalReceivable)}
              </td>
            </tr>

            {/* Deductions Section */}
            <tr>
              <td className="border border-black p-1.5 font-bold bg-gray-100" colSpan={2}>
                {t('deductions')}
              </td>
            </tr>
            {deductionRows.map((item, index) => (
              parseFloat(item.value) > 0 && (
                <tr key={`deduction-${index}`}>
                  <td className="border border-black p-1.5">{item.label}</td>
                  <td className="border border-black p-1.5 text-right">
                    {displayNumber(item.value)}
                  </td>
                </tr>
              )
            ))}
            <tr className="font-bold">
              <td className="border border-black p-1.5 text-right">
                {t('totalDeductions')}
              </td>
              <td className="border border-black p-1.5 text-right">
                {displayNumber(totalDeductions)}
              </td>
            </tr>

            {/* Net Payable */}
            <tr className="bg-gray-200 font-bold text-base">
              <td className="border border-black p-1.5 text-right">
                {t('netPayable')}
              </td>
              <td className="border border-black p-1.5 text-right">
                {displayNumber(netPayable)}
              </td>
            </tr>
          </tbody>
        </table>


        {/* Signature Section */}
        <section className="mt-10 grid grid-cols-3 gap-4 text-center text-sm">
          {[t('preparedBy'), t('checkedBy'), t('approvedBy')].map((title, idx) => (
            <div key={`signature-${idx}`} className="border-t border-black pt-1">
              <p>{title}</p>
            </div>
          ))}
        </section>
        
        {/* Receiver Acknowledgment */}
        <footer className="mt-4 border-t border-black pt-1.5 text-center text-sm">
          <p className="text-left">{t('receivedAmount')}</p>
          <div className="mt-10 w-60 mx-auto border-t border-black pt-1">
            <p><strong>{t('receiverSignature')}:</strong> ({formData.employeeName})</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PaymentBill;
