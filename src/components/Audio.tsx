import { useGetMeQuery } from "@/app/store/apislice";
import { DataItemAudoi } from "@/app/store/types";
import { MessageCircle, Pencil, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ReviewsAudio from "./ReviewsAudio";
import CommentsAudio from "./CommentsAudio";
import DeleteAudio from "./DeleteAudio";
interface AudioProps {
  audio: DataItemAudoi;
}
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

const Audio = ({ audio }: AudioProps) => {
  const [reviews, setReviews] = useState<boolean>(false);
  const [deleteAudio, setDeleteAudio] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const { data } = useGetMeQuery();
  console.log(audio);
  return (
    <div className=" relative w-[100%] h-auto bg-lightGraySec mb-4 md:mb-5 place-self-start shadow-xl py-4 px-4 rounded-lg">
      <div className=" flex items-start justify-between">
        <div className=" flex items-start gap-2">
          <Image
            alt="photo"
            width={45}
            height={45}
            className="object-cover w-[45px] h-[45px] rounded-full"
            src={
              audio?.user?.image?.formats?.small?.url
                ? audio?.user?.image.formats.small.url
                : "/undraw_male_avatar_g98d.svg"
            }
          />
          <div>
            <h2 className=" capitalize mt-1 text-primaryDark font-medium text-[14px]">
              {audio?.user?.username}
            </h2>
            <p className=" text-[10px]  mt-[-2px] font-medium text-primaryGreen">
              {audio?.publishedAt
                ? formatDate(audio?.publishedAt as string)
                : formatDate(audio?.createdAt as string)}
            </p>
          </div>
        </div>
        <p className=" flex items-center gap-1 capitalize text-[10px] cursor-pointer font-medium text-secondaryDark">
          {audio?.categoryaudio?.name}
          {data?.documentId == audio?.user?.documentId && (
            <p className=" flex items-center gap-2">
              <Pencil
                size={16}
                // onClick={() => setEditVideo(true)}
                className="text-primaryDark mt-[2px]  cursor-pointer"
              />
              <Trash2
                size={16}
                onClick={() => setDeleteAudio(true)}
                className="text-orange-600 mt-[2px]  cursor-pointer"
              />
            </p>
          )}
        </p>
      </div>{" "}
      <div className=" mt-3 pl-1">
        <h1 className=" capitalize text-primaryDark font-semibold text-[18px]">
          {audio.title}
        </h1>
        <p
          onClick={() => setShowMore(!showMore)}
          className={` cursor-pointer ${
            !showMore && "line-clamp-3"
          } border-secondaryDark transition-all ease-in-out  leading-[20px] font-medium text-[16px] text-primaryGreen`}
        >
          {audio?.content && <> {audio?.content}</>}
        </p>

        <div className="mt-4 shadow-sm rounded-lg overflow-hidden">
          <div className="w-full bg-primaryDark m-auto rounded-xl overflow-hidden">
            {audio?.audioMedia?.url ? (
              <>
                {" "}
                <audio
                  src={audio?.audioMedia?.url}
                  controls
                  className=" bg-primaryDark w-full  cursor-pointer"
                >
                  Your browser does not support the audio tag.
                </audio>
              </>
            ) : (
              <>no</>
            )}{" "}
          </div>
        </div>

        <div className=" flex items-center justify-start gap-5 pl-1 mt-4">
          <button
            onClick={() => setReviews(true)}
            className=" text-primaryDark flex items-center gap-1 mt-[1px]  w-fit justify-self-center font-medium text-[14px]"
          >
            {audio?.reviews?.length} Review{" "}
            <Star size={16} className="  mt-[1px]" />
          </button>
          <button
            onClick={() => setComments(true)}
            className=" text-primaryDark flex items-center gap-1   w-fit justify-self-center font-medium text-[14px]"
          >
            {audio?.comments?.length} Comment{" "}
            <MessageCircle size={16} className="  mt-[1px]" />
          </button>
        </div>
      </div>{" "}
      {reviews && (
        <ReviewsAudio
          setReviewsAudio={setReviews}
          reviews={audio.reviews}
          idAudio={audio.documentId}
        />
      )}
      {comments && (
        <CommentsAudio
          setCommentsAudio={setComments}
          idAudio={audio.documentId}
        />
      )}
      {/* {editVideo && <UpdateVideo setUpdateVideo={setEditVideo} vid={video} />} */}
      {deleteAudio && (
        <DeleteAudio setDeleteAudio={setDeleteAudio} id={audio.documentId} />
      )}
    </div>
  );
};

export default Audio;
