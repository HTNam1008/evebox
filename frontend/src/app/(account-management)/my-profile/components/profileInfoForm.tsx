"use client";

/* Package System */

/* Package Application */
import AvatarUpload from "./avatarUpload";
import { ProfileInfoProps } from "../lib/interface/profile.interface";

export default function ProfileInfoForm({ form, handleChange }: ProfileInfoProps) {
    return (
        <div className="profile-page max-w-3xl mx-auto mb-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Quản lý thông tin tài khoản</h2>
                    <h5 className="text-sm text-gray-700">
                        Quản lý và cập nhật thông tin cá nhân cho tài khoản của bạn
                    </h5>
                </div>

                {/* Avatar Upload */}
                <AvatarUpload />
            </div>

            <hr className="my-6 border-gray-700" />

            {/* Form */}
            <div className="space-y-6">
                {/* Họ và tên */}
                <div>
                    <label className="block text-gray-700 font-medium">Họ và tên</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nhập họ và tên của bạn"
                            className="w-full border p-2 rounded-md mt-1 bg-gray-100 focus:bg-white"
                        />
                        {/* <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-400">
                                            <Pencil size={18} />
                                        </button> */}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium">Địa chỉ email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        disabled
                        className="w-full border p-2 rounded-md mt-1 bg-gray-200 text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* Ngày tháng năm sinh */}
                <div>
                    <label className="block text-gray-700 font-medium">Ngày tháng năm sinh</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md mt-1 bg-gray-100 focus:bg-white"
                        />
                    </div>
                </div>

                <div>
                    <button className="w-full bg-[#51DACF] text-[#0C4762] px-4 py-2 rounded-md mt-2 hover:bg-teal-300 transition">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    )
}