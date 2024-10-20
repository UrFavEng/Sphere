"use client";
import { useGetAllArticlesByCatQuery } from "@/app/store/apislice";
import Add from "@/components/Add";
import AddArticle from "@/components/AddArticle";
import AddAudio from "@/components/AddAudio";
import AddVideo from "@/components/AddVideo";
import ArticlesCatHome from "@/components/ArticlesCat";
import CategoryArticle from "@/components/CategoryArticle";
import QuickLinks from "@/components/QuickLinks";
import React, { useState } from "react";
interface ArticlesCatProps {
  params: { cat: string };
}
const ArticlesCat = ({ params }: ArticlesCatProps) => {
  const { data } = useGetAllArticlesByCatQuery(params.cat);
  // console.log(data, error);
  const [addArticle, setAddArticle] = useState<boolean>(false);
  const [addVideo, setAddVideo] = useState<boolean>(false);
  const [addAudio, setAddAudio] = useState<boolean>(false);

  return (
    <>
      <div className=" container mx-auto  py-6 px-4 xl:px-0 grid md:grid-cols-3 xl:grid-cols-4 ">
        <CategoryArticle />
        <div className="w-full col-span-2 justify-self-center  ">
          {" "}
          <Add
            setAddAudio={setAddAudio}
            setAddArticle={setAddArticle}
            setAddVideo={setAddVideo}
          />{" "}
          {data && <ArticlesCatHome data={data} />}
        </div>
        <div className="justify-self-end hidden xl:block px-4 h-fit    py-4 w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          <QuickLinks />
        </div>
        {addArticle && <AddArticle setAddArticle={setAddArticle} />}{" "}
        {addVideo && <AddVideo setAddVideo={setAddVideo} />}{" "}
        {addAudio && <AddAudio setAddAudio={setAddAudio} />}
      </div>
    </>
  );
};

export default ArticlesCat;
