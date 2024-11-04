"use client";
import Link from "next/link";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useStore } from "@/app/state/useStore";
import { signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useSidebarStore } from "@/app/state/useStore";
import { linksData } from "./data";
const Header = ({
  links = linksData,
  features = true,
  mobile = true,
  className,
}: {
  links?: any[];
  features?: boolean;
  mobile?: boolean;
  className?: string;
}) => {
  const { user } = useStore();
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const shouldHideLink = (linkText: string) => {
    if (user && linkText === "LOG-IN") {
      return true;
    }
    if (!user && (linkText === "DASHBOARD" || linkText === "REFERRALS")) {
      return true;
    }
    return false;
  };
  console.log(user)

  useEffect(() => {
    if (window.location.hash) {
      // Remove the hash from the URL without scrolling the page
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname
      );
    }
  });
  return (
    <header className="sticky   top-0 z-999 flex  bg-white drop-shadow-1 ">
      <div className={"flex  m-auto  flex-grow items-center justify-between px-7 md:px-[3rem] lg:px-[4rem] py-2 shadow-2  " + `${className}`}>
        <div className="flex   items-center gap-2 sm:gap-4 ">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className={"z-99999 md:hidden block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark " + `${mobile? 'block' :'hidden'}`}
          >
            <span className="relative  block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 " href="/">
            <Image
              className="pt-[0.3rem]"
              width={130}
              height={50}
              src="/marcylogo2.png"
              alt="Logo"
            />
          </Link>
        </div>

        

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex gap-5">
            {links.map((link, index) => {
              const hide = shouldHideLink(link.text);
              return (
                !hide && (
                  <Link
                    onClick={link.onClick}
                    className={` ${ mobile? 'hidden md:block'  : '' } hover:opacity-50 duration-300  font-medium text-[1.1rem]`}
                    href={link.href || ""}
                  >
                    {link.text}
                  </Link>
                )
              );
            })}
          </ul>
          {features && (
            <div className="flex gap-2">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                <DropdownNotification />
              </ul>

              <DropdownUser />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
