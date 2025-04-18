"use client";

import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import '@/styles/admin/pages/ForgotPassword.css';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorOld, setErrorOld] = useState('');
  const [errorNew, setErrorNew] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');

  const fakeCurrentPassword = "123456@Abc"; // Giả lập mật khẩu hiện tại

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let isValid = true;

    setErrorOld('');
    setErrorNew('');
    setErrorConfirm('');

    if (oldPassword !== fakeCurrentPassword) {
      setErrorOld("Mật khẩu cũ không đúng.");
      isValid = false;
    }

    if (!validatePassword(newPassword)) {
      setErrorNew("Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, số và ký tự đặc biệt.");
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      setErrorConfirm("Mật khẩu xác nhận không khớp.");
      isValid = false;
    }

    if (isValid) {
      console.log("Gửi yêu cầu đổi mật khẩu...");
      // Gửi API đổi mật khẩu ở đây
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="old-password" className="block font-semibold mb-1">Nhập mật khẩu cũ</label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  id="old-password"
                  placeholder="Nhập mật khẩu cũ"
                  className={`w-full px-4 py-2 border ${errorOld ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
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
                  type={showNew ? "text" : "password"}
                  id="new-password"
                  placeholder="Nhập mật khẩu mới"
                  className={`w-full px-4 py-2 border ${errorNew ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-2">
                  <Icon icon={showNew ? "ph:eye-light" : "ph:eye-closed-light"} width="20" color="#aaaaaa"/>
                </button>
              </div>
              {errorNew && <p className="text-red-500 text-sm mt-1">{errorNew}</p>}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block font-semibold mb-1">Xác nhận mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Xác nhận mật khẩu mới"
                  className={`w-full px-4 py-2 border ${errorConfirm ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
