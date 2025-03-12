"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Dot } from "recharts";

const data = [
  { month: "August", visits: 400000 },
  { month: "September", visits: 300000 },
  { month: "October", visits: 450000 },
  { month: "November", visits: 350000 },
  { month: "December", visits: 500000 },
  { month: "January", visits: 675451 }, // Điểm nổi bật
  { month: "February", visits: 600000 },
];

export default function TrafficChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Lượt truy cập theo thời gian</h2>
      <p className="text-4xl font-bold">867,123k</p>
      <p className="text-blue-500 flex items-center">
        <span className="mr-1">▲</span> +9% so với tháng trước
      </p>

      {/* Biểu đồ */}
      <div className="mt-4 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#0C4762"
              strokeWidth={3}
              dot={(props) => (
                <Dot
                  {...props}
                  fill={props.payload.month === "January" ? "blue" : "#0C4762"}
                  r={props.payload.month === "January" ? 6 : 3}
                />
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
