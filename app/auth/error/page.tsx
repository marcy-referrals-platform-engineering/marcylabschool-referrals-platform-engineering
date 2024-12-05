"use client";
import AuthService from "@/app/services/AuthService";
import Button from "@/app/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from 'react';
import { signIn } from "next-auth/react";
import { useStore } from "@/app/state/useStore";
function ErrorPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const img = searchParams.get("img");
  const {user} = useStore();
  const [hasRequested, setHasRequested] = useState(
    searchParams.get("hasrequested") === "true"
  );

  const router = useRouter();
  if (user) {
    router.push("/");
  }

  const handleRequestAuthorization = async () => {
    console.log(email!, name!, img!)
    const sentRequest = await AuthService.sendAuthorizationRequest(email!, name!, img!);
    
    if (sentRequest) {
        setHasRequested(true);
    }
  };

   return  (
    <div className="flex items-center justify-center min-h-[92.2vh]   bg-[url(https://archewell.org/wp-content/uploads/2023/10/DSC8867.jpg)] bg-cover bg-center">
      {/* Semi-transparent white backdrop */}
      <div className="absolute inset-0 bg-white/90"></div>

      {/* Content section */}
      <div className="relative bg-white p-10  shadow-md max-w-lg text-center z-10">
        <img src="/marcylogo2.png" className="w-[8rem] mb-10" />
        <h1 className="text-4xl font-medium ] mb-4">PERMISSION NEEDED </h1>
        <p className="text-gray-700 mb-6">
          Your email is not authorized to access The Marcy Lab School Referral
          Program. If you believe this is a mistake, you can request
          authorization.
        </p>
        
        {hasRequested ? (
          <div className="text-center translate-x-[0.5rem] ">
            <p className="text-center  text-green-400 m-auto">Request Submitted✓ </p>
            <p className="">Please allow some time for your request to be accepted</p>
          </div>
        ) : (
          <div className="w-[95%]">
            <Button
              onClick={handleRequestAuthorization}
              text="Request Acesss"
              className="m-auto"
            />
          </div>
        )}
        <button onClick={() => signIn('google')}  className="underline">Retry Login</button>
        <p className="text-sm text-gray-500 mt-4">
          If you continue having trouble, please contact support.
        </p>
      </div>
    </div>
  );
}


export default function ErrorPageWrapper() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorPage />
      </Suspense>
    );
  }