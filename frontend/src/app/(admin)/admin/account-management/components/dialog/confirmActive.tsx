'use client'

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Icon } from "@iconify/react";
import { ConfirmActiveProps } from "../../lib/interface/acctable.interface";
import { UserStatus } from "../../lib/enum/acctable.enum";
export default function ConfirmActiveDialog({ open, onClose, onConfirm, currentStatus }: ConfirmActiveProps) {
    const nextStatus = currentStatus === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE;

    return (
        <Dialog open={open} onClose={onClose}>
            <div className="text-white dialog-header px-6 py-4 justify-center items-center flex relative" style={{ background: '#0C4762' }}>
                <DialogTitle className="!m-0 !p-0 text-lg text-center font-bold">
                    {nextStatus === UserStatus.ACTIVE ? "Kích hoạt tài khoản" : "Vô hiệu hóa tài khoản"}
                </DialogTitle>
                <button onClick={onClose} className="absolute right-2 top-2 px-1 py-1 close-btn">
                    <Icon icon="ic:baseline-close" width="20" height="20" />
                </button>
            </div>

            <DialogContent className="p-6 flex flex-col justify-center items-center">
                <Icon icon="material-symbols:warning" width="50" height="50" color="#f59e0b" className="relative z-50" />

                <div className="content mx-4 mt-2 mb-4 text-center">
                    <p>Bạn có chắc chắn muốn <strong>{nextStatus === UserStatus.ACTIVE ? "kích hoạt tài khoản" : "vô hiệu hóa tài khoản"}</strong> này không?</p> 
                    <p>{nextStatus === UserStatus.ACTIVE ? "Người dùng sẽ có thể sử dụng lại hệ thống." : "Người dùng sẽ không thể đăng nhập hoặc sử dụng hệ thống sau khi bị vô hiệu hóa."}</p>
                </div>

                <div className="flex gap-4 mt-4 mb-4">
                    <button className="cancel-btn w-32 border-2 border-gray-500 text-gray-500 font-bold py-2 px-4 rounded bg-white hover:bg-gray-500 hover:text-white transition-all"
                        onClick={onClose}>
                        Hủy
                    </button>

                    <button className="confirm-btn w-32 border-2 border-[#0C4762] text-[#0C4762] font-bold py-2 px-4 rounded bg-white hover:bg-[#0C4762] hover:text-white transition-all"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}>
                        Xác nhận
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}