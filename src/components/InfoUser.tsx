import { useGetMeQuery } from "@/app/store/apislice";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { getmeRES } from "@/app/store/types";
import { PulseLoader } from "react-spinners";

const InfoUser = () => {
  const [editPropfile, setEditPropfile] = useState<boolean>();
  const { data: userData, isLoading } = useGetMeQuery();
  return (
    <>
      <h2 className="  flex items-center gap-2 text-secondaryDark text-[18px] font-medium ">
        About you{" "}
        <Pencil
          onClick={() => setEditPropfile(true)}
          size={16}
          className=" cursor-pointer text-secondaryDark hover:text-secondaryGreen"
        />
      </h2>
      {isLoading ? (
        <>
          {" "}
          <p className="text-center mt-4">
            {" "}
            <PulseLoader color="#2F3E46" size={12} />
          </p>
          s
        </>
      ) : (
        <>
          {" "}
          <div>
            <p className=" mt-2 text-primaryDark text-[13px] leading-[16px] font-medium ">
              <span className=" text-[14px] text-primaryGreen">Bio: </span>
              {userData?.bio}{" "}
            </p>
            <p className=" mt-1 text-primaryDark text-[13px] leading-[16px] font-medium ">
              <span className=" text-[14px] text-primaryGreen">
                Expertise:{" "}
              </span>
              {userData?.expertise}{" "}
            </p>
            <p className=" mt-1 text-primaryDark text-[13px] leading-[16px] font-medium ">
              <span className=" text-[14px] text-primaryGreen">Location: </span>
              {userData?.location}{" "}
            </p>
          </div>
        </>
      )}

      {editPropfile && (
        <EditProfile
          dataUser={userData as getmeRES}
          setEditPropfile={setEditPropfile}
        />
      )}
    </>
  );
};

export default InfoUser;
