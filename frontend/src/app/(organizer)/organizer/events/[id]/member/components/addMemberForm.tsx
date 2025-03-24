'use client';

import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface AddMemberFormProps {
    onClose: () => void;
}

export default function AddMemberForm({ onClose }: AddMemberFormProps) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [emailError, setEmailError] = useState('');
    const [roleError, setRoleError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSave = () => {
        let isValid = true;

        if (!email.trim()) {
            setEmailError('Vui lòng nhập email');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Email không hợp lệ');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!role) {
            setRoleError('Vui lòng chọn vai trò!');
            isValid = false;
        } else {
            setRoleError('');
        }

        if (!isValid) return;


    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[800px] max-h-[80vh] px-10 py-6 rounded-lg shadow-lg relative flex flex-col">
                {/* Nút đóng */}
                <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Tiêu đề cố định */}
                <div className="sticky top-0 bg-white pb-4">
                    <h2 className="text-2xl font-semibold text-[#0C4762] text-center">Thêm thành viên</h2>
                </div>

                {/* Nội dung cuộn được */}
                <div className="overflow-y-auto flex-1">
                    <div className="mt-4">
                        <label className="block font-medium">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            className={`w-full border rounded-md px-3 py-2 mt-1 outline-none ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium">Vai trò <span className="text-red-500">*</span></label>
                        <select
                            className={`w-full border rounded-md px-3 py-2 mt-1 outline-none ${roleError ? 'border-red-500' : 'border-gray-300'}`}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Thêm vai trò</option>
                            <option value="admin">Quản trị viên</option>
                            <option value="manager">Quản lý</option>
                            <option value="staff">Nhân viên</option>
                        </select>
                        {roleError && <p className="text-red-500 text-sm mt-1">{roleError}</p>}
                    </div>

                    <button className="mt-6 w-full bg-[#51DACF] text-[#0C4762] py-2 rounded-md hover:bg-[#3AB5A3]">
                        Lưu
                    </button>

                    {/* Bảng quyền */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-[#0C4762] text-white text-sm">
                                    <th className="p-2 border"></th>
                                    <th className="p-2 border">Chủ sự kiện</th>
                                    <th className="p-2 border">Quản trị viên</th>
                                    <th className="p-2 border">Quản lý</th>
                                    <th className="p-2 border">Nhân viên check-in</th>
                                    <th className="p-2 border">Nhân viên check-out</th>
                                    <th className="p-2 border">Nhân viên redeem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['Chỉnh sửa', 'Tổng kết', 'Voucher', 'Marketing', 'Đơn hàng', 'Seat map', 'Thành viên', 'Check in', 'Check out', 'Redeem'].map((perm, idx) => (
                                    <tr key={idx} className="text-center">
                                        <td className="border p-2 text-sm">{perm}</td>
                                        {[...Array(6)].map((_, i) => (
                                            <td key={i} className="border p-2">
                                                <div className="flex justify-center">
                                                    <CheckCircle className="text-[#48C3CD]" size={16} strokeWidth={1.5} />
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
