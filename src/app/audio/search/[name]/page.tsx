"use client";
import { useGetAllAudiosByTitleQuery } from "@/app/store/apislice";
import Audio from "@/components/Audio";
import CategoryAudio from "@/components/CategoryAudio";
import QuickLinks from "@/components/QuickLinks";
import React from "react";
import { PulseLoader } from "react-spinners";
interface VideosByCatProps {
  params: {
    name: string;
  };
  searchParams: Record<string, string>;
}
const SearchAudio: React.FC<VideosByCatProps> = ({ params }) => {
  const { data, isLoading: loadingGetAllAudByTitle } =
    useGetAllAudiosByTitleQuery(params.name);
  console.log(data);
  return (
    <>
      <div className=" container mx-auto px-4 xl:px-0  py-6 grid md:grid-cols-3 xl:grid-cols-4 ">
        <CategoryAudio />
        <div className="w-full col-span-2 justify-self-center  ">
          {loadingGetAllAudByTitle ? (
            <p className=" text-center mt-12">
              {" "}
              <PulseLoader color="#2F3E46" size={12} />
            </p>
          ) : (
            <>
              {" "}
              {data &&
                data.data.map((aud) => (
                  <Audio audio={aud} key={aud.documentId} />
                ))}
            </>
          )}
        </div>
        <div className="justify-self-end hidden xl:block px-4 h-fit    py-4 w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          <QuickLinks />
        </div>
      </div>
    </>
  );
};

export default SearchAudio;
