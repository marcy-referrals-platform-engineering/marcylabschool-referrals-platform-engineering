"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
import TableOneLoading from "./TabelOneLoading";
import CheckBoxModal from "./CheckBoxModal";

const TableOne = ({ refresh }: { refresh: any }) => {
  const { user } = useStore();
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReferral, setSelectedReferral] = useState<any>(null);
  
  useEffect(() => {
    if (!user) return;
    const { email } = user;

    const fetchReferrals = async () => {
      setLoading(true);
      const data = await ReferralService.fetchReferrals(email);
      if (data) {
        const initializedData = data.map((referral: any) => ({
          ...referral,
          hasToured: referral.hasToured || false,
          hasApplied: referral.hasApplied || false,
          hasBeenAccepted: referral.hasBeenAccepted || false,
          hasEnrolled: referral.hasEnrolled || false,
        }));
        setReferrals(initializedData);
      }
      setLoading(false);
    };

    fetchReferrals();
  }, [user]);

  const toggleReviewed = (id: number) => {
    console.log('id',id)
    const updateReviewedStatus = async () => {
      await ReferralService.updateReviewStatus(id);
    }
    updateReviewedStatus()
    setSelectedReferral(null)
    setReferrals((prevReferrals) => prevReferrals.map((referral) => referral.id === id ? {...referral, reviewed: true} : referral))

  }


