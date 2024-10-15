import React from "react";
interface CommentArticleProps {
  setCommentsArticle: (val: boolean) => void;
}
const CommentArticle = ({ setCommentsArticle }: CommentArticleProps) => {
  return (
    <div className="relative z-20 flex justify-center">
      <div
        className="fixed flex items-center justify-center inset-0 z-10 overflow-y-auto "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={() => setCommentsArticle(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup  flex-col px-6 pt-4 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[460px] h-fit border-2 border-t-0 border-r-0 border-primaryDark">
          {" "}
          <h3 className=" font-bold text-secondaryDark text-[22px]">
            Add comment
          </h3>
          <form className=" mt-4 flex gap-4 items-end">
            <textarea
              placeholder="Add comment"
              className=" h-[100px] pt-2 pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium text-primaryGreen outline-none rounded-lg"
            ></textarea>
            <button className=" h-[38px] font-semibold text-[18px] bg-primaryDark hover:bg-secondaryDark transition-all ease-in-out text-lightGraySec hover:text-white py-1 px-5 rounded-lg shadow-sm ">
              Add
            </button>
          </form>
        </div>
      </div>
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

export default CommentArticle;
