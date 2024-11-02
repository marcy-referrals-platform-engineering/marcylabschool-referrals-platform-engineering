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
    <div className="w-screen relative bg-white h-full">
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
          className="p-8  pt-1 z-[130] flex flex-col  bg-white relative bg-cover overflow-visible bg-center max-w-[90%] mx-auto  "
        >
          <Link
            href="/"
            className="text-[1.3rem]  font-medium sticky border-b top-0 z-10 bg-white bg-opacity-90  backdrop-blur-sm py-2 "
          >
            ← Back Home
          </Link>
          <h1 className="text-[1.8rem] pt-5 font-medium mb-4">
            MARCY LAB SCHOOL REFERRAL FORM
          </h1>
          <p className="border-b pb-6">
            Help us connect with the next generation of talent. Please use this
            form to submit a referral. Remember, LinkedIn profiles and resumes
            are highly encouraged.
          </p>
          <div className="bg-white p-6 rounded-lg  mb-6">
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
