import { GetAllArticlesReview } from "@/app/store/types";
import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
interface ReviewArticleProps {
  setReviewsArticle: (val: boolean) => void;
  reviews: GetAllArticlesReview[];
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
const ReviewArticle = ({ setReviewsArticle, reviews }: ReviewArticleProps) => {
  console.log(reviews);
  //   return;
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
        <div className="popup flex gap-4 justify-between flex-col px-8 pt-6 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[780px] min-h-[500px] border-2 border-t-0 border-r-0 border-primaryDark">
          <div className="">
            <h3 className=" font-bold text-secondaryDark text-[28px]">
              Reviews
            </h3>
            <div className=" mt-4">
              {reviews.map((review) => (
                <div
                  key={review.documentId}
                  className=" bg-lightGray my-2 rounded-lg  py-2 px-3"
                >
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
                    <p className=" text-[10px] tracking-tight text-secondaryDark">
                      {formatDate(review.publishedAt)}
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
            <form className=" flex gap-4 items-center">
              <input
                placeholder="Add review"
                type="text"
                className=" h-[38px] pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium text-primaryGreen outline-none rounded-lg"
              />{" "}
              <Rating
                className="ml-[-8px]"
                name="read-only"
                value={4}
                readOnly
                size="small"
              />
              <button className=" h-[38px] font-semibold text-[18px] bg-primaryDark hover:bg-secondaryDark transition-all ease-in-out text-lightGraySec hover:text-white py-1 px-5 rounded-lg shadow-sm ">
                Add
              </button>
            </form>
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

export default ReviewArticle;
