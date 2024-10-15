"use client";
import {
  AudioLines,
  CircleUser,
  MessageCircle,
  Newspaper,
  Star,
  TvMinimalPlay,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  // console.log(data, error);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstInputValue = (form.elements[0] as HTMLInputElement).value;
    console.log(firstInputValue);
    if (firstInputValue) {
      router.push("/search/" + firstInputValue);
    } else {
      router.push("/");
    }
  };
  return (
    <div className="bg-lightGraySec relative z-10 border-b-2 border-solid border-secondaryDark shadow-xl rounded-b-lg container mx-auto px-4 py-6  grid grid-cols-3 justify-items-center ">
      <div className=" justify-self-start">
        <form onSubmit={handleSubmit}>
          <input
            className=" h-[34px] pl-3 shadow-md bg-lightGraySec border-secondaryDark border-b-2 border-l-2  focus:border-2 transition-all ease-in-out duration-75 w-[270px] placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium text-primaryGreen outline-none rounded-lg"
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div className=" w-full grid grid-cols-3 justify-items-center content-center">
        <Link
          href={"/"}
          className=" text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 "
        >
          Article
          <Newspaper size={18} className=" " />
        </Link>
        <span className=" text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 ">
          Video
          <TvMinimalPlay size={18} className=" " />
        </span>
        <span className=" text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 ">
          Audio
          <AudioLines size={18} className=" " />
        </span>
      </div>
      <div className="justify-self-end flex items-center gap-4">
        <span
          onClick={() => router.push("/profile")}
          className=" text-[14px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 "
        >
          Review
          <Star size={16} className=" " />
        </span>
        <span
          onClick={() => router.push("/profile")}
          className=" text-[14px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 "
        >
          Comment
          <MessageCircle size={16} className=" " />
        </span>
        <CircleUser
          onClick={() => router.push("/profile")}
          size={28}
          className="text-primaryDark transition-all ease-in-out cursor-pointer hover:text-secondaryGreen"
        />
      </div>
    </div>
  );
};

export default Navbar;
