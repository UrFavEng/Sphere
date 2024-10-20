"use client";
import React, { useState } from "react";
import Add from "./Add";
import { useGetAllVideosQuery } from "@/app/store/apislice";
import AddArticle from "./AddArticle";
import VideoPlayer from "./Video";
import AddVideo from "./AddVideo";

const HomeVideos = () => {
  const [addArticle, setAddArticle] = useState<boolean>(false);
  const [addVideo, setAddVideo] = useState<boolean>(false);
  const { data } = useGetAllVideosQuery();
  console.log(data);
  return (
    <div className="w-full sm:col-span-2 justify-self-center  ">
      <Add setAddArticle={setAddArticle} setAddVideo={setAddVideo} />
      {data?.data.map((video) => (
        <VideoPlayer video={video} key={video.documentId} />
      ))}
      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      {addVideo && <AddVideo setAddVideo={setAddVideo} />}
    </div>
  );
};

export default HomeVideos;
