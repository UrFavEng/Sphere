"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useLoginMutation } from "../store/apislice";
import Link from "next/link";
import { PulseLoader } from "react-spinners";

const LogIn = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>();
  const [login, { data, error, isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ identifier, password }).unwrap();
      // console.log("Login successful:", response);
      localStorage.setItem("JWTSphere", response.jwt);
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <div className="font-[sans-serif]  relative min-h-[115vh] md:min-h-[100vh] flex items-center justify-center bg-primaryDark">
        <div className=" absolute top-6 left-8 font-bold">
          {" "}
          <h2
            onClick={() => router.push("/")}
            className="flex main-logo items-center gap-1 text-lightGraySec cursor-pointer hover:text-secondaryGreen transition-all ease-in-out font-bold tracking-[1px] text-[24px]"
          >
            <svg
              id="logo-84"
              width="42"
              height="24"
              viewBox="0 0 40 28"
              fill="#fafcf5"
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
          </h2>
        </div>
        <div className=" flex flex-col items-center justify-center py-6 px-1 md:px-4">
          <div className="grid lg:grid-cols-2 items-center  lg:gap-16 xl:gap-4  sm:w-[95%] xl:w-[85%] mt-[60px]">
            <div className="border order-2 lg:order-1 bg-lightGraySec border-gray-300 rounded-lg py-[14px] px-[14px] sm:p-6 w-[94%] lg:mt-4 md:mt-auto   mb-12 lg:mb-0 mx-auto lg:w-[90%] xl:w-[65%] shadow-lg max-md:mx-auto">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="mb-4 sm:mb-8">
                  <h3 className="text-primaryDark text-[22px] sm:text-3xl font-extrabold">
                    Sign in
                  </h3>
                  <p className="text-gray-500 text-sm sm:mt-4 leading-[16px]">
                    Sign in to your account and explore a world of
                    possibilities. Your journey begins here.
                  </p>
                </div>

                <div className="">
                  <label className="text-primaryGreen font-bold text-sm mb-2 block">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="identifier"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      type="text"
                      required
                      className="w-full text-sm outline-none focus:border-secondaryGreen focus:border-[1.5px] text-gray-800 shadow-lg bg-lightGray placeholder:text-primaryDark border-l-secondaryGreen border-l-[1.5px] px-4 py-3 rounded-lg "
                      placeholder="Enter user name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fafcf5"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-primaryGreen font-bold text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm outline-none focus:border-secondaryGreen focus:border-[1.5px] text-gray-800 shadow-lg bg-lightGray placeholder:text-primaryDark border-l-secondaryGreen border-l-[1.5px] px-4 py-3 rounded-lg "
                      placeholder="Enter password"
                    />
                    <svg
                      onClick={() => setShowPassword(true)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fafcf5"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm">
                    <a
                      href="jajvascript:void(0);"
                      className="text-[14px] text-primaryGreen hover:underline font-semibold"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="sm:!mt-8">
                  {isLoading ? (
                    <p className="text-center">
                      {" "}
                      <PulseLoader color="#2F3E46" size={12} />
                    </p>
                  ) : (
                    <>
                      {" "}
                      <button
                        type="submit"
                        className="w-full shadow-xl py-3 px-4 tracking-wide rounded-lg text-lightGraySec  bg-secondaryDark hover:text-primaryDark hover:bg-secondaryGreen transition-all ease-in-out text-[18px] font-semibold outline-none"
                      >
                        Log in
                      </button>
                    </>
                  )}

                  {error && (
                    <p className=" font-bold text-[14px] text-orange-700  ">
                      Email or password is Invalid
                    </p>
                  )}
                </div>

                <p className="text-sm sm:!mt-8 text-center text-gray-800">
                  Don't have an account ?{" "}
                  <Link
                    href={"/signup"}
                    className=" cursor-pointer text-secondaryDark font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="/undraw_login_re_4vu2(1).svg"
                className=" h-full w-[480px] lg:w-full mx-auto block object-cover"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="bg-lightGraySec shadow-xl ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-primaryDark sm:justify-start">
              {" "}
              <h2
                onClick={() => router.push("/")}
                className="flex main-logo items-center gap-1  cursor-pointer hover:text-secondaryGreen transition-all ease-in-out font-bold tracking-[1px] text-[24px]"
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
              </h2>
            </div>

            <p className="mt-4 text-center text-sm text-primaryGreen font-medium lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default LogIn;
