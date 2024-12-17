import { signIn } from "next-auth/react";
export const linksData = [
    
    { text: "DASHBOARD", href: "/dashboard" },
    { text: "FAQ", href: "/faq" },
    { text: "REWARDS", href: "/rewards" },
    { text: "LOG-IN", onClick: () => signIn("google") },
  ];