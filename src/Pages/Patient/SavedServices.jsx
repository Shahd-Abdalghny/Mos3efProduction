/** @format */

import React, { useContext, useEffect } from "react";
import { ServicesContext } from "../../Context/ServicesContext";
import { HospitalCard } from "../../components/HospitalCard";

const SavedServices = () => {
  const {
    savedServices,
    getMySaveServices,
    pageNumber,
    totalPages,
    hasNextPage,
  } = useContext(ServicesContext);

  useEffect(() => {
    getMySaveServices(1); // load first page on mount
  }, []);

  const handlePrev = () => {
    if (pageNumber > 1) getMySaveServices(pageNumber - 1);
  };

  const handleNext = () => {
    if (hasNextPage) getMySaveServices(pageNumber + 1);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-Cairo mb-4 [direction:rtl]">
        الخدمات المفضلة
      </h2>

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {savedServices.length > 0 ? (
          savedServices.map((service) => (
            <HospitalCard key={service.id} item={service} />
          ))
        ) : (
          <p className="text-gray-500 w-full text-center [direction:rtl]">
            لا يوجد خدمات بعد
          </p>
        )}
      </div>

      {/* Pagination */}
      {savedServices.length > 0 && (
        <div className="flex justify-center mt-6 space-x-3">
          <button
            onClick={handlePrev}
            disabled={pageNumber === 1}
            className={`px-4 py-2 rounded-lg border ${
              pageNumber === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          <span className="px-4 py-2 border rounded-lg bg-gray-50">
            Page {pageNumber} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={!hasNextPage}
            className={`px-4 py-2 rounded-lg border ${
              !hasNextPage
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedServices;
