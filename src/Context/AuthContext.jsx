/** @format */

import { createContext, useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const baseUrl = "https://mos3ef.runasp.net/api/";
  // ------------------------ Signup Function ------------------ //
  const signup = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}Account/register/patient`, data);
      console.log(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  // ------------------------ Login Function ------------------ //
  const login = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}Account/login`, data);
      

      const token = res.data.token;
      const userType = res.data.userType; // 0 = Patient, 1 = Hospital
      const userId = res.data.userId;
      setRole(userType);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", userType);
      localStorage.setItem("userId", userId);

      // ------------------- Fetch user Profile Immediately ------------------- //
      const profileUrl =
        userType == 0
          ? `${baseUrl}Patients/my-profile`
          : `${baseUrl}Hospital/Get-profile`;

      const profileRes = await axios.get(profileUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = {
        ...profileRes.data,
        userId,
        imageUrl: profileRes.data.imageUrl
          ? `https://mos3ef.runasp.net${profileRes.data.imageUrl}`
          : null,
      };

      setUser(userData);
      console.log("Logged in user:", userData);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  // ------------------------ Check login on App load ------------------ //
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("userRole"); // 0 = Patient, 1 = Hospital
    const storedUserId = localStorage.getItem("userId");
    if (token && storedRole !== null) {
      const profileUrl =
        storedRole == "0"
          ? `${baseUrl}Patients/my-profile`
          : `${baseUrl}Hospital/Get-profile`;

      axios
        .get(profileUrl, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const userData = {
            ...res.data,
            userId: storedUserId,
            imageUrl: res.data.imageUrl
              ? `https://mos3ef.runasp.net${res.data.imageUrl}`
              : null,
          };
          setUser(userData);
          setRole(parseInt(storedRole));
        })
        .catch(() => logout());
    }
  }, []);

  // ------------------------ Logout Function ------------------ //
  const logout = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.post(
        `${baseUrl}Account/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.log("Logout API failed:", error);
    }

    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setUser(null);
    setRole(null);
  };

  // ------------------------ Update Profile Function ------------------ //
  const updateProfile = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      const fd = new FormData();
      fd.append("Name", data.name);
      fd.append("Email", data.email);
      fd.append("PhoneNumber", data.phoneNumber);
      fd.append("Address", data.address);
      if (data.profilePicture) fd.append("ProfilePicture", data.profilePicture);

      await axios.put(`${baseUrl}Patients/my-profile`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await axios.get(`${baseUrl}Patients/my-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = {
        ...res.data,
        imageUrl: res.data.imageUrl
          ? `https://mos3ef.runasp.net${res.data.imageUrl}`
          : null,
      };
      
      setUser(userData);
      return { success: true, updatedUser: userData };
    } catch (err) {
      console.log("Update profile failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "حدث خطأ",
      };
    }
  };
  const updateHospitalProfile = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("Phone_Number", data.phone_Number);
      fd.append("address", data.address);
      fd.append("description", data.description);
      fd.append("opening_Hours", data.opening_Hours);
      fd.append("website", data.website);
      fd.append("region", data.region);
      fd.append("latitude", data.latitude);
      fd.append("longitude", data.longitude);
      if (data.ProfilePicture) fd.append("ProfilePicture", data.ProfilePicture);

      await axios.put(`${baseUrl}Hospital/Update-profile`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await axios.get(`${baseUrl}Hospital/Get-Profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = {
        ...res.data,
        imageUrl: res.data.imageUrl
          ? `https://mos3ef.runasp.net${res.data.imageUrl}`
          : null,
      };
      console.log("Updated Hospital Profile:", userData);
      setUser(userData);
      return { success: true, updatedUser: userData };
    } catch (err) {
      console.log("Update profile failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "حدث خطأ",
      };
    }
  };

  // ------------------------ Change Password Function ------------------ //
  const changePassword = async (passwordData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${baseUrl}Account/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data; // return success response
    } catch (error) {
      console.error("Change password error:", error.response?.data);
      throw error;
    }
  };
  // ------------------------ Register Hospital Function ------------------ //
  const registerHospital = async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}Account/register/hospital`,
        data,
      );
      console.log(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ، حاول مرة أخرى",
      };
    }
  };
  
  const getPatientById = async (id) => {
    const res = await axios.get(`${baseUrl}Patients/GetPatientById/${id}`);
    return res.data.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        signup,
        login,
        logout,
        updateProfile,
        registerHospital,
        changePassword,
        updateHospitalProfile,
        getPatientById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
