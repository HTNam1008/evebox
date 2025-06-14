'use client';

/* Package System */
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

/* Package Application */
import FormInput from './formInput';
import { User } from "../../lib/interface/acctable.interface";
import { ChevronDown } from "lucide-react";
import { UserRole, UserStatus } from '../../lib/enum/acctable.enum';
import useAvatar from '@/app/(account-management)/my-profile/libs/hooks/useAvatar';

export default function AccountDetailForm({ user }: { user: User }) {
    const roles = Object.values(UserRole);
    const status = Object.values(UserStatus);
    const { imageUrl } = useAvatar({ avatar_id: user.avatar_id });

    const [editedRole, setEditedRole] = useState(user.role)
    const [editedStatus, setEditedStatus] = useState(user.status)
    const [isDirty, setIsDirty] = useState(false)

    // Check nếu có thay đổi
    useEffect(() => {
        if (editedRole !== user.role || editedStatus !== user.status) {
            setIsDirty(true)
        } else {
            setIsDirty(false)
        }
    }, [editedRole, editedStatus, user])

    useEffect(() => {
        const handleWindowClose = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        const handleBeforeRouteChange = () => {
            if (isDirty && !confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời đi?')) {
                return false
            }
        }

        window.addEventListener('beforeunload', handleWindowClose)
        window.addEventListener('popstate', handleBeforeRouteChange)

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose)
            window.removeEventListener('popstate', handleBeforeRouteChange)
        }
    }, [isDirty])

    const handleSave = () => {
        setIsDirty(false)
        toast.success("Lưu thay đổi thành công!");
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-12 mt-10 mb-10">
            <div className="flex justify-center mb-8">
                <div className="relative w-24 h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={imageUrl}
                        alt="Avatar" 
                        className="object-cover rounded-full w-full h-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput label="Họ và tên" value={user.name} disabled type="text" />
                <FormInput label="Địa chỉ email" value={user.email} disabled type="email" />
                <FormInput label="Số điện thoại" value={user.phone} disabled type="phone" />
                <FormInput label="Ngày tạo tài khoản" value={new Date(user.createAt).toLocaleDateString('vi-VN')} disabled type="text" />

                <div>
                    <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                    <div className="relative">
                        <select className="appearance-none mt-1 w-full px-4 py-2 pr-10 border rounded-md"
                                value={editedRole} onChange={(e) => setEditedRole(e.target.value)}>
                            {roles.map((role) => (
                                 <option key={role}>{role}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-1">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Trạng thái tài khoản</label>
                    <div className="relative">
                        <select className="appearance-none mt-1 w-full px-4 py-2 pr-10 border rounded-md"
                                value={editedStatus} onChange={(e) => setEditedStatus(e.target.value as UserStatus)} >
                            {status.map(s => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 mt-1">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 mb-4 text-center">
                <button onClick={handleSave} className="bg-[#51DACF] text-[#0C4762] font-semibold px-6 py-2 rounded-md hover:text-white hover:bg-[#0C4762] transition w-60">
                    Lưu thay đổi
                </button>
            </div>
        </div>
    )
}