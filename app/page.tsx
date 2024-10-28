import Image from "next/image";
import './globals.css'
import Sidebar from "./components/layout/Sidebar";
import StepCard from "./components/ui/StepCard";
import Button from "./components/ui/Button";
import ProcessSection from "./components/layout/ProcessSection";
import HeroSection from "./components/layout/HeroSection";
import QuestionsSection from "./components/layout/QuestionsSection";
import ReferralMilestones from "./components/layout/ReferralMilestones";
import HomeFooter from "./components/layout/HomeFooter";

export default function Home() {
  return (
    <div  className="flex bg-[#fffcf7] ">
      <div className="[@media(max-width:1245px)]:hidden  duration-300  ">
        <Sidebar />
      </div>

      <div className="">
        <HeroSection />

        <ProcessSection />
        <ReferralMilestones />
        <div>
          <QuestionsSection />

          <HomeFooter />
        </div>
      </div>
    </div>
  );
}
