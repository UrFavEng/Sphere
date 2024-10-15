"use client";
import { useGetAllArticlesByCatQuery } from "@/app/store/apislice";
import Add from "@/components/Add";
import AddArticle from "@/components/AddArticle";
import ArticlesCatHome from "@/components/ArticlesCat";
import CategoryArticle from "@/components/CategoryArticle";
import QuickLinks from "@/components/QuickLinks";
import React, { useState } from "react";
interface ArticlesCatProps {
  params: { cat: string };
}
const ArticlesCat = ({ params }: ArticlesCatProps) => {
  const { data, error } = useGetAllArticlesByCatQuery(params.cat);
  console.log(data, error);
  const [addArticle, setAddArticle] = useState<boolean>(false);

  return (
    <>
      <div className=" container mx-auto  py-6 grid grid-cols-4 ">
        <CategoryArticle />
        <div className="w-full col-span-2 justify-self-center  ">
          {" "}
          <Add setAddArticle={setAddArticle} />{" "}
          {data && <ArticlesCatHome data={data} />}
        </div>
        <QuickLinks />{" "}
        {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      </div>
    </>
  );
};

export default ArticlesCat;
