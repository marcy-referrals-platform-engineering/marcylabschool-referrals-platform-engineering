'use client';
import { SessionProvider } from "next-auth/react";
import { useInitializeStore } from "@/app/state/useStore"; // Ensure the path is correct

export default function ClientSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <StateInitializerWrapper>{children}</StateInitializerWrapper>
    </SessionProvider>
  );
}

function StateInitializerWrapper({ children }: { children: React.ReactNode }) {
  useInitializeStore(); 

  return <>{children}</>; 
}