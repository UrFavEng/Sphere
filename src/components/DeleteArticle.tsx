import { useDeleteArticleMutation } from "@/app/store/apislice";
import React from "react";
interface PropsDeleteArticle {
  setDeleteArticle: (val: boolean) => void;
  id: string;
}
const DeleteArticle = ({ setDeleteArticle, id }: PropsDeleteArticle) => {
  const [deleteArticle] = useDeleteArticleMutation();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id).unwrap();
        alert("Article deleted successfully!");
      } catch (error) {
        console.error("Failed to delete the article:", error);
      }
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
          onClick={() => setDeleteArticle(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup px-8 pt-6 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[380px]  h-fit border-2 border-t-0 border-r-0 border-primaryDark">
          <h3 className=" font-bold text-secondaryDark text-[28px]">
            Delete Article
          </h3>
          <div className=" flex items-center gap-2 mt-6">
            {" "}
            <button
              onClick={() => setDeleteArticle(false)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteArticle;
