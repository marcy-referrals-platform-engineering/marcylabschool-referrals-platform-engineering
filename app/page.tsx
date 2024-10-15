import Image from "next/image";
import Sidebar from "./components/layout/Sidebar";
import StepCard from "./components/ui/StepCard";
import Button from "./components/ui/Button";
import ProcessSection from "./components/layout/ProcessSection";
import HeroSection from "./components/layout/HeroSection";
import QuestionsSection from "./components/layout/QuestionsSection";

const pointsData = [
  { action: "Referrall Submission", details: 'Submit a referral through our form', points: 10 },
  { action: "Campus Tour", details: 'Prospect schedules and attends a tour of our campus',  points: 20 },
  { action: "Prospect Completes Application", details: "Prospect submits a fellowship application through the official application portal", points: 50 },
  { action: "Prospect Receives an Offer", details:"Prospect is extended a formal offer to join the followship program", points: 100 },
  { action: "Prospect Becomes a Fellow", details:"Prospect starts a fellowship at The Marcy Lab School", points: 200 },
];
export default function Home() {
  return (
    <div className="flex bg-[#fffcf7] ">
      <div className="[@media(max-width:1245px)]:hidden duration-300  ">
        <Sidebar />
      </div>

      <div className="">
        <HeroSection />

        <ProcessSection />

        <div className="  relative mt-12 w-full">
          <img
            src="/marcy5.jpg"
            className="absolute opacity-20 top-0 left-0 w-full h-full object-cover grayscale "
            alt="Description of image"
          />
          <div className="bg-primary2 absolute w-full h-full opacity-70 "></div>
          <div className="relative z-10 w-[90%] pb-10 m-auto pt-5">
            <h1 className="text-[2.3rem] lg:text-[2.8rem] xl-[3rem]  md:text-[2.7rem]">
              REFERRAL MILESTONES
            </h1>
            <p className="font-medium">
              Curious about how to rack up those referral points?
            </p>
          </div>
          <div className="pb-5 ">
            {pointsData.map((milestone) => {
              return (
                <div className="relative z-10 w-[90%] m-auto py-5 border-t-[#261f1d] flex gap-3 justify-between border-t-[0.1rem]">
                  <div>
                  <h1 className=" w-[12rem] sm:w-[25rem]  font-medium  text-[1.3rem] md:text-[1.8rem] lg:text-[1.8rem] sm:text-[1.6rem]  ">
                    {milestone.action}
                  </h1>
                  <p className="w-[12rem] hidden sm:flex sm:w-[20rem] text-[0.8rem] md:text-[1rem] font-medium ">{milestone.details}</p>
                    </div>
                  <h1 className="text-[1.8rem] md:text-[2.3rem] lg:text-[2.7rem]">
                    →
                  </h1>
                  <h1 className="text-[1.3rem] md:text-[1.8rem] lg:text-[1.8rem] sm:text-[1.6rem]  font-medium">
                    {milestone.points} PTS
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <QuestionsSection />
          
          <h1 className="text-[#261f1d] text-[1.3rem]  bg-[#a6c2b4] text-center py-6">
            &copy; 2024 THE MARCY LAB SCHOOL
          </h1>
        </div>
      </div>
    </div>
  );
}
