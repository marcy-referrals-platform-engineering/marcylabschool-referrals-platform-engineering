"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
import TableOneLoading from "./TabelOneLoading";
import AuthService from "@/app/services/AuthService";
const TableOne = () => {
  const { user } = useStore();
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) return;
    const { email } = user;

    
    const fetchReferrals = async () => {
      setLoading(true); // Start loading
      const data = await ReferralService.fetchReferrals(email);
      if (data) {
        // Initialize local state for toggling
        const initializedData = data.map((referral: any) => ({
          ...referral,
          hasToured: referral.hasToured || false,
          hasApplied: referral.hasApplied || false,
          hasBeenAccepted: referral.hasBeenAccepted || false,
          hasEnrolled: referral.hasEnrolled || false,
        }));
        setReferrals(initializedData);
      }
      setLoading(false); // Stop loading
    };

    fetchReferrals();
  }, [user]);

  // Toggle function to update the state
  const toggleStatus = (index: number, field: string) => {
    console.log(user)
    if (user) {
      if (user.role !== "ADMIN") return; // Only allow toggling if user is an ADMIN
      setReferrals((prevReferrals) =>
        prevReferrals.map((referral, i) =>
          i === index ? { ...referral, [field]: !referral[field] } : referral
        )
      );
    }
  };

  // Render a loading indicator if still loading
  if (loading) {
    return <TableOneLoading />;
  }

  return (
    <div className="col-span-12 xl:col-span-8 overflow-scroll rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        YOUR REFERRALS
      </h4>
      <div className="inline-flex border focus:outline-none border-gray-300 px-2 mb-4 rounded">
        <select className="p-2 rounded">
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="status">Date</option>
        </select>
      </div>

      {/* Table with horizontal scrolling */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
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
          <tbody className="overflow-hidden">
            {referrals.map((referral, index) => (
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
                <td
                  className={`p-2.5 xl:p-5 text-center cursor-pointer `}
                  onClick={() => toggleStatus(index, "hasToured")}
                >
                  <div
                    className={`w-6 h-6 ml-8 flex items-center justify-center rounded ${
                      referral.hasToured ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {referral.hasToured ? (
                      <span className="text-green-600">&#10003;</span>
                    ) : (
                      <span className="text-red-600">×</span>
                    )}
                  </div>
                </td>
                <td
                  className={`p-2.5 xl:p-5 text-center cursor-pointer `}
                  onClick={() => toggleStatus(index, "hasApplied")}
                >
                  <div
                    className={`w-6 h-6 flex ml-8 items-center justify-center rounded ${
                      referral.hasApplied ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {referral.hasApplied ? (
                      <span className="text-green-600">&#10003;</span>
                    ) : (
                      <span className="text-red-600">×</span>
                    )}
                  </div>
                </td>
                <td
                  className={`p-2.5 xl:p-5 text-center cursor-pointer `}
                  onClick={() => toggleStatus(index, "hasBeenAccepted")}
                >
                  <div
                    className={`w-6 h-6 flex items-center justify-center ml-8  rounded ${
                      referral.hasBeenAccepted ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {referral.hasBeenAccepted ? (
                      <span className="text-green-600">&#10003;</span>
                    ) : (
                      <span className="text-red-600">×</span>
                    )}
                  </div>
                </td>
                <td
                  className={`p-2.5 xl:p-5 text-center cursor-pointer `}
                  onClick={() => toggleStatus(index, "hasEnrolled")}
                >
                  <div
                    className={`w-6 h-6 flex items-center justify-center ml-8 rounded ${
                      referral.hasEnrolled ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {referral.hasEnrolled ? (
                      <span className="text-green-600">&#10003;</span>
                    ) : (
                      <span className="text-red-600">×</span>
                    )}
                  </div>
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
