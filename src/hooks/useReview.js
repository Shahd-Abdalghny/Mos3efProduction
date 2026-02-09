/** @format */

import { useContext } from "react";
import { ReviewContext } from "../Context/ReviewContext.jsx";


export const useReview = () => {
return useContext(ReviewContext);
   
};