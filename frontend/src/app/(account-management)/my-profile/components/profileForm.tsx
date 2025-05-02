"use client";

import { useState, useEffect } from "react";

import AvatarUpload from "./avatarUpload";
import useProfile from "../libs/hooks/useProfile";
import AlertDialog from "@/app/(showing)/showing/components/alertDialog";
import { ProfileFormProps } from "../libs/interface/profile.interface";

export default function ProfileForm({ initialProfile }: ProfileFormProps) {
    const { updateProfile } = useProfile();
    const [form, setForm] = useState(initialProfile);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    /* useEffect(() => {
        if (profile) {
            setForm({
                name: profile.name || "",
                email: profile.email || "",
                phone: profile.phone || ""
            });
        }
    }, [profile]); */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await updateProfile({
                name: form.name,
                phone: form.phone
            });

            if (result.success) {
                setDialogMessage('Cập nhật thông tin thành công');
            } else {
                setDialogMessage('Cập nhật thông tin thất bại');
            }
            setDialogOpen(true);
        } catch (error) {
            setDialogMessage('Cập nhật thông tin thất bại');
            setDialogOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <AlertDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                message={dialogMessage}
            />
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Quản lý thông tin tài khoản</h2>
                    <h5 className="text-sm text-gray-700">
                        Quản lý và cập nhật thông tin cá nhân cho tài khoản của bạn
                    </h5>
                </div>
                <AvatarUpload initAvatarId = {form.avatar_id}/>
            </div>

            <hr className="my-6 border-gray-700" />

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
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
                        </div>
                    </div>

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

                    <div>
                        <label className="block text-gray-700 font-medium">Số điện thoại</label>
                        <div className="relative">
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại của bạn"
                                className="w-full border p-2 rounded-md mt-1 bg-gray-100 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#51DACF] text-[#0C4762] px-4 py-2 rounded-md mt-2 hover:bg-teal-300 transition disabled:opacity-50"
                        >
                            {isSubmitting ? 'Đang xử lý...' : 'Lưu'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}