/** @format */
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon, Map } from "lucide-react";
import { useSearch } from "../hooks/useSearch.js";
import { HospitalCard } from "./HospitalCard.jsx";
import MapComponent from "./Map.jsx";

const filterTags = [
  { label: "طوارئ 24/7", value: "emergency", category: "EmergencyRoom" },
  { label: "عناية مركزه", value: "icu", category: "ICU" },
  { label: "حضانة أطفال", value: "nursery", category: "NICU" },
  { label: "بنك دم", value: "blood-bank", category: "BloodBank" },
];

export const SearchSection = () => {
  const { results, searchByCategory, searchByKeyword, clearResults, loading } =
    useSearch();
  const [keyword, setKeyword] = useState("");
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    clearResults();
  }, []);

  const handleKeywordSearch = () => {
    if (!keyword.trim()) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        searchByKeyword(keyword, lat, lon);
      },
      () => {
        searchByKeyword(keyword);
      },
    );
  };

  const handleCategorySearch = (cat) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        searchByCategory(cat, lat, lon);
      },
      () => {
        searchByCategory(cat);
      },
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 max-w-[848px] px-4 md:px-0">
      {/* Search Input */}
      <div className="flex items-center gap-2 md:gap-4 w-full">
        <div className="flex items-center justify-end gap-2 px-4 md:px-8 py-2 md:py-3 flex-1 rounded-3xl border border-solid border-Blue-900/40">
          <Input
            className="font-Cairo text-Blue-900 text-base md:text-xl [direction:rtl] w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto placeholder:text-gray-400"
            placeholder="بحث"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleKeywordSearch()}
          />
          <button
            type="button"
            onClick={handleKeywordSearch}
            className="cursor-pointer focus:outline-none"
            aria-label="بحث"
          >
            <SearchIcon className="w-5 h-5 md:w-6 md:h-6 text-Blue" />
          </button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full [direction:rtl]">
        <Button
          onClick={() => setShowMap(!showMap)}
          className="inline-flex items-center justify-center w-full md:w-[84px] h-[53px] gap-1 px-6 py-2 bg-Blue rounded-3xl shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue/90 transition-colors order-1 md:order-2"
          type="button"
        >
          <Map className="w-5 h-5 md:w-6 md:h-6" />
          <span className="font-Cairo text-white text-sm md:hidden">
            الخريطة
          </span>
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full order-2 md:order-1">
          {filterTags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => handleCategorySearch(tag.category)}
              className="inline-flex items-center justify-center gap-1 px-3 md:px-6 lg:px-8 py-2 h-auto bg-Blue-200 rounded-3xl overflow-hidden shadow-[0px_0px_4px_#f0d5a880] hover:bg-Blue-200/90 active:bg-Blue-300 transition-colors cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-Blue-900/50"
              type="button"
              aria-label={`بحث عن ${tag.label}`}
            >
              <div className="font-Cairo text-Blue-900 text-xs md:text-base lg:text-xl [direction:rtl] whitespace-nowrap">
                {tag.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full">
        {loading && (
          <p className="text-center text-gray-500 [direction:rtl]">
            جاري التحميل...
          </p>
        )}

        { results.length === 0 && (
          <p className="text-center text-gray-500 [direction:rtl]">
            لا توجد نتائج للبحث.
          </p>
        )}

        {!loading && results.length > 0 && !showMap && (
          <div className="mt-6 mb-4 w-full px-2 md:px-0">
            <div className="py-4 md:py-6 border border-Blue-900 rounded-2xl bg-Blue-200 flex flex-col md:flex-row md:flex-wrap items-center gap-4 md:gap-6 justify-center overflow-x-auto md:overflow-visible">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)] min-w-70 max-w-100 "
                >
                  <HospitalCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && results.length > 0 && showMap && (
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] mb-10 rounded-lg overflow-hidden border border-Blue-900 mt-4">
            <MapComponent results={results} />
          </div>
        )}
      </div>
    </div>
  );
};
