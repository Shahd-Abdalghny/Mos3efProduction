import React, {useState ,useEffect} from 'react'
import { SendHorizontal } from "lucide-react";
import StarRating from "./StarRating";
import { Textarea } from "./ui/textarea";
import { useReview } from "../hooks/useReview";
const AddReview = ({serviceId}) => {
 const { addReview, editReview, setEditReview, updateReview } = useReview();

  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(""); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (editReview) {
      setRating(editReview.rating);
      setComment(editReview.comment);
    }
  }, [editReview,serviceId]);
   const handleSubmit = async () => {
    if(editReview) {
      // Handle review update logic here
      const reviewDto = {
        rating: rating,
        comment: comment,
        serviceId: serviceId,
      };
      const response = await updateReview(editReview.reviewId, reviewDto);
      if (response && response.data) {
        alert("تم تعديل المراجعة بنجاح!");
        setEditReview(null);
        setRating(0);
        setComment("");
      }
      return;
    } else {
      if (rating === 0 || comment.trim() === "") {
        alert("يرجى تحديد التقييم وكتابة التعليق");
        return;
      }
      setLoading(true);
      const reviewDto = {
        rating: rating,
        comment: comment,
        serviceId: serviceId,
      };
      
      const response = await addReview(reviewDto); // send to context
      setLoading(false);
      
      if (response && response.data) {
        alert("تم إضافة المراجعة بنجاح!");
        setRating(0);
        setComment("");
      } else {
        setRating(0);
        setComment("");
      }
    }
      
      
   };
  return (
    <div className="flex flex-col w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[447px] items-center gap-3 md:gap-4 lg:gap-[9px] px-3 md:px-4">
      <div className="w-fit font-Cairo font-semibold text-black text-sm md:text-base lg:text-lg tracking-[0] leading-[normal] [direction:rtl]">
        تحدث عن تجربتك
      </div>
      <StarRating rating={rating} setRating={setRating} />
      <div className="flex flex-col w-full">
        <div className="relative h-[130px] md:h-[150px] lg:h-[172px] bg-white rounded-[15px_15px_0px_15px] md:rounded-[20px_20px_0px_20px] overflow-hidden border border-solid border-[#cccccc]">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="أضف مراجعتك هنا..."
            className="absolute top-2.5 right-[8px] md:right-[10px] lg:right-[19px] w-[calc(100%-16px)] md:w-[calc(100%-20px)] lg:w-[92%] h-[calc(100%-20px)] border-0 resize-none font-Cairo font-normal text-[#1a1a1a] text-xs md:text-sm lg:text-base [direction:rtl] focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center justify-center w-fit font-Cairo font-normal text-[#b3b3b3] text-xs text-center md:text-left [direction:rtl] mt-1 md:mt-2">
          <div>سوف تظهر مراجعتك لزوار مسعف</div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rotate-180 mr-6 text-Green-600 shadow-none"
          >
            <SendHorizontal />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReview