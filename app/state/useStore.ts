
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  image: string;
  role: string;
}


interface StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-store', 
      storage: {
        getItem: (name: string) => {
          const storedValue = localStorage.getItem(name);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (name: string, value: unknown) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      }
    }
  )
);



interface SidebarState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open: boolean) => set(() => ({ sidebarOpen: open })),
}));



