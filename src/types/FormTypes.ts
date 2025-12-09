import React from 'react';

export interface FormData {
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

export interface FormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CalculationProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calculateTotal: () => string;
}

export interface SignatureProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}