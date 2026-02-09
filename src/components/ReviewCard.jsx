/** @format */

import React from "react";
import { Card, CardContent } from "./ui/card";
import { StarIcon } from "lucide-react";
import { DropdownMenuDemo }  from "./DropdownMenuDemo";
export const ReviewCard = ({ name, describe, rating , isMine , onEdit, onDelete }) => {
  return (
    <Card className="bg-Blue text-white [direction:rtl] rounded-3xl border-0 shadow-md ">
      <CardContent className="flex flex-col [direction:rtl] gap-4">
        <div className={`w-full flex items-center ${isMine ? 'justify-between' : 'justify-start'} [direction:rtl]`}>
         <h2 >{name}</h2>
          <DropdownMenuDemo isMine={isMine} onEdit={onEdit} onDelete={onDelete} />
        </div>
        <p>{describe}</p>

        <div className="inline-flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-5 h-5 ${
                star <= rating ? "fill-[orange] text-[orange]" : "text-[gray] "
              }`}
            />
          ))}
        </div>
      </CardContent>
      
    </Card>
  );
};
