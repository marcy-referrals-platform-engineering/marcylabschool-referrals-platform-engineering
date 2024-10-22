"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/app/state/useStore";
import { links } from "./Sidebar";
import Sidebar from "./Sidebar";
import HbActive from "./HbActive";
import HbButton from "../ui/HbButton";
function Hb() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [hbActive, setHbActive] = useState<boolean>(false);
  const { user } = useStore();
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 1 ? setScrolled(true) : setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  return (
    <div >

    <div
      className={` ${hbActive && 'opacity-0'}   [@media(min-width:1245px)]:hidden  h-[4.7rem]  duration-100 z-[120] fixed inset-0 w-full ${
        scrolled ? "bg-[#261f1d]" : "bg-transparent"
      } `}
    >
      <div className={`flex   relative   w-[80%] m-auto justify-between`}>
        <img
          className={`${
            scrolled ? "invert" : ""
          } duration-100 mt-3  w-[11rem] h-[3.4rem]`}
          src="/marcylogo2.png"
        ></img>
    
        <div className="flex gap-2">
          {user && (
            <img
          
              className="w-[3.3rem] h-[3.3rem] cursor-pointer rounded-full m-auto"
              src={user!.image!}
              alt="User Image"
            />
          )}

          <HbButton setIsActive={setHbActive} direction='down' isActive={hbActive} />
        </div>
      </div>
          
    </div>
    <div className="fixed z-[210]">
    <HbActive user={user}  setIsActive={setHbActive} active={hbActive}  />
    </div>
    

    </div>
  );
}

export default Hb;