console.log('referrals',referrals)
  const toggleStatus = (index: number, field: string) => {
    if (user && user.role === "ADMIN") {
      setReferrals((prevReferrals) =>
        prevReferrals.map((referral, i) =>
          i === index ? { ...referral, [field]: !referral[field] } : referral
        )
      );
      refresh();
    }
  };

  if (loading) {
    return <TableOneLoading />;
  }
  
  return (
    <div className="col-span-12 xl:col-span-8 rounded-sm border border-stroke bg-white px-3 pt-5 sm:px-5 xl:pb-1">
      <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">
        YOUR REFERRALS
      </h4>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {user?.role === "ADMIN" && (
                <th className="p-2 text-sm font-medium uppercase text-left">
                  REFERRER
                </th>
              )}
              <th className="p-2 text-sm font-medium uppercase text-left">
                Canidate Name
              </th>
              <th className="p-2 text-sm font-medium uppercase text-left">
              Canidate Email
              </th>

              {/* Milestones are visible only on large screens */}
              <th className="hidden lg:table-cell p-2 text-sm font-medium uppercase text-center">
                Toured
              </th>
              <th className="hidden lg:table-cell p-2 text-sm font-medium uppercase text-center">
                Applied
              </th>
              <th className="hidden lg:table-cell p-2 text-sm font-medium uppercase text-center">
                Accepted
              </th>
              <th className="hidden lg:table-cell p-2 text-sm font-medium uppercase text-center">
                Enrolled
              </th>

              <th className="p-2 text-sm font-medium uppercase text-center"></th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral, index) => (
              <tr
                key={index}
                className="border-b  border-stroke dark:border-strokedark"
              >
                {user?.role === "ADMIN" && (
                  <td className="p-2  flex items-center gap-1 text-sm text-black dark:text-white">
                    {   !referral.reviewed &&
                        (<div className="rounded-full w-2 h-2  bg-red-500"></div>)
                    }
                    
                    {referral.referrerName}
                  </td>
                )}
                <td className="p-2 text-sm text-black dark:text-white">
                  {referral.name}
                </td>
                <td className="p-2 text-sm text-black dark:text-white">
                  {referral.email}
                </td>

                {/* Milestones - show only on large screens */}
                <td className="hidden lg:table-cell p-2 translate-x-[1.5rem] text-center">
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
                </td>
                <td className="hidden translate-x-[1.5rem]  lg:table-cell p-2 text-center">
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
                </td>
                <td className="hidden translate-x-[1.5rem] lg:table-cell p-2 text-center">
                  <CheckBoxModal
                    data={{
                      referrer: referral.referrerName,
                      canidate: referral.name,
                      milestone: "hasBeenAccepted",
                      id: referral.id,
                    }}
                    condition={"Received Offer"}
                    points={100}
                    handler={() => toggleStatus(index, "hasBeenAccepted")}
                    conditionTrue={referral.hasBeenAccepted}
                  />
                </td>
                <td className="hidden translate-x-[1.5rem] lg:table-cell p-2 text-center">
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
                </td>

                {/* View More Button - opens modal */}
                <td className="p-2  text-sm text-center">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setSelectedReferral(referral)}
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for additional details */}
      {selectedReferral && (
        <Modal
          title="Candidate Details"
          onClose={() => setSelectedReferral(null)}
        >
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Name:</strong> {selectedReferral.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedReferral.email}
              </p>
              <p>
                <strong>Gender:</strong>{" "}
                {selectedReferral.gender || "Not provided"}
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={selectedReferral.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  LinkedIn Profile
                </a>
              </p>
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={selectedReferral.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  View Resume
                </a>
              </p>
            </div>

            {/* Milestones Section */}
            <div className="border-t pt-2">
              <h4 className="text-xl font-semibold text-gray-700 mb-3">
                Milestones
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Each Milestone with Label and Checkbox */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Attended Tour</span>
                  <CheckBoxModal
                    data={{
                      referrer: selectedReferral.referrerName,
                      canidate: selectedReferral.name,
                      milestone: "hasToured",
                      id: selectedReferral.id,
                    }}
                    condition={"Attended Tour"}
                    points={20}
                    handler={() =>
                      toggleStatus(
                        referrals.indexOf(selectedReferral),
                        "hasToured"
                      )
                    }
                    conditionTrue={selectedReferral.hasToured}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Submitted Application</span>
                  <CheckBoxModal
                    data={{
                      referrer: selectedReferral.referrerName,
                      canidate: selectedReferral.name,
                      milestone: "hasApplied",
                      id: selectedReferral.id,
                    }}
                    condition={"Submitted Application"}
                    points={50}
                    handler={() =>
                      toggleStatus(
                        referrals.indexOf(selectedReferral),
                        "hasApplied"
                      )
                    }
                    conditionTrue={selectedReferral.hasApplied}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Received Offer</span>
                  <CheckBoxModal
                    data={{
                      referrer: selectedReferral.referrerName,
                      canidate: selectedReferral.name,
                      milestone: "hasBeenAccepted",
                      id: selectedReferral.id,
                    }}
                    condition={"Received Offer"}
                    points={100}
                    handler={() =>
                      toggleStatus(
                        referrals.indexOf(selectedReferral),
                        "hasBeenAccepted"
                      )
                    }
                    conditionTrue={selectedReferral.hasBeenAccepted}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Enrolled In Fellowship</span>
                  <CheckBoxModal
                    data={{
                      referrer: selectedReferral.referrerName,
                      canidate: selectedReferral.name,
                      milestone: "hasEnrolled",
                      id: selectedReferral.id,
                    }}
                    condition={"Enrolled In Fellowship"}
                    points={200}
                    handler={() =>
                      toggleStatus(
                        referrals.indexOf(selectedReferral),
                        "hasEnrolled"
                      )
                    }
                    conditionTrue={selectedReferral.hasEnrolled}
                  />
                </div>
              </div>
            </div>
            { !selectedReferral.reviewed &&   (<button onClick={() => toggleReviewed(selectedReferral?.id)} className="text-center m-auto w-full underline">Mark As Reviewed</button>)}
          </div>
        </Modal>
      )}
    </div>
  );
};

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ title, children, onClose }: ModalProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed    inset-0 z-50 flex items-center justify-center   ">
      <div className="bg-[black] translate-y-[-5rem] inset-0 m-auto bg-opacity-50 w-screen h-[120vh] animate-fade absolute "></div>
      <div className="bg-white translate-y-[-3rem] rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] p-12 pt-6 overflow-y-auto relative">
        <div className=" flex gap-2 border-b  justify-center">
        <h1 className="text-[1.5rem]  font-bold mb-4 text-gray-900">
          {title}
        </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="black"
              stroke-width="2"
              fill="none"
            />
            <path
              d="M12 8C11.45 8 11 8.45 11 9C11 9.55 11.45 10 12 10C12.55 10 13 9.55 13 9C13 8.45 12.55 8 12 8ZM12 12C11.45 12 11 12.45 11 13V17C11 17.55 11.45 18 12 18C12.55 18 13 17.55 13 17V13C13 12.45 12.55 12 12 12Z"
              fill="black"
            />
          </svg>
        </div>
        
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <div className=" pt-3">{children}</div>
      </div>
    </div>
  );
};

export default TableOne;
