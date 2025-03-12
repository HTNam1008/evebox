"use client";
import React, { useState } from "react";

interface VoucherSettingsProps {
  voucherType: string;
}

export default function VoucherSettings({ voucherType }: VoucherSettingsProps) {
  const [discountType, setDiscountType] = useState("Theo số tiền");
  const [discountValue, setDiscountValue] = useState("");
  const [ticketLimit, setTicketLimit] = useState("");
  const [maxOrders, setMaxOrders] = useState("");
  const [minTickets, setMinTickets] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const [isUnlimited, setIsUnlimited] = useState(false);

  return (
    <div className="p-6 bg-[#E6F6F1] rounded-lg border border-[#BEE3DB] space-y-6 shadow-lg">
      <h2 className="text-lg font-semibold text-[#0C4762]">Thiết lập mã voucher</h2>
      
      {/* Hiển thị chung cho cả "single" và "multiple" */}
      <div>
        <label className="block font-semibold text-[#0C4762]">
          <span className="text-red-500">*</span> Loại khuyến mãi:
        </label>
        <div className="flex space-x-2">
          <select
            className="p-2 border rounded border-gray-300 text-sm w-1/2"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option>Theo số tiền</option>
            <option>Theo phần trăm</option>
          </select>
          <input
            className="p-2 border rounded border-gray-300 text-sm w-1/2"
            placeholder="Nhập mức giảm"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="block font-semibold text-[#0C4762]">
          <span className="text-red-500">*</span> Tổng số vé được áp dụng:
        </label>
        <div className="flex items-center space-x-2">
          <input type="radio" checked={!isUnlimited} onChange={() => setIsUnlimited(false)} />
          <span>Giới hạn</span>
          <input type="radio" checked={isUnlimited} onChange={() => setIsUnlimited(true)} />
          <span>Không giới hạn</span>
        </div>
        {!isUnlimited && (
          <input
            className="w-full p-2 border rounded border-gray-300 text-sm"
            placeholder="Nhập số lượng vé"
            value={ticketLimit}
            onChange={(e) => setTicketLimit(e.target.value)}
          />
        )}
        <p className="text-xs text-gray-500">Số vé được khuyến mãi của mỗi voucher</p>
      </div>
      
      {/* Chỉ hiển thị nếu voucherType là "single" */}
      {voucherType === "single" && (
        <>
          <div>
            <label className="block font-semibold text-[#0C4762]">
              <span className="text-red-500">*</span> Số đơn hàng tối đa/Người mua:
            </label>
            <input
              className="w-full p-2 border rounded border-gray-300 text-sm"
              placeholder="Nhập số đơn hàng tối đa"
              value={maxOrders}
              onChange={(e) => setMaxOrders(e.target.value)}
            />
            <p className="text-xs text-gray-500">Tổng số đơn hàng mà người mua có thể áp dụng voucher</p>
          </div>
          
          <div>
            <label className="block font-semibold text-[#0C4762]">
              <span className="text-red-500">*</span> Số lượng vé tối thiểu:
            </label>
            <input
              className="w-full p-2 border rounded border-gray-300 text-sm"
              placeholder="Nhập số lượng vé tối thiểu"
              value={minTickets}
              onChange={(e) => setMinTickets(e.target.value)}
            />
            <p className="text-xs text-gray-500">Số lượng vé tối thiểu trong đơn hàng để có thể áp dụng voucher</p>
          </div>
          
          <div>
            <label className="block font-semibold text-[#0C4762]">
              <span className="text-red-500">*</span> Số lượng vé tối đa:
            </label>
            <input
              className="w-full p-2 border rounded border-gray-300 text-sm"
              placeholder="Nhập số lượng vé tối đa"
              value={maxTickets}
              onChange={(e) => setMaxTickets(e.target.value)}
            />
            <p className="text-xs text-gray-500">Số lượng vé tối đa trong đơn hàng để có thể áp dụng voucher</p>
          </div>
        </>
      )}
    </div>
  );
}