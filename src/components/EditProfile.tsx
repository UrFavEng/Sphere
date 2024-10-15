"use client";
import {
  useUpdataUserMutation,
  useUpdateUserMutation,
  useUploadUserImageMutation,
} from "@/app/store/apislice";
import { getmeRES } from "@/app/store/types";
import { Eye, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface EditProfileProps {
  setEditPropfile: (val: boolean) => void;
  dataUser: getmeRES;
}
interface data {
  username: string;
  email: string;
  password: string;
}
const EditProfile = ({ setEditPropfile, dataUser }: EditProfileProps) => {
  ///////////
  const [image, setImage] = useState<File | null>(null);
  const [uploadUserImage] = useUploadUserImageMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      try {
        const userId = dataUser.id; // Fetch this dynamically, possibly from user state

        // Step 1: Upload the image
        const uploadResponse = await uploadUserImage({
          imageFile: image,
        }).unwrap();
        console.log(uploadResponse);
        // Step 2: Get the uploaded image's URL or ID
        const imageUrl = uploadResponse; // Adjust this based on your response structure
        console.log(imageUrl);
        // Step 3: Update the user with the new image URL
        await updateUser({ userId, imageUrl }).then((d) => console.log(d));

        // Optional: Update local state or notify user
        console.log("User image updated successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  /////////////
  const [updataUser] = useUpdataUserMutation();
  const { handleSubmit, register, setValue } = useForm<data>();
  useEffect(() => {
    if (dataUser) {
      setValue("username", dataUser.username);
      setValue("email", dataUser.email);
    }
  }, [dataUser, setValue]);
  const [selectedImage, setSelectedImage] = useState(
    dataUser?.image?.formats?.large?.url
      ? dataUser?.image?.formats?.large?.url
      : "/undraw_male_avatar_g98d.svg"
  );

  const [showPass, setShowPass] = useState<boolean>(false);

  const onSubmit: SubmitHandler<data> = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    if (data.password !== "") {
      formData.append("password", data.password);
    }
    updataUser({ id: dataUser.id.toString(), body: formData })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
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
          onClick={() => setEditPropfile(false)}
          className=" cursor-default absolute h-[100%] w-[100%] top-0 left-0 bg-[#00000032]"
        ></div>
        <div className="popup px-8 pt-6 pb-4 relative z-30 bg-lightGraySec shadow-xl  rounded-xl w-[780px]  h-fit border-2 border-t-0 border-r-0 border-primaryDark">
          <h3 className=" font-bold text-secondaryDark text-[28px]">
            Edit Profile
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            <div className=" relative w-fit max-w-[300px] m-auto">
              <Image
                src={selectedImage}
                alt="photo"
                width={120}
                height={120}
                className="rounded-full object-cover w-32 h-32"
              />
              <label htmlFor="photo">
                {" "}
                <Pencil className=" text-primaryDark absolute top-1 right-1 cursor-pointer" />
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="photo"
                className="hidden"
              />
              <p
                className=" text-center cursor-pointer bg-primaryDark hover:bg-secondaryGreen hover:text-primaryDark transition-all ease-in-out font-medium text-lightGraySec py-2 w-fit mx-auto px-3 rounded-lg shadow-xl mt-2"
                onClick={handleImageUpload}
              >
                Upload
              </p>
            </div>
            <input
              {...register("username")}
              type="text"
              placeholder="FullName"
              className=" h-[34px] text-primaryDark pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full mt-2 placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium  outline-none rounded-lg"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className=" h-[34px] text-primaryDark mt-4 pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full  placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium  outline-none rounded-lg"
            />
            <div>
              <label
                className=" text-secondaryGreen font-medium text-[14px] mt-4 block"
                htmlFor="password"
              >
                Password
              </label>
              <div className=" relative">
                <input
                  className=" h-[34px] text-primaryDark mt-1 pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full  placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium  outline-none rounded-lg"
                  type={showPass ? "text" : "password"}
                  id="password"
                  {...register("password")}
                />
                <Eye
                  onClick={() => setShowPass(!showPass)}
                  size={18}
                  className=" absolute top-[50%] translate-y-[-50%] right-4"
                />
              </div>
              <div className=" relative">
                {" "}
                <input
                  className=" text-primaryDark h-[34px] placeholder:text-[12px]  mt-3 pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-full  placeholder:text-primaryDark  placeholder:font-medium  outline-none rounded-lg"
                  placeholder="Confirm password"
                  type={showPass ? "text" : "password"}
                />{" "}
                <Eye
                  onClick={() => setShowPass(!showPass)}
                  size={18}
                  className=" absolute top-[60%] translate-y-[-50%] right-4"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Save"
              className=" bg-primaryDark hover:bg-secondaryGreen py-2 px-4 text-lightGraySec cursor-pointer hover:text-primaryDark rounded-lg mt-4 transition-all ease-in-out font-medium text-[18px]"
            />
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

export default EditProfile;
