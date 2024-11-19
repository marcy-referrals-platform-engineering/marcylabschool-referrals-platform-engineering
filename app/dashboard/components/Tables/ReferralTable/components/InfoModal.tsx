import React, { useEffect } from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ title, children, onClose }: ModalProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center">
      <div className="bg-[black]  inset-0 z-[200] bg-opacity-50 w-screen  animate-fade absolute"></div>
      <div className="bg-white absolute  z-[250]  top-40 max-h[30rem] border rounded shadow-lg w-11/12 max-w-lg  p-14 pt-8 overflow-y-auto ">
        <div className="flex gap-2 border-b justify-center">
          <h1 className="text-[1.5rem] font-bold mb-4 text-gray-900">
            {title}
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <div className="pt-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;