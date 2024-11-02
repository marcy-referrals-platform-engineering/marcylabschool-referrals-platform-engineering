'use client';
import { useSidebarStore } from "@/app/state/useStore";

function FocusBackdrop() {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  return (
    <div
    className={`fixed z-[2000] inset-0 bg-[black] bg-opacity-50 backdrop-blur-md transition-opacity duration-300 ${
      sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    onClick={() => setSidebarOpen(false)}
  ></div>
  )
}

export default FocusBackdrop