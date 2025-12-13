// src/utils/utils.ts

// Convert English numbers to Bangla
export const toBanglaNumber = (num: string | number) => {
  const bnNums = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  return num.toString().replace(/\d/g, (d) => bnNums[parseInt(d)]);
};

// Format date to DD/MM/YYYY
export const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};
