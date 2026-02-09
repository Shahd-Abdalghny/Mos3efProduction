/** @format */
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0); // State variable to store hover state

  return (
    <div className="star-rating flex justify-center">
      {/* Mapping a array having 1 to 5 items as value */}
      {[1, 2, 3, 4, 5].map((num) => (
        // Star component from react-icons
        <FaStar
          key={num}
          onClick={() => setRating(num)} //onclick to set selected rating
          onMouseOver={() => setHover(num)} // onmouseover track hover over the item and sets the hover state.
          onMouseLeave={() => setHover(0)} // Reset hover when mouse leaves
          size={30}
          color={num <= (hover || rating )? "orange" : "grey"} // Changing the color to orange for hover/selected item
        />
      ))}
    </div>
  );
}
