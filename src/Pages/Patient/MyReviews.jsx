/** @format */

import React from "react";
import { useReview } from "../../hooks/useReview";
import MyReviewCard from "../../components/MyReviewCard";
const MyReviews = () => {
  const { getMyReviews, myReviews } = useReview();

  React.useEffect(() => {
    getMyReviews();
  }, []);
  return (
    <div className="w-full px-3 md:px-4 lg:px-10 mt-6 [direction:rtl]">
      <h2 className="text-2xl font-Cairo mb-4 [direction:rtl]">مراجعاتي</h2>
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
    </div>
  );
};

export default MyReviews;
