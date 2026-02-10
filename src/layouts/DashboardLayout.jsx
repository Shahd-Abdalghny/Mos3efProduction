/** @format */
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeftDash } from "lucide-react";
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full  bg-Blue-50 flex">
      {children}
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-4 left-4 bg-Blue text-white px-4 py-2 rounded-lg shadow-md hover:text-Blue-50 transition-colors"
      >
        <ArrowBigLeftDash className="inline sm:hidden" />
        <span className="hidden sm:inline"> العودة للصفحة الرئيسية</span>
      </button>
    </div>
  );
};

export default DashboardLayout;
