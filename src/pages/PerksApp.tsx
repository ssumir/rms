import { useState } from "react";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import ServiceAgeCalculator from "../components/ServiceAgeCalculator";
import FinalSettlementForm from "../components/FinalSettlementForm";

export default function PerksApp() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "dashboard" && (
        <Dashboard setCurrentPage={setCurrentPage} />
      )}

      {currentPage === "maternity" && <ServiceAgeCalculator />}

      {currentPage === "settlement" && <FinalSettlementForm />}
    </div>
  );
}
