import { useGetMeQuery, useUpdateReviewMutation } from "@/app/store/apislice";
import { GetAllArticlesReview, ReviewVideo } from "@/app/store/types";
import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
interface EditReviewProps {
  setShowEdit: (val: boolean) => void;
  review: GetAllArticlesReview | ReviewVideo;
}
interface data {
  comment: string;
}
const EditReview = ({ setShowEdit, review }: EditReviewProps) => {
  const [rating, setRating] = useState<number>(0);
  const { data: userData } = useGetMeQuery();
  const { handleSubmit, register, setValue } = useForm<data>();
  useEffect(() => {
    setValue("comment", review.comment);
    setRating(review.rating);
  }, [review]);
  const [editRev, { isLoading: loadingRev }] = useUpdateReviewMutation();
  const onSubmit: SubmitHandler<data> = (data) => {
    if (
      data.comment.length !== 0 &&
      review.user.documentId === userData?.documentId
    ) {
      const body = {
        comment: data.comment,
        rating,
      };
      editRev({ body, id: review.documentId })
        .unwrap()
        .then((fulfilled) => {
          console.log(fulfilled);
          Swal.fire({
            icon: "success",
            title: "Done",
            showConfirmButton: false,
            timer: 1500,
          });
          setShowEdit(false);
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
  return (
    <div className="relative z-20 flex justify-center">
      <div
        className="fixed flex items-center justify-center inset-0 z-10 overflow-y-auto "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={() => setShowEdit(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup mx-4 w-[680px]  h-fit px-8 pt-6 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl  border-2 border-b-0 border-t-0 border-r-0 border-primaryDark">
          <h3 className=" mb-4 font-bold text-secondaryDark text-[28px]">
            Edit Review
          </h3>
          <form
            className=" flex items-center flex-col gap-6 relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            {" "}
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
              size="medium"
            />
            {loadingRev ? (
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

export default EditReview;
