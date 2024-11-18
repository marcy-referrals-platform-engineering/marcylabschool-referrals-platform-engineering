"use client";
import useSWR, { mutate } from "swr"; // Import mutate
import ReferralService from "@/app/services/ReferralService";
import UserService from "@/app/services/UserService";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne/ChartOne";
import ChartTwo from "../Charts/ChartTwo/ChartTwo";
import Loader from "@/app/components/ui/Loader";
import { useStore } from "@/app/state/useStore";
import CardDataStats from "../DataCard/CardDataStats";
import TableOne from "../Tables/TableOne/TableOne";
import AuthRequests from "./AuthRequests";
import { usePathname, useRouter } from "next/navigation";

// Fetcher function for SWR
const fetchReferralStats = (email: string) =>
  ReferralService.getReferralStats(email);

const Analytics: React.FC = () => {

  const { user, initialPageLoad, setInitialPageLoad } = useStore();

  const [refresh, setRefresh] = useState(false);
  const [percentIncrease, setPercentIncrease] = useState({
    referrals: 0,
    points: 0,
  });
  const [hydrated, setHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );
  const [selectedUserStats, setSelectedUserStats] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [statsLoaded, setStatsLoaded] = useState(false);

  const [selectedUserName, setSelectedUserName] = useState("");
  const [view, setView] = useState("all");

  // SWR for data fetching, only when `user.email` is defined
  const {
    data: userStats,
    error,
    isLoading: isUserStatsLoading,
  } = useSWR(
    !selectedUserEmail
      ? user?.email
        ? `referral-stats-${user?.email}`
        : null
      : `referral-stats-${selectedUserEmail}&fetchForAll=false`,
    () => fetchReferralStats(user!.email),
    {
      refreshInterval: 0,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    if (initialPageLoad) {
      setIsLoaded(false);
      setTimeout(() => {
        setIsLoaded(true);
      }, 2500)

      setInitialPageLoad(false);
    }
    setHydrated(true);
  })

  useEffect(() => {
    if (user?.email) {
      
      mutate(`referral-stats-${user.email}`);
      setSearchQuery("");

      setSelectedUserEmail(null);
      setSelectedUserStats(null);
    }
  }, [refresh, user?.email]);

  useEffect(() => {
    if (userStats) {
      const { thisWeek } = userStats.weeklyData;
      const totalPoints = userStats.totalPoints;
      const totalReferrals = userStats.totalReferrals;

      const pointsThisWeek = thisWeek.reduce(
        (total: number, day: any) => total + day.points,
        0
      );
      const referralsThisWeek = thisWeek.reduce(
        (total: number, day: any) => total + day.referrals,
        0
      );

      const previousTotalPoints = totalPoints - pointsThisWeek;
      const previousTotalReferrals = totalReferrals - referralsThisWeek;

      const pointsIncreasePercentage =
        previousTotalPoints > 0
          ? Math.round((pointsThisWeek / previousTotalPoints) * 100)
          : 100;

      const referralsIncreasePercentage =
        previousTotalReferrals > 0
          ? Math.round((referralsThisWeek / previousTotalReferrals) * 100)
          : 100;

      setPercentIncrease({
        referrals: referralsIncreasePercentage,
        points: pointsIncreasePercentage,
      });
    }
  }, [userStats]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const users = await UserService.search(query);
        console.log("search resuls", users);
        setFilteredUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      setFilteredUsers([]);
    }
  };

  const handleUserSelect = async (email: string, name: string) => {
    setSelectedUserName(name || "USERS");
    setSearchQuery(email);
    setSelectedUserEmail(email);
    setFilteredUsers([]);
    setStatsLoaded(false);
    setView("single");
      const userStats = await ReferralService.getReferralStats(email, false);
      setSelectedUserStats(userStats);
      setStatsLoaded(true);

  };

  return (
    <>
      
      <div
        className={` w-[90%] ${
          !hydrated || initialPageLoad || error ? "invisible" : ""
        }  m-auto flex-col `}
      >
        {user?.role === "ADMIN" && (
          <div className="mb-4 border-b pb-5 pt-5 z-[50] translate-y-[-1rem]  sticky top-[5.05rem]  bg-gray-50   m-auto   flex gap-2 align-middle ">
            <button
              onClick={() => {
                if (view !== "all") {
                  setStatsLoaded(false);
                  setTimeout(() => {
                    setStatsLoaded(true);
                  }, 300);
                  setSelectedUserEmail(null);
                  setView("all");

                  // Optionally trigger revalidation if needed
                  setRefresh((prev) => !prev);
                }
              }}
              className={`self-center cursor-pointer duration-100  border-[black] border ${
                view === "all"
                  ? "bg-[black]  text-white"
                  : " bg-[white] hover:opacity-50 text-black"
              } p-2`}
            >
              All Referrals
            </button>

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a user by name or email"
              className={`border p-2 ${view !== 'all'? 'bg-[black] border-black  text-white' : 'bg-gray-50'}  w-[15rem]`}
            />
            {searchQuery.length > 2 && filteredUsers.length > 0 && (
              <div className="absolute bg-white border shadow-md mt-1 w-[20rem] translate-x-[3.1rem] translate-y-[2.2rem] max-h-40 overflow-y-auto z-50">
                {filteredUsers.map((user) => (
                  <div
                    key={user.email}
                    onClick={() => handleUserSelect(user.email, user.name)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {user.name} ({user.email})
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(!isLoaded || !(userStats || selectedUserStats))? (
          <Loader />
        ) : (
          (selectedUserStats || userStats) && (
            <>
             
              <div className="grid grid-cols-1 m-auto gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                <CardDataStats
                  loaded={statsLoaded}
                  setLoaded={setStatsLoaded}
                  title="Total Points"
                  total={
                    selectedUserStats?.totalPoints || userStats.totalPoints
                  }
                  rate={`${percentIncrease.points}%`}
                  {...(percentIncrease.points !== 0
                    ? percentIncrease.points > 0
                      ? { levelUp: true }
                      : { levelDown: true }
                    : { levelStatic: true })}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z" />
                    <path d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z" />
                  </svg>
                </CardDataStats>
                <CardDataStats
                  loaded={statsLoaded}
                  setLoaded={setStatsLoaded}
                  title="Total Referrals"
                  total={
                    selectedUserStats?.totalReferrals ||
                    userStats.totalReferrals
                  }
                  rate={`${percentIncrease.referrals}%`}
                  {...(percentIncrease.referrals !== 0
                    ? percentIncrease.referrals > 0
                      ? { levelUp: true }
                      : { levelDown: true }
                    : { levelStatic: true })}
                >
                  <svg
                    stroke="currentColor"
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z" />
                    <path d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z" />
                    <path d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z" />
                  </svg>
                </CardDataStats>
                <AuthRequests />
              </div>

              <div className="mt-4 grid mb-4 grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <TableOne
                  email={selectedUserEmail}
                  refresh={() => setRefresh(!refresh)}
                />
                <ChartTwo
                  loaded={statsLoaded}
                  setLoaded={setStatsLoaded}
                  userStats={selectedUserStats || userStats}
                />
              </div>
              <ChartOne
                setLoaded={setStatsLoaded}
                loaded={statsLoaded}
                userStats={selectedUserStats || userStats}
              />
            </>
          )
        )}
      </div>
    </>
  );
};

export default Analytics;
