"use client";
import React, { useState } from "react";
import { useGetMeQuery, useGetMeVideosQuery } from "../store/apislice";
import { getmeRES } from "../store/types";
import Add from "@/components/Add";
import AddArticle from "@/components/AddArticle";
import Article from "@/components/Article";
import Image from "next/image";
import { Rating } from "@mui/material";
import EditProfile from "@/components/EditProfile";
import ProfileCard from "@/components/ProfileCard";
import InfoUser from "@/components/InfoUser";
import { Pencil, Trash2 } from "lucide-react";
import DeleteCommment from "@/components/DeleteCommment";
import EditComment from "@/components/EditComment";
import DeleteReview from "@/components/DeleteReview";
import EditReview from "@/components/EditReview";
import AddVideo from "@/components/AddVideo";
import VideoPlayer from "@/components/Video";
import AddAudio from "@/components/AddAudio";
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
  const [deleteCommment, setDeleteComment] = useState(false);
  const [deleteReview, setDeleteReview] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [updateCommment, setUpdateComment] = useState(false);
  const [section, setSection] = useState<string>("Articles");
  const [addArticle, setAddArticle] = useState<boolean>();
  const [addVideo, setAddVideo] = useState<boolean>();
  const { data } = useGetMeQuery();
  const [showMore, setShowMore] = useState<boolean>(false);
  const [editPropfile, setEditPropfile] = useState<boolean>();
  const { data: videos, error } = useGetMeVideosQuery();
  const [addAudio, setAddAudio] = useState<boolean>(false);

  console.log("==>>--|--<<==", videos?.videos, error);
  return (
    <div className=" pb-4">
      <div className="content-start px-4 xl:px-0 container mx-auto  py-6 grid gap-4 md:gap-0  md:grid-cols-3 xl:grid-cols-4 ">
        <ProfileCard setSection={setSection} />
        <div className="w-full col-span-2 justify-self-center md:block hidden ">
          <Add
            setAddArticle={setAddArticle}
            setAddVideo={setAddVideo}
            setAddAudio={setAddAudio}
          />
          <section className="section">
            {" "}
            {section === "Articles" && (
              <>
                {" "}
                {data?.articles?.map(
                  (art) =>
                    !art.publishedAt && (
                      <div key={art.documentId} className="w-full">
                        <Article art={art} />
                      </div>
                    )
                )}
              </>
            )}
            {section === "Videos" && (
              <>
                {" "}
                {videos?.videos?.map(
                  (vid) =>
                    !vid.publishedAt && (
                      <div key={vid.documentId} className="w-full">
                        <VideoPlayer video={vid} />
                      </div>
                    )
                )}
              </>
            )}
            {section === "Reviews" && (
              <>
                {" "}
                <>
                  <h2
                    id="Reviews"
                    className=" container mx-auto px-4 text-secondaryDark font-semibold mb-2 text-[32px]"
                  >
                    Reviews
                  </h2>
                  <section className=" grid  container mx-auto gap-4 px-4">
                    {data?.reviews?.map(
                      (rev) =>
                        !rev.publishedAt && (
                          <div
                            key={rev?.documentId}
                            className="w-full bg-lightGraySec mb-8 place-self-start shadow-xl py-4 px-4 rounded-lg"
                          >
                            {deleteReview && (
                              <DeleteReview
                                idReview={rev.documentId}
                                setDeleteReview={setDeleteReview}
                              />
                            )}{" "}
                            {showEditReview && (
                              <EditReview
                                setShowEdit={setShowEditReview}
                                review={rev}
                              />
                            )}
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
                                    {rev?.article?.publishedAt
                                      ? formatDate(
                                          rev?.article?.publishedAt as string
                                        )
                                      : formatDate(
                                          rev?.article?.createdAt as string
                                        )}
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
                                  <p className=" flex items-start gap-2 text-[10px] tracking-tight text-secondaryDark">
                                    {rev?.publishedAt
                                      ? formatDate(rev?.publishedAt)
                                      : formatDate(rev?.createdAt)}{" "}
                                    <p className=" flex items-center gap-2">
                                      {" "}
                                      <Pencil
                                        size={14}
                                        onClick={() => setShowEditReview(true)}
                                        className="text-primaryDark cursor-pointer"
                                      />
                                      <Trash2
                                        size={14}
                                        onClick={() => setDeleteReview(true)}
                                        className="text-orange-600   cursor-pointer"
                                      />
                                    </p>
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
            )}{" "}
            {section === "Comments" && (
              <>
                {" "}
                <>
                  <h2
                    id="Reviews"
                    className=" container mx-auto px-4 text-secondaryDark font-semibold mb-2 text-[32px]"
                  >
                    Comments
                  </h2>
                  <section className=" grid  container mx-auto gap-4 px-4">
                    {data?.comments?.map(
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
                                    {rev?.article?.publishedAt
                                      ? formatDate(
                                          rev?.article?.publishedAt as string
                                        )
                                      : formatDate(
                                          rev?.article?.createdAt as string
                                        )}
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
                                      {/* <Rating
                                          className="ml-[-8px]"
                                          name="read-only"
                                          value={rev.rating}
                                          readOnly
                                          size="small"
                                        /> */}
                                    </div>
                                  </div>{" "}
                                  <p className=" flex items-center gap-2 text-[8px] tracking-tight text-secondaryDark">
                                    {rev?.publishedAt
                                      ? formatDate(rev?.publishedAt)
                                      : formatDate(rev?.createdAt)}
                                    {data?.documentId ==
                                      rev?.user?.documentId && (
                                      <p className=" flex items-center gap-2">
                                        {" "}
                                        <Pencil
                                          size={14}
                                          onClick={() => setUpdateComment(true)}
                                          className="text-primaryDark cursor-pointer"
                                        />
                                        <Trash2
                                          size={14}
                                          onClick={() => setDeleteComment(true)}
                                          className="text-orange-600   cursor-pointer"
                                        />
                                      </p>
                                    )}
                                  </p>
                                </div>

                                <div className=" flex items-center gap-1 mt-2">
                                  <p className="pl-2 text-primaryDark text-[14px] font-medium">
                                    {rev?.content}
                                  </p>{" "}
                                </div>
                              </div>
                            </div>
                            {deleteCommment && (
                              <DeleteCommment
                                idComment={rev.documentId}
                                setDeleteComment={setDeleteComment}
                              />
                            )}
                            {updateCommment && (
                              <EditComment
                                rev={rev}
                                setShowEditComment={setUpdateComment}
                              />
                            )}
                          </div>
                        )
                    )}
                  </section>
                </>
              </>
            )}
          </section>
        </div>
        <div className=" hidden xl:block h-full md:justify-self-start md:mt-5 xl:mt-0 xl:justify-self-end px-4 md:h-fit  py-4 w-full  md:w-[95%] lg:w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          <InfoUser />
        </div>
        <div className="w-full md:col-span-2 justify-self-center md:hidden block ">
          <Add
            setAddArticle={setAddArticle}
            setAddVideo={setAddVideo}
            setAddAudio={setAddAudio}
          />
          <section className="section">
            {section === "Articles" && (
              <>
                {" "}
                {data?.articles?.map(
                  (art) =>
                    !art.publishedAt && (
                      <div key={art.documentId} className="w-full">
                        <Article art={art} />
                      </div>
                    )
                )}
              </>
            )}
            {section === "Reviews" && (
              <>
                {" "}
                <>
                  <h2
                    id="Reviews"
                    className=" container mx-auto px-4 text-secondaryDark font-semibold mb-2 text-[32px]"
                  >
                    Reviews
                  </h2>
                  <section className=" grid  container mx-auto gap-4 px-4">
                    {data?.reviews?.map(
                      (rev) =>
                        !rev.publishedAt && (
                          <div
                            key={rev?.documentId}
                            className="w-full bg-lightGraySec mb-8 place-self-start shadow-xl py-4 px-4 rounded-lg"
                          >
                            {deleteReview && (
                              <DeleteReview
                                idReview={rev.documentId}
                                setDeleteReview={setDeleteReview}
                              />
                            )}{" "}
                            {showEditReview && (
                              <EditReview
                                setShowEdit={setShowEditReview}
                                review={rev}
                              />
                            )}
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
                                    {rev?.article?.publishedAt
                                      ? formatDate(
                                          rev?.article?.publishedAt as string
                                        )
                                      : formatDate(
                                          rev?.article?.createdAt as string
                                        )}
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
                                <div className=" flex justify-between items-start">
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
                                  <p className=" flex mt-1 items-center gap-2 text-[10px] tracking-tight text-secondaryDark">
                                    {rev?.publishedAt
                                      ? formatDate(rev?.publishedAt)
                                      : formatDate(rev?.createdAt)}
                                    <p className=" flex items-center gap-2">
                                      {" "}
                                      <Pencil
                                        size={14}
                                        onClick={() => setShowEditReview(true)}
                                        className="text-primaryDark cursor-pointer"
                                      />
                                      <Trash2
                                        size={14}
                                        onClick={() => setDeleteReview(true)}
                                        className="text-orange-600   cursor-pointer"
                                      />
                                    </p>
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
            {section === "Comments" && (
              <>
                {" "}
                <>
                  <h2
                    id="Reviews"
                    className=" container mx-auto px-4 text-secondaryDark font-semibold mb-2 text-[32px]"
                  >
                    Comments
                  </h2>
                  <section className=" grid  container mx-auto gap-4 px-4">
                    {data?.comments?.map(
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
                                    {rev?.article?.publishedAt
                                      ? formatDate(
                                          rev?.article?.publishedAt as string
                                        )
                                      : formatDate(
                                          rev?.article?.createdAt as string
                                        )}
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
                                      {/* <Rating
                                          className="ml-[-8px]"
                                          name="read-only"
                                          value={rev.rating}
                                          readOnly
                                          size="small"
                                        /> */}
                                    </div>
                                  </div>{" "}
                                  <p className=" flex items-center gap-2 text-[8px] tracking-tight text-secondaryDark">
                                    {rev?.publishedAt
                                      ? formatDate(rev?.publishedAt)
                                      : formatDate(rev?.createdAt)}
                                    {data?.documentId ==
                                      rev?.user?.documentId && (
                                      <p className=" flex items-center gap-2">
                                        {" "}
                                        <Pencil
                                          size={14}
                                          onClick={() => setUpdateComment(true)}
                                          className="text-primaryDark cursor-pointer"
                                        />
                                        <Trash2
                                          size={14}
                                          onClick={() => setDeleteComment(true)}
                                          className="text-orange-600   cursor-pointer"
                                        />
                                      </p>
                                    )}
                                  </p>
                                </div>

                                <div className=" flex items-center gap-1 mt-2">
                                  <p className="pl-2 text-primaryDark text-[14px] font-medium">
                                    {rev?.content}
                                  </p>{" "}
                                </div>
                              </div>
                            </div>
                            {deleteCommment && (
                              <DeleteCommment
                                idComment={rev.documentId}
                                setDeleteComment={setDeleteComment}
                              />
                            )}
                            {updateCommment && (
                              <EditComment
                                rev={rev}
                                setShowEditComment={setUpdateComment}
                              />
                            )}
                          </div>
                        )
                    )}
                  </section>
                </>
              </>
            )}{" "}
            {section === "Videos" && (
              <>
                {" "}
                {videos?.videos?.map(
                  (vid) =>
                    !vid.publishedAt && (
                      <div key={vid.documentId} className="w-full">
                        <VideoPlayer video={vid} />
                      </div>
                    )
                )}
              </>
            )}
          </section>
        </div>
      </div>
      {/* <div className=" px-4 container mx-auto lg:px-0">
        {" "}
        <div className=" mb-4 border-b-primaryDark border-b-2 bg-lightGraySec w-full container mx-auto h-[40px] rounded-b-xl shadow-lg"></div>
      </div> */}
      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      {addVideo && <AddVideo setAddVideo={setAddVideo} />}{" "}
      {addAudio && <AddAudio setAddAudio={setAddAudio} />}
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
