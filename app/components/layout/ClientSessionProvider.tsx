"use client";

import { SessionProvider } from "next-auth/react";
import  { useStore } from "@/app/state/useStore";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import ReferralService from "@/app/services/ReferralService";
import AuthService from "@/app/services/AuthService";

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

  return isHydrated ? (
    <SessionProvider session={session}>
      <StateInitializerWrapper session={session}>
        {children}
      </StateInitializerWrapper>
    </SessionProvider>
  ) : (
    <Loader />
  );
}

function StateInitializerWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const setUser = useStore((state) => state.setUser);
  const {initialPageLoad, setInitialPageLoad} = useStore();

  useEffect(() => {
   setInitialPageLoad(true);
   
  }, [])
  // Fetch the user's role only once when `session.user` is set
  useEffect(() => {
    const initializeUser = async () => {
      if (session?.user) {
        const {userRole, userRelation} = await AuthService.getInfo(session.user.email);
        console.log(userRole, userRelation, "userInfo");
        setUser({
          name: session.user.name || "",
          email: session.user.email || "",
          image: session.user.image || "",
          role: userRole || "",
          relation: userRelation || "",
        });
      } else {
        setUser(null);
      }
    };

    initializeUser();
  }, [session?.user, setUser]); // Only runs when `session.user` changes

  return <>{children}</>;
}