/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { SignUp } from "./Pages/Auth/SighnUp";
import { LogIn } from "./Pages/Auth/LogIn";
import { PatientProfile } from "./Pages/Patient/PatientProfile";
import { EditProfile } from "./components/EditProfile";
import  SavedServices  from "./Pages/Patient/SavedServices";
import MyReviews from "./Pages/Patient/MyReviews";
import { SideBarMobile } from "./components/SideBarMobile";
import { SignUpHospital } from "./Pages/Auth/SignUpHospital";
import { DashBoard } from "./Pages/Hospital/DashBoard";
import { MainSectionAtDashBoard } from "./components/MainSectionAtDashBoard";
import { EditHospitalProfile } from "./components/EditHospitalProfile";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { ServiceCard } from "./components/ServiceCard";
import { AboutUs } from "./Pages/AboutUs/AboutUs";
import { OurService } from "./Pages/OurService/OurService";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/service-details/:id"
          element={
            <MainLayout>
              <ServiceCard />
            </MainLayout>
          }
        />
        <Route
          path="/SignUp-Hospital"
          element={
            <MainLayout>
              <SignUpHospital />
            </MainLayout>
          }
        />
        <Route
          path="/SignUp"
          element={
            <MainLayout>
              <SignUp />
            </MainLayout>
          }
        />

        <Route
          path="/LogIn"
          element={
            <MainLayout>
              <LogIn />
            </MainLayout>
          }
        />
        <Route
          path="/about-us"
          element={
            <MainLayout>
              <AboutUs/>
            </MainLayout>
          }
        />
        <Route
          path="/our-service"
          element={
            <MainLayout>
              <OurService/>
            </MainLayout>
          }
        />
        <Route
          path="/PatientProfile"
          element={
            <MainLayout>
              <PatientProfile />
            </MainLayout>
          }
        >
          <Route index element={<EditProfile />} />
          <Route path="savedServices" element={<SavedServices/>} />
          <Route path="myReviews" element={<MyReviews />} />
        </Route>
        <Route
          path="/Hospital-DashBoard"
          element={
            <DashboardLayout>
              <DashBoard />
            </DashboardLayout>
          }
        >
          <Route index element={<MainSectionAtDashBoard />} />
          <Route path="update-profile" element={<EditHospitalProfile />} />
          <Route path="reviews" element={<MyReviews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
