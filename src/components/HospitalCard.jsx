/** @format */
import React from "react";
import { ChartLine, MoreVerticalIcon, PhoneOutgoing } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { HeaderOfService } from "./HeaderOfService";
import { IconButton } from "./IconButton";
import { ButtonTextAndIcon } from "./ButtonTextAndIcon";
import { MapPinPlusInside } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HospitalCard = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/service-details/${item.serviceId}`);
  };
  return (
    <Card
      className="inline-flex flex-col items-center justify-center gap-3 md:gap-4 pt-2 pb-3 px-2 bg-white rounded-[20px] shadow-[0_0_2px_0_rgba(0,0,0,0.95)] w-full cursor-pointer hover:shadow-md transition-shadow "
      data-model-id="4:98"
    >
      <CardContent className="p-0 w-full space-y-3 md:space-y-4">
        <HeaderOfService
          image={
            item.hospitalImage
              ? `https://mos3ef.runasp.net${item.hospitalImage}`
              : "https://media.istockphoto.com/id/1419877131/photo/building-facade-of-a-hospital-in-commercial-and-business-district-under-blue-sky.jpg?s=612x612&w=0&k=20&c=wGxVbFSxljSZb_t_qROE4RwsCgssKbGlqawAtmQ88Ls="
          }
          name={item.hospitalName}
          rating= {item.averageRating || "0"}
          isOnline={
            item.availability == "available" ||
            item.availability == "متاح" ||
            item.availability == "yes" ||
            item.availability == "نعم"
              ? true
              : false
          }
          id={item.serviceId}
        />

        {/* Badges Section */}
        <div className="flex flex-wrap justify-end gap-2 md:gap-4 px-1 md:px-2 w-full items-center">
          <Badge
            variant="outline"
            className="inline-flex justify-center gap-1 items-center border-0 bg-transparent shadow-none px-2 py-1"
          >
            <span className="font-Cairo font-normal text-Blue-900 text-[10px] md:text-xs tracking-[0] leading-[normal] [direction:rtl]">
              سعر الكشف {item.price} ج.م
            </span>
          </Badge>
          <Badge
            variant="outline"
            className="inline-flex justify-center gap-1 items-center border-0 bg-transparent shadow-none px-2 py-1"
          >
            <span className="font-Cairo font-normal text-Blue-900 text-[10px] md:text-xs tracking-[0] leading-[normal] [direction:rtl]">
              تبعد {item.distanceKm?.toFixed(2)} كم
            </span>
            <MapPinPlusInside className="w-3 h-3 md:w-4 md:h-4" />
          </Badge>

          <Badge
            variant="outline"
            className="inline-flex bg-Blue-200 justify-center gap-1 items-center border-0 rounded-3xl shadow-none px-3 py-1"
          >
            <span className="font-Cairo font-normal text-Blue-900 text-xs md:text-sm tracking-[0] leading-[normal] [direction:rtl]">
              {item.name}
            </span>
          </Badge>
        </div>

        {/* Footer Buttons */}
        <footer className="flex items-center justify-around  gap-1 md:gap-2 w-full px-1 md:px-0">
          <ButtonTextAndIcon
            text={"تفاصيل"}
            className="text-xs md:text-sm"
            onClick={handleClick}
          />
          <IconButton
            IconName={<PhoneOutgoing className="w-4 h-4 md:w-5 md:h-5" />}
            label="Call hospital"
            size="sm"
          />
         
        </footer>
      </CardContent>
    </Card>
  );
};
