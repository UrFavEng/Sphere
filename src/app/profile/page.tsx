"use client";
import React, { useState } from "react";
import { useGetAllReviewsByUserQuery, useGetMeQuery } from "../store/apislice";
import { getmeRES } from "../store/types";
import Add from "@/components/Add";
import AddArticle from "@/components/AddArticle";
import Article from "@/components/Article";
import Image from "next/image";
import { Rating } from "@mui/material";
import EditProfile from "@/components/EditProfile";
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
const Profile = () => {
  const [section, setSection] = useState<string>("Articles");
  const [addArticle, setAddArticle] = useState<boolean>();
  const { data, error: err } = useGetMeQuery();
  console.log(data, err);
  const { data: reviews } = useGetAllReviewsByUserQuery(data?.documentId);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [editPropfile, setEditPropfile] = useState<boolean>();
  console.log(data?.reviews);
  return (
    <div className=" pb-4">
      {" "}
      <section className="relative  container mx-auto pt-[60px] pb-10">
        <div
          //   src="https://pagedone.io/asset/uploads/1705473378.png"
          //   alt="cover-image"
          className="w-full absolute rounded-b-lg top-[-10px] left-0 z-0 h-40 object-cover shadow-xl border-b-secondaryGreen bg-primaryDark"
        />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <Image
              src={
                data?.image?.formats?.small?.url
                  ? data?.image.formats.small.url
                  : "/undraw_male_avatar_g98d.svg"
              }
              alt="user-avatar-image"
              className="border-2 border-solid w-[170px] h-[170px] border-white rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope capitalize font-bold text-4xl text-gray-900 mb-1">
                {data?.username}
              </h3>
              <p className="font-normal mt-[-8px] text-base leading-7 text-gray-500">
                {data?.email}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 ">
              <p className="flex items-center gap-2 font-medium text-lg leading-8 text-primaryDark ">
                Actice
                <svg
                  className=" mt-[2px]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.78135 5.55191C9.4453 3.5173 9.77728 2.5 10.3928 2.5C11.0083 2.5 11.3403 3.5173 12.0043 5.55191L12.2949 6.44244C12.4784 7.00479 12.5701 7.28596 12.7928 7.44706C13.0155 7.60816 13.3125 7.60816 13.9063 7.60816H14.8683C17.0355 7.60816 18.119 7.60816 18.3081 8.19335C18.4972 8.77854 17.6169 9.40763 15.8563 10.6658L15.0921 11.2118C14.6069 11.5586 14.3643 11.732 14.278 11.9937C14.1918 12.2554 14.2841 12.5382 14.4687 13.1038L14.7569 13.9872C15.4209 16.0218 15.7529 17.0391 15.2549 17.3993C14.7569 17.7595 13.8878 17.1308 12.1496 15.8733L11.3887 15.323C10.9083 14.9754 10.6681 14.8016 10.3928 14.8016C10.1175 14.8016 9.87731 14.9754 9.39687 15.323L8.63605 15.8733C6.89779 17.1308 6.02866 17.7595 5.5307 17.3993C5.03273 17.0391 5.36471 16.0218 6.02866 13.9872L6.31927 13.0966C6.50278 12.5343 6.59454 12.2531 6.50948 11.9924C6.42441 11.7318 6.18419 11.558 5.70375 11.2104L4.94293 10.6601C3.20467 9.40261 2.33555 8.77389 2.52575 8.19102C2.71596 7.60816 3.79026 7.60816 5.93886 7.60816H6.87929C7.47315 7.60816 7.77008 7.60816 7.99277 7.44706C8.21547 7.28596 8.30723 7.00479 8.49074 6.44244L8.78135 5.55191Z"
                    stroke="#354F52"
                    stroke-width="1.6"
                  />
                </svg>
              </p>
              <div className="flex items-center max-sm:justify-center max-sm:flex-wrap gap-2.5">
                <a
                  href="#section"
                  onClick={() => setSection("Articles")}
                  className="py-3.5 px-7 rounded-full bg-lightGraySec font-semibold text-base leading-7 text-gray-700"
                >
                  ({data?.articles && data?.articles?.length / 2}) Articles
                </a>
                <a
                  href="#section"
                  onClick={() => setSection("Reviews")}
                  className="py-3.5 px-7 rounded-full bg-lightGraySec font-semibold text-base leading-7 text-gray-700"
                >
                  ({reviews?.data?.length}) Reviews
                </a>
                <a
                  href="#section"
                  onClick={() => setSection("Comments")}
                  className="py-3.5 px-7 rounded-full bg-lightGraySec font-semibold text-base leading-7 text-gray-700"
                >
                  (5) Comments
                </a>
              </div>
            </div>
          </div>
          <div className="flex mt-8 flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEditPropfile(true)}
                className="py-3.5 px-5 rounded-full bg-primaryDark text-lightGraySec font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-100  hover:bg-secondaryGreen hover:text-primaryDark"
              >
                Edit Profile
              </button>
            </div>
            <div className=" w-[480px] mt-4">
              <Add setAddArticle={setAddArticle} />
            </div>
          </div>
        </div>
      </section>
      <div id="section" />
      {section == "Articles" && (
        <>
          {" "}
          <h2
            id="Articles"
            className=" container mx-auto px-4 text-secondaryDark font-semibold mb-2 text-[32px]"
          >
            Articles
          </h2>
          <section className=" grid grid-cols-2 container mx-auto gap-4 px-4">
            {data?.articles?.map(
              (art) =>
                !art.publishedAt && (
                  <div key={art.documentId} className="w-full">
                    <Article art={art} />
                  </div>
                )
            )}
          </section>
        </>
      )}
      {section == "Reviews" && (
        <>
          {" "}
          <>
            {" "}
            <h2
              id="Reviews"
              className=" container mx-auto px-4 text-secondaryDark font-semibold mb-2 text-[32px]"
            >
              Reviews
            </h2>
            <section className=" grid grid-cols-2 container mx-auto gap-4 px-4">
              {data?.reviews?.map(
                (rev) =>
                  !rev.publishedAt && (
                    <div
                      key={rev?.documentId}
                      className="w-full bg-lightGraySec mb-8 place-self-start shadow-xl py-4 px-4 rounded-lg"
                    >
                      <div className=" flex items-start justify-between">
                        <div className=" flex items-start gap-2">
                          {" "}
                          <Image
                            alt="photo"
                            width={45}
                            height={45}
                            className=" w-[45px] h-[45px] object-cover rounded-full"
                            src={
                              rev?.article?.user?.image?.url ??
                              "/undraw_male_avatar_g98d.svg"
                            }
                          />
                          <div>
                            {" "}
                            <h2 className=" capitalize mt-1 text-primaryDark font-medium text-[14px]">
                              {rev?.article?.user?.username}
                            </h2>{" "}
                            <p className=" text-[10px]  mt-[-2px] font-medium text-primaryGreen">
                              {rev?.article?.publishedAt &&
                                formatDate(rev?.article?.publishedAt as string)}
                            </p>
                          </div>
                        </div>
                        <p className=" capitalize text-[13px] cursor-pointer font-medium text-secondaryDark">
                          {rev?.article?.category?.name}
                        </p>
                      </div>
                      <div className=" mt-3 pl-1">
                        <h1 className=" capitalize text-primaryDark font-semibold text-[18px]">
                          {rev?.article?.title}
                        </h1>
                        <p
                          onClick={() => setShowMore(!showMore)}
                          className={` cursor-pointer ${
                            !showMore && "line-clamp-3"
                          } border-secondaryDark transition-all ease-in-out  leading-[20px] font-medium text-[16px] text-primaryGreen`}
                        >
                          {rev?.article?.content}
                        </p>
                        <div className="">
                          <span className=" text-primaryGreen block w-[8%] mt-3 text-[16px] font-bold border-t-2 border-primaryDark">
                            Tags
                          </span>
                          <p className=" mt-[-4px]">
                            <span className="text-[12px] font-medium cursor-pointer text-secondaryDark hover:text-secondaryGreen transition-all ease-in-out">
                              {rev?.article?.tags?.map((tag: string) => (
                                <span key={tag} className=" capitalize">
                                  {" "}
                                  {tag}{" "}
                                </span>
                              ))}
                            </span>
                          </p>
                        </div>
                        {rev?.article?.image?.url && (
                          <div className="mt-4 border-2 shadow-sm rounded-lg overflow-hidden">
                            <Image
                              alt="photo"
                              width={700}
                              height={700}
                              src={rev?.article?.image?.url}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <div
                          key={rev.documentId}
                          className=" bg-lightGray my-2 rounded-lg  py-2 px-3"
                        >
                          <div className=" flex justify-between">
                            {" "}
                            <div className=" flex gap-3">
                              <div>
                                <Image
                                  className=" w-[35px] h-[35px] object-cover rounded-full"
                                  alt="photo"
                                  width={35}
                                  height={35}
                                  src={
                                    data?.image?.formats?.small?.url ??
                                    "/undraw_male_avatar_g98d.svg"
                                  }
                                />
                              </div>
                              <div>
                                <h1 className=" text-[14px] font-medium text-primaryDark capitalize">
                                  {data?.username}
                                </h1>
                                <Rating
                                  className="ml-[-8px]"
                                  name="read-only"
                                  value={rev.rating}
                                  readOnly
                                  size="small"
                                />
                              </div>
                            </div>{" "}
                            <p className=" text-[10px] tracking-tight text-secondaryDark">
                              {rev?.publishedAt && formatDate(rev?.publishedAt)}
                            </p>
                          </div>

                          <div className=" flex items-center gap-1 mt-2">
                            <p className="pl-2 text-primaryDark text-[14px] font-medium">
                              {rev?.comment}
                            </p>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </section>
          </>
        </>
      )}
      <div className=" mb-4 border-b-primaryDark border-b-2 bg-lightGraySec w-full container mx-auto h-[40px] rounded-b-xl shadow-lg"></div>
      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      {editPropfile && (
        <EditProfile
          dataUser={data as getmeRES}
          setEditPropfile={setEditPropfile}
        />
      )}
    </div>
  );
};

export default Profile;
