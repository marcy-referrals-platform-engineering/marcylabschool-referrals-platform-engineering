"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/app/state/useStore";
import ReferralService from "../services/ReferralService";
import CandidateInfo from "./components/CandiateInfo";
import FileUpload from "./components/FileUpload";
import Button from "../components/ui/Button";
import { ReferralPending } from "./components/ReferralPending";
import withAuth from "../components/layout/ProtectedRoute";
import { uploadFile } from "../utils/supabase";

function ReferralForm() {
  const user = useStore((state) => state.user);
  const [formData, setFormData] = useState<any>({});
  const [submitted, setSubmitted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, email: user.email, name: user.name });
    }
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitted(null);
    try {
      // Upload the file and get the resume link
      const resume = await uploadFile(formData.resume, "resumes");

      // Create a new object with the updated resume link
      const updatedFormData = { ...formData, resume };
      // Send the referral request with the updated form data
      const success = await ReferralService.sendReferralRequest(
        updatedFormData
      );
      setSubmitted(success);
    } catch (error) {
      setSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRetry = () => {
    setSubmitted(null);
    setFormData(user ? { email: user.email, name: user.name } : {});
  };

  return (
    user && (
      <div className="w-screen min-h-screen bg-slate-50">
        {/* Header with sticky positioning */}

        {/* Main Page Content */}
        {isLoading || submitted !== null ? (
          <ReferralPending
            isLoading={isLoading}
            isSuccess={submitted}
            onRetry={handleRetry}
          />
        ) : (
          <>
            {/* Background Image */}
            <Image
              unoptimized
              priority
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
                className="p-8 border bg-white z-[130] flex flex-col"
              >
                <p className="w-[95%] font-medium m-auto border-b-[#261f1d] pb-3 border-b-[0.2rem] pt-1">
                  Help us connect with the next generation of Marcy talent.
                  Please use this form to submit a referral. Remember, LinkedIn
                  profiles and resumes are highly encouraged.
                </p>

                <div className="pt-8 p-6">
                  <CandidateInfo
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <FileUpload formData={formData} setFormData={setFormData} />
                </div>
                <div className="m-auto -translate-x-[1rem]">
                  <Button text="SUBMIT REFERRAL" />
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    )
  );
}

// Export the component with authentication check
export default withAuth(ReferralForm);
