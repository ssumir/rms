// Type for benefit info in ServiceAgeCalculator
export interface BenefitInfo {
  years: number;
  maternityLeave: string;
  leavePay: string;
  medicalAllowance: string;
  bonus: string;
  additionalBenefits: string[];
  gratuity: string;
  serviceAward: string;
}
