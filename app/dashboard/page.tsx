'use client';
import Analytics from "./components/Analytics";
import { Metadata } from "next";
import Layout from "../layout"
import withAuth from "../components/layout/protect";
import FocusBackdrop from "./ui/FocusBackdrop";


function Home() {
  return (
    <>
        <div className="bg-gray-50">
        <Analytics />
        </div>
        
        <FocusBackdrop />
    </>
  );
}

export default withAuth(Home)

