"use client";
import { useState, useEffect } from "react";

function Accordian({
  title,
  body,
  isOpen,
  setIsOpen,
}: {
  title: string;
  body: string;
  isOpen: string;
  setIsOpen: (isOpen: string) => void;
}) {
  return (
    <div
      onClick={() => setIsOpen(isOpen === title ? "" : title)}
      className={`border-t ${
        isOpen === title ? "h-full " : "max-h-[8rem] "
      } overflow-hidden     border-black`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row ">
          <h1 className="  w-[90%] md:w-[70%] font-medium  text-[1.6rem] md:text-[1.8rem]">{title}</h1>
          <p
            className={`font-medium md:w-[50%] pt-5 ml-auto pb-5 ${
              isOpen === title ? "flex" : "hidden"
            } text-[1.2rem] whitespace-pre-line`}
          >
            {body}
          </p>
        </div>

        <img
          src={
            isOpen === title
              ? "https://www.iconpacks.net/icons/2/free-minus-icon-3108-thumb.png"
              : "https://icons.veryicon.com/png/o/miscellaneous/o2o-middle-school-project/plus-104.png"
          }
          className="h-[1.5rem] duration-300 mt-8"
        ></img>
      </div>
    </div>
  );
}

export default Accordian;
