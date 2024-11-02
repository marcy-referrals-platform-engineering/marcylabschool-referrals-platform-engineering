// app/components/layout/ClientSessionProvider.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import { useStore } from "@/app/state/useStore";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";

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

  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
        role: session.user.role || '',
      });
    } else {
      setUser(null);
    }
  }, [session, setUser]);

  return <>{children}</>;
}