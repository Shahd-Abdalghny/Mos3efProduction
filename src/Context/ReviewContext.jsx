/** @format */

import React, { createContext, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const[editReview, setEditReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const api = axios.create({
    baseURL: "https://mos3ef.runasp.net/api/Review",
    headers: {
      "Content-Type": "application/json",
    },
  });

  
  const getToken = () => localStorage.getItem("authToken");

 
  const getReviewsByService = async (serviceId) => {
    try {
      setLoading(true);
      const token = getToken();
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const response = await api.get(`/GetReview/${serviceId}`, config);
      setReviews(response.data.data);
      setLoading(false);
      return response.data.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error(err);
    }
  };

  
  const addReview = async (reviewDto) => {
    try {
      const token = getToken();
      if (!token) 
        {
            alert("قم بتسجيل الدخول اولا !") ;
            return;
        } 

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.post("/AddReview", reviewDto, config);
      getReviewsByService(reviewDto.serviceId); // Refresh reviews after adding
      return response.data;
    } catch (err) {
      setError(err);
      console.error(err);
     
    }
  };

  const updateReview = async (id, reviewDto) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");
      
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.put(`/Update/${id}`, reviewDto, config);
      getReviewsByService(reviewDto.serviceId); // Refresh reviews after updating
      return response.data;
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

 
  const deleteReview = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        alert("قم بتسجيل الدخول اولا !") ;
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.delete(`/Delete/${id}`, config);
        setReviews((prev) => prev.filter((review) => review.reviewId !== id)); // Optimistically update UI
        getMyReviews(); // Refresh my reviews after deletion
      return response.data;
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

 
  const getMyReviews = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.get("/myReviews", config);
      setMyReviews(response.data.data);
      setLoading(false);
      console.log("My Reviews:", response.data.data); // Debugging log
      return response.data.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        myReviews,
        loading,
        error,
        getReviewsByService,
        addReview,
        updateReview,
        deleteReview,
        getMyReviews,
        setEditReview,
        editReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
