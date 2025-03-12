"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function OrderSection() {
    const [search, setSearch] = useState("");
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const orders = [
        { id: "#AD-001234", email: "user1@example.com", ticket: "ABC", total: "$634.68" },
        { id: "#AD-001235", email: "user2@example.com", ticket: "CDE", total: "$185.07" }
    ];

    const toggleCheckbox = (orderId: string) => {
        setSelectedOrders((prev) =>
            prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
        );
    };

    if (!mounted) return null; // Ngăn SSR render khác với Client

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center pt-6">
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
                    <button className="px-4 py-2 bg-[#48D1CC] text-[#0C4762] rounded-md transition duration-200 hover:bg-[#51DACF]">
                        Gửi tất cả email
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md transition duration-200 ${
                            selectedOrders.length > 0
                                ? "bg-[#48D1CC] text-[#0C4762] hover:bg-[#51DACF]"
                                : "bg-gray-300 text-gray-700 cursor-not-allowed"
                        }`}
                        disabled={selectedOrders.length === 0}
                    >
                        Email đã chọn ({selectedOrders.length})
                    </button>
                </div>
            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-[#0C4762] text-white text-left">
                        <th className="py-2 px-2 text-left">
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setSelectedOrders(e.target.checked ? orders.map((o) => o.id) : [])
                                }
                                checked={selectedOrders.length === orders.length}
                            />
                        </th>
                        <th>Đơn hàng</th>
                        <th>Vé</th>
                        <th>Tổng cộng</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-t">
                            <td className="py-2 px-2">
                                <input
                                    type="checkbox"
                                    onChange={() => toggleCheckbox(order.id)}
                                    checked={selectedOrders.includes(order.id)}
                                />
                            </td>
                            <td className="py-2">{order.id}</td>
                            <td>{order.ticket}</td>
                            <td>{order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
