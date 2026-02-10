/** @format */

import React from "react";
import { useReview } from "../../hooks/useReview";
import MyReviewCard from "../../components/MyReviewCard";
const MyHospitalReviews = () => {
  const { getMyHospitalReviews, myReviews, pagination } = useReview();

  React.useEffect(() => {
    getMyHospitalReviews();
  }, []);
  return (
    <div className="w-full px-3 md:px-4 lg:px-10 mt-6 [direction:rtl]">
      <h2 className="text-2xl font-Cairo mb-4 [direction:rtl]">مراجعات المستشفى</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {myReviews.length > 0 ? (
          myReviews.map((review) => (
            <MyReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p className="text-gray-500 w-full text-center [direction:rtl]">
            لا يوجد مراجعات بعد
          </p>
        )}
      </div>
        {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-6">
                <button onClick={() => getMyHospitalReviews(pagination.pageNumber - 1, pagination.pageSize)} disabled={!pagination.hasPreviousPage} className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">السابق</button>
                <span className="px-4 py-2 mx-1">{pagination.pageNumber} / {pagination.totalPages}</span>
                <button onClick={() => getMyHospitalReviews(pagination.pageNumber + 1, pagination.pageSize)} disabled={!pagination.hasNextPage} className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">التالي</button>
            </div>
        )}
    </div>
  );
};

export default MyHospitalReviews;
