'use client'

import React from 'react';

export default function GlobalLoading({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center text-sm font-medium">
        <div className="animate-pulse">⏳ Đang xử lý yêu cầu...</div>
      </div>
    </div>
  );
}
