import { Link } from "lucide-react";
import React from "react";

const QuickLinks = () => {
  return (
    <div className="justify-self-end px-4 h-fit  py-4 w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
      <h1 className=" text-primaryDark font-semibold text-[20px] flex items-center justify-between">
        Quick links
        <span className=" text-[14px] text-secondaryDark">
          <Link size={18} />
        </span>{" "}
      </h1>
      <ul className=" mt-1">
        <li className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen">
          Profile
        </li>
        <li className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen">
          My Articles
        </li>
        <li className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen">
          My Videos
        </li>
        <li className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen">
          My Audio
        </li>
        <li className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen">
          My Comments
        </li>
        <li className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen">
          My Reviews
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;