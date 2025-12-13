// src/components/PaymentBill.tsx
import React from "react";
import { FormData } from "../types/FinalSettlementTypes";
import { toBanglaNumber, formatDate } from "../utils/utils";
import { useLanguage } from "../context/LanguageContext";

interface PaymentBillProps {
  formData: FormData;
  totalReceivable: string;
  totalDeductions: string;
  netPayable: string;
}

export default function PaymentBill({ formData, totalReceivable, totalDeductions, netPayable }: PaymentBillProps) {
  const { lang } = useLanguage();

  const displayNumber = (num: string | number) =>
    lang === "bn" ? toBanglaNumber(num) : num;

  const displayDate = (date: string) =>
    lang === "bn" ? toBanglaNumber(formatDate(date)) : formatDate(date);

  return (
    <div className="mt-8 p-8 bg-white border-2 border-black print:break-before-page">
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h2 className="text-2xl font-bold">{formData.companyName || (lang==="bn" ? "কোম্পানির নাম" : "Company Name")}</h2>
        <p>{formData.companyAddress || (lang==="bn" ? "ঠিকানা" : "Address")}</p>
        <h1 className="text-xl font-bold mt-2 uppercase border-2 border-black inline-block px-4 py-1">{lang==="bn" ? "পেমেন্ট বিল" : "Payment Bill"}</h1>
      </div>

      <div className="flex justify-between mb-6">
        <div>
          <p><strong>{lang==="bn" ? "কর্মীর নাম" : "Employee Name"}:</strong> {formData.employeeName}</p>
          <p><strong>ID / Card No:</strong> {formData.cardNo}</p>
          <p><strong>{lang==="bn" ? "পদবী" : "Designation"}:</strong> {formData.designation}</p>
          <p><strong>{lang==="bn" ? "বিভাগ" : "Section"}:</strong> {formData.section}</p>
          <p><strong>{lang==="bn" ? "চাকরি নিষ্পত্তির ধরন" : "Termination Type"}:</strong> {formData.terminationType}</p>
        </div>
        <div className="text-right">
          <p><strong>{lang==="bn" ? "তারিখ" : "Issue Date"}:</strong> {displayDate(formData.settlementDate)}</p>
          <p><strong>{lang==="bn" ? "নিয়োগের তারিখ" : "Date of Joining"}:</strong> {displayDate(formData.joiningDate)}</p>
          <p><strong>{lang==="bn" ? "সর্বশেষ উপস্থিতি" : "Last Present Date"}:</strong> {displayDate(formData.lastAttendance)}</p>
          <p><strong>{lang==="bn" ? "চাকরির মেয়াদকাল" : "Duration of Service"}:</strong> {`${displayNumber(formData.serviceYears || 0)} ${lang==="bn" ? "বছর" : "Years"} ${displayNumber(formData.serviceMonths || 0)} ${lang==="bn" ? "মাস" : "Months"} ${displayNumber(formData.serviceDays || 0)} ${lang==="bn" ? "দিন" : "Days"}`}</p>
          <p><strong>{lang==="bn" ? "সর্বমোট সুবিধা প্রাপ্ত বছর" : "Total Benefit Years"}:</strong> {displayNumber(formData.benefitYears)}</p>
        </div>
      </div>

      <table className="w-full border-collapse border border-black mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-2 text-left">{lang==="bn" ? "বিবরণ" : "Description"}</th>
            <th className="border border-black p-2 text-right">{lang==="bn" ? "টাকা" : "Amount (BDT)"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100" colSpan={2}>{lang==="bn" ? "প্রাপ্য" : "Earnings"}</td>
          </tr>
          {[
            { label: `${lang==="bn" ? "অর্জিত ছুটি" : "Earned Leave"} (${displayNumber(formData.elQty || 0)} ${lang==="bn" ? "দিন" : "Days"})`, value: formData.earnedLeave },
            { label: lang==="bn" ? "চাকরি অবসানজনিত ক্ষতিপূরণ" : "Service Compensation", value: formData.serviceCompensation },
            { label: lang==="bn" ? "মৃত্যুজনিত ক্ষতিপূরণ" : "Death Compensation", value: formData.deathCompensation },
            { label: lang==="bn" ? "নোটিশ পে" : "Notice Pay", value: formData.noticePay },
            { label: lang==="bn" ? "অন্যান্য" : "Others", value: formData.others },
          ].map((item, index) => (
            parseFloat(item.value) > 0 && (
              <tr key={index}>
                <td className="border border-black p-2">{item.label}</td>
                <td className="border border-black p-2 text-right">{displayNumber(item.value)}</td>
              </tr>
            )
          ))}
          <tr className="font-bold">
            <td className="border border-black p-2 text-right">{lang==="bn" ? "মোট প্রাপ্য (A)" : "Total Earnings (A)"}</td>
            <td className="border border-black p-2 text-right">{displayNumber(totalReceivable)}</td>
          </tr>

          {/* Deductions */}
          <tr>
            <td className="border border-black p-2 font-bold bg-gray-100" colSpan={2}>{lang==="bn" ? "কর্তন" : "Deductions"}</td>
          </tr>
          {[
            { label: lang==="bn" ? "অগ্রিম গ্রহণ" : "Advance Deduction", value: formData.advanceDeduction },
            { label: lang==="bn" ? "নোটিশ কর্তন" : "Notice Deduction", value: formData.noticeDeduction },
            { label: lang==="bn" ? "অন্যান্য কর্তন" : "Other Deduction", value: formData.otherDeduction },
          ].map((item, index) => (
            parseFloat(item.value) > 0 && (
              <tr key={index}>
                <td className="border border-black p-2">{item.label}</td>
                <td className="border border-black p-2 text-right">{displayNumber(item.value)}</td>
              </tr>
            )
          ))}
          <tr className="font-bold">
            <td className="border border-black p-2 text-right">{lang==="bn" ? "মোট কর্তন (B)" : "Total Deductions (B)"}</td>
            <td className="border border-black p-2 text-right">{displayNumber(totalDeductions)}</td>
          </tr>

          <tr className="bg-gray-200 font-bold text-lg">
            <td className="border border-black p-2 text-right">{lang==="bn" ? "সর্বমোট প্রাপ্য (A-B)" : "Net Payable (A-B)"}</td>
            <td className="border border-black p-2 text-right">{displayNumber(netPayable)}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        {["Prepared By","Checked By","Approved By"].map((title, idx) => (
          <div key={idx} className="border-t border-black pt-2">
            <p>{lang==="bn" ? ["প্রস্তুতকারি","পরীক্ষা","অনুমোদন"][idx] : title}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 border-t border-black pt-2 text-center">
        <p>{lang==="bn" ? "সম্পূর্ণ টাকা নগদ/চেক প্রাপ্ত" : "Received the full amount in cash/cheque."}</p>
        <div className="mt-8 w-40 mx-auto border-t border-black pt-2">
          <p>{lang==="bn" ? "প্রাপক স্বাক্ষর" : "Receiver's Signature"}</p>
        </div>
      </div>
    </div>
  );
}
