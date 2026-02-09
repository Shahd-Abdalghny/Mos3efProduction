import React from 'react'
import { Card, CardContent } from "./ui/card";
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const MyReviewCard = ({ review }) => {
    const navigate = useNavigate();
     const handleClick = () => {
       navigate(`/service-details/${review.serviceId}`);
     };
  return (
    <Card className="bg-Blue text-white [direction:rtl] rounded-3xl border-0 shadow-md ">
      <CardContent className="flex flex-col [direction:rtl] gap-4">
        <div
          className={`w-full flex items-center justify-start [direction:rtl]`}
        >
           <h3 className="ml-2">الخدمه : </h3> 
          <button className="bg-Blue-200 py-2 px-3 rounded-full" onClick={handleClick}>{review.serviceName}</button>
        </div>
        <p>{review.comment}</p>

        <div className="inline-flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-5 h-5 ${
                star <= review.rating
                  ? "fill-[orange] text-[orange]"
                  : "text-[gray] "
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default MyReviewCard