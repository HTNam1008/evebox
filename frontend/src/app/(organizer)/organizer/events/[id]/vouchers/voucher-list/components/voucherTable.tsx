"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Search } from "lucide-react";

const VoucherTable = () => {
    const [search, setSearch] = useState("");

    const vouchers = [
        { id: "#AD-001234", discount: "a", duration: "b", status: "c", },
        { id: "#AD-001234", discount: "d", duration: "e", status: "f", },
        { id: "#AD-001234", discount: "g", duration: "h", status: "i", },
        { id: "#AD-001234", discount: "k", duration: "l", status: "m", }
    ];

    const filteredVouchers = vouchers.filter((vou) =>
        vou.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-1/3 bg-white">
                    <input
                        type="text"
                        className="w-full px-3 py-2 outline-none"
                        placeholder="Tìm kiếm theo tên"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-[#51DACF] px-3 py-2 border-l border-gray-300 transition duration-200 hover:bg-[#3AB5A3]">
                        <Search size={24} color="white" />
                    </button>
                </div>

                <div className="flex gap-3">
                    <button
                        className="px-4 py-2 bg-[#48D1CC] text-[#0C4762] rounded-md transition duration-200 hover:bg-[#51DACF]"
                    >
                        Tạo voucher
                    </button>
                </div>
            </div>

            <table className="w-full border border-gray-300 shadow-lg mt-6">
                <thead>
                    <tr className="bg-[#0C4762] text-white">
                        <th className="border px-4 py-2 text-left">Tên chương trình khuyến mãi</th>
                        <th className="border px-4 py-2 text-left">Mã voucher</th>
                        <th className="border px-4 py-2 text-left">Mức giảm</th>
                        <th className="border px-4 py-2 text-left">Thời gian áp dụng</th>
                        <th className="border px-4 py-2 text-left">Trạng thái hoạt động</th>
                        <th className="border px-2 py-2 text-center w-20">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVouchers.map((voucher, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{voucher.id}</td>
                            <td className="border px-4 py-2">{voucher.id}</td>
                            <td className="border px-4 py-2">{voucher.discount}</td>
                            <td className="border px-4 py-2">{voucher.duration}</td>
                            <td className="border px-4 py-2">{voucher.status}</td>
                            <td className="border px-2 py-2 text-center w-40">
                                <button className="text-blue-500 hover:text-blue-700 mx-1">
                                    <FaEdit />
                                </button>
                                <button className="text-red-500 hover:text-red-700 mx-1">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VoucherTable;
