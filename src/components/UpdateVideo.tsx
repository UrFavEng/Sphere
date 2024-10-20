import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // أو استيراد نمط معين
import {
  useUploadImageMutation,
  useAddVideoMutation,
  useGetAllCatsVideoQuery,
  useGetMeQuery,
  useUpdateVideoMutation,
} from "@/app/store/apislice";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Image from "next/image";
import { PulseLoader } from "react-spinners";
import { VideoData } from "@/app/store/types";
interface UpdateVideoProps {
  setUpdateVideo: (val: boolean) => void;
  vid: VideoData;
}
interface data {
  title: string;
  video: string;
  user: string;
  content: string;
  poster: string;
  categoryvideo: string;
}
const UpdateVideo = ({ setUpdateVideo, vid }: UpdateVideoProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | undefined>(
    undefined
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<data>();
  useEffect(() => {
    if (vid) {
      setValue("title", vid?.title);
      if (vid?.content) setValue("content", vid?.content);
      setValue("categoryvideo", vid?.categoryvideo?.documentId);
      setSelectedImage(vid?.poster?.url);
      setSelectedVideo(vid?.video.url);
    }
  }, [vid, setValue]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const onSlideChanged = (splide, newIndex) => {
    setCurrentSlide(newIndex.index);
  };
  const { data: cats } = useGetAllCatsVideoQuery();

  const { data: user } = useGetMeQuery();

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

  const [video, setVideo] = useState<File | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e?.target?.files?.[0]);
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setSelectedVideo(videoUrl);
      setVideo(file);
    }
  };
  const [uploadImageAndVideo, { isLoading: loadingUploadImage }] =
    useUploadImageMutation();
  const [addVideo, { isLoading: loadingAddVideo }] = useUpdateVideoMutation();
  const onSubmit: SubmitHandler<data> = async (data) => {
    if (video || selectedVideo) {
      let idImage;
      let idVid;
      if (image && user) {
        try {
          const formData = new FormData();
          formData.append("files", image);

          // انتظار رفع الصورة والحصول على idImage
          const fulfilled = await uploadImageAndVideo(formData).unwrap();
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
      if (video && user) {
        try {
          const formData = new FormData();
          formData.append("files", video);

          // انتظار رفع الصورة والحصول على idImage
          const fulfilled = await uploadImageAndVideo(formData).unwrap();
          idVid = fulfilled[0].id; // تأكد من استخدام المفتاح الصحيح للـ ID
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
      if (user) {
        const body = {
          title: data.title,
          categoryvideo: data.categoryvideo,
          content: data.content,
          poster: idImage,
          video: idVid,
        };
        try {
          const fulfilled = await addVideo({ VideoId: vid.documentId, body })
            .unwrap()
            .then(() => {
              setUpdateVideo(false);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Done",
                timer: 1500,
                showConfirmButton: false,
              });
            });
          // console.log("Article created successfully:", fulfilled);
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error add article , try later",
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
        title: "You must choose video",
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
          onClick={() => setUpdateVideo(false)}
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
                      placeholder="Title of video"
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
                      placeholder="Content of video"
                      id="content"
                    ></textarea>
                  </div>
                  <div className="">
                    <select
                      {...register("categoryvideo", {
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
                {" "}
                <div className={`${currentSlide == 0 && "h-0"} pb-12`}>
                  {" "}
                  <div className="mt-4">
                    <label
                      htmlFor="image"
                      className=" mb-2 font-semibold text-primaryGreen text-[18px] "
                    >
                      Poster
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
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={`${currentSlide == 0 && "h-0"} pb-12`}>
                  <div className="mt-4">
                    <label
                      htmlFor="video"
                      className=" mb-2 font-semibold text-primaryGreen text-[18px]"
                    >
                      Video
                    </label>
                  </div>
                  <input
                    onChange={handleVideoChange}
                    id="video"
                    accept="video/*"
                    type="file"
                    className="file-input mt-1 file-input-bordered file-input-md w-full max-w-full file:bg-primaryGreen"
                  />
                  {selectedVideo ? (
                    <div className="mb-8  min-w-[550px] m-auto">
                      <video
                        width={800}
                        height={800}
                        controls
                        src={selectedVideo}
                        className="min-h-[300px] w-fit m-auto mt-8 shadow-lg rounded-lg object-contain"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {loadingUploadImage || loadingAddVideo ? (
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
                      {errors.categoryvideo && (
                        <p className="text-[14px] font-medium text-orange-700">
                          {errors.categoryvideo.message}
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

export default UpdateVideo;
