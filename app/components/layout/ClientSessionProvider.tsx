// app/components/layout/ClientSessionProvider.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import { useStore, useReferralStatsStore } from "@/app/state/useStore";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import ReferralService from "@/app/services/ReferralService";

export default function ClientSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

    
  return isHydrated? (
    <SessionProvider session={session}>
      <StateInitializerWrapper session={session}>{children}</StateInitializerWrapper>
    </SessionProvider>
  ) 
  :
  (<Loader />)
}

function StateInitializerWrapper({ children, session }: { children: React.ReactNode; session: any }) {
  const setUser = useStore((state) => state.setUser);

  const {userStats} = useReferralStatsStore();
  const setUserStats = useReferralStatsStore((state) => state.setUserStats);

  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
        role: session.user.role || '',
      });

      const getUserStats = async () => {
       try {
        const stats = await ReferralService.getReferralStats(session.user.email);
        setUserStats(stats);
        console.log("User stats fetched")
       } catch {
          console.log("Failed to fetch user stats")
       }
      }

      getUserStats();

    } else {
      setUser(null);
    }
  }, [session, setUser]);

  return <>{children}</>;
}