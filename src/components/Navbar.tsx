"use client";
import { useGetAllCatsQuery, useGetMeQuery } from "@/app/store/apislice";
import {
  AudioLines,
  Menu,
  Newspaper,
  Search,
  TvMinimalPlay,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Dropdown from "./MainDropdown";
import Image from "next/image";
import AddArticle from "./AddArticle";
import EditProfile from "./EditProfile";
import { getmeRES } from "@/app/store/types";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("JWTSphere");

    window.location.href = "/";
  };
  const pathname = usePathname(); // Get the current route
  const hideNavbarRoutes = ["/profile"]; // List of routes where the Navbar should be hidden
  const { data } = useGetAllCatsQuery();
  const { data: userData } = useGetMeQuery();
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

  const [searchVisible, setSearchVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [addArticle, setAddArticle] = useState(false);
  const [editPropfile, setEditPropfile] = useState(false);
  return (
    <>
      {" "}
      <div className="bg-lightGraySec hidden relative z-10 sm:border-b-2 lg:border-0 border-solid border-secondaryDark shadow-md sm:shadow-xl  lg:shadow-sm  mx-auto px-8 xl:px-24 py-4 md:py-3  lg:grid grid-cols-2 md:grid-cols-3 justify-items-center ">
        <div className=" flex items-center w-full  justify-start md:justify-self-start">
          <form onSubmit={handleSubmit} className=" w-full">
            <input
              className=" h-[36px] pl-3 shadow-md bg-lightGray border-secondaryDark border-l-2   focus:border-2 transition-all ease-in-out duration-75 w-full sm:w-[260px] md:w-[195px] lg:w-[270px] placeholder:text-primaryDark placeholder:text-[14px] placeholder:font-medium text-primaryGreen outline-none rounded-lg"
              type="text"
              placeholder="Search"
            />
          </form>
        </div>
        <h2
          onClick={() => router.push("/")}
          className="flex main-logo items-center gap-1 text-primaryDark cursor-pointer hover:text-secondaryGreen transition-all ease-in-out font-bold tracking-[1px] text-[24px]"
        >
          <svg
            id="logo-84"
            width="42"
            height="24"
            viewBox="0 0 40 28"
            fill="#354F52"
            xmlns="http://www.w3.org/2000/svg"
            className="logo-svg"
          >
            <path
              className="ccustom logo-path"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.98578 4.11462L0 14C1.99734 15.9773 4.27899 17.6437 6.76664 18.9474C7.45424 20.753 8.53203 22.4463 10 23.8995C15.5229 29.3668 24.4772 29.3668 30 23.8995C31.468 22.4463 32.5458 20.753 33.2334 18.9473C35.721 17.6437 38.0027 15.9773 40 14L30.0223 4.12266C30.0149 4.11527 30.0075 4.10788 30 4.1005C24.4772 -1.36683 15.5229 -1.36683 10 4.1005C9.99527 4.10521 9.99052 4.10991 9.98578 4.11462ZM29.0445 20.7309C26.1345 21.7031 23.0797 22.201 20 22.201C16.9203 22.201 13.8656 21.7031 10.9556 20.7309C11.2709 21.145 11.619 21.5424 12 21.9196C16.4183 26.2935 23.5817 26.2935 28 21.9196C28.381 21.5424 28.7292 21.145 29.0445 20.7309ZM12.2051 5.8824C12.9554 6.37311 13.7532 6.79302 14.588 7.13536C16.3038 7.83892 18.1428 8.20104 20 8.20104C21.8572 8.20104 23.6962 7.83892 25.412 7.13536C26.2468 6.79302 27.0446 6.3731 27.795 5.88238C23.4318 1.77253 16.5682 1.77254 12.2051 5.8824Z"
            />
          </svg>
          Sphere
          {/* <span className=" absolute bottom-[0%] right-[50%] translate-x-[-50%] text-primaryDark hover:text-secondaryGreen">
            <ChevronsUpDown size={20} />
          </span> */}
        </h2>
        {/* <div className=" w-full hidden md:grid grid-cols-3 justify-items-center content-center">
          <Link
            href={"/"}
            className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 "
          >
            Article
            <Newspaper size={16} className=" " />
          </Link>
          <span className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 ">
            Video
            <TvMinimalPlay size={16} className=" " />
          </span>
          <span className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 ">
            Audio
            <AudioLines size={16} className=" " />
          </span>
        </div> */}
        <div className="justify-self-end flex items-center gap-3 lg:gap-4">
          {userData ? (
            <>
              {" "}
              <span className=" hidden lg:block">
                <Dropdown />
              </span>
              <span className="hidden md:block  lg:hidden">
                <Dropdown />
              </span>
            </>
          ) : (
            <div className=" flex items-center gap-4">
              {" "}
              <button
                onClick={() => router.push("/login")}
                type="button"
                className=" underline font-medium text-[18px] text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
              >
                Log in
              </button>
              <button
                onClick={() => router.push("/signup")}
                type="button"
                className="shadow-xl rounded-lg transition-all ease-in-out hover:bg-secondaryGreen font-medium text-[16px] hover:text-primaryDark text-lightGraySec bg-primaryDark border-l-[1px] border-lightGraySec py-[6px] px-[10px] rounde"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:block shadow-lg bg-lightGraySec py-2 sm:border-b-[1.5px] border-solid border-secondaryDark">
        {" "}
        <div className=" w-full hidden md:flex items-center justify-center gap-10">
          <Link
            href={"/"}
            className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 "
          >
            Article
            <Newspaper size={16} className=" " />
          </Link>
          <span className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 ">
            Video
            <TvMinimalPlay size={16} className=" " />
          </span>
          <span className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 ">
            Audio
            <AudioLines size={16} className=" " />
          </span>
        </div>
      </div>
      <>
        {/* Navbar */}
        <div className="px-4 py-3 lg:hidden  shadow-sm flex items-center justify-between gap-2 bg-lightGraySec relative z-10">
          <div className="justify-start  basis-[33%]">
            {" "}
            <div>
              {/* Button to toggle the sidebar */}
              <div
                className={` ${
                  !userData &&
                  "  justify-end flex items-center gap-3 flex-row-reverse"
                } content`}
              >
                {!userData && (
                  <>
                    {" "}
                    <Search
                      size={28}
                      className={`text-primaryDark ${
                        userData && "hidden"
                      } hover:text-secondaryGreen cursor-pointer transition ease-in-out`}
                      onClick={() => setSearchVisible(!searchVisible)} // Toggle search bar visibility
                    />
                  </>
                )}
                {/* Page content here */}
                <button
                  title="dropdown"
                  onClick={toggleSidebar}
                  className="text-primaryDark cursor-pointer"
                >
                  <Menu size={28} />
                </button>
              </div>

              {/* Sidebar overlay */}
              <div
                className={`fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={toggleSidebar} // Close sidebar when clicking on the overlay
              ></div>

              {/* Sidebar */}
              <div
                className={`fixed overflow-hidden flex items-start justify-between flex-col p-0 top-0 left-0 z-[999] w-[290px] rounded-r-lg border-r-2 border-lightGraySec min-h-full bg-base-200  transition-transform duration-300 ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className=" w-full">
                  <h2
                    onClick={() => {
                      router.push("/");
                      setIsOpen(false);
                    }}
                    className="flex pl-4  py-4  hover:bg-secondaryDark  main-logoo items-center gap-1 text-lightGraySec cursor-pointer hover:text-lightGray transition-all ease-in-out font-bold tracking-[1px] text-[24px]"
                  >
                    <svg
                      id="logo-84"
                      width="42"
                      height="24"
                      viewBox="0 0 40 28"
                      fill="#fafcf5"
                      xmlns="http://www.w3.org/2000/svg"
                      className="logoo-svg"
                    >
                      <path
                        className="ccustom logo-path"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.98578 4.11462L0 14C1.99734 15.9773 4.27899 17.6437 6.76664 18.9474C7.45424 20.753 8.53203 22.4463 10 23.8995C15.5229 29.3668 24.4772 29.3668 30 23.8995C31.468 22.4463 32.5458 20.753 33.2334 18.9473C35.721 17.6437 38.0027 15.9773 40 14L30.0223 4.12266C30.0149 4.11527 30.0075 4.10788 30 4.1005C24.4772 -1.36683 15.5229 -1.36683 10 4.1005C9.99527 4.10521 9.99052 4.10991 9.98578 4.11462ZM29.0445 20.7309C26.1345 21.7031 23.0797 22.201 20 22.201C16.9203 22.201 13.8656 21.7031 10.9556 20.7309C11.2709 21.145 11.619 21.5424 12 21.9196C16.4183 26.2935 23.5817 26.2935 28 21.9196C28.381 21.5424 28.7292 21.145 29.0445 20.7309ZM12.2051 5.8824C12.9554 6.37311 13.7532 6.79302 14.588 7.13536C16.3038 7.83892 18.1428 8.20104 20 8.20104C21.8572 8.20104 23.6962 7.83892 25.412 7.13536C26.2468 6.79302 27.0446 6.3731 27.795 5.88238C23.4318 1.77253 16.5682 1.77254 12.2051 5.8824Z"
                      />
                    </svg>
                    Sphere
                    {/* <span className=" absolute bottom-[0%] right-[50%] translate-x-[-50%] text-primaryDark hover:text-secondaryGreen">
            <ChevronsUpDown size={20} />
          </span> */}
                  </h2>
                  <hr className="border-gray-200 dark:border-gray-700" />

                  {userData ? (
                    <>
                      {" "}
                      <Link
                        onClick={() => setIsOpen(false)}
                        href="/profile"
                        className="flex p-4 items-center  mt- text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <Image
                          width={48}
                          height={48}
                          className="flex-shrink-0 border-[1px] border-white border-solid object-cover mx-1 rounded-full w-12 h-12"
                          src={
                            userData?.image?.url
                              ? userData?.image?.url
                              : "/undraw_male_avatar_g98d.svg"
                          }
                          alt="jane avatar"
                        />
                        <div className="mx-1">
                          <h1 className="text-[18px] font-semibold text-lightGraySec">
                            {userData?.username}
                          </h1>
                          <p className="text-[12px] text-lightGraySec">
                            {userData?.email}
                          </p>
                        </div>
                      </Link>
                      <hr className="border-gray-200 dark:border-gray-700" />
                    </>
                  ) : (
                    <></>
                  )}

                  <ul className="menu p-4 text-base-content mt-4">
                    <h2 className=" text-lightGraySec font-bold text-[20px]">
                      Main Sections
                    </h2>
                    <li className=" py-2">
                      <Link
                        onClick={() => setIsOpen(false)}
                        href={"/"}
                        className=" font-semibold text-[20px] hover:text-lightGraySec"
                      >
                        Articles
                      </Link>
                    </li>
                    <li>
                      <a className=" font-semibold text-[20px] hover:text-lightGraySec">
                        Videos
                      </a>
                    </li>
                    <li>
                      <a className=" font-semibold text-[20px] hover:text-lightGraySec">
                        Audios
                      </a>
                    </li>
                  </ul>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <ul className="menu p-4 text-base-content mt-4">
                    <h2 className=" text-lightGraySec font-bold text-[20px]">
                      Add
                    </h2>
                    <li className=" py-2">
                      <a
                        onClick={() => {
                          setAddArticle(true);
                          setIsOpen(false);
                        }}
                        className=" font-semibold text-[20px] hover:text-lightGraySec"
                      >
                        Article
                      </a>
                    </li>
                    <li>
                      <a className=" font-semibold text-[20px] hover:text-lightGraySec">
                        Video
                      </a>
                    </li>
                    <li>
                      <a className=" font-semibold text-[20px] hover:text-lightGraySec">
                        Audio
                      </a>
                    </li>
                  </ul>
                </div>
                {userData ? (
                  <div className=" w-full">
                    {" "}
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <ul className="menu p-4 text-base-content mt-4">
                      <li>
                        <a
                          onClick={() => {
                            setEditPropfile(true);
                            setIsOpen(false);
                          }}
                          className=" font-semibold py-2 text-[18px] hover:text-lightGraySec"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handleLogout}
                          className=" font-semibold py-2 text-[18px]  hover:text-orange-700"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>{" "}
                  </div>
                ) : (
                  <div className=" w-full">
                    <hr className="border-lightGraySec" />

                    <button
                      onClick={() => router.push("/signup")}
                      type="button"
                      className="flex pl-4 w-full  border-b-[1.5px] border-gray-200 dark:border-gray-700 py-2  hover:bg-secondaryDark  items-center gap-1 text-lightGraySec cursor-pointer hover:text-lightGray transition-all ease-in-out font-bold tracking-[1px] text-[18px]"
                    >
                      Sign up
                    </button>
                    <button
                      onClick={() => router.push("/login")}
                      type="button"
                      className="flex pl-4 w-full  py-2  hover:bg-secondaryDark items-center gap-1 text-lightGraySec cursor-pointer hover:text-lightGray transition-all ease-in-out font-bold tracking-[1px] text-[18px]"
                    >
                      Log in
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <h2
            onClick={() => router.push("/")}
            className="flex basis-[33%]  justify-center  main-logo items-center gap-1 text-primaryDark cursor-pointer hover:text-secondaryGreen transition-all ease-in-out font-bold tracking-[1px] text-[24px]"
          >
            <svg
              id="logo-84"
              width="42"
              height="24"
              viewBox="0 0 40 28"
              fill="#354F52"
              xmlns="http://www.w3.org/2000/svg"
              className="logo-svg"
            >
              <path
                className="ccustom logo-path"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.98578 4.11462L0 14C1.99734 15.9773 4.27899 17.6437 6.76664 18.9474C7.45424 20.753 8.53203 22.4463 10 23.8995C15.5229 29.3668 24.4772 29.3668 30 23.8995C31.468 22.4463 32.5458 20.753 33.2334 18.9473C35.721 17.6437 38.0027 15.9773 40 14L30.0223 4.12266C30.0149 4.11527 30.0075 4.10788 30 4.1005C24.4772 -1.36683 15.5229 -1.36683 10 4.1005C9.99527 4.10521 9.99052 4.10991 9.98578 4.11462ZM29.0445 20.7309C26.1345 21.7031 23.0797 22.201 20 22.201C16.9203 22.201 13.8656 21.7031 10.9556 20.7309C11.2709 21.145 11.619 21.5424 12 21.9196C16.4183 26.2935 23.5817 26.2935 28 21.9196C28.381 21.5424 28.7292 21.145 29.0445 20.7309ZM12.2051 5.8824C12.9554 6.37311 13.7532 6.79302 14.588 7.13536C16.3038 7.83892 18.1428 8.20104 20 8.20104C21.8572 8.20104 23.6962 7.83892 25.412 7.13536C26.2468 6.79302 27.0446 6.3731 27.795 5.88238C23.4318 1.77253 16.5682 1.77254 12.2051 5.8824Z"
              />
            </svg>
            <span className=" hidden sm:block">Sphere</span>
            {/* <span className=" absolute bottom-[0%] right-[50%] translate-x-[-50%] text-primaryDark hover:text-secondaryGreen">
            <ChevronsUpDown size={20} />
          </span> */}
          </h2>
          <div className=" basis-[33%] justify-end  flex items-center gap-2">
            <p>
              <Search
                size={28}
                className={`text-primaryDark ${
                  !userData && "hidden"
                } hover:text-secondaryGreen cursor-pointer transition ease-in-out`}
                onClick={() => setSearchVisible(!searchVisible)} // Toggle search bar visibility
              />
            </p>
            <div className=" mt-[6px]">
              {userData ? (
                <>
                  <Dropdown />
                </>
              ) : (
                <>
                  {" "}
                  <div className=" flex items-center gap-2 md::gap-4">
                    {" "}
                    <button
                      onClick={() => router.push("/login")}
                      type="button"
                      className=" underline font-medium text-[16px] hidden sm:block sm:text-[18px] text-primaryDark hover:text-secondaryGreen transition-all ease-in-out"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => router.push("/signup")}
                      type="button"
                      className="shadow-xl rounded-lg transition-all ease-in-out hover:bg-secondaryGreen font-medium text-[14px] sm:text-[16px] hover:text-primaryDark text-lightGraySec bg-primaryDark border-l-[1px] border-lightGraySec py-[6px] px-[10px] rounde"
                    >
                      Sign up
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>{" "}
        {/* Search Bar */}
        <div
          className={`${
            searchVisible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden text-center transition-all border-t-[1.5px] ease-in-out duration-500 lg:hidden  bg-lightGraySec`}
        >
          <form onSubmit={handleSubmit} className=" relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-[85%] my-2 px-4 py-2 bg-lightGray text-primaryDark border-none outline-none border border-gray-300 rounded-lg shadow-md"
            />
            <button type="submit">
              {" "}
              <Search
                size={28}
                className={`text-primaryDark  absolute right-[10%] top-[50%] translate-y-[-50%] hover:text-secondaryGreen cursor-pointer transition ease-in-out`}
                onClick={() => setSearchVisible(!searchVisible)} // Toggle search bar visibility
              />
            </button>
          </form>
        </div>
        {!hideNavbarRoutes.includes(pathname) && (
          <div className="hidden md:block lg:hidden  sm:shadow-lg bg-lightGraySec py-[10px] sm:border-b-[1.5px]  border-solid border-secondaryDark">
            {" "}
            <div className=" w-full hidden md:flex items-center justify-center gap-10">
              <Link
                href={"/"}
                className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 "
              >
                Article
                <Newspaper size={16} className=" " />
              </Link>
              <span className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 ">
                Video
                <TvMinimalPlay size={16} className=" " />
              </span>
              <span className=" text-[14px] lg:text-[18px] font-medium text-primaryDark hover:text-secondaryGreen transition-all ease-in-out cursor-pointer flex flex-row-reverse items-center gap-1 ">
                Audio
                <AudioLines size={16} className=" " />
              </span>
            </div>
          </div>
        )}
      </>
      {!hideNavbarRoutes.includes(pathname) && (
        <div className="py-3 bg-lightGraySec md:hidden border-t-[1.5px]   overflow-y-auto whitespace-nowrap scroll-hidden">
          {data?.data.map((item) => (
            <Link key={item.name} href={`/articles/${item.name}`}>
              <span className="mx-4 capitalize text-primaryDark text-sm leading-5 transition-all ease-in-out duration-300 transform font-medium text-[12px] hover:underline md:my-0">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
      {addArticle && <AddArticle setAddArticle={setAddArticle} />}
      {editPropfile && (
        <EditProfile
          setEditPropfile={setEditPropfile}
          dataUser={userData as getmeRES}
        />
      )}
    </>
  );
};

export default Navbar;
