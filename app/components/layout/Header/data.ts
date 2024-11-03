import { signIn } from "next-auth/react";
export const linksData = [
    { text: "LOG-IN", onClick: () => signIn("google") },
    { text: "DASHBOARD", href: "/dashboard" },
    { text: "F.A.Q.", href: "/#faq" },
    
   
  ];