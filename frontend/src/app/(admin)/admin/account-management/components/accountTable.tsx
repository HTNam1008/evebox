'use client'

/* Package System */
import { useState } from "react";
import { useRouter } from 'next/navigation';

/* Package Application */
import { User } from "../lib/interface/acctable.interface";
import ConfirmActiveDialog from "@/app/(admin)/admin/account-management/components/dialog/confirmActive";
import { sortUsers } from "../lib/function/sortUsers";
import SortIcon from "./sortIcon";

export default function AccountTable() {
    const data: User[] = [
        {
            id: '1',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '01234234178',
            role: 'Chủ sự kiện',
            createdAt: '2024-10-01T00:00:00.000Z',
            status: 'Active',
        },
        {
            id: '2',
            name: 'Nguyễn Thành Long',
            email: 'nguyentlong@gmail.com',
            phone: '0938167243',
            role: 'Quản lý',
            createdAt: '2025-10-01T00:00:00.000Z',
            status: 'Deactivated',
        },
        {
            id: '3',
            name: 'Hồ Văn Nam',
            email: 'hovannam@gmail.com',
            phone: '1357122318',
            role: 'Khách hàng',
            createdAt: '2024-10-25T00:00:00.000Z',
            status: 'Active',
        },
    ];

    const [users, setUsers] = useState<User[]>(data);
    const router = useRouter();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);
    const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null);

    const handleSort = (key: keyof User) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' }; // Mặc định là asc
            }
        });
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const sortedUsers = sortUsers(users, sortConfig);
    
    const paginatedData = sortedUsers.slice(startItem - 1, endItem);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleStatusClick = (user: User) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const handleConfirmStatusChange = () => {
        if (!selectedUser) return;

        setUsers(prev =>
            prev.map(user =>
                user.id === selectedUser.id
                    ? {...user, status: user.status === 'Active' ? 'Deactivated' : 'Active'}
                    : user)
        );

        setIsDialogOpen(false);
    };

    return (
        <>
            <div className="overflow-x-auto rounded-xl shadow-md mt-6">
                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="bg-[#0C4762] text-white text-sm text-left rounded-t-lg">
                            <th className="px-4 py-3 text-center">STT</th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('name')}>
                                Họ và tên <SortIcon field="name" sortConfig={sortConfig} />
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('email')}>
                                Email <SortIcon field="email" sortConfig={sortConfig} />
                            </th>
                            <th className="px-4 py-3  cursor-pointer" onClick={() => handleSort('role')}>
                                Vai trò <SortIcon field="role" sortConfig={sortConfig} />
                            </th>
                            <th className="px-4 py-3  cursor-pointer text-center" onClick={() => handleSort('createdAt')}>
                                Ngày tạo <SortIcon field="createdAt" sortConfig={sortConfig} />
                            </th>
                            <th className="px-4 py-3  cursor-pointer text-center" onClick={() => handleSort('status')}>
                                Trạng thái <SortIcon field="status" sortConfig={sortConfig} />
                            </th> 
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {paginatedData.map((user, index) => (
                            <tr key={user.id ?? index} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                                <td className="px-4 py-3 text-center border-r border-gray-200">{index + 1}</td>
                                <td className="px-4 py-3 border-r border-gray-200 cursor-pointer" 
                                    onClick={() => router.push(`/admin/account-management/${user.id}`)}>
                                    {user.name}
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">{user.email}</td>
                                <td className="px-4 py-3 border-r border-gray-200">{user.role}</td>
                        
                                <td className="px-4 py-3 text-center border-r border-gray-200">
                                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-4 py-3 text-center cursor-pointer">
                                    <span className={`min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border 
                                                    ${user.status === 'Active'
                                            ? 'bg-teal-100 text-teal-500 border-teal-500'
                                            : 'bg-gray-200 text-gray-500 border-gray-500'}`}
                                            onClick={() => handleStatusClick(user)}>
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

            {selectedUser && (
                <ConfirmActiveDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onConfirm={handleConfirmStatusChange}
                    currentStatus={selectedUser.status}
                />
            )}
        </>
    )
}