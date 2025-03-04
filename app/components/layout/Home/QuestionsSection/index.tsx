"use client";
import Accordian from "../../../ui/Accordian";
import { useState } from "react";
import { questions } from "./data";


function QuestionsSection() {
  const [isOpen, setIsOpen] = useState<string>("");
  return (
    <div id="faq" className="  m-auto  pb-20">
      <div className="w-[90%] m-auto ">
        <h1 className="  text-[2rem] md:text-[2.8rem] pt-5 ">
          COMMON QUESTIONS
        </h1>
        <p className="font-medium pb-10">
          Please refer to the details below for answers to a few common questions. To view more questions, please visit our dedicated <a className="underline" href='/faq'>FAQ page</a>.
        </p>
        <div className="border-b border-black">
          {questions.map((question) => (
            <Accordian
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              title={question.title}
              body={question.body}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionsSection;
