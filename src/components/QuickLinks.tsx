"use client";
import { Link as Ll } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import EditProfile from "./EditProfile";
import { getmeRES } from "@/app/store/types";
import { useGetMeQuery } from "@/app/store/apislice";

const QuickLinks = () => {
  const [editPropfile, setEditPropfile] = useState<boolean>();
  const { data } = useGetMeQuery();

  return (
    <>
      <h1 className=" text-primaryDark font-semibold text-[20px] flex items-center justify-between">
        Quick links
        <span className=" text-[14px] text-secondaryDark">
          <Ll size={18} />
        </span>{" "}
      </h1>
      <ul className=" mt-1">
        <li className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen">
          <Link href="/profile">Profile</Link>
        </li>
        <li
          onClick={() => setEditPropfile(true)}
          className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen"
        >
          Setting
        </li>
      </ul>{" "}
      {editPropfile && (
        <EditProfile
          dataUser={data as getmeRES}
          setEditPropfile={setEditPropfile}
        />
      )}
    </>
  );
};

export default QuickLinks;
