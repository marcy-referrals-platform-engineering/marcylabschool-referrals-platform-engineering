import Image from "next/image";
import Sidebar from "./components/layout/Sidebar";
import StepCard from "./components/ui/StepCard";
import Button from "./components/ui/Button";
import ProcessSection from "./components/layout/ProcessSection";
import HeroSection from "./components/layout/HeroSection";
import QuestionsSection from "./components/layout/QuestionsSection";
import PointMilestones from "./components/layout/PointMilestones";


export default function Home() {
  return (
    <div className="flex bg-[#fffcf7] ">
      <div className="[@media(max-width:1245px)]:hidden duration-300  ">
        <Sidebar />
      </div>

      <div className="">
        <HeroSection />

        <ProcessSection />
        <PointMilestones />
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
