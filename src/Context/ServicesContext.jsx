/** @format */

import { createContext, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [savedServices, setSavedServices] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const baseUrl = "http://mos3ef.runasp.net/api/";

  const getMySaveServices = async (page = 1) => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(`${baseUrl}Patients/my-saved-services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pageNumber: page,
          pageSize: pageSize,
        },
      });

      const data = res.data;

      setSavedServices((prev) =>
        page === 1 ? data.items : [...prev, ...data.items],
      );
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setPageNumber(data.pageNumber);
    } catch (err) {
      console.log("Error fetching services:", err);
    }
  };

  const AddSavedServices = async (serviceId) => {
    try {
      if (!serviceId) {
        console.error(" Service ID is missing!");
        throw new Error("Service ID is required");
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login first");
        return;
      }
      const res = await axios.post(
        `${baseUrl}Patients/my-saved-services/${serviceId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("Add response:", res.data);
      setSavedServices((prev) => [...prev, serviceId]);
      return true;
    } catch (err) {
      console.log(err.response?.data?.message || "فشل في حفظ الخدمة");
      throw err;
    }
  };
  const deleteSavedService = async (serviceId) => {
    try {
      if (!serviceId) {
        throw new Error("Service ID is required");
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login first");
        return;
      }
      await axios.delete(`${baseUrl}Patients/my-saved-services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // تحديث الواجهة بعد الحذف
      setSavedServices((prev) =>
        prev.filter((service) => service.serviceId !== serviceId),
      );

      return true;
    } catch (err) {
      console.log(err.response?.data?.message || "فشل في حذف الخدمة");
      throw err;
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        AddSavedServices,
        getMySaveServices,
        deleteSavedService,
        savedServices,
        setSavedServices,
        pageNumber,
        totalPages,
        hasNextPage,
        pageSize,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
