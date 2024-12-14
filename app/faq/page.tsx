"use client";
import Accordian from "../components/ui/Accordian";
import { useState } from "react";
import { referralFAQ } from "./data";


const Faq = () => {
  const [isOpen, setIsOpen] = useState<string>("");
  return (
    <div>
      <div
        className="py-[3rem] bg-opacity-80 relative  bg-primary1 overflow-hidden"

      >
        <img
         
          className="absolute grayscale opacity-50  inset-0 w-full h-full object-cover z-[-1]"
          src="https://images.ctfassets.net/5tpkas7gb5io/6Lt2xYF48djzFyaMPauj5u/692c8108e97c6ca8acecafd7e36b9dc7/devonte-graduation.jpg"
          alt="Devonte Graduation"
        />
        <h1 className="w-[95%]  m-auto  text-[black]">
          FREQUENTLY ASKED QUESTIONS
        </h1>
      </div>

      <p className="text-[1.5rem] border-t-[0.3rem] py-5  border-[black] mt-10 font-medium w-[95%] m-auto">
        Have questions? Check out answers to some of the most frequently asked
        ones below!
      </p>
      {
        referralFAQ.map((faq) => (
            <div className=" mt-10 w-[95%] m-auto  border-black">
            <Accordian
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title={faq.title}
              body={faq.body}
            />
          </div>
        ))}
           
      
    </div>
  );
};

export default Faq;
