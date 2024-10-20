"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();

  return (
    <div>
      <footer className="bg-lightGraySec border-t-primaryDark border-[1.5px] shadow-2xl">
        <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center  sm:justify-start">
              <h2
                onClick={() => {
                  router.push("/");
                }}
                className="flex  pt-2    main-logo items-center gap-1 text-primaryDark cursor-pointer hover:text-secondaryGreen transition-all ease-in-out font-bold tracking-[1px] text-[24px]"
              >
                <svg
                  id="logo-84"
                  width="42"
                  height="24"
                  viewBox="0 0 40 28"
                  fill="#2F3E46"
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
            </div>

            <p className="mt-4 font-medium text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2022. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
