export default function ShowingTableSkeleton() {
  return (
    <div className="animate-pulse overflow-x-auto rounded-xl shadow-md mt-6">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-[#0C4762] text-center text-white text-xs rounded-t-lg">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Tên sự kiện</th>
            <th className="px-4 py-3">Ngày-giờ bắt đầu</th>
            <th className="px-4 py-3">Ngày-giờ kết thúc</th>
            <th className="px-4 py-3">Seat map</th>
            <th className="px-4 py-3">Số loại vé</th>
            <th className="px-4 py-3">Thao tác</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-t border-gray-200">
              {Array(7).fill(0).map((_, j) => (
                <td key={j} className="px-4 py-3 border-r border-gray-200">
                  <div className="h-4 bg-gray-300 rounded w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}