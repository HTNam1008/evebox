"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const priceData = [
  { month: "1m", revenue: 50, conversion: 10 },
  { month: "2m", revenue: 200, conversion: 30 },
  { month: "3m", revenue: 300, conversion: 25 },
  { month: "4m", revenue: 450, conversion: 35 },
  { month: "5m", revenue: 350, conversion: 30 },
  { month: "6m", revenue: 400, conversion: 40 },
  { month: "7m", revenue: 350, conversion: 50 },
  { month: "8m", revenue: 300, conversion: 45 },
  { month: "9m", revenue: 450, conversion: 40 },
  { month: "10m", revenue: 500, conversion: 35 },
  { month: "11m", revenue: 600, conversion: 30 },
  { month: "12m", revenue: 700, conversion: 25 },
]

const tableData = [
  { id: "001", priceRange: "0-100", totalTickets: 100, soldTickets: 80, conversionRate: "80%", revenue: "100.000.000" },
  {
    id: "002",
    priceRange: "100-500",
    totalTickets: 200,
    soldTickets: 189,
    conversionRate: "92%",
    revenue: "500.000.000",
  },
  { id: "003", priceRange: "500-1000", totalTickets: 500, soldTickets: 450, conversionRate: "95%", revenue: "200.000" },
  { id: "004", priceRange: "1000-1500", totalTickets: 20, soldTickets: 19, conversionRate: "99%", revenue: "100.000" },
  {
    id: "005",
    priceRange: "1500-2000",
    totalTickets: 30,
    soldTickets: 24,
    conversionRate: "96%",
    revenue: "200.000.000",
  },
  { id: "006", priceRange: "2000-5000", totalTickets: 20, soldTickets: 12, conversionRate: "82%", revenue: "300.000" },
]

export default function PriceRevenueView() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-700">Triệu đồng</h3>
          <h3 className="text-lg font-medium text-gray-700">Tỉ lệ chuyển đổi</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 700]}
                ticks={[0, 100, 200, 300, 400, 500, 600, 700]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#0EA5E9"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="conversion"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 space-x-8">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></div>
            <span className="text-sm text-gray-600">Doanh thu</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-2"></div>
            <span className="text-sm text-gray-600">Tỉ lệ chuyển đổi</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0C4762] text-white">
              <th className="py-3 px-4 text-left font-medium">STT</th>
              <th className="py-3 px-4 text-left font-medium">Khoảng giá của vé (nghìn đồng)</th>
              <th className="py-3 px-4 text-left font-medium">Tổng số lượng vé</th>
              <th className="py-3 px-4 text-left font-medium">Số vé thực bán</th>
              <th className="py-3 px-4 text-left font-medium">Tỉ lệ chuyển đổi</th>
              <th className="py-3 px-4 text-left font-medium">Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-[#E8FFFF]">
                <td className="py-3 px-4">{row.id}</td>
                <td className="py-3 px-4">{row.priceRange}</td>
                <td className="py-3 px-4">{row.totalTickets}</td>
                <td className="py-3 px-4">{row.soldTickets}</td>
                <td className="py-3 px-4">{row.conversionRate}</td>
                <td className="py-3 px-4">{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
