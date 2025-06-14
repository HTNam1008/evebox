"use client";

import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { FormEvent } from 'react';

import '@/styles/admin/pages/ForgotPassword.css';

export const ChangePasswordForm = () => {
    const formRef = useRef<HTMLFormElement>(null); // Add a form reference
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [errorOld, setErrorOld] = useState('');
    const [errorNew, setErrorNew] = useState('');
    const [errorConfirm, setErrorConfirm] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        setErrorOld('');
        setErrorNew('');
        setErrorConfirm('');
        setErrorMessage('');
        setSuccessMessage('');

        const formData = new FormData(e.currentTarget);
        const oldPassword = formData.get("oldPassword") as string;
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        // Only check if passwords match
        let isValid = true;

        if (newPassword !== confirmPassword) {
            setErrorConfirm("Mật khẩu xác nhận không khớp.");
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await fetch('/api/user/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        oldPassword,
                        newPassword,
                        confirmPassword
                    }),
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    if (data.message.includes("old password")) {
                        setErrorOld(data.message);
                    } else {
                        setErrorMessage(data.message);
                    }
                } else {
                    setSuccessMessage("Đổi mật khẩu thành công!");
                    // Use the form reference instead of the event
                    if (formRef.current) {
                        formRef.current.reset();
                    }
                }
            } catch (error) {
                setErrorMessage("Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.");
                console.error("Change password error:", error);
            }
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Pane */}
            <div className="md:w-7/12 flex flex-col justify-center items-center px-6 py-10 left-pane relative">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-8">
                        <Image
                            src="/images/logo.png"
                            alt="EveBox Logo"
                            width={60}
                            height={60}
                            className="mb-4"
                        />
                        <h3 className="text-xl font-bold text-center">Đổi mật khẩu mới</h3>
                    </div>

                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
                        <div>
                            <label htmlFor="oldPassword" className="block font-semibold mb-1">Nhập mật khẩu cũ</label>
                            <div className="relative">
                                <input
                                    name="oldPassword"
                                    type={showOld ? "text" : "password"}
                                    id="oldPassword"
                                    placeholder="Nhập mật khẩu cũ"
                                    className={`w-full px-4 py-2 border ${errorOld ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-2">
                                    <Icon icon={showOld ? "ph:eye-light" : "ph:eye-closed-light"} width="20" color="#aaaaaa" />
                                </button>
                            </div>
                            {errorOld && <p className="text-red-500 text-sm mt-1">{errorOld}</p>}
                        </div>

                        <div>
                            <label htmlFor="new-password" className="block font-semibold mb-1">Nhập mật khẩu mới</label>
                            <div className="relative">
                                <input
                                    name="newPassword"
                                    type={showNew ? "text" : "password"}
                                    id="newPassword"
                                    placeholder="Nhập mật khẩu mới"
                                    className={`w-full px-4 py-2 border ${errorNew ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-2">
                                    <Icon icon={showNew ? "ph:eye-light" : "ph:eye-closed-light"} width="20" color="#aaaaaa" />
                                </button>
                            </div>
                            {errorNew && <p className="text-red-500 text-sm mt-1">{errorNew}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block font-semibold mb-1">Xác nhận mật khẩu mới</label>
                            <div className="relative">
                                <input
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    id="confirmPassword"
                                    placeholder="Xác nhận mật khẩu mới"
                                    className={`w-full px-4 py-2 border ${errorConfirm ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-2">
                                    <Icon icon={showConfirm ? "ph:eye-light" : "ph:eye-closed-light"} width="20" color="#aaaaaa" />
                                </button>
                            </div>
                            {errorConfirm && <p className="text-red-500 text-sm mt-1">{errorConfirm}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#0C4762] hover:bg-[#0C4762]-400 text-white font-semibold py-2 rounded-md transition duration-200 mt-6"
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Pane */}
            <div className="md:w-5/12 relative hidden md:block">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/background_login.png')" }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
        </div>
    );
};