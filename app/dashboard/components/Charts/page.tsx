"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ChartOne from "./ChartOne/ChartOne";
import ChartTwo from "./ChartTwo/ChartTwo";
import dynamic from "next/dynamic";
import React from "react";

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default Chart;
