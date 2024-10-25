"use client";
import { useState, useEffect } from "react";

export default function page() {
  const [formData, setFormData] = useState<any>({});
  const handleSubmit = async (e: any) => {
    event?.preventDefault();
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}
