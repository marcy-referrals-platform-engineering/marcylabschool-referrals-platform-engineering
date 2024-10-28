"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/app/state/useStore";
import { uploadFile } from "../utils/supabase";
import ReferralService from "../services/ReferralService";
export default function page() {
  const user = useStore((state) => state.user);
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    if (user) {
      setFormData({ ...formData, email: user.email, name: user.name });
    }
  }, [user]);

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    let updatedFormData = { ...formData };
    if (e.target.resume.files.length !== 0) {
      const resumeUrl = await uploadFile(e.target.resume.files[0], "resumes");
      updatedFormData = { ...formData, resume: resumeUrl };
    }
    ReferralService.sendReferralRequest(updatedFormData);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  return (
    <div className="w-screen relative  bg-[#F1F3F4] h-full ">
      <img
        src="/fellows1.png"
        className=" object-cover w-[900px] h-[200px] m-auto"
      />
      
      <div className=" z-[120]  relative bg-opacity-10 max-w-[1000px] m-auto" >
        <form
          onSubmit={handleSubmit}
          className=" p-8 z-[130] bg-white relative bg-cover bg-center max-w-[900px] mx-auto rounded-lg shadow-md"
        >
    
          <h1 className="text-[1.8rem]  font-medium mb-4">
            MARCY LAB SCHOOL REFERRAL FORM
          </h1>
          <p className="  border-b pb-6">
            Help us connect with the next generation of talent. Please use this
            form to submit a referral. Remember, LinkedIn profiles and resumes
            are highly encouraged.
          </p>

          {/* <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h1 className="font-bold text-lg text-gray-800 mb-3">
          Section 1: Referrer Information
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Please enter your contact information below.
        </p>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">
            How did you hear about this referral opportunity?
          </label>
          <div className="flex space-x-4">
            {["Email", "Slack", "Website", "Other"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.toLowerCase()}
                  name="how"
                  onChange={handleChange}
                  required
                  className="form-radio text-indigo-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div> */}

          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h1 className="font-bold text-lg text-gray-800 mb-3">
              Candidate Information
            </h1>

            <div className="mb-4  ">
              <label
                htmlFor="recruitName"
                className="block text-gray-600 font-semibold mb-1"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="recruitName"
                name="recruitName"
                placeholder="Candidate's Full Name"
                value={formData.recruitName}
                onChange={handleChange}
                className="w-full bg-[#f1f3f463] p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="recruitEmail"
                className="block text-gray-600 font-semibold mb-1"
              >
                Email Address:
              </label>
              <input
                type="email"
                id="recruitEmail"
                name="recruitEmail"
                placeholder="Candidate's Email Address"
                value={formData.recruitEmail}
                onChange={handleChange}
                className="w-full p-2 bg-[#f1f3f463] border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="recruitGender"
                className="block text-gray-600 font-semibold mb-1"
              >
                Gender Identification: (Optional)
              </label>
              <p className="text-sm text-gray-500 mb-3">
                We ask for this information to ensure we're reaching diverse
                candidates and to track our gender parity goals. Your response
                is voluntary.
              </p>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recruitGender"
                    value="Female"
                    checked={formData.recruitGender === "Female"}
                    onChange={handleChange}
                    className="form-radio  h-4 w-4"
                  />
                  <span>Female</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recruitGender"
                    value="Male"
                    checked={formData.recruitGender === "Male"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4"
                  />
                  <span>Male</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recruitGender"
                    value="Non-Binary"
                    checked={formData.recruitGender === "Non-Binary"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4"
                  />
                  <span>Non-Binary</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recruitGender"
                    value="Transgender"
                    checked={formData.recruitGender === "Transgender"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4"
                  />
                  <span>Transgender</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recruitGender"
                    value="Prefer Not to Say"
                    checked={formData.recruitGender === "Prefer Not to Say"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4"
                  />
                  <span>Prefer Not to Say</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recruitGender"
                    value="Other"
                    checked={formData.recruitGender === "Other"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4"
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="recruitLinkedIn"
                className="block text-gray-600 font-semibold mb-1"
              >
                LinkedIn Profile (Optional):
              </label>
              <p className="text-sm text-gray-500 mb-3">
                To review candidates background.
              </p>
              <input
                type="text"
                id="recruitLinkedIn"
                name="recruitLinkedIn"
                placeholder="Candidate's LinkedIn Profile URL"
                value={formData.recruitLinkedIn}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">
                Resume (Optional But Encouraged):
              </label>
              <p className="text-sm text-gray-500 mb-3">
                For quick evaluation.
              </p>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="border-[2px] ml-[40%]   border-[#261f1d] font-medium  py-2 px-6  hover:bg-[#261f1d] hover:text-white transition duration-300"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
