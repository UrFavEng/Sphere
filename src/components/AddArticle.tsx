import React, { useState, KeyboardEvent } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // أو استيراد نمط معين
import {
  useAddArticleMutation,
  useGetAllCatsQuery,
  useGetMeQuery,
  useUploadImageMutation,
} from "@/app/store/apislice";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
interface AddArticleProps {
  setAddArticle: (val: boolean) => void;
}
interface data {
  title: string;
  content: string;
  category: string;
  user: string;
  tags: string[];
  image: string;
}
const AddArticle = ({ setAddArticle }: AddArticleProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: user, isLoading: loadingGetUser } = useGetMeQuery();
  const { data: cats, isLoading: loadingGetCats } = useGetAllCatsQuery();

  // Handle adding new tags
  const addTag = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      const newTag = inputValue.trim();

      if (tags.length >= 4) {
        setErrorMessage("You can only add up to 4 tags.");
      } else if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setInputValue("");
        setErrorMessage(null); // Clear any previous error
      } else {
        setErrorMessage("This tag already exists.");
      }
    }
  };
  // Handle removing a tag
  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const onSlideChanged = (splide, newIndex) => {
    setCurrentSlide(newIndex.index);
  };
  ////

  //Handle file change
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [image, setImage] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e?.target?.files?.[0]);
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImage(file);
    }
  };

  //add article
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<data>();
  const [addArticle, { isLoading: loadingAddArticle }] =
    useAddArticleMutation();
  const [uploadImage, { isLoading: loadingUploadImage }] =
    useUploadImageMutation();
  const onSubmit: SubmitHandler<data> = async (data) => {
    let idImage;

    // رفع الصورة إذا كانت موجودة
    if (image && user) {
      try {
        const formData = new FormData();
        formData.append("files", image);

        // انتظار رفع الصورة والحصول على idImage
        const fulfilled = await uploadImage(formData).unwrap();
        idImage = fulfilled[0].id; // تأكد من استخدام المفتاح الصحيح للـ ID
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error uploading image, try later",
          timer: 1500,
          showConfirmButton: false,
        });
        console.log("Error uploading image:", error);
        return; // إيقاف العملية إذا حدث خطأ في رفع الصورة
      }
    }
    // إنشاء المقال إذا كان المستخدم موجودًا
    if (user) {
      const body = {
        title: data.title,
        category: data.category,
        content: data.content,
        tags, // يجب أن تكون tags معرّفة مسبقًا
        user: user?.documentId, // أو أي مفتاح يمثل ID المستخدم
        image: idImage, // ربط المقال بالصورة المرفوعة
      };

      try {
        const fulfilled = await addArticle(body)
          .unwrap()
          .then(() => {
            setAddArticle(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Done",
              timer: 1500,
              showConfirmButton: false,
            });
          });
        console.log("Article created successfully:", fulfilled);
      } catch (e) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error add article , try later",
          timer: 1500,
          showConfirmButton: false,
        });
        console.log("Error creating article:", e);
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "You must login first",
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
          onClick={() => setAddArticle(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup mx-4 px-8 pt-6 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[780px] min-h-[500px] border-2 border-b-0 border-t-0 border-r-0 border-primaryDark">
          <h3 className=" font-bold text-secondaryDark text-[28px]">
            Add article
          </h3>
          <form className=" relative" onSubmit={handleSubmit(onSubmit)}>
            {loadingGetUser || loadingGetCats ? (
              <>
                {" "}
                <p className="text-center mt-4">
                  {" "}
                  <PulseLoader color="#2F3E46" size={12} />
                </p>
              </>
            ) : (
              <>
                {" "}
                <Splide
                  options={{
                    type: "fade",
                    arrows: false,
                  }}
                  onActive={onSlideChanged}
                >
                  {" "}
                  <SplideSlide>
                    <div className=" pb-12">
                      {" "}
                      <div className=" mt-4">
                        <label
                          htmlFor="title"
                          className=" mb-2 font-semibold text-primaryGreen text-[18px] "
                        >
                          Title
                        </label>
                        <input
                          {...register("title", {
                            required: "Title is required",
                          })}
                          className=" mt-2 font-medium h-[34px] pl-3 shadow-md bg-lightGray border-secondaryDark border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full text-primaryDark placeholder:text-[14px] placeholder:font-medium placeholder:text-secondaryDark outline-none rounded-lg"
                          type="text"
                          placeholder="Title of article"
                          id="title"
                        />
                      </div>
                      <div className=" mt-4">
                        <label
                          htmlFor="content"
                          className=" mb-2 font-semibold text-primaryGreen text-[18px] "
                        >
                          Content
                        </label>
                        <textarea
                          {...register("content", {
                            required: "Content is required",
                          })}
                          className=" pt-3 mt-2 font-medium h-[134px] pl-3 shadow-md bg-lightGray border-secondaryDark  border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full text-primaryDark placeholder:text-[14px] placeholder:font-medium placeholder:text-secondaryDark outline-none rounded-lg"
                          placeholder="Content of article"
                          id="content"
                        ></textarea>
                      </div>
                      <div className="">
                        <select
                          {...register("category", {
                            required: "Category is required",
                          })}
                          className="  mt-2 font-medium h-[34px] pl-3 shadow-md bg-lightGray border-secondaryDark border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full text-primaryDark placeholder:text-[14px] placeholder:font-medium placeholder:text-secondaryDark outline-none rounded-lg"
                          title="category"
                        >
                          <option value="" selected disabled>
                            Category
                          </option>
                          {cats?.data.map((cat) => (
                            <option
                              key={cat.documentId}
                              value={cat.documentId}
                              className=" text-primaryDark"
                            >
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className=" mt-4">
                        {" "}
                        <label
                          htmlFor="tag"
                          className=" font-semibold text-primaryGreen text-[18px] "
                        >
                          Tag
                        </label>
                        <div className="flex flex-col space-y-2">
                          <div className=" rounded-md flex items-center flex-wrap">
                            {tags.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-lightGray   text-primaryDark rounded-full px-3 py-1 mr-2  flex items-center"
                              >
                                {tag}
                                <button
                                  type="button"
                                  className="ml-2 text-red-600 hover:text-red-800"
                                  onClick={() => removeTag(index)}
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                            {tags.length < 4 && (
                              <input
                                className="flex-grow mt-2 font-medium h-[34px]  pl-3 shadow-md bg-lightGray border-secondaryDark border-l-2   focus:border-2 transition-all ease-in-out duration-75  text-primaryDark placeholder:text-[14px] placeholder:font-medium placeholder:text-secondaryDark outline-none rounded-lg"
                                type="text"
                                // className="flex-grow outline-none p-1 text-gray-700"
                                placeholder="Enter a tag and press Enter"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={addTag}
                                id="tag"
                              />
                            )}
                          </div>
                          {errorMessage && (
                            <p className="text-red-500">{errorMessage}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </SplideSlide>
                  <SplideSlide>
                    {" "}
                    <div className={`${currentSlide == 0 && "h-0"} pb-12`}>
                      {" "}
                      <div className="mt-4">
                        <label
                          htmlFor="image"
                          className=" mb-2 font-semibold text-primaryGreen text-[18px] "
                        >
                          Image
                        </label>
                      </div>
                      <input
                        onChange={handleFileChange}
                        id="image"
                        accept="image/*"
                        type="file"
                        className="file-input mt-1 file-input-bordered file-input-md w-full max-w-full file:bg-primaryGreen"
                      />{" "}
                      {selectedImage ? (
                        <div className=" mb-8 w-[550px] m-auto">
                          {" "}
                          <Image
                            width={800}
                            height={300}
                            src={selectedImage}
                            alt=""
                            className=" max-h-[300px] w-fit m-auto mt-8 shadow-lg rounded-lg  object-contain"
                          />{" "}
                        </div>
                      ) : (
                        <></>
                      )}
                      {loadingUploadImage || loadingAddArticle ? (
                        <div className="absolute bottom-4 left-3">
                          <PulseLoader color="#2F3E46" size={10} />
                        </div>
                      ) : (
                        <>
                          {" "}
                          <button
                            type="submit"
                            className=" font-semibold text-[18px] bg-primaryDark hover:bg-secondaryDark transition-all ease-in-out text-lightGraySec hover:text-white py-2 px-5 rounded-lg shadow-sm absolute bottom-4 left-3"
                          >
                            Add
                          </button>
                          {errors.title && (
                            <p className=" text-[14px] font-medium text-orange-700">
                              {errors.title.message}
                            </p>
                          )}
                          {errors.content && (
                            <p className=" text-[14px] font-medium text-orange-700">
                              {errors.content.message}
                            </p>
                          )}
                          {errors.category && (
                            <p className=" text-[14px] font-medium text-orange-700">
                              {errors.category.message}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </SplideSlide>
                </Splide>
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

export default AddArticle;
