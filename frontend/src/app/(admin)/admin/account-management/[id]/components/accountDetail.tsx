'use client'

/* Package System */
import Image from "next/image";

/* Package Application */
import FormInput from './formInput';
import { User } from "../../lib/interface/acctable.interface";
import { ChevronDown } from "lucide-react";

export default function AccountDetailForm({ user }: { user: User }) {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10 mb-10">
            <div className="flex justify-center mb-8">
                <div className="relative w-24 h-24">
                    <Image src="" alt="Avatar"
                        className="object-cover rounded-full" fill
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Họ và tên" value={user.name} disabled type="text" />
                <FormInput label="Địa chỉ email" value={user.email} disabled type="email" />
                <FormInput label="Số điện thoại" value={user.phone} disabled type="phone" />
                <FormInput label="Ngày tạo tài khoản" value={new Date(user.createdAt).toLocaleDateString('vi-VN')} disabled type="text" />

                <div>
                    <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                    <div className="relative">
                        <select value="role" className="appearance-none mt-1 w-full px-4 py-2 pr-10 border rounded-md">
                            <option>Khách hàng</option>
                            <option>Chủ sự kiện</option>
                            <option>Quản lý</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-1">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Trạng thái tài khoản</label>
                    <div className="relative">
                        <select value="status" className="appearance-none mt-1 w-full px-4 py-2 pr-10 border rounded-md">
                            <option>Đang hoạt động</option>
                            <option>Vô hiệu hóa</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-1">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center">
                <button className="bg-[#51DACF] text-[#0C4762] font-semibold px-6 py-2 rounded-md hover:text-white hover:bg-[#0C4762] transition">
                    Lưu thay đổi
                </button>
            </div>
        </div>
    )
}