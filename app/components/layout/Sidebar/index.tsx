"use client";

import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import ClickOutside from "@/app/components/layout/Header/ClickOutside"; // Utility to close sidebar when clicking outside
import useLocalStorage from "@/app/dashboard/hooks/useLocalStorage"; // Custom hook for local storage
import { useMenuGroups } from "./data"; // Sidebar menu data
import { useSidebarStore } from "@/app/state/useStore"; // Sidebar state management

const Sidebar = () => {
  const menuGroups = useMenuGroups();
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed lg:hidden left-0 top-0 z-[2600] h-screen w-72.5 flex-col bg-[#261f1d] transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center border-b w-[74%] mx-auto justify-between py-3 lg:py-6.5">
          <Link href="/">
            <Image
              onClick={() => setTimeout(() => setSidebarOpen(false), 100)}
              width={170}
              height={50}
              src="/marcylogo1.png"
              alt="Logo"
            />
          </Link>
          {/* Toggle button */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar">
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
              <path d="..." />
            </svg>
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex flex-col overflow-y-auto">
          <nav className="mt-5 px-4 py-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-[#676767]">{group.name}</h3>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <div key={menuIndex} onClick={() => {setTimeout(() => setSidebarOpen(false), 100); (menuItem.onClick && menuItem.onClick())}}>
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
