'use client'

/* Package System */
import { useState } from "react";
import { useRouter } from 'next/navigation';

/* Package Application */
import ConfirmActiveDialog from "@/app/(admin)/admin/account-management/components/dialog/confirmActive";
import { sortUsers } from "../lib/function/sortUsers";
import SortIcon from "./sortIcon";
import { User } from "@/types/model/admin/user";
import { UserStatus } from "../lib/enum/acctable.enum";
import AlertDialog from "@/app/(showing)/showing/components/alertDialog"; 
import { gatewayService } from "@/services/instance.service";

interface AccountTableProps {
    users: User[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    loading: boolean;
    searchKeyword: string;
    roleFilter: string;
    dateFrom: string;
    dateTo: string;
    onStatusUpdate: (updatedUsers: User[]) => void;
}

export default function AccountTable({
    users,
    totalItems,
    currentPage,
    pageSize,
    onPageChange,
    loading,
    searchKeyword,
    roleFilter,
    dateFrom,
    dateTo,
    onStatusUpdate
}: AccountTableProps) {
    const router = useRouter();
    const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(startItem + pageSize - 1, totalItems);

    const handleSort = (key: keyof User) => {
        setSortConfig((prev) => {
            if (prev?.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' };
            }
        });
    };

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const filteredUsers = users.filter(user => {
        const matchSearch = user.name?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchKeyword.toLowerCase())

        const matchRole = roleFilter ? user.role.role_name === roleFilter : true;

        const createdDate = new Date(user.created_at).toISOString().split('T')[0];
        const matchDateFrom = dateFrom ? createdDate >= dateFrom : true;
        const matchDateTo = dateTo ? createdDate <= dateTo : true;

        return matchSearch && matchRole && matchDateFrom && matchDateTo;
    });

    const sortedUsers = sortUsers(filteredUsers, sortConfig);

    const handleStatusClick = (user: User) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const handleConfirmStatusChange = async () => {
        if (!selectedUser) return;

        const newStatus = selectedUser.status === UserStatus.ACTIVE
            ? UserStatus.BLOCKED
            : UserStatus.ACTIVE;

        try {
            const response = await gatewayService.patch(`/api/admin/${selectedUser.userId}/status`,
                {status: newStatus}
            );

            if (response.status !== 200) {
                throw new Error('Cập nhật trạng thái thất bại');
            }

            // Update the local user state to reflect the change
            const updatedUsers = users.map(user =>
                user.userId === selectedUser.userId
                    ? { ...user, status: newStatus }
                    : user
            );

            onStatusUpdate(updatedUsers);

            setAlertMessage(`Đã ${newStatus === UserStatus.ACTIVE ? 'kích hoạt' : 'khóa'} tài khoản thành công`);
            setAlertOpen(true);
            
        } catch (error) {
            console.error('Error updating user status:', error);
            setAlertMessage('Không thể cập nhật trạng thái tài khoản. Vui lòng thử lại sau.');
            setAlertOpen(true);
        } finally {
            setIsDialogOpen(false);
        }
    };

    return (
        <>
            <div className="table-account-management overflow-x-auto rounded-xl shadow-md mt-6">
                {loading ? (
                    <div className="flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0C4762]"></div>
                        <span className="ml-2">Đang tải...</span>
                    </div>
                ) : (
                    <table className="min-w-full border border-gray-200">
                        <thead>
                            <tr className="bg-[#0C4762] text-white text-sm text-left rounded-t-lg">
                                <th className="px-4 py-3 text-center">STT</th>
                                <th className="px-4 py-3 cursor-pointer" /* onClick={() => handleSort('name')} */>
                                    Họ và tên <SortIcon field="name" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer">
                                    Email
                                </th>
                                <th className="px-4 py-3 cursor-pointer">
                                    Vai trò
                                </th>
                                <th className="px-4 py-3 cursor-pointer text-center" onClick={() => handleSort('created_at')}>
                                    Ngày tạo <SortIcon field="createdAt" sortConfig={sortConfig} />
                                </th>
                                <th className="px-4 py-3 cursor-pointer text-center" onClick={() => handleSort('status')}>
                                    Trạng thái <SortIcon field="status" sortConfig={sortConfig} />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {sortedUsers.length > 0 ? (
                                sortedUsers.map((user, index) => (
                                    <tr key={user.userId ?? index} className="border-t border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                                        <td className="px-4 py-3 text-center border-r border-gray-200">{(currentPage - 1) * pageSize + index + 1}</td>
                                        <td className="px-4 py-3 border-r border-gray-200 cursor-pointer"
                                            onClick={() => router.push(`/admin/account-management/${user.userId}`)}>
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200">{user.email}</td>
                                        <td className="px-4 py-3 border-r border-gray-200">{user.role.role_name}</td>

                                        <td className="px-4 py-3 text-center border-r border-gray-200">
                                            {new Date(user.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-4 py-3 text-center cursor-pointer">
                                            <span
                                                title={`Chuyển thành ${user.status === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE}`}
                                                className={`min-w-[100px] text-center inline-block px-4 py-1 rounded-full text-xs font-semibold border 
                                                        ${user.status === UserStatus.ACTIVE
                                                        ? 'bg-teal-100 text-teal-500 border-teal-500'
                                                        : 'bg-gray-200 text-gray-500 border-gray-500'}`}
                                                onClick={() => handleStatusClick(user)}>
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-4 text-gray-500">
                                        {users.length === 0 ? 'Không có dữ liệu người dùng' : 'Không có tài khoản nào khớp với từ khóa tìm kiếm'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>


            <div className="pagination-account-management flex items-center justify-between mt-4 px-2 text-sm text-gray-500">
                <p>Hiển thị {users.length > 0 ? `${startItem}-${endItem} của ${totalItems}` : '0-0 của 0'}</p>

                <div className="flex items-center space-x-2">
                    <div className="inline-flex items-center rounded-full border border-gray-300 overflow-hidden">
                        {/* Nút Previous */}
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1 || loading}
                            className={`w-8 h-8 flex items-center justify-center 
                        ${currentPage === 1 || loading ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                            aria-label="Previous page">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Page number indicator */}
                        <div className="px-3 py-1 flex items-center justify-center border-l border-r border-gray-300 bg-white">
                            <span className="font-medium text-gray-700">{currentPage}</span>
                            <span className="mx-1 text-gray-400">/</span>
                            <span className="text-gray-500">{totalPages || 1}</span>
                        </div>

                        {/* Nút Next */}
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages || loading}
                            className={`w-8 h-8 flex items-center justify-center 
                        ${currentPage === totalPages || loading ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800 hover:bg-gray-100'}`}
                            aria-label="Next page">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Optional: Jump to specific page */}
                    {totalPages > 3 && (
                        <div className="flex items-center">
                            <span className="mr-2">Đến trang:</span>
                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                value={currentPage}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value) && value >= 1 && value <= totalPages) {
                                        onPageChange(value);
                                    }
                                }}
                                className="w-12 h-8 px-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0C4762]"
                            />
                        </div>
                    )}
                </div>
            </div>
            
            {/* Confirmation dialog */}
            {selectedUser && (
                <ConfirmActiveDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onConfirm={handleConfirmStatusChange}
                    currentStatus={selectedUser.status}
                />
            )}
            
            {/* Alert dialog */}
            <AlertDialog
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                message={alertMessage}
            />
        </>
    );
}