import "./globals.css";
import Sidebar from "./components/layout/Sidebar/index";
import ProcessSection from "./components/layout/Home/ProcessSection/ProcessSection";
import HeroSection from "./components/layout/Home/HeroSection";
import QuestionsSection from "./components/layout/Home/QuestionsSection/QuestionsSection";
import ReferralMilestones from "./components/layout/Home/ReferralMilestones";
import HomeFooter from "./components/layout/Home/HomeFooter";
import Header from "./components/layout/Header";
import FocusBackdrop from "./dashboard/ui/FocusBackdrop";

import { processData } from "./components/layout/Home/ProcessSection/data";

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto ml-auto">
        <Header />
        <HeroSection />
        <ProcessSection processData={processData} />
        <ReferralMilestones />
        <div>
          <QuestionsSection />
          <HomeFooter />
        </div>
      </div>

      <FocusBackdrop />
    </div>
  );
}
