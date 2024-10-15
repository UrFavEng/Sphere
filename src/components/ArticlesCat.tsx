"use client";
import React from "react";
// import AddArticle from "./AddArticle";
import { GetAllArticles } from "@/app/store/types";
import Article from "./Article";
interface ArticlesCatHomeProps {
  data: GetAllArticles;
}
const ArticlesCatHome = ({ data }: ArticlesCatHomeProps) => {
  return (
    <>
      {/* <Add setAddArticle={setAddArticle} /> */}
      {data.data.map((art) => (
        <Article art={art} key={art.documentId} />
      ))}
    </>
  );
};

export default ArticlesCatHome;
