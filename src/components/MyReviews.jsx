/** @format */

import React from "react";
import { Card, CardContent } from "./ui/card";

const MyReviews = () => {
  return (
    <Card className="flex bg-white rounded-[20px] shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] border-0   animate-fade-in  [--animation-delay:200ms]">
      <CardContent className="flex flex-col items-center gap-7 px-8 py-6 w-full">
        <div className="justify-end px-8 py-1 flex items-center gap-1 w-full">
          <h1 className="w-fit font-Cairo font-bold text-Blue-900 text-xl leading-6 whitespace-nowrap [direction:rtl] tracking-[0]">
            تقييماتي
          </h1>
          
        </div>
      </CardContent>
    </Card>
  );
};

export default MyReviews;
