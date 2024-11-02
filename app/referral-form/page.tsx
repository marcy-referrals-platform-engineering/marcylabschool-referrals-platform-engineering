"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/app/state/useStore";
import ReferralService from "../services/ReferralService";
import CandidateInfo from "./components/CandiateInfo";
import FileUpload from "./components/FileUpload";
import Button from "../components/ui/Button";
import Link from "next/link";

export default function ReferralForm() {
  const user = useStore((state) => state.user);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, email: user.email, name: user.name });
    }
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    ReferralService.sendReferralRequest(formData);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen relative bg-slate-50 h-full">
      <Image
        width={900}
        height={900}
        alt="fall fellows"
        src="/fellows1.png"
        className="object-cover object-[center_30%]  w-screen h-[200px] m-auto"
      />
      <div className="z-[120] relative bg-opacity-10 w-[full] m-auto">
        <form
          onSubmit={handleSubmit}
          className="p-8 translate-y-[-5rem] border relative  pt-1 z-[130] flex flex-col   bg-white bg-cover overflow-visible bg-center max-w-[900px] mx-auto  "
        >
          <div className="flex  sticky  top-0 justify-between border-b p-5 py-2 pt-4">
            <img src="/marcylogo2.png" className="w-[11rem] h-auto" />
            <Link
              href="/"
              className="text-[1.3rem] duration-300 hover:opacity-50  font-normal z-10 bg-white bg-opacity-90  backdrop-blur-sm py-2 "
            >
              ← Back Home
            </Link>
          </div>

          {/* <h1 className="text-[1.8rem] text-center pt-5 font-medium mb-4">
            REFERRAL FORM
          </h1> */}
          <p className=" w-[95%]  m-auto pt-5">
            Help us connect with the next generation of Marcy talent. Please use
            this form to submit a referral. Remember, LinkedIn profiles and
            resumes are highly encouraged.
          </p>
          <div className="bg-white pt-10 p-6 rounded-lg  mb-6">
            <CandidateInfo formData={formData} handleChange={handleChange} />
            <FileUpload formData={formData} setFormData={setFormData} />
          </div>
          <div className="m-auto -translate-x-[1rem]">
            <Button text="SUBMIT REFERRAL" />
          </div>
        </form>
      </div>
    </div>
  );
}
