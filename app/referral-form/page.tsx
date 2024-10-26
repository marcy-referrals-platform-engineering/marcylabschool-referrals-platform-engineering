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
        <label htmlFor="name">Full Name:</label>
        <input
          onChange={handleChange}
          type="text"
          value={formData.name}
          id="name"
          name="name"
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email Address:</label>
        <input
          onChange={handleChange}
          type="email"
          value={formData.email}
          id="email"
          name="email"
          required
        />
      </div>

      <div>
        <p>Relationship To The Marcy Lab School</p>
        <label>
          <input
            onChange={handleChange}
            type="radio"
            value="fellow"
            name="relationship"
            required
          />
          Current Fellow
        </label>
        <label>
          <input
            onChange={handleChange}
            type="radio"
            value="alum"
            name="relationship"
            required
          />
          Alumni
        </label>

        <label>
          <input
            onChange={handleChange}
            type="radio"
            value="staff"
            name="relationship"
            required
          />
          Staff
        </label>
      </div>

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
        <label htmlFor="name">Full Name:</label>
        <input
          onChange={handleChange}
          type="text"
          value={formData.referreeName}
          id="referreeName"
          name="referreeName"
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email Address:</label>
        <input
          onChange={handleChange}
          type="email"
          value={formData.referreeEmail}
          id="referreeEmail"
          name="referreeEmail"
          required
        />
      </div>

      <div>
        <label htmlFor="gender">Gender Identification: (Optional)</label>
        <input
          onChange={handleChange}
          type="text"
          value={formData.refereeGender}
          id="refereeGender"
          name="refereeGender"
        />
      </div>

      <div>
        <label htmlFor="refereeLinkedIn">LinkedIn Profile: (Optional)</label>
        <input
          type="text"
          onChange={handleChange}
          id="refereeLinkedIn"
          name="refereeLinkedIn"
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
