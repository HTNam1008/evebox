'use client'

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    id?: number;
}

export default function ConfirmDialog({ open, onClose, id }: ConfirmDialogProps) {
    const router = useRouter();

    const handleCancel = () => {
        onClose();
        router.push(`/event/${id}/booking/select-ticket`);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <div className="text-white dialog-header px-6 py-4 justify-center items-center flex relative" style={{ background: '#0C4762' }}>
                <DialogTitle className="!m-0 !p-0 text-lg text-center font-bold">Huỷ đơn hàng</DialogTitle>
                <button onClick={onClose} className="absolute right-2 top-2 px-1 py-1 close-btn">
                    <Icon icon="ic:baseline-close" width="20" height="20" />
                </button>
            </div>

            <DialogContent className="p-6 flex flex-col justify-center items-center">
                <Icon icon="material-symbols:warning" width="50" height="50"  color="#f59e0b"  />
                <p className="text-center">Bạn sẽ mất vị trí mình đã lựa chọn. Đơn hàng đang trong quá trinh thanh toán cũng sẽ bị ảnh hưởng. </p>
                <p className="text-center">Bạn có muốn tiếp tục?</p>
                <div className="flex gap-4 mt-4">
                    <button 
                        onClick={handleCancel} 
                        className="border-2 border-[#0C4762] text-[#0C4762] font-bold py-2 px-4 rounded bg-white hover:bg-[#0C4762] hover:text-white transition-all"
                    >
                        Hủy đơn
                    </button>
                    <button 
                        onClick={onClose} 
                        className="bg-[#0C4762] hover:bg-[#1d3945] text-white font-bold py-2 px-4 rounded transition-all"
                    >
                        Ở lại
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
}