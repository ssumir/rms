import { FaHome, FaCalculator } from "react-icons/fa";

interface Props {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: Props) {
  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex gap-4">
      <button
        className={`px-4 py-2 rounded ${
          currentPage === "dashboard" ? "bg-blue-600" : "bg-gray-700"
        }`}
        onClick={() => setCurrentPage("dashboard")}
      >
        <FaHome className="inline mr-2" />
        Dashboard
      </button>

      <button
        className={`px-4 py-2 rounded ${
          currentPage === "maternity" ? "bg-blue-600" : "bg-gray-700"
        }`}
        onClick={() => setCurrentPage("maternity")}
      >
        <FaCalculator className="inline mr-2" />
        Service Age Calc
      </button>

      <button
        className={`px-4 py-2 rounded ${
          currentPage === "settlement" ? "bg-blue-600" : "bg-gray-700"
        }`}
        onClick={() => setCurrentPage("settlement")}
      >
        Final Settlement
      </button>
    </nav>
  );
}
