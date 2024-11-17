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

function LoadingComponent({ isLoading, isSuccess, onRetry }: { isLoading: boolean; isSuccess: boolean | null; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-200px)] bg-slate-50">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
          <p className="mt-4 text-2xl text-blue-500">Submitting...</p>
        </div>
      ) : (
        isSuccess !== null && (
          <div className="flex flex-col items-center justify-center">
            <p className={`text-2xl ${isSuccess ? 'text-green-500' : 'text-red-600'} flex items-center`}>
              {isSuccess ? (
                <span className="mr-2 text-[2rem]">Referral Submitted ✓</span>
              ) : (
                <span className="mr-2 text-[2rem]">Submission Failed ✗</span>
              )}
            </p>
            <button
              onClick={onRetry}
              className={`mt-10 px-4 py-2 border rounded ${
                isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isSuccess ? 'Submit Another Referral' : 'Try Again'}
            </button>
          </div>
        )
      )}
    </div>
  );
}

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
      const success = await ReferralService.sendReferralRequest(formData);
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
        <Header
          className="py-2.5"
          features={false}
          mobile={false}
          links={[{ text: "← Back Home ", href: "/" }]}
        />
        {/* Main Page Content */}
        {isLoading || submitted !== null ? (
          <LoadingComponent isLoading={isLoading} isSuccess={submitted} onRetry={handleRetry} />
        ) : (
          <>
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
                className="p-8 border bg-white z-[130] flex flex-col"
              >
                <p className="w-[95%] font-medium m-auto border-b-[#261f1d] pb-3 border-b-[0.2rem] pt-1">
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
          </>
        )}
      </div>
    )
  );
}

export default withAuth(ReferralForm);
