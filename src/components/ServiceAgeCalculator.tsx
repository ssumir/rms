import { useState } from "react";
import { BenefitInfo } from "../types/BenefitInfo";

export default function ServiceAgeCalculator() {
  const [years, setYears] = useState<number>(0);

  const data: BenefitInfo = {
    years,
    maternityLeave: years >= 2 ? "16 Weeks" : "Not Eligible",
    leavePay: years * 10 + " Days",
    medicalAllowance: "6000 BDT",
    bonus: years >= 1 ? "2 Bonuses" : "1 Bonus",
    additionalBenefits: ["Attendance Bonus", "Festival Allowance"],
    gratuity: years >= 5 ? "Eligible" : "Not Eligible",
    serviceAward: years >= 10 ? "Eligible" : "Not Eligible",
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-xl mb-3">Service Age Calculator</h2>

      <input
        type="number"
        className="border p-2 rounded"
        placeholder="Enter service years"
        onChange={(e) => setYears(Number(e.target.value))}
      />

      <div className="mt-4 bg-gray-100 p-4 rounded shadow">
        <p>Maternity Leave: <b>{data.maternityLeave}</b></p>
        <p>Leave Pay: <b>{data.leavePay}</b></p>
        <p>Medical Allowance: <b>{data.medicalAllowance}</b></p>
        <p>Bonus: <b>{data.bonus}</b></p>
        <p>Gratuity: <b>{data.gratuity}</b></p>
        <p>Service Award: <b>{data.serviceAward}</b></p>
      </div>
    </div>
  );
}
