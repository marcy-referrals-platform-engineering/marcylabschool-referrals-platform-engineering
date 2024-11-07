"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/app/components/layout/Sidebar/index";
import Header from "@/app/components/layout/Header";
import FocusBackdrop from "../../ui/FocusBackdrop";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-gray-50">
     
      <div className="flex ">

        <Sidebar  />



        <div className={`  relative flex flex-1 flex-col ${sidebarOpen ? "translate-x-0" : "translate-x-0"} `}>

          <Header  />
    
          <main>
            <div className="mx-auto max-w-screen-2xl bg-gray-50 p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>

        </div>
       
      </div>
      <FocusBackdrop  />
    </div>
  );
}
