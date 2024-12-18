import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // أو استيراد نمط معين
import { PulseLoader } from "react-spinners";
import {
  useGetAllCatsAudioQuery,
  useGetMeQuery,
  useUpdateAudioMutation,
  useUploadImageMutation,
} from "@/app/store/apislice";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { DataItemAudoi } from "@/app/store/types";
interface UpdateAudioProps {
  setUpdateAudio: (val: boolean) => void;
  aud: DataItemAudoi;
}
interface data {
  title: string;
  audioMedia: string;
  user: string;
  content: string;
  categoryaudio: string;
}
const UpdateAudio = ({ setUpdateAudio, aud }: UpdateAudioProps) => {
  const { data: user } = useGetMeQuery();

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const onSlideChanged = (splide, newIndex) => {
    setCurrentSlide(newIndex.index);
  };
  const { data: cats } = useGetAllCatsAudioQuery();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<data>();
  useEffect(() => {
    if (aud) {
      setValue("title", aud?.title);
      if (aud?.content) setValue("content", aud?.content);
      setValue("categoryaudio", aud?.categoryaudio?.documentId);
      setSelectedAudio(aud?.audioMedia.url);
    }
  }, [aud, setValue]);
  const [selectedAudio, setSelectedAudio] = useState<string | undefined>(
    undefined
  );
  const [audio, setAudio] = useState<File | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e?.target?.files?.[0]);
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setSelectedAudio(audioUrl);
      setAudio(file);
    }
  };
  const [uploadImageAndVideoAndAudio, { isLoading: loadingUploadImage }] =
    useUploadImageMutation();
  const [updateAudio, { isLoading: loadingAddAudio, error }] =
    useUpdateAudioMutation();
  console.log(error);
  const onSubmit: SubmitHandler<data> = async (data) => {
    if (audio || selectedAudio) {
      let idAud;

      if (audio && user) {
        try {
          const formData = new FormData();
          formData.append("files", audio);

          // انتظار رفع الصورة والحصول على idImage
          const fulfilled = await uploadImageAndVideoAndAudio(
            formData
          ).unwrap();
          idAud = fulfilled[0].id; // تأكد من استخدام المفتاح الصحيح للـ ID
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error uploading image, try later",
            timer: 1500,
            showConfirmButton: false,
          });
          // console.log("Error uploading image:", error);
          return; // إيقاف العملية إذا حدث خطأ في رفع الصورة
        }
      }
      if (user) {
        const body = {
          title: data.title,
          categoryaudio: data.categoryaudio,
          content: data.content,
          user: user?.documentId,
          audioMedia: idAud,
        };
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const fulfilled = await updateAudio({
            VideoId: aud.documentId,
            body: body,
          })
            .unwrap()
            .then(() => {
              setUpdateAudio(false);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Done",
                timer: 1500,
                showConfirmButton: false,
              });
            });
          // console.log("Article created successfully:", fulfilled);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error add audio , try later",
            timer: 1500,
            showConfirmButton: false,
          });
          // console.log("Error creating article:", error);
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
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "You must choose audio",
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
          onClick={() => setUpdateAudio(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup mx-4 px-8 pt-6 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[780px] min-h-[200px] border-2 border-b-0 border-t-0 border-r-0 border-primaryDark">
          <h3 className=" font-bold text-secondaryDark text-[28px]">
            Add video
          </h3>
          <form className=" relative" onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("title", { required: "Title is required" })}
                      className=" mt-2 font-medium h-[34px] pl-3 shadow-md bg-lightGray border-secondaryDark border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full text-primaryDark placeholder:text-[14px] placeholder:font-medium placeholder:text-secondaryDark outline-none rounded-lg"
                      type="text"
                      placeholder="Title of audio"
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
                      placeholder="Content of audio"
                      id="content"
                    ></textarea>
                  </div>
                  <div className="">
                    <select
                      {...register("categoryaudio", {
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
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={`${currentSlide == 0 && "h-0"} pb-12`}>
                  <div className="mt-4">
                    <label
                      htmlFor="audio"
                      className=" mb-2 font-semibold text-primaryGreen text-[18px]"
                    >
                      Audio
                    </label>
                  </div>
                  <input
                    onChange={handleVideoChange} // You may want to rename this to `handleAudioChange`
                    id="audio"
                    accept="audio/*"
                    type="file"
                    className="file-input mt-1 file-input-bordered file-input-md w-full max-w-full file:bg-primaryGreen"
                  />
                  {selectedAudio ? (
                    <div className="mb-8  min-w-[550px] m-auto">
                      <audio
                        controls
                        src={selectedAudio}
                        className="  w-full bg-primaryDark m-auto mt-8 shadow-lg rounded-lg object-contain"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {loadingUploadImage || loadingAddAudio ? (
                    <div className="absolute bottom-4 left-3">
                      <PulseLoader color="#2F3E46" size={10} />
                    </div>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="font-semibold text-[18px] bg-primaryDark hover:bg-secondaryDark transition-all ease-in-out text-lightGraySec hover:text-white py-2 px-5 rounded-lg shadow-sm absolute bottom-4 left-3"
                      >
                        Add
                      </button>
                      {errors.title && (
                        <p className="text-[14px] font-medium text-orange-700">
                          {errors.title.message}
                        </p>
                      )}
                      {errors.content && (
                        <p className="text-[14px] font-medium text-orange-700">
                          {errors.content.message}
                        </p>
                      )}
                      {errors.categoryaudio && (
                        <p className="text-[14px] font-medium text-orange-700">
                          {errors.categoryaudio.message}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </SplideSlide>
            </Splide>
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

export default UpdateAudio;
