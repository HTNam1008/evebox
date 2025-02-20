'use client'

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Icon } from "@iconify/react";

interface TimeOutDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function TimeOutDialog({ open, onClose }: TimeOutDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="text-white dialog-header px-6 py-4 justify-center items-center flex relative" style={{ background: '#0C4762' }}>
                <DialogTitle className="!m-0 !p-0 text-lg text-center font-bold">Hết thời gian giữ vé</DialogTitle>
                <button onClick={onClose} className="absolute right-2 top-2 px-1 py-1 close-btn">
                    <Icon icon="ic:baseline-close" width="20" height="20" />
                </button>
            </div>

            <DialogContent className="p-6 flex flex-col justify-center items-center">
                <Icon icon="twemoji:bell" width="50" height="50" />
                <p className="text-center">Đã hết thời gian giữ vé!</p>
                <p className="text-center">Bạn hãy vui lòng đặt vé mới</p>
                <button onClick={onClose} className="bg-[#0C4762] hover:bg-[#1d3945] text-white font-bold py-2 px-4 rounded mt-4">
                    Đặt vé mới
                </button>
            </DialogContent>
        </Dialog>
    );
}