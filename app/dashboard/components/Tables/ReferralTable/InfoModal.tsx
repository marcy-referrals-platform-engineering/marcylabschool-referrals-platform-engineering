
import { useEffect } from "react";
interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
  }
  
  export const Modal = ({ title, children, onClose }: ModalProps) => {
    useEffect(() => {
     
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
  
  
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
  
      return () => {
  
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
      };
    }, []);
  
    return (
      <div className="fixed top-50    z-[605] flex items-center justify-center   ">
        <div className="bg-[black] z-[604] bg-opacity-50 w-screen h-[100vh] animate-fade absolute "></div>
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] p-8 overflow-y-auto relative">
          <h1 className="text-[1.5rem]  font-bold mb-4 text-gray-900">{title}</h1>
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            ×
          </button>
          <div className="space-y-4 ">{children}</div>
        </div>
      </div>
    );
  };
  
export default Modal;