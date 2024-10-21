"use client";
import React, { useState } from "react";
import Add from "./Add";
import { useGetAllVideosQuery } from "@/app/store/apislice";
import AddArticle from "./AddArticle";
import VideoPlayer from "./Video";
import AddVideo from "./AddVideo";
import AddAudio from "./AddAudio";
import { PulseLoader } from "react-spinners";

const HomeVideos = () => {
  const [addAudio, setAddAudio] = useState<boolean>(false);

  const [addArticle, setAddArticle] = useState<boolean>(false);
  const [addVideo, setAddVideo] = useState<boolean>(false);
  const { data, isLoading } = useGetAllVideosQuery();
  console.log(data);
  return (
    <div className="w-full sm:col-span-2 justify-self-center  ">
      <Add
        setAddArticle={setAddArticle}
        setAddVideo={setAddVideo}
        setAddAudio={setAddAudio}
      />
      {isLoading ? (
        <>
          {" "}
          <p className="text-center mt-4">
            {" "}
            <PulseLoader color="#2F3E46" size={12} />
          </p>
          s
        </>
      ) : (
        <>
          {" "}
          {data?.data.map((video) => (
            <VideoPlayer video={video} key={video.documentId} />
          ))}
        </>
      )}
      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      {addVideo && <AddVideo setAddVideo={setAddVideo} />}{" "}
      {addAudio && <AddAudio setAddAudio={setAddAudio} />}
    </div>
  );
};

export default HomeVideos;
