/** @format */

import { createContext, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const baseUrl = "https://mos3ef.runasp.net/api/";

  const getAllServices = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        `${baseUrl}Hospital/GetAllServices`,
        {},
        { headers },
      );

      const data = res.data;
      setServices(data);
      setAlertMsg("تم جلب الخدمات بنجاح");
      setAlertType("success");
      return data;
    } catch (err) {
      console.log("Error fetching services:", err);
      setAlertMsg("فشل في جلب الخدمات");
      setAlertType("error");
      return [];
    }
  };

  const deleteHospitalService = async (serviceId) => {
    try {
      if (!serviceId) {
        console.error(" Service ID is missing!");
        throw new Error("Service ID is required");
      }

      const token = localStorage.getItem("authToken");

      const res = await axios.delete(
        `${baseUrl}Hospital/DeleteService/${serviceId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("Delete response:", res.data);

      setAlertMsg("تم حذف الخدمة بنجاح");
      setAlertType("success");
      return true;
    } catch (err) {
      setAlertMsg(err.response?.data?.message || "فشل في حذف الخدمة");
      setAlertType("error");
      throw err;
    }
  };

  const addHospitalService = async (serviceData) => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `${baseUrl}Hospital/AddService`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setAlertMsg("تمت الإضافة بنجاح!");
      setAlertType("success");
      return res.data;
    } catch (error) {
      setAlertMsg(error.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
      setAlertType("error");
      throw error;
    }
  };

  const updateHospitalService = async (serviceId, serviceData) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        `${baseUrl}Hospital/UpdateService/${serviceId}`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setAlertMsg("تم تحديث الخدمة بنجاح");
      setAlertType("success");
      return res.data;
    } catch (error) {
      setAlertMsg(error.response?.data?.message || "حدث خطأ في التحديث");
      setAlertType("error");
      throw error;
    }
  };
  const getServiceById = async (id) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${baseUrl}Services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      return {
        success: response.data.isSuccess,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "حدث خطأ في جلب بيانات الخدمة",
        data: null,
      };
    }
  };
  return (
    <HospitalContext.Provider
      value={{
        addHospitalService,
        updateHospitalService,
        deleteHospitalService,
        getAllServices,
        alertMsg,
        setAlertMsg,
        alertType,
        setAlertType,
        services,
        setServices,
        getServiceById,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};
