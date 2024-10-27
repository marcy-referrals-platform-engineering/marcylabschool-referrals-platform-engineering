"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/app/state/useStore";
import { uploadFile } from "../utils/supabase";
export default function page() {
  const user = useStore((state) => state.user);
  console.log(user);
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    // Upload resume file to cloud storage and get url
    const resumeUrl = await uploadFile(e.target.resume.files[0], "resumes");
    setFormData({ ...formData, resume: resumeUrl });
  };

  useEffect(() => {
    console.log(formData);
  }, [handleSubmit]);
  useEffect(() => {
    if (user) {
      setFormData({ ...formData, email: user.email, name: user.name });
    }
  }, [user]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Referrer Info</h1>
      <div>
        <p>How did you hear about this referral opportunity? </p>
        <label>
          <input
            onChange={handleChange}
            type="radio"
            value="email"
            name="how"
            required
          />
          Email
        </label>

        <label>
          <input
            onChange={handleChange}
            type="radio"
            value="slack"
            name="how"
            required
          />
          Slack
        </label>

        <label>
          <input
            onChange={handleChange}
            type="radio"
            value="website"
            name="how"
            required
          />
          Website
        </label>

        <label>
          <input
            onChange={handleChange}
            type="radio"
            value="other"
            name="how"
            required
          />
          Other
        </label>
      </div>

      <h1>Canidate Info</h1>
      <div>
        <label htmlFor="recruitName">Full Name:</label>
        <input
          onChange={handleChange}
          type="text"
          value={formData.referreeName}
          id="recruitName"
          name="recruiteName"
          required
        />
      </div>

      <div>
        <label htmlFor="recruitEmail">Email Address:</label>
        <input
          onChange={handleChange}
          type="email"
          value={formData.referreeEmail}
          id="recruitEmail"
          name="recruitEmail"
          required
        />
      </div>

      <div>
        <label htmlFor="recruitGender">Gender Identification: (Optional)</label>
        <input
          onChange={handleChange}
          type="text"
          value={formData.refereeGender}
          id="recruitGender"
          name="recruitGender"
        />
      </div>

      <div>
        <label htmlFor="recruitLinkedIn">LinkedIn Profile: (Optional)</label>
        <input
          type="text"
          onChange={handleChange}
          id="recruitLinkedIn"
          name="recruitLinkedIn"
          value={formData.refereeLinkedIn}
        />
      </div>

      <div>
        <p>Resume (Optional But Encoraged)</p>
        <input onChange={handleChange} type="file" id="resume" name="resume" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
