"use client";
import { useGetAllArticlesByTitleQuery } from "@/app/store/apislice";
import ArticlesCatHome from "@/components/ArticlesCat";
import CategoryArticle from "@/components/CategoryArticle";
import QuickLinks from "@/components/QuickLinks";
import React from "react";
interface SearchArticlesProps {
  params: { name: string };
}
const SearchArticles = ({ params }: SearchArticlesProps) => {
  const { data, error } = useGetAllArticlesByTitleQuery(params.name);
  console.log(data, error);
  return (
    <>
      <div className=" container mx-auto  py-6 grid grid-cols-4 ">
        <CategoryArticle />
        <div className="w-full col-span-2 justify-self-center  ">
          {" "}
          {data && <ArticlesCatHome data={data} />}
        </div>
        <QuickLinks />{" "}
      </div>
    </>
  );
};

export default SearchArticles;
