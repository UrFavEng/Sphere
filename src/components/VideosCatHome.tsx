import React, { useState } from "react";
import VideoPlayer from "./Video";
import AddArticle from "./AddArticle";
import AddVideo from "./AddVideo";
import Add from "./Add";
import { useGetAllVideosByCatQuery } from "@/app/store/apislice";
import AddAudio from "./AddAudio";

const VideosCatHome = ({ cat }: { cat: string }) => {
  const { data } = useGetAllVideosByCatQuery(cat.toLocaleLowerCase());
  console.log(data);
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
      {data?.data.map((video) => (
        <VideoPlayer video={video} key={video.documentId} />
      ))}
      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      {addVideo && <AddVideo setAddVideo={setAddVideo} />}{" "}
      {addAudio && <AddAudio setAddAudio={setAddAudio} />}
    </div>
  );
};

export default VideosCatHome;
