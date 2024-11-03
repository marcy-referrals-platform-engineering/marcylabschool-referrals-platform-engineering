"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ChartTwoLoading from "./ChartTwoLoading";
import { formatBarChartData } from "@/app/utils/chartutils";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [], // Will be set dynamically
  },
  legend: {
    fontFamily: "Helvetica Neue",
    position: "top",
    horizontalAlign: "left",
    fontWeight: 500,
    fontSize: "14px",
  },
  fill: {
    opacity: 1,
  },
};

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const ChartTwo: React.FC<{userStats: any}> = ({userStats}) => {
  
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData>({ series: [], categories: [] });

  useEffect(() => {
    // Setting loading to false after a delay
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const weeklyData = userStats?.weeklyData;
    if (weeklyData && !loading) {
      const { series, categories } = formatBarChartData(weeklyData);
      setChartData({ series, categories });
    }
  }, [userStats, loading]);

  return loading || chartData.series.length === 0 || chartData.categories.length === 0 ? (
    <ChartTwoLoading />
  ) : (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Points this week
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                This Week
              </option>
              <option value="" className="dark:bg-boxdark">
                Last Week
              </option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={{ ...options, xaxis: { ...options.xaxis, categories: chartData.categories } }}
            series={chartData.series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;