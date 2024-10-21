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
}



const useStore = create<StoreState>((set: any) => ({
    user: null,
    setUser: (user: User) => set({ user }),
}));


