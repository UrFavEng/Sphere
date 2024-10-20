"use client";
import { useGetMeQuery, useGetMeVideosQuery } from "@/app/store/apislice";
import Image from "next/image";
import EditProfile from "./EditProfile";
import { getmeRES } from "@/app/store/types";
import { useState } from "react";
import { LogOut, Pencil } from "lucide-react";
import InfoUser from "./InfoUser";
interface ProfileCardProps {
  setSection: (val: string) => void;
}
const ProfileCard = ({ setSection }: ProfileCardProps) => {
  const [editPropfile, setEditPropfile] = useState<boolean>();
  const { data: videos } = useGetMeVideosQuery();

  const { data } = useGetMeQuery();
  const handleLogout = () => {
    localStorage.removeItem("JWTSphere");

    window.location.href = "/";
  };
  return (
    <>
      <div className="  hidden sm:block">
        <div className="   text-primaryDark md:justify-self-start px-4 h-fit  py-4 w-full md:w-[95%]  lg:w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          <div className="">
            {" "}
            <Image
              width={170}
              height={170}
              src={
                data?.image?.url
                  ? data?.image?.url
                  : "/undraw_male_avatar_g98d.svg"
              }
              alt="user-avatar-image"
              className="border-2 border-solid m-auto w-[110px] h-[110px] border-primaryDark shadow-md rounded-full object-cover"
            />
          </div>
          <div className=" text-center">
            <h3 className=" w-full justify-center flex items-center gap-2 capitalize text-[22px] font-semibold text-primaryDark">
              {" "}
              {data?.username}{" "}
              <Pencil
                onClick={() => setEditPropfile(true)}
                size={16}
                className=" cursor-pointer text-secondaryDark hover:text-secondaryGreen"
              />
            </h3>
            <p className=" text-[12px] mt-[-6px] text-gray-400 font-medium">
              {data?.email}
            </p>
          </div>
          <hr className="border-gray-200 dark:border-gray-700 my-2" />
          <div className="">
            <h2 className="text-[18px] text-secondaryDark font-medium">
              Active
            </h2>
            <p
              onClick={() => setSection("Articles")}
              className=" text-[14px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
            >
              ({data?.articles && data?.articles.length / 2}) Articles
            </p>
            <p
              onClick={() => setSection("Videos")}
              className=" text-[14px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
            >
              ({videos?.videos && videos?.videos?.length / 2}) Videos
            </p>
            <p
              onClick={() => setSection("Reviews")}
              className="text-[14px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
            >
              ({data?.reviews && data?.reviews.length / 2}) Reviews
            </p>
            <p
              onClick={() => setSection("Comments")}
              className="text-[14px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
            >
              ({data?.comments && data?.comments.length / 2}) Comments
            </p>
          </div>{" "}
          <hr className="border-gray-200  dark:border-gray-700 my-2" />
          <p
            onClick={() => setEditPropfile(true)}
            className="flex items-center gap-2 text-[18px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
          >
            <Pencil size={14} /> Setting
          </p>
          <p
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer font-medium text-primaryDark hover:text-orange-700 transition-all ease-in-out"
          >
            <LogOut size={14} className=" mt-1" /> Log out
          </p>
          {editPropfile && (
            <EditProfile
              dataUser={data as getmeRES}
              setEditPropfile={setEditPropfile}
            />
          )}
        </div>
        <div className="  hidden md:block xl:hidden  md:justify-self-start sm:mt-5 xl:mt-0 xl:justify-self-end px-4 md:h-fit  py-4 w-full  md:w-[95%] lg:w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          <InfoUser />
        </div>
      </div>
      <div className=" block sm:hidden   text-primaryDark md:justify-self-start px-4 h-fit  py-4 w-full md:w-[95%] lg:w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
        <div className="">
          {" "}
          <Image
            width={170}
            height={170}
            src={
              data?.image?.url
                ? data?.image?.url
                : "/undraw_male_avatar_g98d.svg"
            }
            alt="user-avatar-image"
            className="border-2 border-solid m-auto w-[110px] h-[110px] border-primaryDark shadow-md rounded-full object-cover"
          />
        </div>
        <div className=" text-center">
          <h3 className=" w-full justify-center flex items-center gap-2 capitalize text-[22px] font-semibold text-primaryDark">
            {" "}
            {data?.username}{" "}
            <Pencil
              onClick={() => setEditPropfile(true)}
              size={16}
              className=" cursor-pointer text-secondaryDark hover:text-secondaryGreen"
            />
          </h3>
          <p className=" text-[12px] mt-[-6px] text-gray-400 font-medium">
            {data?.email}
          </p>
        </div>
        <hr className="border-gray-200 dark:border-gray-700 my-2" />
        <div className="">
          <h2 className="text-[18px] text-secondaryDark font-medium">Active</h2>
          <p
            onClick={() => setSection("Articles")}
            className=" text-[14px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
          >
            ({data?.articles && data?.articles.length / 2}) Articles
          </p>
          <p
            onClick={() => setSection("Videos")}
            className=" text-[14px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
          >
            ({videos?.videos && videos?.videos?.length / 2}) Videos
          </p>
          <p
            onClick={() => setSection("Reviews")}
            className="text-[14px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
          >
            ({data?.reviews && data?.reviews.length / 2}) Reviews
          </p>
          <p
            onClick={() => setSection("Comments")}
            className="text-[14px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
          >
            ({data?.reviews && data?.comments.length / 2}) Comments
          </p>
        </div>{" "}
        <hr className="border-gray-200  dark:border-gray-700 my-2" />
        <p
          onClick={() => setEditPropfile(true)}
          className="flex items-center gap-2 text-[16px] cursor-pointer font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
        >
          <Pencil size={14} /> Setting
        </p>
        <p className="flex items-center gap-2 cursor-pointer font-medium text-primaryDark hover:text-orange-700 transition-all ease-in-out">
          <LogOut size={14} className=" mt-1" /> Log out
        </p>
        {editPropfile && (
          <EditProfile
            dataUser={data as getmeRES}
            setEditPropfile={setEditPropfile}
          />
        )}
      </div>
    </>
  );
};

export default ProfileCard;
