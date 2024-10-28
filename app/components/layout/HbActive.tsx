"use client";
import { useEffect } from "react";
import HbButton from "../ui/HbButton";
import { links } from "./Sidebar";

export default function HbActive({
  user,
  active,
  setIsActive,
}: {
  user: any;
  active: boolean;
  setIsActive: (active: boolean) => void;
}) {
  const shouldHideLink = (linkText: string) => {
    if (user && linkText === "LOG-IN") {
      return true;
    }
    if (!user && (linkText === "DASHBOARD" || linkText === "LOG-OUT")) {
      return true;
    }
    return false;
  };


  return (
    <div
      className={` ${
        active ? "translate-y-[0]" : "translate-y-[-100vh]"
      }  duration-300 z-[130] inset-0   absolute w-screen h-screen bg-opacity-70 backdrop-blur bg-[#261f1d]`}
    >
      <div className=" relative ">
        <div className="   w-[80vw]    scale-125 py-2">
          <HbButton
            className="bg-transparent text-white border-white mb-2 "
            setIsActive={setIsActive}
            direction="up"
            isActive={active}
          />
        </div>

        <div className="pt-2">
          <div className="border-t-[0.3rem] border-white w-[80%] m-auto">
            {links.map((link, index) => {
              return (
                <a onClick={() => setIsActive(!active)} href={link.href}>
                  <h1
                    onClick={() => link.onClick && link.onClick()}
                    className={
                      `${shouldHideLink(link.text) ? "hidden" : ""}` +
                      " pb-5 border-b-[0.3rem] border-white text-white  group cursor-pointer    m-auto  "
                    }
                  >
                    {link.text}{" "}
                    <span className=" absolute group-hover:opacity-100 duration-200 group-hover:pl-3 opacity-0">
                      →
                    </span>
                  </h1>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
