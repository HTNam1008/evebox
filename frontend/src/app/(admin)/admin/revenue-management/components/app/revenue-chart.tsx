"use client"

import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { getOrgRevenueChart } from "@/services/admin.service"
import { RevenueSummaryResponse } from "@/types/model/RevenueSummaryResponse"


interface RevenueChartProps {
  type: "month" | "year"
  from: string
  to: string
}

export default function RevenueChart({ type, from, to }: RevenueChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [chartData, setChartData] = useState<RevenueSummaryResponse | null>(null)

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await getOrgRevenueChart(from, to, type);
        setChartData({ labels: res.labels, values: res.values });
      } catch (error) {
        console.error("Failed to fetch chart data", error);
      }
    };
  
    fetchChartData();
  }, [type, from, to]);

  useEffect(() => {
    if (
      !chartRef.current ||
      !Array.isArray(chartData?.labels) ||
      !Array.isArray(chartData?.values) ||
      chartData.labels.length === 0 ||
      chartData.values.length === 0
    ) {
      return;
    }  
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;
  
    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  
    const lastIndex = chartData.values.length - 1;
    const pointBg = Array(chartData.values.length).fill("transparent");
    const pointBorder = Array(chartData.values.length).fill("transparent");
    const pointRadius = Array(chartData.values.length).fill(0);
    if (lastIndex >= 0) {
      pointBg[lastIndex] = "#4cd137";
      pointBorder[lastIndex] = "#fff";
      pointRadius[lastIndex] = 6;
    }
  
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [{
          label: "Doanh thu (Triệu đồng)",
          data: chartData.values,
          borderColor: "#0C4762",
          borderWidth: 4,
          tension: 0.4,
          fill: false,
          pointBackgroundColor: pointBg,
          pointBorderColor: pointBorder,
          pointRadius,
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  
    // Cleanup
    return () => {
      chartInstance.current?.destroy();
    };
  }, [chartData, chartRef]); // Also include chartRef
  
  

  console.log("chartRef.current:", chartRef.current);
  console.log("chartData.labels:", chartData?.labels);
  console.log("chartData.values:", chartData?.values);  return (
    <div>
      <div className="text-lg font-medium mt-6">Tổng doanh thu </div>
      <div className="relative border border-blue-100 rounded-lg p-4 h-[350px]">
      <canvas ref={chartRef} height={350}></canvas>
      </div>
   </div>
  )
}
