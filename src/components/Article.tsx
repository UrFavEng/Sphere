import { GetAllArticlesArticle } from "@/app/store/types";
import { MessageCircle, Pencil, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ReviewArticle from "./ReviewArticle";
import CommentArticle from "./CommentArticle";
import { useGetMeQuery } from "@/app/store/apislice";
import UpdateArticle from "./UpdateArticle";
import DeleteArticle from "./DeleteArticle";
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
interface ArticleProps {
  art: GetAllArticlesArticle;
}
const Article = ({ art }: ArticleProps) => {
  const { data } = useGetMeQuery();
  const [deleteArticle, setDeleteArticle] = useState<boolean>(false);
  const [editArticle, setEditArticle] = useState<boolean>();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [reviewsArticle, setReviewsArticle] = useState<boolean>(false);
  const [commentsArticle, setCommentsArticle] = useState<boolean>(false);
  //   return;
  return (
    <div
      key={art.documentId}
      className=" bg-lightGraySec mb-8 place-self-start shadow-xl py-4 px-4 rounded-lg"
    >
      <div className=" flex items-start justify-between">
        <div className=" flex items-start gap-2">
          {" "}
          <Image
            alt="photo"
            width={45}
            height={45}
            className="object-cover w-[45px] h-[45px] rounded-full"
            src={
              art?.user?.image?.formats?.small?.url
                ? art?.user?.image.formats.small.url
                : "/undraw_male_avatar_g98d.svg"
            }
          />
          <div>
            {" "}
            <h2 className=" capitalize mt-1 text-primaryDark font-medium text-[14px]">
              {art?.user?.username}
            </h2>{" "}
            <p className=" text-[10px]  mt-[-2px] font-medium text-primaryGreen">
              {art?.publishedAt && formatDate(art?.publishedAt as string)}{" "}
            </p>
          </div>
        </div>
        <p className=" flex items-center gap-1 capitalize text-[10px] cursor-pointer font-medium text-secondaryDark">
          {art?.category?.name}{" "}
          {data?.documentId == art?.user?.documentId && (
            <p className=" flex items-center gap-2">
              {" "}
              <Pencil
                size={16}
                onClick={() => setEditArticle(true)}
                className="text-primaryDark mt-[2px]  cursor-pointer"
              />
              <Trash2
                size={16}
                onClick={() => setDeleteArticle(true)}
                className="text-orange-600 mt-[2px]  cursor-pointer"
              />
            </p>
          )}
        </p>
      </div>
      <div className=" mt-3 pl-1">
        <h1 className=" capitalize text-primaryDark font-semibold text-[18px]">
          {art.title}
        </h1>
        <p
          onClick={() => setShowMore(!showMore)}
          className={` cursor-pointer ${
            !showMore && "line-clamp-3"
          } border-secondaryDark transition-all ease-in-out  leading-[20px] font-medium text-[16px] text-primaryGreen`}
        >
          {art?.content && <> {art?.content}</>}
        </p>
        <div className="">
          <span className=" text-primaryGreen block w-[8%] mt-3 text-[16px] font-bold border-t-2 border-primaryDark">
            Tags
          </span>
          <p className=" mt-[-4px]">
            <span className="text-[12px] font-medium cursor-pointer text-secondaryDark hover:text-secondaryGreen transition-all ease-in-out">
              {art.tags?.map((tag) => (
                <span key={tag} className=" capitalize">
                  {" "}
                  {tag}{" "}
                </span>
              ))}
            </span>
          </p>
        </div>
        <div className="mt-4 border-2 shadow-sm rounded-lg overflow-hidden">
          {art?.image?.url && (
            <Image
              alt="photo"
              width={700}
              height={700}
              src={art?.image?.url}
              className="object-contain w-full h-full"
            />
          )}
        </div>

        <div className=" flex items-center justify-start gap-5 pl-1 mt-4">
          <button
            onClick={() => setReviewsArticle(true)}
            className=" text-primaryDark flex items-center gap-1 mt-[1px]  w-fit justify-self-center font-medium text-[14px]"
          >
            {art.reviews.length} Review{" "}
            <Star size={16} className="  mt-[1px]" />
          </button>
          <button
            onClick={() => setCommentsArticle(true)}
            className=" text-primaryDark flex items-center gap-1   w-fit justify-self-center font-medium text-[14px]"
          >
            {art?.comments?.length} Comment{" "}
            <MessageCircle size={16} className="  mt-[1px]" />
          </button>
        </div>
      </div>
      {reviewsArticle && (
        <ReviewArticle
          setReviewsArticle={setReviewsArticle}
          reviews={art.reviews}
        />
      )}
      {commentsArticle && (
        <CommentArticle setCommentsArticle={setCommentsArticle} />
      )}
      {editArticle && (
        <UpdateArticle setEditArticle={setEditArticle} art={art} />
      )}
      {deleteArticle && (
        <DeleteArticle
          setDeleteArticle={setDeleteArticle}
          id={art.documentId}
        />
      )}
    </div>
  );
};

export default Article;
