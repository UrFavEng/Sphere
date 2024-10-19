"use client";
import React, { useState } from "react";
import Add from "./Add";
import { useGetAllVideosQuery } from "@/app/store/apislice";
import AddArticle from "./AddArticle";
import VideoPlayer from "./Video";

const HomeVideos = () => {
  const [addArticle, setAddArticle] = useState<boolean>(false);
  const { data } = useGetAllVideosQuery();
  console.log(data);
  return (
    <div className="w-full sm:col-span-2 justify-self-center  ">
      <Add setAddArticle={setAddArticle} />
      {data?.data.map((video) => (
        <VideoPlayer video={video} />
      ))}
      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
    </div>
  );
};

export default HomeVideos;
