"use client";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetMeQuery,
} from "@/app/store/apislice";
import { ReviewVideo } from "@/app/store/types";
import { Rating } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import EditReview from "./EditReview";
import DeleteReview from "./DeleteReview";
interface data {
  comment: string;
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
interface ReviewsVideoProps {
  setReviewsArticle: (vla: boolean) => void;
  idVideo: string;
  reviews: ReviewVideo[];
}
const ReviewsVideo = ({
  setReviewsArticle,
  idVideo,
  reviews,
}: ReviewsVideoProps) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDeleteRev, setShowDeleteRev] = useState<boolean>(false);
  console.log(idVideo);
  const [rating, setRating] = useState<number>(0);
  const [addReview, { isLoading: loadingAddReview }] = useAddReviewMutation();

  const { data: userData } = useGetMeQuery();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<data>();
  const onSubmit: SubmitHandler<data> = (data) => {
    if (data.comment.length !== 0) {
      const body = {
        comment: data.comment,
        rating,
        reviewed: `${idVideo}${userData?.documentId}`,
        video: idVideo,
        user: userData?.documentId,
      };
      console.log(body);
      addReview(body)
        .unwrap()
        .then((fulfilled) => {
          console.log(fulfilled);
        })
        .catch((rejected) => {
          console.log(rejected);
          if (rejected.status == 400) {
            Swal.fire({
              icon: "info",
              title: "Oops...",
              text: "You have already submitted a review.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if (rejected.status == 401) {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "You don't login",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if (rejected.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error, try later",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };
  const [deleteRevire] = useDeleteReviewMutation();
  const handleDelete = ({
    idRev,
    idUser,
  }: {
    idRev: string;
    idUser: string;
  }) => {
    if (idUser == userData?.documentId) {
      console.log("object");
      deleteRevire(idRev)
        .unwrap()
        .then((fulfilled) => {
          console.log(fulfilled);
        })
        .catch((rejected) => {
          console.log(rejected);
          if (rejected.status == 401) {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "You don't login",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if (rejected.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error, try later",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };
  return (
    <div className="relative z-20 flex justify-center">
      <div
        className="fixed flex items-center justify-center inset-0 z-10 overflow-y-auto "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={() => setReviewsArticle(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup mx-4 flex gap-4 justify-between flex-col px-8 pt-6 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[95%] sm:w-[780px] min-h-[500px] border-2 border-t-0 border-r-0 border-primaryDark">
          <div className="">
            <h3 className=" font-bold text-secondaryDark text-[28px]">
              Reviews
            </h3>
            <div className=" mt-4">
              {reviews?.map((review) => (
                <div
                  key={review.documentId}
                  className=" bg-lightGray my-2 rounded-lg  py-2 px-3"
                >
                  {" "}
                  {showEdit && (
                    <EditReview setShowEdit={setShowEdit} review={review} />
                  )}
                  {showDeleteRev && (
                    <DeleteReview
                      setDeleteReview={setShowDeleteRev}
                      idReview={review.documentId}
                    />
                  )}
                  <div className=" flex justify-between">
                    {" "}
                    <div className=" flex gap-3">
                      <div>
                        <Image
                          className=" rounded-full"
                          alt="photo"
                          width={35}
                          height={35}
                          src={
                            review?.user?.image?.formats?.small?.url ??
                            "/undraw_male_avatar_g98d.svg"
                          }
                        />
                      </div>
                      <div>
                        <h1 className=" text-[14px] font-medium text-primaryDark capitalize">
                          {review.user.username}
                        </h1>
                        <Rating
                          className="ml-[-8px]"
                          name="read-only"
                          value={review.rating}
                          readOnly
                          size="small"
                        />
                      </div>
                    </div>{" "}
                    <p className=" text-[10px] flex items-center gap-2 tracking-tight text-secondaryDark">
                      {review?.publishedAt
                        ? formatDate(review?.publishedAt)
                        : formatDate(review?.createdAt)}
                      {review.user.documentId == userData?.documentId && (
                        <span className=" flex items-center gap-2">
                          {" "}
                          <Trash2
                            size={14}
                            onClick={
                              () => setShowDeleteRev(true)
                              //   handleDelete({
                              //     idRev: review.documentId,
                              //     idUser: review.user.documentId,
                              //   })
                            }
                            className="text-orange-600 cursor-pointer"
                          />{" "}
                          <Pencil
                            size={14}
                            onClick={() => setShowEdit(true)}
                            className="text-primaryDark mt-[2px]  cursor-pointer"
                          />
                        </span>
                      )}
                    </p>
                  </div>
                  <div className=" flex items-center gap-1 mt-2">
                    <p className="pl-2 text-primaryDark text-[14px] font-medium">
                      {review.comment}
                    </p>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <form
              className=" flex gap-4 items-center flex-col sm:flex-row"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("comment", { required: "Review is required" })}
                placeholder="Add review"
                type="text"
                className=" h-[38px] pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium text-primaryGreen outline-none rounded-lg"
              />{" "}
              <Rating
                className="ml-[-8px]"
                name="read-only"
                value={rating}
                //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //  @ts-ignore
                onChange={(event, newValue) => setRating(newValue ?? 0)}
                size="small"
              />
              {loadingAddReview ? (
                <>
                  {" "}
                  <PulseLoader color="#2F3E46" size={10} />
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className=" h-[38px] font-semibold text-[18px] bg-primaryDark hover:bg-secondaryDark transition-all ease-in-out text-lightGraySec hover:text-white py-1 px-5 rounded-lg shadow-sm "
                  >
                    Add
                  </button>
                </>
              )}
            </form>
            {errors.comment && (
              <p className=" text-orange-700 font-medium text-[14px] mt-2">
                {errors.comment.message}
              </p>
            )}
          </div>
        </div>
      </div>{" "}
      <style>{`
.popup {
transform: translateY(-10%); /* تبدأ من خارج الشاشة */
animation: slideDown 0.3s forwards;
}

@keyframes slideDown {
to {
  transform: translateY(0); /* تتحرك لمكانها الطبيعي */
}
}
`}</style>
    </div>
  );
};

export default ReviewsVideo;
