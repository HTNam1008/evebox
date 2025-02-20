'use client'

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Icon } from "@iconify/react";

interface PaymentInfoDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function PaymentInfoDialog({ open, onClose }: PaymentInfoDialogProps) {
    return (
        <Dialog style={{ borderRadius: '20px' }} className="info-dialog" open={open} onClose={onClose}>
            <div className="text-white dialog-header px-6 py-4 justify-center items-center flex relative" style={{ background: '#0C4762' }}>
                <DialogTitle className="!m-0 !p-0 text-lg text-center font-bold">Cập nhật thông tin nhận vé</DialogTitle>
                <button onClick={onClose} className="absolute right-2 top-2 px-1 py-1 close-btn">
                    <Icon icon="ic:baseline-close" width="20" height="20" />
                </button>
            </div>

            <DialogContent className="p-6">
                <TextField margin="dense" label="Tên người nhận" type="text" fullWidth defaultValue="Nguyễn Thanh Huệ" className="mb-4" />
                <div className="grid grid-cols-3 gap-4">
                    <FormControl fullWidth margin="dense">
                        <Select defaultValue="+84">
                            <MenuItem value="+84">+84</MenuItem>
                            <MenuItem value="+1">+1</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField margin="dense" label="Số điện thoại" type="text" fullWidth defaultValue="123390876" className="col-span-2" />
                </div>
                <TextField margin="dense" label="Email" type="email" fullWidth defaultValue="customer@gmail.com" className="mb-4" />
                <p>Địa chỉ nhận hàng (vui lòng cập nhật khi mua vé cứng)</p>
                <FormControl fullWidth margin="dense" className="mb-4">
                    <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                    <Select label="Tỉnh/Thành phố" labelId="province-label">
                        <MenuItem value="">Chọn Tỉnh/Thành phố</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense" className="mb-4">
                    <InputLabel id="district-label">Quận/Huyện</InputLabel>
                    <Select label="Quận/Huyện" labelId="district-label">
                        <MenuItem value="">Chọn Quận/Huyện</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense" className="mb-4">
                    <InputLabel id="ward-label">Phường/Xã</InputLabel>
                    <Select label="Phường/Xã" labelId="ward-label">
                        <MenuItem value="">Chọn Phường/Xã</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Địa chỉ"
                    type="text"
                    fullWidth
                    placeholder="Nhập địa chỉ"
                />
            </DialogContent>

            <DialogActions className="p-6 mt-6 mb-6 ml-7 mr-7 flex justify-between">
                <button onClick={onClose} style={{ border: '1px solid #0C4762' }} className="w-2/3 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded">
                    Hủy bỏ
                </button>
                <button className="w-2/3 text-white py-2 px-4 rounded bg-[#0C4762] hover:bg-[#1d3945]">
                    Xác nhận
                </button>
            </DialogActions>
        </Dialog>
    );
}