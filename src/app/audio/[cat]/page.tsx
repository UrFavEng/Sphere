import AudiosCatHome from "@/components/AudiosCatHome";
import CategoryAudio from "@/components/CategoryAudio";
import QuickLinks from "@/components/QuickLinks";
import React from "react";
interface VideosByCatProps {
  params: {
    cat: string;
  };
  searchParams: Record<string, string>;
}
const AudiosByCat: React.FC<VideosByCatProps> = ({ params }) => {
  return (
    <div className=" container mx-auto px-4 xl:px-0 gap-4 md:gap-0 py-6 grid md:grid-cols-3 xl:grid-cols-4 ">
      {" "}
      <CategoryAudio />
      <AudiosCatHome cat={params.cat} />
      <div className="justify-self-end hidden xl:block px-4 h-fit    py-4 w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
        <QuickLinks />
      </div>
    </div>
  );
};

export default AudiosByCat;
