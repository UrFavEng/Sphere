"use client";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname(); // Get the current route
  const hideNavbarRoutes = ["/signup", "/login"]; // List of routes where the Navbar should be hidden

  return (
    <>
      <div className=" w-full">
        {" "}
        {!hideNavbarRoutes.includes(pathname) && (
          <div className=" w-full">
            {" "}
            <Navbar />
          </div>
        )}
        <div className=" w-full"> {children}</div>{" "}
      </div>

      {!hideNavbarRoutes.includes(pathname) && (
        <div className=" w-full">
          {" "}
          <Footer />
        </div>
      )}
    </>
  );
};

export default MainLayout;
