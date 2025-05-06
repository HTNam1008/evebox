"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const locationData = [
  { name: "HCM", value: 180 },
  { name: "HN", value: 150 },
  { name: "Khu vực miền Bắc", value: 190 },
  { name: "Khu vực miền Trung", value: 60 },
  { name: "Khu vực miền Nam", value: 210 },
]

const tableData = [
  { id: "001", location: "Hà Nội", events: 50, showings: 100, revenue: "100.000.000" },
  { id: "002", location: "TP.HCM", events: 100, showings: 300, revenue: "500.000.000" },
  { id: "003", location: "Bình Phước", events: 5, showings: 20, revenue: "200.000" },
  { id: "004", location: "Huế", events: 10, showings: 100, revenue: "100.000" },
  { id: "005", location: "Quảng Bình", events: 20, showings: 40, revenue: "200.000.000" },
  { id: "006", location: "Nghệ An", events: 50, showings: 60, revenue: "300.000" },
  { id: "007", location: "Hà Tĩnh", events: 10, showings: 15, revenue: "400.000" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 px-3 py-2 rounded shadow">
        <p className="text-sm text-gray-700 font-medium">{label}</p>
        <p className="text-sm text-[#0C4762]">Doanh thu : {payload[0].value}</p>
      </div>
    )
  }

  return null;
};

export default function LocationRevenueView() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Triệu đồng</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 250]}
                ticks={[0, 50, 100, 150, 200, 250]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#0C4762" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0C4762] text-white">
              <th className="py-3 px-4 text-left font-medium">STT</th>
              <th className="py-3 px-4 text-left font-medium">Tỉnh thành</th>
              <th className="py-3 px-4 text-left font-medium">Số lượng sự kiện</th>
              <th className="py-3 px-4 text-left font-medium">Số lượng showing</th>
              <th className="py-3 px-4 text-left font-medium">Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-[#E8FFFF]">
                <td className="py-3 px-4">{row.id}</td>
                <td className="py-3 px-4">{row.location}</td>
                <td className="py-3 px-4">{row.events}</td>
                <td className="py-3 px-4">{row.showings}</td>
                <td className="py-3 px-4">{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
