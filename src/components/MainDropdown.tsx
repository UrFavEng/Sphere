import { useGetMeQuery } from "@/app/store/apislice";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import EditProfile from "./EditProfile";
import { getmeRES } from "@/app/store/types";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import { PulseLoader } from "react-spinners";

export default function Dropdown() {
  const [editPropfile, setEditPropfile] = useState<boolean>();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetMeQuery();

  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const handleLogout = () => {
    localStorage.removeItem("JWTSphere");

    window.location.href = "/";
  };
  return (
    <div ref={dropdownRef} className="relative cursor-default inline-block ">
      <button
        title="Dropdown"
        onClick={toggleDropdown}
        className="relative z-10 flex items-center  text-sm border-none rounded-md  outline-none"
      >
        <span className="lg:hidden">
          <CircleUser
            size={28}
            className="text-primaryDark hover:text-secondaryGreen cursor-pointer transition ease-in-out"
          />
        </span>
        <p className=" hidden lg:block">
          {isLoading ? (
            <>
              {" "}
              <p className="text-center mt-4">
                {" "}
                <PulseLoader color="#2F3E46" size={10} />
              </p>
            </>
          ) : (
            <>
              {" "}
              <Link
                href={""}
                className="flex text-lightGraySec hover:text-primaryDark rounded-lg shadow-lg py-2 px-3 bg-primaryDark hover:bg-secondaryGreen items-center  mt- text-sm  transition-all duration-300 transform "
              >
                <Image
                  width={36}
                  height={36}
                  className="flex-shrink-0 border-[1px] border-white border-solid object-cover mx-1 rounded-full w-9 h-9"
                  src={data?.image?.url ? data?.image?.url : "/mainPhoto.svg"}
                  alt="jane avatar"
                />
                <span className="mx-1 block text-start">
                  <span className="text-[13px] font-medium block">
                    {data?.username}
                  </span>
                  <span className="text-[9px] mt-[-4px]  block ">
                    {data?.email}
                  </span>
                </span>
              </Link>
            </>
          )}
        </p>
      </button>
      {/* Apply transition classes to dropdown */}
      <div
        className={`absolute right-0 z-50 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <Link
          href="/profile"
          className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Image
            width={36}
            height={36}
            className="flex-shrink-0 border-[1px] border-white border-solid object-cover mx-1 rounded-full w-9 h-9"
            src={data?.image?.url ? data?.image?.url : "/mainPhoto.svg"}
            alt="jane avatar"
          />
          <div className="mx-1">
            <h1 className="text-sm font-semibold text-lightGraySec">
              {data?.username}
            </h1>
            <p className="text-[9px] text-lightGraySec">{data?.email}</p>
          </div>
        </Link>
        <hr className="border-gray-200 dark:border-gray-700" />
        <Link
          onClick={() => closeDropdown()}
          href="/profile"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          View Profile
        </Link>
        <p
          onClick={() => {
            setEditPropfile(true);
            closeDropdown();
          }}
          className="block cursor-pointer px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Settings
        </p>
        <hr className="border-gray-200 dark:border-gray-700" />
        <a
          onClick={() => handleLogout()}
          className="block px-4 py-3 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-orange-700 cursor-pointer"
        >
          Sign out
        </a>
      </div>
      {editPropfile && (
        <EditProfile
          dataUser={data as getmeRES}
          setEditPropfile={setEditPropfile}
        />
      )}
    </div>
  );
}
