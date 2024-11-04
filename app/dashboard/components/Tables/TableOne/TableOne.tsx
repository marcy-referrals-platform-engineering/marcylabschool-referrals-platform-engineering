"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
import TableOneLoading from "./TabelOneLoading";
import CheckBoxModal from "./CheckBoxModal";

const TableOne = ({refresh} : {refresh: any}) => {
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
  console.log(referrals);


  // Toggle function to update the state
  const toggleStatus = (index: number, field: string) => {
    if (user) {
      if (user.role !== "ADMIN") return; // Only allow toggling if user is an ADMIN
      setReferrals((prevReferrals) =>
        prevReferrals.map((referral, i) =>
          i === index ? { ...referral, [field]: !referral[field] } : referral
        )
      )
      refresh()
    }

    
  };

  // Render a loading indicator if still loading
  if (loading) {
    return <TableOneLoading />;
  }

  return (
    <div className="col-span-12 xl:col-span-8  rounded-sm border border-stroke bg-white px-5 pt-10  sm:px-7.5 xl:pb-1">
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
              {user?.role === "ADMIN" && (
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-left xsm:text-base">
                  REFERRER
                </th>
              )}
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
                Offered
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
                {user?.role === "ADMIN" && (
                  <td className="p-2.5 xl:p-5 text-black dark:text-white">
                    {referral.referrerName}
                  </td>
                )}
                <td className="p-2.5 xl:p-5 text-black dark:text-white">
                  {referral.name}
                </td>
                <td className="p-2.5 xl:p-5 text-black dark:text-white">
                  {referral.email}
                </td>
                <td className="p-2.5 xl:p-5 text-center ">
                  <div className="flex justify-center items-center h-full">
                    <CheckBoxModal
                      data={{
                        referrer: referral.referrerName,
                        canidate: referral.name,
                        milestone: "hasToured",
                        id: referral.id,
                      }}
                      condition={"Attended Tour"}
                      points={20}
                      handler={() => toggleStatus(index, "hasToured")}
                      conditionTrue={referral.hasToured}
                    />
                  </div>
                </td>
                <td className="p-2.5 xl:p-5 text-center ">
                  <div className="flex justify-center items-center h-full">
                    <CheckBoxModal
                      data={{
                        referrer: referral.referrerName,
                        canidate: referral.name,
                        milestone: "hasApplied",
                        id: referral.id,
                      }}
                      condition={"Submitted Application"}
                      points={50}
                      handler={() => toggleStatus(index, "hasApplied")}
                      conditionTrue={referral.hasApplied}
                    />
                  </div>
                </td>
                <td className="p-2.5 xl:p-5 text-center ">
                  <div className="flex justify-center items-center h-full">
                    <CheckBoxModal
                      data={{
                        referrer: referral.referrerName,
                        canidate: referral.name,
                        milestone: "hasBeenAccepted",
                        id: referral.id,
                      }}
                      condition={"Recieved Offer"}
                      points={100}
                      handler={() => toggleStatus(index, "hasBeenAccepted")}
                      conditionTrue={referral.hasBeenAccepted}
                    />
                  </div>
                </td>
                <td className="p-2.5 xl:p-5 text-center cursor-pointer">
                  <div className="flex justify-center items-center h-full">
                    <CheckBoxModal
                      data={{
                        referrer: referral.referrerName,
                        canidate: referral.name,
                        milestone: "hasEnrolled",
                        id: referral.id,
                      }}
                      condition={"Enrolled In Fellowship"}
                      points={200}
                      handler={() => toggleStatus(index, "hasEnrolled")}
                      conditionTrue={referral.hasEnrolled}
                    />
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
