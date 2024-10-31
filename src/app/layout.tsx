"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route
  const hideNavbarRoutes = ["/signup", "/login"]; // List of routes where the Navbar should be hidden

  return (
    <Provider store={store}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex justify-between items-center flex-col antialiased  min-h-[100vh] bg-lightGray`}
        >
          <div className=" w-full">
            {" "}
            {!hideNavbarRoutes.includes(pathname) && (
              <div className=" w-full">
                {" "}
                <Navbar />
              </div>
            )}
            <div
              className={`${
                !hideNavbarRoutes.includes(pathname) ? " px-4" : "px-0"
              } w-full`}
            >
              {" "}
              {children}
            </div>{" "}
          </div>

          {!hideNavbarRoutes.includes(pathname) && (
            <div className=" w-full">
              {" "}
              <Footer />
            </div>
          )}
        </body>
      </html>
    </Provider>
  );
}
