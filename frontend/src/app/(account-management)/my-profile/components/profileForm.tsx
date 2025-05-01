"use client"

import type React from "react"
import { useState } from "react"

import AvatarUpload from "./avatarUpload"
import OrganizerRegistrationPopup from "./orgRegisterPopup"

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "Van A",
    email: "nguyenvana@gmail.com",
    dob: "2003-05-14",
  })

  const [showPopup, setShowPopup] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleRegistrationSuccess = () => {
    setShowPopup(false)
    setIsRegistered(true)
  }

  return (
    <>
      <div className="flex justify-between items-start mt-8 mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Quản lý thông tin tài khoản</h2>
          <h5 className="text-sm text-gray-700">Quản lý và cập nhật thông tin cá nhân cho tài khoản của bạn</h5>
        </div>

        {/* Avatar + Button (centered vertically) */}
        <div className="flex flex-col items-center">
          <AvatarUpload />
          <button
            onClick={togglePopup}
            className="mt-2 border border-[#0C4762] text-[#0C4762] px-3 py-1 rounded-md hover:bg-gray-100 transition text-sm"
          >
            {isRegistered ? "Chỉnh sửa thông tin Nhà tổ chức" : "Đăng ký trở thành nhà Tổ chức"}
          </button>
        </div>
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

      {/* Popup */}
      {showPopup && <OrganizerRegistrationPopup onClose={togglePopup} onSuccess={handleRegistrationSuccess} />}
    </>
  )
}
