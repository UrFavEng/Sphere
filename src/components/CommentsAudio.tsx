import { useAddCommentMutation, useGetMeQuery } from "@/app/store/apislice";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
interface CommentsAudioProps {
  idAudio: string;
  setCommentsAudio: (val: boolean) => void;
}
interface data {
  comment: string;
}
const CommentsAudio = ({ setCommentsAudio, idAudio }: CommentsAudioProps) => {
  const { data: userData } = useGetMeQuery();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<data>();
  const [addComment, { isLoading: loadingAddComment }] =
    useAddCommentMutation();
  const onSubmit: SubmitHandler<data> = async (data) => {
    if (userData) {
      const body = {
        content: data.comment,
        user: userData?.documentId,
        audioo: idAudio,
        commented: `${userData.documentId}${idAudio}`,
      };
      addComment(body)
        .unwrap()
        .then((fulfilled) => {
          console.log(fulfilled);
        })
        .catch((rejected) => {
          console.log(rejected.status);
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You don't login",
        showConfirmButton: false,
        timer: 1500,
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
          onClick={() => setCommentsAudio(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup  flex-col px-6 pt-4 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[90%] sm:w-[500px] h-fit border-2 border-t-0 border-r-0 border-primaryDark">
          {" "}
          <h3 className=" font-bold text-secondaryDark text-[22px]">
            Add comment
          </h3>
          <form
            className=" mt-4 flex flex-col  gap-4 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <textarea
              {...register("comment", { required: "Comment is required" })}
              placeholder="Add comment"
              className=" h-[100px] pt-2 pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium text-primaryGreen outline-none rounded-lg"
            ></textarea>
            {errors.comment && (
              <p className=" font-medium text-[14px] text-orange-700">
                {errors.comment.message}
              </p>
            )}
            {loadingAddComment ? (
              <>
                {" "}
                <PulseLoader color="#2F3E46" size={10} />
              </>
            ) : (
              <>
                {" "}
                <button
                  type="submit"
                  className=" h-[38px] w-fit font-semibold text-[18px] bg-primaryDark hover:bg-secondaryDark transition-all ease-in-out text-lightGraySec hover:text-white py-1 px-5 rounded-lg shadow-sm "
                >
                  Add
                </button>
              </>
            )}
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

export default CommentsAudio;
