"use client";
import Accordian from "../components/ui/Accordian";
import { useState } from "react";

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
        <h1 className="w-[95%]  m-auto  text-black">
          FREQUENTLY ASKED QUESTIONS
        </h1>
      </div>

      <p className="text-[1.5rem] mt-5 font-medium w-[95%] m-auto">
        Have questions? Check out answers to some of the most frequently asked
        ones below!
      </p>
      <div className=" mt-10 w-[95%] m-auto border-b border-black">
        <Accordian
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="What is the referral program?"
          body="The referral program is a program that rewards you for referring friends to our platform. When you refer a friend, you get a reward when they sign up and complete their first task."
        />
      </div>
    </div>
  );
};

export default Faq;
