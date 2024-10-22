import { create } from 'zustand';
import { useEffect } from 'react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { persist, StateStorage } from 'zustand/middleware';
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

const customStorage = {
    getItem: (name: string) => {
      const storedValue = localStorage.getItem(name);
      if (!storedValue) return null;
      return JSON.parse(storedValue);
    },
    setItem: (name: string, value: unknown) => {
      localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
      localStorage.removeItem(name);
    },
  };

export const useStore = create<StoreState>()(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: 'user-store', 
        storage: customStorage
      }
    )
  );
  


  export const useInitializeStore = () => {
    const { data: session, status } = useSession();
    const setUser = useStore((state) => state.setUser);
  
    useEffect(() => {
      
      if (status === 'authenticated' && session?.user) {
        setUser({
          name: session.user.name || '',
          email: session.user.email || '',
          image: session.user.image || '',
          role: session.user.role || '', 
        });
      } else if (status === 'unauthenticated') {
       
        setUser(null);
        localStorage.removeItem('user-store'); 
      }
    }, [session, status, setUser]);
  };