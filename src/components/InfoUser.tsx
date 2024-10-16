import { useGetMeQuery } from "@/app/store/apislice";
import React from "react";

const InfoUser = () => {
  const { data: userData } = useGetMeQuery();
  return (
    <>
      <h2 className="  text-secondaryDark text-[18px] font-medium ">
        About you
      </h2>
      <div>
        <p className=" mt-2 text-primaryDark text-[13px] leading-[16px] font-medium ">
          <span className=" text-[14px] text-primaryGreen">Bio: </span>
          {userData?.bio}{" "}
        </p>
        <p className=" mt-1 text-primaryDark text-[13px] leading-[16px] font-medium ">
          <span className=" text-[14px] text-primaryGreen">Expertise: </span>
          {userData?.expertise}{" "}
        </p>
        <p className=" mt-1 text-primaryDark text-[13px] leading-[16px] font-medium ">
          <span className=" text-[14px] text-primaryGreen">Location: </span>
          {userData?.location}{" "}
        </p>
      </div>
    </>
  );
};

export default InfoUser;
