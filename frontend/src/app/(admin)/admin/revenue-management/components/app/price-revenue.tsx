"use client";

import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getRevenueByTicketPrice } from "@/services/admin.service";
import { RevenueByTicketPriceData } from "@/types/model/ticketPriceRevenue";
import { Loader } from "lucide-react";

export default function PriceRevenueView() {
  const [data, setData] = useState<RevenueByTicketPriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRevenueByTicketPrice();
        setData(res.data || []);
      } catch (error) {
        console.error("Failed to fetch revenue by ticket price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const chartData = data.map((item, index) => ({
    label: `${index + 1}`,
    revenue: item.revenue / 1_000_000,
    conversion: item.conversionRate * 100,
  }));
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-700">Triệu đồng</h3>
          <h3 className="text-lg font-medium text-gray-700">Tỉ lệ chuyển đổi</h3>
        </div>

        <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
  <LineChart
    data={chartData}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="label" />
    <YAxis
      yAxisId="left"
      axisLine={false}
      tickLine={false}
      domain={[0, "auto"]}
    />
    <YAxis
      yAxisId="right"
      orientation="right"
      axisLine={false}
      tickLine={false}
      domain={[0, 100]}
      tickFormatter={(v) => `${v}%`}
    />
    <Tooltip
      formatter={(value: number, name: string) => {
        if (name === "revenue") {
          return [`${value.toFixed(2)} tr.₫`, "Doanh thu"];
        }
        if (name === "conversion") {
          return [`${value.toFixed(1)}%`, "Tỉ lệ chuyển đổi"];
        }
        return [value, name];
      }}
    />
    <Line
      yAxisId="left"
      type="monotone"
      dataKey="revenue"
      stroke="#0EA5E9"
      strokeWidth={3}
      dot={false}
    />
    <Line
      yAxisId="right"
      type="monotone"
      dataKey="conversion"
      stroke="#8B5CF6"
      strokeWidth={3}
      dot={false}
    />
  </LineChart>
</ResponsiveContainer>

        </div>

        <div className="flex justify-center mt-4 space-x-8">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-2"></div>
            <span className="text-sm text-gray-600">Doanh thu</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></div>
            <span className="text-sm text-gray-600">Tỉ lệ chuyển đổi</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0C4762] text-white">
              <th className="py-3 px-4 text-left">STT</th>
              <th className="py-3 px-4 text-left">Giá vé (nghìn đồng)</th>
              <th className="py-3 px-4 text-left">Tổng số lượng vé</th>
              <th className="py-3 px-4 text-left">Số vé thực bán</th>
              <th className="py-3 px-4 text-left">Tỉ lệ chuyển đổi</th>
              <th className="py-3 px-4 text-left">Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-[#E8FFFF]"
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">
                  {row.price.toLocaleString("vi-VN")}
                </td>
                <td className="py-3 px-4">{row.total}</td>
                <td className="py-3 px-4">{row.sold}</td>
                <td className="py-3 px-4">
                  {(row.conversionRate * 100).toFixed(0)}%
                </td>
                <td className="py-3 px-4">{formatCurrency(row.revenue)}₫</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
