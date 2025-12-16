import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { MenuIcon, XIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { PatientImage } from './PatientImage';
import { useNavigate } from 'react-router-dom';
const navItems = [
    { label: "الرئيسية", href: "/", active: true },
    { label: "خدماتنا", href: "#services" },
    { label: "من نحن", href: "/about-us" },
];

export const NavBar = () => {
    const [showMobileMenue, setShowMobileMenue] = useState(false);
    const {user,logout ,role} = useAuth(); 
    const navigate = useNavigate();
 const handelNavigate = () => {
  if(role==0)
    navigate("/PatientProfile")
  else 
    navigate("/Hospital-DashBoard");
 }
    return (
      <>
        <div className="fixed top-0 left-0 w-full z-50 shadow-[inset_0px_0px_22px_#f2f2f280] backdrop-blur-[10px]">
          <div className="flex mx-auto justify-between items-center px-4 md:px-8 lg:px-[156px] py-3">
            {/* ----------Logo---------- */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 md:w-[46px] md:h-11"
                alt="Logo"
                src={assets.logo}
              />
              <div className="font-Lateef text-Blue-900 text-lg md:text-3xl font-bold">
                مسعف
              </div>
            </div>

            {/* ----------Desktop Nav---------- */}
            <ul className="hidden md:flex items-center justify-center gap-6 px-12 py-3 bg-Blue-900 rounded-[84px]  [direction:rtl]">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`inline-flex items-center justify-center gap-1 px-6 py-2 h-auto rounded-3xl overflow-hidden ${
                    item.active ? "bg-Blue" : "bg-Blue-900"
                  } shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue transition-colors`}
                >
                  <Link
                    to={item.href}
                    className="cursor-pointer font-Cairo text-Blue-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ----------Desktop Buttons---------- */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <button className="inline-flex items-center justify-center gap-1 p-2 h-auto rounded-3xl border border-solid border-Blue-900 bg-transparent hover:bg-Blue-900/10 transition-colors">
                  <Link
                    className="font-Cairo text-Blue-900 text-xl"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    خروج
                  </Link>
                </button>
              ) : (
                <button className="inline-flex items-center justify-center gap-1 p-2 h-auto rounded-3xl border border-solid border-Blue-900 bg-transparent hover:bg-Blue-900/10 transition-colors">
                  <Link
                    to="/LogIn"
                    className="font-Cairo text-Blue-900 text-xl"
                  >
                    دخول
                  </Link>
                </button>
              )}

              <div className="text-[#5a9648] text-xl">|</div>
              {user ? (
                <button
                  onClick={handelNavigate}
                  className="inline-flex  w-10 h-10   rounded-full bg-Blue  hover:bg-Blue-900/10 transition-colors"
                >
                  <PatientImage Size="w-full h-full" />
                </button>
              ) : (
                <button className="inline-flex items-center justify-center gap-1 p-2 h-auto rounded-3xl border border-solid border-Blue-900 bg-transparent hover:bg-Blue-900/10 transition-colors">
                  <Link
                    className="font-Cairo text-Blue-900 text-xl"
                    to="/SignUp"
                  >
                    تسجيل
                  </Link>
                </button>
              )}
            </div>

            {/* ----------Menu Icon---------- */}
            <MenuIcon
              className="md:hidden w-7 cursor-pointer"
              onClick={() => setShowMobileMenue(true)}
            />
          </div>

          {/* ----------Mobile Menu (Slide from right)--------- */}
          <div
            className={` fixed top-0 right-0 h-screen w-[70%] sm:w-[50%] bg-Blue-900 z-9999 transform transition-transform duration-500 ease-in-out 
                    ${showMobileMenue ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex justify-end p-6 cursor-pointer">
              <XIcon
                className="w-6 text-Blue-50"
                onClick={() => setShowMobileMenue(false)}
              />
            </div>
            <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="px-4 py-2 rounded-full inline-block text-Blue-50 font-Cairo  [direction:rtl]"
                    onClick={() => setShowMobileMenue(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 justify-center mt-8">
              {user ? (
                <button className="inline-flex items-center justify-center gap-1 p-2 h-auto rounded-3xl border border-solid border-Blue bg-transparent hover:bg-Blue-900/10 transition-colors">
                  <Link
                    className="font-Cairo text-Blue-50 text-xl"
                    onClick={() => {
                      logout();
                      navigate("/");
                      setShowMobileMenue(false);
                    }}
                  >
                    خروج
                  </Link>
                </button>
              ) : (
                <button
                  onClick={() => setShowMobileMenue(false)}
                  className="inline-flex items-center justify-center gap-1 p-2 h-auto rounded-3xl border border-solid border-Blue bg-transparent hover:bg-Blue-900/10 transition-colors"
                >
                  <Link to="/LogIn" className="font-Cairo text-Blue-50 text-xl">
                    دخول
                  </Link>
                </button>
              )}

              <div className="text-Green text-xl">|</div>
              {user ? (
                <button
                  onClick={handelNavigate}
                  className="inline-flex  w-10 h-10   rounded-full bg-Blue  hover:bg-Blue-900/10 transition-colors"
                >
                  <PatientImage Size="w-10 h-10" />
                </button>
              ) : (
                <button
                  onClick={() => setShowMobileMenue(false)}
                  className="inline-flex items-center justify-center gap-1 p-2 h-auto rounded-3xl border border-solid border-Blue bg-transparent hover:bg-Blue-900/10 transition-colors"
                >
                  <Link
                    className="font-Cairo text-Blue-50 text-xl"
                    to="/SignUp"
                  >
                    تسجيل
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
}
