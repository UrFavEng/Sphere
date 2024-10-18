import { useDeleteReviewMutation } from "@/app/store/apislice";
import React from "react";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
interface DeleteReviewProps {
  setDeleteReview: (val: boolean) => void;
  idReview: string;
}
const DeleteReview = ({ setDeleteReview, idReview }: DeleteReviewProps) => {
  const [deleteComment, { isLoading: loadingDeleteComment }] =
    useDeleteReviewMutation();

  const handleDelete = async () => {
    try {
      await deleteComment(idReview).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Done",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error, try later",
        timer: 1500,
        showConfirmButton: false,
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
          onClick={() => setDeleteReview(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup px-8 pt-6 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[380px]  h-fit border-2 border-t-0 border-r-0 border-primaryDark">
          <h3 className=" font-bold text-secondaryDark text-[28px]">
            Delete Review
          </h3>
          <div className=" flex items-center gap-2 mt-6">
            {loadingDeleteComment ? (
              <>
                {" "}
                <PulseLoader color="#2F3E46" size={10} />
              </>
            ) : (
              <>
                <button
                  onClick={() => setDeleteReview(false)}
                  className="text-lightGraySec py-1 px-3 rounded-lg transition-all ease-in-out hover:scale-105 hover:shadow-xl  bg-primaryDark"
                >
                  Cancle
                </button>
                <button
                  onClick={() => handleDelete()}
                  className=" text-lightGraySec py-1 px-3 rounded-lg transition-all ease-in-out hover:scale-105 hover:shadow-xl  bg-orange-600"
                >
                  Delete
                </button>
              </>
            )}{" "}
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

export default DeleteReview;
