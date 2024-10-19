"use client";
import React, { useState } from "react";
import AddArticle from "./AddArticle";
import { useGetAllArticlesQuery } from "@/app/store/apislice";
import Add from "./Add";
import Article from "./Article";
import AddVideo from "./AddVideo";

const HomeArticle = () => {
  const { data, error } = useGetAllArticlesQuery();
  console.log("==>>", data, error);
  const [addArticle, setAddArticle] = useState<boolean>(false);
  const [addVideo, setAddVideo] = useState<boolean>(false);

  return (
    <div className="w-full sm:col-span-2 justify-self-center  ">
      <Add setAddArticle={setAddArticle} setAddVideo={setAddVideo} />

      {data?.data.map((art) => (
        <Article art={art} key={art.documentId} />
      ))}

      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      {addVideo && <AddVideo setAddVideo={setAddVideo} />}
    </div>
  );
};

export default HomeArticle;
