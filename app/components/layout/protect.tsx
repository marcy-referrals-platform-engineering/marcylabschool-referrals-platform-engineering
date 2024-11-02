"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import Loader from "../ui/Loader";

export default function withAuth(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        signIn("google"); 
      }
    }, [status]);


    if (status === "loading") return null;


    return session ? <Component {...props} /> : <Loader />;
  };
}