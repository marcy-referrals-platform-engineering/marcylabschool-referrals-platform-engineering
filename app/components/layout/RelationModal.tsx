'use client'
import React, { useState } from "react";
import UserService from "@/app/services/UserService"; 
import { useStore } from "@/app/state/useStore"; 

export const RelationModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Controls modal visibility
  const { user } = useStore(); 

  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Stores the selected relation option

  // Prevents rendering if the modal is not open
  if (!isOpen) return null;

  const options = ["Fellow", "Alumn", "Staff"]; 

  // Handles the submission of the selected option
  const handleSubmit = async () => {
    if (selectedOption) {
      await UserService.setRelation(user!.email, selectedOption);
      setIsOpen(false); // Closes the modal after submission
    }
  };

  // The modal only renders if the user exists and has no relation set
  return (user && !user.relation) && (
    <div className={` ${!isOpen && 'hidden'} fixed inset-0 flex items-center justify-center z-[2600] bg-[black] bg-opacity-50`}>
      <div className="bg-white rounded shadow-lg p-6 w-[90%] max-w-md">
        {/* Modal header */}
        <h1 className="text-xl font-semibold mb-4">Welcome! What's your relation to the Marcy Lab School?</h1>
        
        {/* Buttons for selecting an option */}
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`py-2 px-4 duration-100 border rounded ${
                selectedOption === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="mt-4 text-md text-center m-auto text-blue-500 hover:underline"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
