import { signIn } from "next-auth/react";
export const links = [
    { text: "LOG-IN", onClick: () => signIn("google") },
    { text : 'REFERRALS', href: '/dashboard/referral-data'},
    { text: "DASHBOARD", href: "/dashboard" },
    { text: "F.A.Q.", href: "/#faq" },
    
   
  ];