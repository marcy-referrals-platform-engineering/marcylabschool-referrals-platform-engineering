"use client";
import Image from "next/image";
import { useState } from "react";
import "./globals.css";
import Sidebar from "./components/layout/Sidebar/index";
import ProcessSection from "./components/layout/ProcessSection";
import HeroSection from "./components/layout/HeroSection";
import QuestionsSection from "./components/layout/QuestionsSection";
import ReferralMilestones from "./components/layout/ReferralMilestones";
import HomeFooter from "./components/layout/HomeFooter";
import Header from "./components/layout/Header";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="  h-full">
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto ml-auto">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <HeroSection />
        <ProcessSection />
        <ReferralMilestones />
        <div>
          <QuestionsSection />
          <HomeFooter />
        </div>
      </div>

      <div
        className={`fixed z-[2000] inset-0 bg-[black] bg-opacity-50 backdrop-blur-md transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </div>
  );
}
