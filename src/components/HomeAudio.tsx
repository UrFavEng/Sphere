"use client";
import React, { useState } from "react";
import Add from "./Add";
import { useGetAllAudiosQuery } from "@/app/store/apislice";
import AddArticle from "./AddArticle";
import AddVideo from "./AddVideo";
import Audio from "./Audio";
import AddAudio from "./AddAudio";

const HomeAudio = () => {
  const [addAudio, setAddAudio] = useState<boolean>(false);

  const [addArticle, setAddArticle] = useState<boolean>(false);
  const [addVideo, setAddVideo] = useState<boolean>(false);
  const { data } = useGetAllAudiosQuery();
  return (
    <div className="w-full sm:col-span-2 justify-self-center  ">
      <Add
        setAddArticle={setAddArticle}
        setAddVideo={setAddVideo}
        setAddAudio={setAddAudio}
      />
      {data?.data.map((audio) => (
        <Audio audio={audio} key={audio.documentId} />
      ))}
      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      {addVideo && <AddVideo setAddVideo={setAddVideo} />}{" "}
      {addAudio && <AddAudio setAddAudio={setAddAudio} />}
    </div>
  );
};

export default HomeAudio;
