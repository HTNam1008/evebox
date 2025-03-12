"use client";

const TicketTable = () => {
  return (
    <table className="w-full border border-gray-300 shadow-lg">
      <thead>
        <tr className="bg-[#0C4762] text-white">
          <th className="border px-4 py-2 text-left">Loại vé</th>
          <th className="border px-4 py-2 text-left">Giá bán</th>
          <th className="border px-4 py-2 text-left">Đã bán</th>
          <th className="border px-4 py-2 text-left">Bị khoá</th>
          <th className="border px-4 py-2 text-left">Tỉ lệ bán</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Free</td>
          <td className="border px-4 py-2">100.000đ</td>
          <td className="border px-4 py-2">500</td>
          <td className="border px-4 py-2">3</td>
          <td className="border px-4 py-2">
            <div className="w-full bg-gray-200 h-2 rounded-lg">
              <div className="bg-[#56C7CE] h-2 rounded-lg" style={{ width: "50%" }}></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TicketTable;
