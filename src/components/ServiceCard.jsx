/** @format */

import {
  ActivityIcon,
  BabyIcon,
  DropletIcon,
  MapPinIcon,
  NavigationIcon,
  PhoneIcon,
  ScaleIcon,
  Share2Icon,
  SendHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import React from "react";
import { ServicesContext } from "../Context/ServicesContext";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ButtonTextAndIcon } from "./ButtonTextAndIcon";
import { RatingOfServices } from "./RatingOfServices";
import { HeartButton } from "./HeartButton";
import { Online } from "./Online";
import { useHospital } from "../hooks/useHospital.js";
import AddReview from "./AddReview";
import  AllReview  from "./AllReview";
const detailsSections = [
  {
    title: "التخصصات الرئيسية",
    content:
      "الباطنة، الجراحة العامة، العظام، أمراض الكلى والمسالك البولية، القلب والأوعية الدموية.",
  },
  {
    title: "خدمات إضافية",
    content:
      "قسم أشعة متكامل (رنين مغناطيسي، مقطعية)، معمل تحاليل مركزي، صيدلية 24 ساعة.",
  },
];


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // نصف قطر الأرض بالكيلومتر
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}


export const ServiceCard = () => {

  const { id } = useParams();
  const { getServiceById } = useHospital();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const result = await getServiceById(id);

        if (result.success || result.isSuccess) {
          setService(result.data || result.data?.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("حدث خطأ في جلب بيانات الخدمة");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id, getServiceById]);
 useEffect(() => {
   if (!service) return;

   navigator.geolocation.getCurrentPosition(
     (position) => {
       const userLat = position.coords.latitude;
       const userLon = position.coords.longitude;

       const distance = getDistanceFromLatLonInKm(
         userLat,
         userLon,
         service.hospitalLatitude,
         service.hospitalLongitude,
       );

       
       setService((prev) => ({
         ...prev,
         distanceKm: distance.toFixed(1), // تقريب لواحد عشري
       }));
     },
     (error) => {
       console.log("خطأ في الحصول على الموقع:", error);
     },
   );
 }, [service]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-Blue-900 font-Cairo text-xl">
          جاري تحميل البيانات...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-8 mx-auto px-3 md:px-6 lg:px-36">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 my-8 md:my-11">
          <div className="text-red-800 font-Cairo text-center text-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-8 mx-auto px-3 md:px-6 lg:px-36">
        <div className="text-gray-500 text-center py-8 my-8 md:my-11 font-Cairo">
          لم يتم العثور على الخدمة
        </div>
      </div>
    );
  }

  return (
    <div className="pt-30  mx-auto px-3 md:px-4 lg:px-6 xl:px-36">
      <div className="flex flex-col w-full items-center gap-4 md:gap-6 px-1 py-2 bg-white rounded-[20px] border border-Blue-900 my-4 md:my-8">
        <Card className="flex flex-col w-full p-0 items-center gap-3 md:gap-4 shadow-none border-0">
          <CardContent className="w-full p-0">
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[428px] rounded-2xl overflow-hidden shadow-[0px_4px_4px_#7cc1e9] bg-cover bg-center">
              <div class="absolute bottom-0 left-0 w-full h-28 bg-[linear-gradient(180deg,rgba(217,217,217,0)_0%,rgba(168,214,240,1)_100%)]"></div>
              <img
                src={
                  service.hospitalImage
                    ? `https://mos3ef.runasp.net${service.hospitalImage}`
                    : "https://media.istockphoto.com/id/1419877131/photo/building-facade-of-a-hospital-in-commercial-and-business-district-under-blue-sky.jpg?s=612x612&w=0&k=20&c=wGxVbFSxljSZb_t_qROE4RwsCgssKbGlqawAtmQ88Ls="
                }
                alt={service.name || "صورة الخدمة"}
                className="w-full h-full object-cover"
              />
              <Online isOnline={true} />

              <div className="flex flex-col w-full  items-end gap-1 absolute top-[80px] xs:top-[100px] sm:top-[120px] md:top-[150px] lg:top-[201px] right-[8px] xs:right-[10px] sm:right-[12px] md:right-[15px] lg:right-[18px]">
                <div className="inline-flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 flex-wrap">
                  <div className="bg-Blue-200 rounded-full px-4 py-1 w-fit text-[#152211] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-Cairo font-bold tracking-[0] leading-[normal] [direction:rtl]">
                    {service.name || "اسم الخدمة"}
                  </div>
                  <div className="w-[2px] xs:w-[3px] sm:w-[4px] md:w-[5px] h-[20px] xs:h-[25px] sm:h-[30px] md:h-[37px] font-Cairo font-bold text-[#e9f5fb] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-right tracking-[0] leading-[normal] hidden xs:block">
                    |
                  </div>
                  <div className="inline-flex items-center justify-center gap-1">
                    <div className="inline-flex flex-col items-center gap-1">
                      <RatingOfServices
                        rating={service.averageRating || "0"}
                      />
                    </div>
                  </div>
                </div>

                <h1 className="self-stretch h-auto font-Cairo font-bold text-Blue-900 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] tracking-[0] leading-tight [direction:rtl] mt-1 xs:mt-2">
                  {service.hospitalName || "اسم المستشفى"}
                </h1>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full px-6 items-center justify-between mt-3 md:mt-4 gap-2 md:gap-4">
              <div className="flex items-center justify-end gap-2 md:gap-4 flex-wrap">
                <div className="inline-flex items-center justify-center gap-1">
                  <div className="w-fit font-Cairo font-normal text-Blue-900 text-xs md:text-sm lg:text-base tracking-[0] leading-[normal] [direction:rtl]">
                    قسم {service.categoryName || "غير محدد"}
                  </div>
                </div>
                <div className="inline-flex items-center justify-center gap-1">
                  <div className="w-fit font-Cairo font-normal text-Blue-900 text-xs md:text-sm lg:text-base tracking-[0] leading-[normal] [direction:rtl]">
                    تبعد {service.distanceKm || "0.0"} كم
                  </div>
                  <MapPinIcon className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6" />
                </div>
              </div>
                <ButtonTextAndIcon
                  text={"أتصل بالمستشفى"}
                  icon={
                    <PhoneIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  }
                  className="text-xs"
                />
            </div>
          </CardContent>
        </Card>

        <hr className="text-gray-300 my-2 w-[90%]" />

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8 w-full px-3 md:px-4">
          <div className="flex flex-col items-center gap-4 md:gap-6 w-full lg:w-1/2">
            <div className="flex flex-col gap-4 md:gap-6 w-full">
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center [direction:rtl]">
                <div className="font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl] whitespace-nowrap">
                  سعر الخدمة:
                </div>
                <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[463px] items-end gap-2 md:gap-4">
                  <Card className="inline-flex items-center justify-center gap-2 md:gap-3 p-2 md:p-3 bg-[#e9f5fb] rounded-[18px] md:rounded-[22px] border-0 shadow-none w-full">
                    <CardContent className="p-0 flex items-center w-full justify-center gap-2 md:gap-3">
                      <div className="w-fit font-Cairo  text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                        {service.price || "0"}
                      </div>
                      <div className="w-fit font-Cairo  text-[#294521] text-sm md:text-[15px]  tracking-[0] leading-[normal] whitespace-nowrap [direction:rtl]">
                        جنيها
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center [direction:rtl]">
                <div className="font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl] whitespace-nowrap">
                  ساعات العمل:
                </div>
                <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[463px] items-end gap-2 md:gap-4">
                  <Card className="inline-flex items-center justify-center gap-2 md:gap-3 p-2 md:p-3 bg-[#e9f5fb] rounded-[18px] md:rounded-[22px] border-0 shadow-none w-full">
                    <CardContent className="p-0 flex items-center w-full justify-center gap-2 md:gap-3">
                      <div className="w-fit font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl]">
                        {service.working_Hours || "غير محدد"}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-center [direction:rtl]">
                <div className="font-Cairo font-semibold text-black text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl] whitespace-nowrap">
                  حالة الخدمة:
                </div>
                <div className="flex flex-col w-full sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[463px] items-end gap-2 md:gap-4">
                  <Card
                    className={`inline-flex items-center justify-center gap-2 md:gap-3 p-2 md:p-3 rounded-[18px] md:rounded-[22px] border-0 shadow-none w-full ${
                      service.availability === "YES" ||
                      service.availability === "متاح" ||
                      service.availability === "متاحة" ||
                      service.availability === "نعم" ||
                      service.availability === true
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <CardContent className="p-0 flex items-center w-full justify-center gap-2 md:gap-3">
                      <div
                        className={`w-fit font-Cairo font-semibold text-sm md:text-[15px] tracking-[0] leading-[normal] [direction:rtl] ${
                          service.availability === "YES" ||
                          service.availability === "متاح" ||
                          service.availability === "متاحة" ||
                          service.availability === "نعم" ||
                          service.availability === true
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        {service.availability === "YES" ||
                        service.availability === "متاح" ||
                        service.availability === true ||
                        service.availability === "نعم" ||
                        service.availability === "متاحة"

                          ? "متاحة"
                          : "غير متاحة"}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[359px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[255px] mt-4 lg:mt-0">
            <div className="w-full h-full bg-[#e9f5fb] rounded-[30px] md:rounded-[40px] overflow-hidden border-2 border-solid border-[#071e2c]">
              <img
                className="w-full h-full object-cover"
                alt={service.name || "صورة الخدمة"}
                src={
                  service.hospitalImage
                    ? `https://mos3ef.runasp.net${service.hospitalImage}`
                    : "https://media.istockphoto.com/id/1419877131/photo/building-facade-of-a-hospital-in-commercial-and-business-district-under-blue-sky.jpg?s=612x612&w=0&k=20&c=wGxVbFSxljSZb_t_qROE4RwsCgssKbGlqawAtmQ88Ls="
                }
              />
            </div>
          </div>
        </div>

        <hr className="text-gray-300 my-2 w-[90%]" />

        <div className="w-full px-3 md:px-4 lg:px-6 flex flex-col gap-4 md:gap-6">
          <h2 className="font-Cairo font-bold text-black text-lg md:text-xl lg:text-2xl tracking-[0] leading-[normal] [direction:rtl] text-center md:text-right">
            التفاصيل:
          </h2>

          <div className="flex flex-col w-full gap-3 md:gap-4 lg:gap-[11px]">
            <div className="flex flex-col lg:flex-row justify-end gap-2 md:gap-3 lg:gap-5 w-full px-2 md:px-4">
              <div className="w-full lg:w-[577px] font-Cairo font-semibold text-black text-sm md:text-base lg:text-lg tracking-[0] leading-relaxed [direction:rtl]">
                {service.description}
              </div>
              <div className="w-full lg:w-36.75 text-black text-sm md:text-base lg:text-lg font-Cairo font-bold tracking-[0] leading-[normal] [direction:rtl] text-center lg:text-right">
                الوصف
              </div>
            </div>

            {detailsSections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row justify-end gap-2 md:gap-3 lg:gap-5 w-full px-2 md:px-4"
              >
                <div className="w-full lg:w-[577px] font-Cairo font-semibold text-black text-sm md:text-base lg:text-lg tracking-[0] leading-relaxed [direction:rtl]">
                  {section.content}
                </div>
                <div className="w-full lg:w-36.75 text-black text-sm md:text-base lg:text-lg font-Cairo font-bold tracking-[0] leading-[normal] [direction:rtl] text-center lg:text-right">
                  {section.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="text-gray-300 my-2 w-[90%]" />
        <h2 className="self-stretch font-Cairo font-bold text-black text-lg md:text-xl lg:text-2xl text-center tracking-[0] leading-[normal] [direction:rtl]">
          التقييمات والمراجعات
        </h2>
        <AllReview serviceId={id}/>
        <AddReview serviceId={id}/>
      </div>
    </div>
  );
};
