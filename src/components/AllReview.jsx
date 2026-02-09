/** @format */

import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ReviewCard } from "./ReviewCard";
import { useReview } from "../hooks/useReview";
import { useAuth } from "../hooks/useAuth";
const AllReview = ({ serviceId }) => {
  const { getReviewsByService, loading, reviews, deleteReview, setEditReview } =
    useReview();
  const { getPatientById ,role } = useAuth();
  useEffect(() => {
    getReviewsByService(serviceId);
   
  }, [serviceId]);
  const handelEdit = (review) => {
    setEditReview(review);
  };
  const handelDelete = (reviewId) => {
    const result = deleteReview(reviewId);
    if (result) {
      alert("تم حذف المراجعة بنجاح!");
      getReviewsByService(serviceId); // Refresh reviews after deletion
    }
  };
  if (loading) return <p>Loading...</p>;
  if (reviews.length < 1)
    return (
      <p className="text-center text-gray-500 [direction:rtl]">
        لا توجد مراجعات بعد.
      </p>
    );

  return (
    <div className="w-full px-3 md:px-4 lg:px-10">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto"
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem
              key={review.reviewId}
              className="basis-full xs:basis-1/2 sm:basis-1/2 lg:basis-1/3"
            >
              <ReviewCard
                name={ getPatientById(review.patientId)?.name || review.patientName  }
                describe={review.comment}
                rating={review.rating || 5}
                isMine={review.isMine && role === 0} // Show menu only if it's the user's review and user is a patient
                onEdit={() => handelEdit(review)}
                onDelete={() => handelDelete(review.reviewId)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default AllReview;
