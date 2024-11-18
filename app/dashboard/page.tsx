"use client";
import Analytics from "./components/Analytics";
import withAuth from "../components/layout/ProtectedRoute";
import FocusBackdrop from "./components/FocusBackdrop";

function Dashboard() {
  return (
    <>
      <div className="bg-gray-50">
        <Analytics />
      </div>

      <FocusBackdrop />
    </>
  );
}

export default withAuth(Dashboard);
