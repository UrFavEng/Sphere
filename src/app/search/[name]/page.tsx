"use client";
import { useGetAllArticlesByTitleQuery } from "@/app/store/apislice";
import ArticlesCatHome from "@/components/ArticlesCat";
import CategoryArticle from "@/components/CategoryArticle";
import QuickLinks from "@/components/QuickLinks";
import React from "react";
import { PulseLoader } from "react-spinners";
interface SearchArticlesProps {
  params: { name: string };
}
const SearchArticles = ({ params }: SearchArticlesProps) => {
  const { data, isLoading: loadingArtByTitle } = useGetAllArticlesByTitleQuery(
    params.name
  );
  // console.log(data, error);
  return (
    <>
      <div className=" container mx-auto px-4 xl:px-0  py-6 grid md:grid-cols-3 xl:grid-cols-4 ">
        <CategoryArticle />
        <div className="w-full col-span-2 justify-self-center  ">
          {loadingArtByTitle ? (
            <>
              {" "}
              <p className="text-center mt-4">
                {" "}
                <PulseLoader color="#2F3E46" size={12} />
              </p>
            </>
          ) : (
            <> {data && <ArticlesCatHome data={data} />}</>
          )}
        </div>
        <div className="justify-self-end hidden xl:block px-4 h-fit    py-4 w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          <QuickLinks />
        </div>
      </div>
    </>
  );
};

export default SearchArticles;
