import { create } from 'zustand';
import { useEffect } from 'react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

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



export const useStore = create<StoreState>((set: any) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
}));


export const useInitializeStore = () => {
  const { data: session } = useSession();
  const setUser = useStore((state) => state.setUser);
  
  useEffect(() => {
    if (session && session.user) {
        setUser({
            name: session.user.name! || '',
            email: session.user.email! || '',
            image: session.user.image! || '',
            role: session.user.role! || '',
        })
    } else{
        setUser(null);
    }
  }, [session, setUser]);
}