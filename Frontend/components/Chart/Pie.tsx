"use client";
import { useEffect } from "react";
import ApexCharts from "apexcharts";

type TrafficPieChartProps = {
  series: number[];
  labels: string[];
  colors?: string[];
  title?: string;
};

export default function TrafficPieChart({
  series,
  labels,
  colors = ["#1C64F2", "#16BDCA", "#9061F9"],
  title = "Website traffic",
}: TrafficPieChartProps) {
  useEffect(() => {
    const chartEl = document.getElementById("pie-chart");
    if (!chartEl || typeof ApexCharts === "undefined") return;

    const chart = new ApexCharts(chartEl, getChartOptions(series, labels, colors));
    chart.render();

    return () => chart.destroy();
  }, [series, labels, colors]);

  return (
    <div className="max-w-xl mx-auto">

    <div className="flex flex-col md:flex-row max-w-lg w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex-1">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h5>
        {/* Chart */}
        <div id="pie-chart"></div>
      </div>
      <div className="flex flex-col justify-center items-start ml-6">
        {labels.map((label, index) => (
          <div
            key={index}
            className="flex items-center mb-2 whitespace-nowrap" // Add `whitespace-nowrap` to prevent wrapping
          >
            <span
              className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
              style={{ backgroundColor: colors[index] }}
            ></span>
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

function getChartOptions(series: number[], labels: string[], colors: string[]) {
  return {
    series,
    colors,
    chart: {
      height: 400,
      width: "100%",
      type: "pie",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels,
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      show: false, // Disable default legend
    },
  };
}
