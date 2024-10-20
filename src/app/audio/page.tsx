import CategoryAudio from "@/components/CategoryAudio";
import HomeAudio from "@/components/HomeAudio";
import QuickLinks from "@/components/QuickLinks";
import React from "react";

const page = () => {
  return (
    <div className=" container mx-auto px-4 xl:px-0 gap-4 md:gap-0 py-6 grid md:grid-cols-3 xl:grid-cols-4 ">
      {" "}
      <CategoryAudio />
      <HomeAudio />
      <div className="justify-self-end hidden xl:block px-4 h-fit    py-4 w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
        <QuickLinks />
      </div>
    </div>
  );
};

export default page;