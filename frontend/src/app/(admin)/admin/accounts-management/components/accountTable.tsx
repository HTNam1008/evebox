"use client";
/* Package System */
import { useState } from "react";

/* Package Application */
import { User } from "../lib/interface/acctable.interface";

export default function AccountTable() {
    const data: User[] = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyentlong@gmail.com',
            role: 'Chủ sự kiện',
            createdAt: '01/10/2024',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Nguyễn Thành Long',
            email: 'nguyentlong@gmail.com',
            role: 'Quản lý',
            createdAt: '01/10/2024',
            status: 'Deactivated',
        },
        {
            id: 3,
            name: 'Hồ Văn Nam',
            email: 'nguyentlong@gmail.com',
            role: 'Customer',
            createdAt: '01/10/2024',
            status: 'Active',
        },
    ];

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Slice dữ liệu hiển thị theo trang
    const paginatedData = data.slice(startItem - 1, endItem);

    return (
        <>
            <div className="overflow-x-auto rounded-xl shadow-md mt-6">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="bg-[#0C4762] text-white text-sm text-left rounded-t-lg">
                            <th className="px-4 py-3 text-center">STT</th>
                            <th className="px-4 py-3">Họ và tên</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3 text-center">Vai trò</th>
                            <th className="px-4 py-3 text-center">Ngày tạo</th>
                            <th className="px-4 py-3 text-center">Trạng thái</th> {/* Cột cuối không cần border-r */}
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {paginatedData.map((user, index) => (
                            <tr key={user.id} className="border-t border-gray-200">
                                <td className="px-4 py-3 text-center border-r border-gray-200">{index + 1}</td>
                                <td className="px-4 py-3 border-r border-gray-200">{user.name}</td>
                                <td className="px-4 py-3 border-r border-gray-200">{user.email}</td>
                                <td className="px-4 py-3 border-r border-gray-200">{user.role}</td>
                                <td className="px-4 py-3 text-center border-r border-gray-200">{user.createdAt}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border 
                                                    ${user.status === 'Active'
                                                        ? 'bg-teal-100 text-teal-500 border-teal-500'
                                                        : 'bg-gray-200 text-gray-500 border-gray-500'}`}>
                                        {user.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <div className="flex items-center justify-between mt-4 px-2 text-sm text-gray-500">
                <p>Hiển thị {startItem}-{endItem} của {totalItems}</p>

                <div className="inline-flex items-center rounded-full border border-gray-300 overflow-hidden">
                    {/* Nút Previous */}
                    <button
                        onClick={handlePrevious} disabled={currentPage === 1}
                        className={`w-8 h-8 flex items-center justify-center 
                                    ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="h-6 w-px bg-gray-300" />

                    {/* Nút Next */}
                    <button
                        onClick={handleNext} disabled={currentPage === totalPages}
                        className={`w-8 h-8 flex items-center justify-center 
                                    ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-100'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}