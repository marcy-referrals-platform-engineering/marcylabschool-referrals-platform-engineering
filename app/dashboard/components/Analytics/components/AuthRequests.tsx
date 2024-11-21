"use client";
import { useEffect, useState } from "react";
import AuthService from "@/app/services/AuthService";
import Image from "next/image";

function AuthRequests({
  loaded,
  setLoaded,
}: {
  loaded: boolean;
  setLoaded: any;
}) {
  const [requests, setRequests] = useState<any>([]);
  const [expanded, setExpanded] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const handleRequest = async (requestId: number, shouldAccept: boolean) => {
    console.log(requestId, shouldAccept);
    const response = await AuthService.handleAuthRequest(
      requestId,
      shouldAccept
    );
    setHasChanged(!hasChanged);
  };
  useEffect(() => {
    async function fetchRequests() {
      const requests = await AuthService.getAuthRequests();
      if (requests) {
        setRequests(requests);
      }
    }
    fetchRequests();
  }, [hasChanged]);

  return !loaded ? (
    <AuthRequstsLoading />
  ) : (
    <div className="rounded-sm relative min-h-[10.2rem] border border-stroke bg-white  pt-6 pb-2  ">
      <div className=" pt-4 px-7.5 flex items-center gap-2">
        <h1 className="text-[1.4rem] font-medium">Authorization Requests</h1>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            fill=""
            stroke="#000000"
          />
          <path d="M6 8h12v2H6V8zm0 4h8v2H6v-2zm0 4h5v2H6v-2z" fill="#9E9E9E" />

          <path
            d="M14 3v3.59L10.59 2H7v3H5V2a2 2 0 012-2h6a1 1 0 011 1z"
            fill="gray"
          />
          <path d="M18 14l-4-4v3H6v2h8v3l4-4z" fill="gray" />
        </svg>
      </div>
      <h3 className="text-[1.1rem] pt-3 text-[black] px-7.5">
        {requests.length}{" "}
        <span>
          {requests.length > 1 || !requests.length ? "emails" : "email"}
        </span>{" "}
        pending approval
      </h3>

      <p
        onClick={() => setExpanded(!expanded)}
        className={`font-medium   text-center z-[68] border-t cursor-pointer mt-6 text-gray-500 pt-2 hover:opacity-50 duration-200 ${
          !requests.length && "hidden"
        }`}
      >
        {expanded ? "Collapse Requests" : "View Requests"}
      </p>
      <div
        className={`${
          expanded
            ? " absolute border z-[67] bg-white w-full bottom-[-4.7rem] duration-200"
            : " hidden opacity-0"
        }`}
      >
        {requests.map((request: any) => {
          return (
            <div className="flex items-center  gap-2 px-7.5 py-3 border-b">
              <Image
                width={100}
                height={100}
                src={request.img}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h1 className="text-[1.1rem] font-medium">{request.name}</h1>
                <p className="text-[0.9rem] text-gray-500">{request.email}</p>
              </div>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => {
                    handleRequest(request.id, true);
                    if (requests.length === 0) setExpanded(false);
                  }}
                  className="text-[0.9rem] text-green-500 bg-green-200 px-2 py-1 rounded-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    handleRequest(request.id, false);
                    if (requests.length === 0) setExpanded(false);
                  }}
                  className="text-[0.9rem] text-red-500 bg-red-200 px-2 py-1 rounded-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AuthRequests;

const AuthRequstsLoading = () => {
  return (
    <div className="animate-pulse shadow bg-white border px-7.5">
      <div className="flex items-center gap-3 mt-10">
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};
