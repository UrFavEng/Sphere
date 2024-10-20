"use client";
import { useGetAllVideosByTitleQuery } from "@/app/store/apislice";
import CategoryVideos from "@/components/CategoryVideos";
import QuickLinks from "@/components/QuickLinks";
import VideoPlayer from "@/components/Video";
import React from "react";
interface VideosByCatProps {
  params: {
    title: string;
  };
  searchParams: Record<string, string>;
}

const SeachVideo: React.FC<VideosByCatProps> = ({ params }) => {
  const { data } = useGetAllVideosByTitleQuery(params.title);
  console.log(params);
  return (
    <>
      <div className=" container mx-auto px-4 xl:px-0  py-6 grid md:grid-cols-3 xl:grid-cols-4 ">
        <CategoryVideos />
        <div className="w-full col-span-2 justify-self-center  ">
          {" "}
          {data &&
            data.data.map((vid) => (
              <VideoPlayer video={vid} key={vid.documentId} />
            ))}
        </div>
        <div className="justify-self-end hidden xl:block px-4 h-fit    py-4 w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          <QuickLinks />
        </div>
      </div>
    </>
  );
};

export default SeachVideo;
