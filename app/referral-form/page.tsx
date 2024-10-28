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
    <div className="w-screen h-full ">
    <img src='/fellows1.png' className=" object-cover w-[700px] h-[200px] m-auto"/>
    <form
      onSubmit={handleSubmit}
      className="bg-[#F1F3F4] p-8 max-w-[700px] mx-auto rounded-lg shadow-md"
    >
      <h1 className="text-[1.8rem] font-bold mb-4">
        Marcy Lab School Referral Submission Form
      </h1>
      <p className="text-gray-700 mb-6">
        Help us connect with the next generation of talent. Please use this form
        to submit a referral. Remember, LinkedIn profiles and resumes are highly
        encouraged.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
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
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h1 className="font-bold text-lg text-gray-800 mb-3">
          Section 2: Candidate Information
        </h1>

        <div className="mb-4">
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
            value={formData.recruitName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
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
            value={formData.recruitEmail}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="recruitGender"
            className="block text-gray-600 font-semibold mb-1"
          >
            Gender Identification (Optional):
          </label>
          <input
            type="text"
            id="recruitGender"
            name="recruitGender"
            value={formData.recruitGender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="recruitLinkedIn"
            className="block text-gray-600 font-semibold mb-1"
          >
            LinkedIn Profile (Optional):
          </label>
          <input
            type="text"
            id="recruitLinkedIn"
            name="recruitLinkedIn"
            value={formData.recruitLinkedIn}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-1">
            Resume (Optional But Encouraged):
          </label>
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
        className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        Submit
      </button>
    </form>
    </div>
  );
}
