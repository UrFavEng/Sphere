import { useGetAllCatsVideoQuery } from "@/app/store/apislice";
import { ChartBarStacked } from "lucide-react";
import Link from "next/link";
import React from "react";
import QuickLinks from "./QuickLinks";

const CategoryVideos = () => {
  const { data } = useGetAllCatsVideoQuery();
  // console.log(data?.data[0].name);

  return (
    <>
      {" "}
      <div className=" hidden md:block">
        <div className="justify-self-start px-4 h-fit  py-4 w-full md:w-[95%] lg:w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          {" "}
          <h1 className=" text-primaryDark font-semibold text-[20px] flex items-center justify-between">
            Categories
            <span className=" text-[14px] text-secondaryDark">
              <ChartBarStacked size={18} />
            </span>{" "}
          </h1>{" "}
          <ul className=" mt-1">
            {data?.data.map((cat) => (
              <li
                key={cat.documentId}
                className=" capitalize hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen"
              >
                <Link href={"/articles/" + cat.name}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>{" "}
        <div className="block xl:hidden sm:mt-5 !justify-self-start  md:justify-self-end px-4 h-fit   py-4 w-full md:w-[95%] lg:w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
          <QuickLinks />
        </div>
      </div>
    </>
  );
};

export default CategoryVideos;
