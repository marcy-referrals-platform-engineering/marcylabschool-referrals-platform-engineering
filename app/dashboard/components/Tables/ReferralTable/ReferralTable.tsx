"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/app/state/useStore";
import ReferralService from "@/app/services/ReferralService";
import TableOneLoading from "./components/ReferralTableLoading";
import CheckBoxModal from "./components/CheckBoxModal";
import { useRouter } from "next/navigation";
import Modal from "./components/InfoModal";
import PlusButton from "./components/PlusButton";
const ITEMS_PER_PAGE = 5; // Number of referrals to display per page

const ReferralTable = ({
  refresh,
  email,
}: {
  refresh: any;
  email: string | null;
}) => {
  const { user } = useStore();
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReferral, setSelectedReferral] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  console.log("email to use", email);

  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchReferrals = async () => {
      setLoading(true);

      try {
        let response;
        //  handle pagination for when there is a query
        if (searchQuery) {
          response = await ReferralService.searchReferrals(
            email ? email : user.email,
            searchQuery,
            currentPage,
            ITEMS_PER_PAGE,
            email ? false : true
          );
        } else {
          // handle pagination for when there is no query
          response = await ReferralService.fetchReferrals(
            email ? email : user.email,
            currentPage,
            ITEMS_PER_PAGE,
            email ? false : true
          );
        }
        console.log("data", response);

        if (response && Array.isArray(response.data)) {
          const initializedData = response.data.map((referral: any) => ({
            ...referral,
            hasToured: referral.hasToured || false,
            hasApplied: referral.hasApplied || false,
            hasBeenAccepted: referral.hasBeenAccepted || false,
            hasEnrolled: referral.hasEnrolled || false,
          }));
          setReferrals(initializedData);

          // Ensure totalPages is at least 1

          setTotalPages(Math.max(response.totalPages, 1));
        } else {
          console.error("Unexpected response structure", response);
          setReferrals([]);
        }
      } catch (error) {
        console.error("Error fetching referrals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [user, currentPage, email]);

  const handleSearch = async () => {
    setCurrentPage(1); // Reset to the first page for new search
    setLoading(true);
    console.log(
      "searching referrals for email",
      email,
      "searchQuery",
      searchQuery
    );
    try {
      const response = await ReferralService.searchReferrals(
        email ? email : user!.email,
        searchQuery,
        1, // Set to the first page for new search
        ITEMS_PER_PAGE,
        email ? false : true
      );
      if (response && Array.isArray(response.data)) {
        setReferrals(response.data);
        setTotalPages(response.totalPages);
      } else {
        console.error("Unexpected response structure", response);
        setReferrals([]);
      }
    } catch (error) {
      console.error("Error searching referrals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleReviewed = (id: number) => {
    const updateReviewedStatus = async () => {
      await ReferralService.updateReviewStatus(id);
    };
    updateReviewedStatus();
    setSelectedReferral(null);
    setReferrals((prevReferrals) =>
      prevReferrals.map((referral) =>
        referral.id === id ? { ...referral, reviewed: true } : referral
      )
    );
  };

  const toggleStatus = (index: number, field: string) => {
    if (user && user.role === "ADMIN") {
      setReferrals((prevReferrals) =>
        prevReferrals.map((referral, i) =>
          i === index ? { ...referral, [field]: !referral[field] } : referral
        )
      );
      refresh();

      if (selectedReferral) {
        setSelectedReferral({
          ...selectedReferral,
          [field]: !selectedReferral[field],
        });
      }
    }
  };

  return (
    <div className="col-span-12 xl:col-span-8  rounded-sm border border-stroke bg-white px-3 pt-5 sm:px-5 xl:pb-1">
      <div className="flex justify-between">
        <h4 className="mb-3 text-lg font-semibold text-black dark:text-white">
          {user?.role === "USER" ? "YOUR" : ""} REFERRALS
        </h4>

        <PlusButton onClick={() => router.push("/referral-form")} />
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 mb-4 bg-gray-50"
        />
        <button
          onClick={handleSearch}
          className="px-2 py-2 border  translate-y-[0.4rem] border-black  bg-[#261f1d] duration-200  hover:opacity-50  text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {loading ? (
        <TableOneLoading />
      ) : referrals.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 min-h-[12rem]">No referrals found</p>
        </div>
      ) : (
        <div className="overflow-x-auto  h-[15rem] overflow-y-scroll mb-6">
          <table className="w-full  border-collapse">
            <thead>
              <tr className="bg-gray-100 ">
                {user?.role === "ADMIN" && (
                  <th className="p-2 text-sm font-medium uppercase text-left sticky top-0 bg-gray-100 z-10">
                    REFERRER
                  </th>
                )}
                <th className="p-2  text-sm font-medium uppercase text-left sticky top-0 bg-gray-100 z-10">
                  Canidate Name
                </th>
                <th className="p-2 text-sm font-medium uppercase text-left sticky top-0 bg-gray-100 z-10">
                  Canidate Email
                </th>
                <th className="hidden lg:table-cell p-2 text-sm font-medium uppercase text-center sticky top-0 bg-gray-100 z-10">
                  Toured
                </th>
                <th className="hidden lg:table-cell p-2 text-sm font-medium uppercase text-center sticky top-0 bg-gray-100 z-10">
                  Applied
                </th>
                <th className="hidden lg:table-cell p-2 text-sm font-medium uppercase text-center sticky top-0 bg-gray-100 z-10">
                  Accepted
                </th>
                <th className="hidden lg:table-cell p-2 text-sm font-medium uppercase text-center sticky top-0 bg-gray-100 z-10">
                  Enrolled
                </th>
                <th className="p-2 text-sm font-medium uppercase text-center sticky top-0 bg-gray-100 z-10"></th>
              </tr>
            </thead>

            <tbody>
              {referrals.map((referral, index) => (
                <tr
                  key={index}
                  className="border-b border-stroke dark:border-strokedark"
                >
                  {user?.role === "ADMIN" && (
                    <td className="p-2  flex  overflow-hidden whitespace-nowrap items-center gap-1 text-sm text-black dark:text-white">
                      {!referral.reviewed && (
                        <div className="rounded-full  w-2 h-2 bg-red-500"></div>
                      )}
                      <p className="w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis ">
                        {" "}
                        {referral.referrerName}
                      </p>
                    </td>
                  )}
                  <td className="p-2 px-10 text-sm text-black dark:text-white">
                    <p className="w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis ">
                      {" "}
                      {referral.name}
                    </p>
                  </td>
                  <td className="p-2 text-sm text-black dark:text-white">
                    <p className="w-[5rem] whitespace-nowrap overflow-hidden text-ellipsis ">
                      {" "}
                      {referral.email}
                    </p>
                  </td>

                  <td className="hidden lg:table-cell p-2 pl-5  text-center">
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
                  <td className="hidden lg:table-cell p-2 pl-5  text-center">
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
                  <td className="hidden lg:table-cell  p-2 pl-5  text-center">
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
                  <td className="hidden lg:table-cell p-2 pl-5  text-center">
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
                  <td className="p-2 text-sm text-center">
                    <button
                      className="text-black font-medium hover:underline"
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
      )}

      {/* Pagination Controls */}
      <div className="flex    translate-y-[-0.8rem] items-center justify-between space-x-4">
        {currentPage > 1 ? (
          <button
            className="py-2 px-3 font-medium  duration-200 rounded hover:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        ) : (
          <div className="w-[5rem] "></div>
        )}

        <span className="flex-grow font-medium text-center">
          Page {currentPage} of {totalPages || 1}
        </span>

        {currentPage < totalPages ? (
          <button
            className="px-4 py-2 font-medium rounded duration-200 hover:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        ) : (
          <div className="w-[3.9rem]"></div>
        )}
      </div>

      {/* Modal for additional details */}
      {selectedReferral && (
        <Modal
          title="Candidate Details"
          onClose={() => setSelectedReferral(null)}
        >
          <div className="space-y-6 ">
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
                  className={`font-medium ${
                    selectedReferral.linkedIn && "underline"
                  } hover:opacity-50 transition`}
                >
                  {selectedReferral.linkedIn ? "Link" : "Not provided"}
                </a>
              </p>
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={selectedReferral.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-medium ${
                    selectedReferral.resume && "underline"
                  } hover:opacity-50 transition`}
                >
                  {selectedReferral.resume ? "Link" : "Not provided"}
                </a>
              </p>
            </div>

            {/* Milestones Section */}
            <div className="border-t pt-2">
              <h4 className="text-xl font-semibold text-gray-700 mb-3">
                Milestones
              </h4>
              <div className="grid grid-cols-2 gap-4">
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
            {!selectedReferral.reviewed && user?.role === "ADMIN" && (
              <button
                onClick={() => toggleReviewed(selectedReferral?.id)}
                className="text-center m-auto w-full underline"
              >
                Mark As Reviewed
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReferralTable;
