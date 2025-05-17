"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getProvinceRevenue } from "@/services/admin.service";
import { ProvinceRevenueData } from "@/types/model/provinceRevenue";
import { Loader } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 px-3 py-2 rounded shadow">
        <p className="text-sm text-gray-700 font-medium">{label}</p>
        <p className="text-sm text-[#0C4762]">Doanh thu: {new Intl.NumberFormat("vi-VN").format(payload[0].value)}tr.đ</p>
      </div>
    );
  }
  return null;
};

export default function LocationRevenueView() {
  const [provinceData, setProvinceData] = useState<ProvinceRevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvinceRevenue = async () => {
      try {
        const res = await getProvinceRevenue();
        setProvinceData(res.data);
      } catch (error) {
        console.error("Failed to fetch province revenue data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinceRevenue();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Triệu đồng</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={provinceData.map(p => ({ name: p.provinceName, value: p.totalRevenue / 1_000_000 }))}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, "dataMax"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#0C4762" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
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
            {provinceData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-[#E8FFFF]">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{row.provinceName}</td>
                <td className="py-3 px-4">{row.eventCount}</td>
                <td className="py-3 px-4">{row.showingCount}</td>
                <td className="py-3 px-4">{new Intl.NumberFormat("vi-VN").format(row.totalRevenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
