import React from "react";

interface CandidateInformationProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CandidateInformation: React.FC<CandidateInformationProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div>
      <h1 className="font-bold text-lg text-gray-800 mb-3">
        Candidate Information
      </h1>

      {/* Full Name Input */}
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
          placeholder="Candidate's Full Name"
          value={formData.recruitName || ""}
          onChange={handleChange}
          className="w-full bg-[#f1f3f463] p-2 border border-gray-300"
          required
        />
      </div>

      {/* Email Input */}
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
          value={formData.recruitEmail || ""}
          onChange={handleChange}
          className="w-full p-2 bg-[#f1f3f463] border border-gray-300"
          required
        />
      </div>

      {/* Gender Input */}
      <div className="mb-4">
        <label
          htmlFor="recruitGender"
          className="block text-gray-600 font-semibold mb-1"
        >
          Gender Identification: (Optional)
        </label>
        <p className="text-sm text-gray-500 mb-3">
          We ask for this information to ensure we're reaching diverse
          candidates and to track our gender parity goals. Your response is
          voluntary.
        </p>
        <div className="space-y-2">
          {["Female", "Male", "Non-Binary", "Transgender", "Prefer Not to Say", "Other"].map(
            (gender) => (
              <label key={gender} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="recruitGender"
                  value={gender}
                  checked={formData.recruitGender === gender}
                  onChange={handleChange}
                  className="form-radio h-4 w-4"
                />
                <span>{gender}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* LinkedIn Profile Input */}
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
          placeholder="Candidate's LinkedIn Profile URL"
          value={formData.recruitLinkedIn || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300"
        />
      </div>
    </div>
  );
};

export default CandidateInformation;
