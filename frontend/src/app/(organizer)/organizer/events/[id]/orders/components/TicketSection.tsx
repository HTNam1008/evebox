"use client";

import { Cloud } from "lucide-react";

export default function TicketSection() {
    return (
        <div>
            <div className="flex justify-end mb-4 mt-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#48D1CC] text-[#0C4762] rounded-md transition duration-200 hover:bg-[#51DACF]">
                    <Cloud size={20} /> {/* Icon đám mây */}
                    Xuất báo cáo
                </button>
            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-[#0C4762] text-white text-left">
                        <th className="py-2 px-2 text-left" >Họ và tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Số tiền</th>
                        <th>Hình thức thanh toán</th>
                        <th>Loại vé</th>
                        <th>Giá</th>
                        <th>Số tiền</th>
                        <th>Trạng thái thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-2 text-left">TH</td>
                        <td>dtth@gmail.com</td>
                        <td>9489020039</td>
                        <td>100.000vnd</td>
                        <td>momo</td>
                        <td>vip</td>
                        <td>28920</td>
                        <td>2400202</td>
                        <td>Thành công</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
