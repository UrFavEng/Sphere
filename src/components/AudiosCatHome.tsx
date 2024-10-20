"use client";
import React, { useState } from "react";
import AddAudio from "./AddAudio";
import AddVideo from "./AddVideo";
import AddArticle from "./AddArticle";
import Audio from "./Audio";
import Add from "./Add";
import { useGetAllAudiosByCatQuery } from "@/app/store/apislice";

const AudiosCatHome = ({ cat }: { cat: string }) => {
  const { data } = useGetAllAudiosByCatQuery(cat);
  console.log(cat);
  const [addArticle, setAddArticle] = useState<boolean>(false);
  const [addVideo, setAddVideo] = useState<boolean>(false);
  const [addAudio, setAddAudio] = useState<boolean>(false);
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

export default AudiosCatHome;
