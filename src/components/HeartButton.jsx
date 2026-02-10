import React from 'react'
import { Button } from './ui/button'
import { HeartIcon } from 'lucide-react'
import { useContext  } from 'react'
import { ServicesContext } from '../Context/ServicesContext'
export const HeartButton = ({ serviceId }) => {
        const {
          savedServices,
          AddSavedServices,
          deleteSavedService,
          setSavedServices,
        } = useContext(ServicesContext);
        const isSaved = savedServices.some((service) => service.serviceId === serviceId);
       
        const handelToggleSave = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
              alert("لازم تسجل دخول الأول");
              return;
            }
        try {
            if (isSaved) {
                await deleteSavedService(serviceId);
                setSavedServices((prev) =>
                  prev.filter((s) => s.serviceId !== serviceId),
                );
            } else {
                await AddSavedServices(serviceId);
                setSavedServices((prev) => [...prev, { serviceId }]);

            }
        } catch (error) {
            console.error("Error toggling save status:", error);
        }
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handelToggleSave}
        className="z-10 absolute top-[9px] right-5"
        aria-label="Add to favorites"
      >
        <HeartIcon
          className={`transition-colors duration-300  ${
            isSaved ? "fill-red-500 text-red-500" : "fill-Blue-900 text-Blue-900"
          }`}
        />
      </Button>
    );
}
