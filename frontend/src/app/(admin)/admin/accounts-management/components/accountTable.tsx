
import { User } from "../lib/interface/acctable.interface";

const data: User[] = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyentlong@gmail.com',
        role: 'Chủ sự kiện',
        createdAt: '01/10/2024',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Nguyễn Thành Long',
        email: 'nguyentlong@gmail.com',
        role: 'Quản lý',
        createdAt: '01/10/2024',
        status: 'Deactivated',
    },
    {
        id: 3,
        name: 'Hồ Văn Nam',
        email: 'nguyentlong@gmail.com',
        role: 'Customer',
        createdAt: '01/10/2024',
        status: 'Active',
    },
];

export default function AccountTable() {
    return (
        <div className="overflow-x-auto rounded-xl shadow-md mt-6">
            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-[#0C4762] text-white text-sm text-left rounded-t-lg">
                        <th className="px-4 py-3">STT</th>
                        <th className="px-4 py-3">Họ và tên</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Vai trò</th>
                        <th className="px-4 py-3">Ngày tạo</th>
                        <th className="px-4 py-3">Trạng thái</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {data.map((user, index) => (
                        <tr key={user.id} className="border-t border-gray-200">
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.role}</td>
                            <td className="px-4 py-3">{user.createdAt}</td>
                            <td className="px-4 py-3">
                                <span
                                    className={`px-4 py-1 rounded-full text-xs font-semibold border 
                                            ${user.status === 'Active'
                                            ? 'bg-white text-teal-700 border-teal-300'
                                            : 'bg-gray-100 text-gray-400 border-gray-200'
                                        }`}
                                >
                                    {user.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}