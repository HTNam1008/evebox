"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { ChangeEvent } from 'react';

export default function AvatarUpload() {
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <div className="relative w-14 h-14">
            {/* Hiển thị ảnh đã chọn hoặc ảnh mặc định */}
            <img
                src={image || "/default-avatar.png"}
                alt="Avatar"
                className="w-full h-full rounded-full border border-gray-300"
            />
            {/* Input file (ẩn) */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="avatarUpload"
                onChange={handleImageChange}
            />
            {/* Nút camera */}
            <label
                htmlFor="avatarUpload"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow cursor-pointer"
            >
                <Camera size={16} className="text-gray-600" />
            </label>
        </div>
    );
}
