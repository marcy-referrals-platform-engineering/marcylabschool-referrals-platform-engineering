"use client";
import { fetchReferralData } from "./data";
import { useEffect, useState } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
const TableOne = () => {
  const { user } = useStore();

  const [referrals, setReferrals] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const { email } = user;

    const fetchReferrals = async () => {
      const data = await ReferralService.fetchReferrals(email);
      if (data) {
        setReferrals(data);
      }
    };

    fetchReferrals();
  }, [user]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        YOUR REFERRALS
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-meta-4">
              <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-left xsm:text-base">
                Name
              </th>
              <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-left xsm:text-base">
                Email
              </th>
              <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-center xsm:text-base">
                Toured
              </th>
              <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-center xsm:text-base">
                Applied
              </th>
              <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-center xsm:text-base">
                Accepted
              </th>
              <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-center xsm:text-base">
                Enrolled
              </th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral: any, index: any) => (
              <tr
                key={index}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="p-2.5 xl:p-5 text-black dark:text-white">
                  {referral.name}
                </td>
                <td className="p-2.5 xl:p-5 text-black dark:text-white">
                  {referral.email}
                </td>
                <td className="p-2.5 xl:p-5 text-center text-black dark:text-white">
                  {referral.hasToured ? "Yes" : "No"}
                </td>
                <td className="p-2.5 xl:p-5 text-center text-black dark:text-white">
                  {referral.hasApplied ? "Yes" : "No"}
                </td>
                <td className="p-2.5 xl:p-5 text-center text-black dark:text-white">
                  {referral.hasBeenAccepted ? "Yes" : "No"}
                </td>
                <td className="p-2.5 xl:p-5 text-center text-black dark:text-white">
                  {referral.hasEnrolled ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOne;
