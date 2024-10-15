'use client';
import Accordian from "../ui/Accordian";
import {useState} from "react";
const questions: { title: string; body: string }[] = [
  {
    title: "Who can refer someone through the program?",
    body: "All fellows and alumni can refer candidates and participate in our points system. We encourage staff, friends, and family to refer anyone who may be a fit for our program, but at this time, they will not be eligible for our points and reward system.",
  },

  {
    title: "Why is the points system only eligible for fellows and alumni?",
    body: "As we pilot this new referral system, limiting participation allows us to better track its effectiveness. Fellows and alumni also have a deep understanding of the type of candidates who align with our mission. In the future, we aim to expand the points system to all who submit referrals.",
  },
  {
    title: "Who is eligible to be referred?",
    body: `Anyone who meets our eligibility requirements and demonstrates the following characteristics:\n• Curiosity\n• Discipline\n• Reflective\n• Has the Skill & Will to Receive & Implement Feedback\n• Collaborative, Values Community\n• Solid-to-Strong Organization & Time Management\n• Strong Written & Oral Communication Skills\n• Enjoys Technology!`
  },
  {
    title: "Can I refer someone who has applied before?",
    body: "Yes, but only if they have not been in contact with our Recruitment/Admissions (R/A) team during the last two admission cycles and have not submitted a new application within that time. Contact includes meetings (virtual or in-person), significant email correspondence, or event attendance.",
  },
  {
    title: "When will the person I referred hear back from admissions?",
    body: "The admissions team will reach out to the person you referred within 2-3 business days of receiving the referral. If you referred someone and they have not received communication within this time frame, please email",
  },
];

function QuestionsSection() {
  const [isOpen, setIsOpen] = useState<string>('');
  return (
    <div className="  m-auto  pb-20">
      <div className="w-[90%] m-auto ">
        <h1 className="  text-[2rem] md:text-[2.8rem] pt-5 ">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="font-medium pb-10">
          Please refer to the details below for more information about our
          referral program.
        </p>
        <div className="border-b border-black">
          {questions.map((question) => (
            <Accordian setIsOpen={setIsOpen} isOpen={isOpen} title={question.title} body={question.body} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionsSection;
