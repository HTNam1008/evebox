"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function RevenueChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data for the chart
    const labels = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
    ]

    const data = [15, 5, 30, 15, 35, 55, 30, 15, 10, 70, 50]

    const pointBackgroundColors = Array(data.length).fill("transparent")
    const pointBorderColors = Array(data.length).fill("transparent")
    const pointRadiuses = Array(data.length).fill(0)

    const specialPoints = [
      { index: 5, color: "#4cd137" }, // Tháng 6, Green point
      { index: 5, color: "#3498db" }, // Tháng 6, Blue point
      { index: 7, color: "#3498db" }, // Tháng 8, Blue point
    ]


    specialPoints.forEach((point) => {
      pointBackgroundColors[point.index] = point.color
      pointBorderColors[point.index] = "#ffffff"
      pointRadiuses[point.index] = 8
    })

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Doanh thu (Triệu đồng)",
            data: data,
            borderColor: "#0C4762",
            borderWidth: 4,
            tension: 0.4,
            fill: false,
            // Set point styling directly on the dataset
            pointBackgroundColor: pointBackgroundColors,
            pointBorderColor: pointBorderColors,
            pointRadius: pointRadiuses,
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: "#e5e7eb",
            },
            ticks: {
              color: "#6b7280",
            },
          },
          y: {
            grid: {
              color: "#e5e7eb",
            },
            ticks: {
              color: "#6b7280",
              callback: (value) => value + "",
              // Đặt stepSize trong ticks thay vì trực tiếp trong scale
              stepSize: 20,
            },
            title: {
              display: true,
              text: "Triệu đồng",
              color: "#6b7280",
            },
            min: 0,
            max: 100,
          },
        },
        interaction: {
          intersect: false,
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div>
      <div className="text-lg font-medium mt-6">Tổng doanh thu của năm 2024</div>
      <div className="border border-blue-100 rounded-lg p-4 h-[350px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
