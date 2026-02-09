/** @format */

// Sidebar.jsx
import { SquarePen, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PatientImage } from './PatientImage';
import { Link, useLocation } from "react-router-dom";

export function SideBarMobile() {
  const items = [
    { icon: <PatientImage Size="w-6 h-6"/> },
    { icon: <SquarePen className="w-6 h-6" />, to: "/PatientProfile" },
    {
      icon: <Heart className="w-6 h-6" />,
      to: "/PatientProfile/savedServices",
    },
    { icon: <Star className="w-6 h-6" />, to: "/PatientProfile/myReviews" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside className="w-16   lg:hidden flex flex-col gap-3 items-center z-10 fixed right-0 ">
      {items.map((item, index) => {
        const isActive = item.to && location.pathname === item.to;
        
        return (
          <button
            onClick={() => {
              if (item.to) {
                navigate(item.to);
              }
            }}
            key={index}
            className={`p-3 rounded-full hover:text-Blue-900 hover:bg-Blue transition ${
              isActive ? "bg-Blue-900 text-white" : ""
            }`}
          >
            {item.icon}
          </button>
      );})}

    </aside>
  );
}
