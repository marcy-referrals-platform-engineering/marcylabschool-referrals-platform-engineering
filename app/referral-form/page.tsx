"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/app/state/useStore";
import ReferralService from "../services/ReferralService";
import CandidateInfo from "./components/CandiateInfo";
import FileUpload from "./components/FileUpload";
import Button from "../components/ui/Button";
import Header from "../components/layout/Header";
import withAuth from "../components/layout/protect";

function ReferralForm() {
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
    user && (
      <div className="w-screen bg-slate-50">
        {/* Header with sticky positioning */}
        <Header
          className="py-2.5"
          features={false}
          mobile={false}
          links={[{ text: "← Back Home ", href: "/" }]}
        />
        {/* Background Image */}
        <Image
          width={900}
          quality={100}
          height={900}
          alt="fall fellows"
          src="/fellows1.png"
          className="object-cover object-[center_30%] w-screen h-[200px] m-auto"
        />

        {/* Main Form Content */}
        <div className="relative bg-opacity-10 max-w-[900px] mx-auto mt-[-5rem]">
          <form
            onSubmit={handleSubmit}
            className="p-8 border bg-white  z-[130] flex flex-col"
          >
          
            <p className="w-[95%] font-medium m-auto border-b-[#261f1d] pb-3  border-b-[0.2rem] pt-1">
              Help us connect with the next generation of Marcy talent. Please
              use this form to submit a referral. Remember, LinkedIn profiles
              and resumes are highly encouraged.
            </p>
            <div className="pt-8 p-6">
              <CandidateInfo formData={formData} handleChange={handleChange} />
              <FileUpload formData={formData} setFormData={setFormData} />
            </div>
            <div className="m-auto -translate-x-[1rem]">
              <Button text="SUBMIT REFERRAL" />
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default withAuth(ReferralForm);