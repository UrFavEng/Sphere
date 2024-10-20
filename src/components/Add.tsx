import { AudioLines, Newspaper, TvMinimalPlay } from "lucide-react";
import React from "react";
interface AddProps {
  setAddArticle: (val: boolean) => void;
  setAddVideo: (val: boolean) => void;
  setAddAudio: (val: boolean) => void;
}
const Add = ({ setAddArticle, setAddVideo, setAddAudio }: AddProps) => {
  return (
    <div className=" grid grid-cols-3 justify-items-center bg-lightGraySec mb-4 rounded-lg px-2 sm:px-4 py-4 shadow-xl">
      <h1
        onClick={() => setAddArticle(true)}
        className=" flex items-center gap-1 text-primaryDark font-medium md:font-bold text-[14px] md:text-[16px] cursor-pointer hover:text-secondaryGreen transition-all ease-in-out"
      >
        <Newspaper size={16} className="mt-[1px] " />
        Add Article
      </h1>
      <h1
        onClick={() => setAddVideo(true)}
        className=" flex items-center gap-1 text-primaryDark md:font-bold font-medium  text-[14px] md:text-[16px] cursor-pointer hover:text-secondaryGreen transition-all ease-in-out"
      >
        <TvMinimalPlay size={16} className=" mt-[1px]" />
        Add Video
      </h1>
      <h1
        onClick={() => setAddAudio(true)}
        className=" flex items-center gap-1 text-primaryDark  font-medium md:font-bold text-[14px] md:text-[16px] cursor-pointer hover:text-secondaryGreen transition-all ease-in-out"
      >
        <AudioLines size={16} className=" mt-[1px]" />
        Add Audio
      </h1>
    </div>
  );
};

export default Add;
