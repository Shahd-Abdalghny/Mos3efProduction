/** @format */

import React from "react";
import { assets } from "../../assets/assets";
import { FaGithub } from "react-icons/fa";

const devTeam = [
  {
    name: "شهد عبد الغني",
    role: "Full Stack Developer",
    github: "https://github.com/Shahd-Abdalghny",
    img: assets.person,
  },
  {
    name: "مي عاطف ",
    role: "Back-End Developer",
    github: "https://github.com",
    img: assets.person,
  },
  {
    name: "كريم زياده ",
    role: "Back-End Developer",
    github: "https://github.com",
    img: assets.person,
  },
  {
    name: "مصطفي زهران ",
    role: "Back-End Developer",
    github: "https://github.com",
    img: assets.person,
  },
  {
    name: "مصطفي نورالدين",
    role: "UI/UX Designer",
    github: "https://github.com",
    img: assets.person,
  },
  {
    name: " ملك صلاح",
    role: "AI Developer",
    github: "https://github.com",
    img: assets.person,
  },
];

export const AboutUs = () => {
  return (
    <div className="pt-25 w-full">
    <div className="min-h-screen   px-4 md:px-16 lg:px-32">
      <div className="text-center mb-12 [direction='rtl']">
        <h1 className="text-4xl md:text-5xl font-bold text-Blue-900 mb-4">
          من نحن
        </h1>
        <p className="text-lg md:text-xl text-Blue-900/80 ">
          هذا المشروع تم تطويره بواسطة فريق مسعف التقني، لنقدم لكم أفضل تجربة
          استخدام
        </p>
      </div>

      {/* --------- فريق المطورين --------- */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-Blue-900 text-center mb-8">
          فريق التطوير
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {devTeam.map((member, index) => (
            <div
              key={index}
              className="bg-Blue-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl text-Blue-900">
                {member.name}
              </h3>
              <p className="text-Blue-900/70 mb-2">{member.role}</p>
              <a
                href={member.github}
                target="_blank"
                className="text-Blue-900 hover:text-Blue transition-colors"
              >
                <FaGithub size={24} />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-Blue-200 rounded-2xl p-6 md:p-12 text-center [direction='rtl']">
        <h2 className="text-2xl font-semibold text-Blue-900 mb-4">رسالتنا</h2>
        <p className="text-Blue-900/80 text-lg">
          هدفنا هو تطوير مشروع مسعف بأعلى جودة، مع تجربة مستخدم سلسة وواجهة
          جذابة
        </p>
      </div>
    </div>
    </div>
  );
};
