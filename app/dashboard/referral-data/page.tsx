"use client";
import { useStore } from "@/app/state/useStore";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableOne from "../components/Tables/TableOne";

import DefaultLayout from "../components/Layouts/DefaultLayout";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
