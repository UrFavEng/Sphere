"use client";
import { useGetAllCatsQuery } from "@/app/store/apislice";
import { ChartBarStacked } from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoryArticle = () => {
  const { data } = useGetAllCatsQuery();
  return (
    <div className="justify-self-start px-4 h-fit  py-4 w-[85%]  rounded-lg shadow-xl bg-lightGraySec">
      <h1 className=" text-primaryDark font-semibold text-[20px] flex items-center justify-between">
        Categories
        <span className=" text-[14px] text-secondaryDark">
          <ChartBarStacked size={18} />
        </span>{" "}
      </h1>
      <ul className=" mt-1">
        {data?.data.map((cat) => (
          <li
            key={cat.documentId}
            className=" hover:underline w-fit cursor-pointer text-[16px] font-semibold text-primaryGreen"
          >
            <Link href={"/articles/" + cat.name}> {cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryArticle;
