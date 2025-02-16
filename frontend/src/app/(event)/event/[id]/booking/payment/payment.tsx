'use client'

/* Package System */
import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";

/* Package Application */
import '@/../public/styles/events/payment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Payment() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
    const [isTimeOutOpen, setIsTimeOutOpen] = useState(false);
    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (isQRDialogOpen) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        return 59;
                    }
                    return prevSeconds - 1;
                });
    
                setMinutes((prevMinutes) => {
                    return (prevMinutes > 0 && seconds === 0) ? prevMinutes - 1 : prevMinutes;
                });
    
                if (minutes === 0 && seconds === 0) {
                    clearInterval(timer);
                    setIsQRDialogOpen(false);
                }
            }, 1000);
    
            return () => clearInterval(timer);
        }
    }, [isQRDialogOpen, minutes, seconds]);    

    const handleOpenInfoDialog = () => {
        setIsDialogOpen(true);
    };

    const handleOpenQRDialog = () => {
        setIsQRDialogOpen(true);
    };

    const handleOpenTimeOutDialog = () => {
        setIsTimeOutOpen(true);
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Điền thông tin</h1>

            <div className="flex space-x-4">
                <button
                    onClick={handleOpenInfoDialog}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Thông tin nhận vé
                </button>

                <button
                    onClick={handleOpenQRDialog}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Quét QR
                </button>

                <button
                    onClick={handleOpenTimeOutDialog}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Thời gian hết
                </button>
            </div>

            {/* Update information */}
            <Dialog style={{ borderRadius: '20px' }} className="info-dialog" open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <div
                    style={{
                        background: '#0C4762',
                    }}
                    className="text-white dialog-header px-6 py-4 justify-center items-center flex relative"
                >
                    <DialogTitle className="!m-0 !p-0 text-lg text-center font-bold">
                        Cập nhật thông tin nhận vé
                    </DialogTitle>
                    <button
                        onClick={() => setIsDialogOpen(false)}
                        className="absolute right-2 top-2 px-1 py-1 close-btn"
                    >
                        <Icon icon="ic:baseline-close" width="20" height="20" />
                    </button>
                </div>

                <DialogContent className="p-6">
                    <TextField
                        margin="dense"
                        label="Tên người nhận"
                        type="text"
                        fullWidth
                        defaultValue="Nguyễn Thanh Huệ"
                        className="mb-4"
                    />
                    <div className="grid grid-cols-3 gap-4">
                        <FormControl fullWidth margin="dense">
                            <Select defaultValue="+84">
                                <MenuItem value="+84">+84</MenuItem>
                                <MenuItem value="+1">+1</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            label="Số điện thoại"
                            type="text"
                            fullWidth
                            defaultValue="123390876"
                            className="col-span-2"
                        />
                    </div>
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        defaultValue="customer@gmail.com"
                        className="mb-4"
                    />
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
                    <button
                        onClick={() => setIsDialogOpen(false)}
                        style={{ border: '1px solid #0C4762' }}
                        className="w-2/3 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        className="w-2/3 text-white py-2 px-4 rounded bg-[#0C4762] hover:bg-[#1d3945]"
                    >
                        Xác nhận
                    </button>
                </DialogActions>
            </Dialog>

            <Dialog style={{ borderRadius: '20px' }} open={isTimeOutOpen} onClose={() => setIsTimeOutOpen(false)}>
                <div 
                    className="text-white dialog-header px-6 py-4 justify-center items-center flex relative"
                    style={{
                        background: '#0C4762',
                    }}
                >
                    <DialogTitle className="!m-0 !p-0 text-lg text-center font-bold">
                        Hết thời gian giữ vé
                    </DialogTitle>
                    <button
                        onClick={() => setIsTimeOutOpen(false)}
                        className="absolute right-2 top-2 px-1 py-1 close-btn"
                    >
                        <Icon icon="ic:baseline-close" width="20" height="20" />
                    </button>
                </div>

                <DialogContent className="p-6">
                    <div className="flex justify-center items-center flex-col">
                        <Icon icon="twemoji:bell" width="50" height="50" />
                        <p className="text-center">Đã hết thời gian giữ vé!</p>
                        <p className="text-center">Bạn hãy vui lòng đặt vé mới</p>
                        {/* */}
                        <button
                            onClick={() => setIsTimeOutOpen(false)}
                            className="bg-[#0C4762] hover:bg-[#1d3945] text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Đặt vé mới
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* <Image src="/images/shopee-pay.png" alt="ShopeePay" width="100" height="100" /> */}
            {/* <Image src="/images/sample-qr.png" alt="QR Code" width="200" height="200" /> */}

            <Dialog open={isQRDialogOpen} onClose={() => setIsQRDialogOpen(false)} maxWidth="md">
                <div className="bg-white rounded-lg p-4">
                    <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
                        <div className="d-flex align-items-center">
                            <Image src="/images/shopee-pay.png" alt="ShopeePay" width="100" height="100" />
                            <span className="fw-bold text-lg">ShopeePay Wallet</span>
                        </div>
                        <button className="text-teal-500 border-0 bg-transparent fw-bold">
                            Đổi phương thức khác
                        </button>
                    </div>

                    <div className="px-5 py-4">
                        <h3 className="text-center fw-bold mb-4">Quét mã QR để thanh toán</h3>

                        <div className="d-flex justify-content-center align-items-start">
                            <div className="bg-teal-100 p-3 rounded">
                                <Image src="/images/sample-qr.png" alt="QR Code" width="200" height="200" />
                                <div className="d-flex justify-content-between fw-bold px-2 mt-2">
                                    <span>Tổng tiền</span>
                                    <span>1.198.000đ</span>
                                </div>
                            </div>

                            <div className="ms-4">
                                <ol className="list-unstyled">
                                    {["Mở ứng dụng ShopeePay trên điện thoại của bạn", "Chọn icon Scan & Pay trên ứng dụng ShopeePay", "Quét mã QR", "Áp dụng mã khuyến mãi ShopeePay (nếu có) và hoàn tất thanh toán"].map((text, index) => (
                                        <li key={index} className="d-flex align-items-center mb-2">
                                            <div className="rounded-circle bg-teal-500 text-white d-flex align-items-center justify-content-center me-2" style={{ width: "24px", height: "24px" }}>
                                                {index + 1}
                                            </div>
                                            <span className="fw-bold">{text}</span>
                                        </li>
                                    ))}
                                </ol>

                                <div className="bg-teal-100 p-2 rounded d-flex justify-content-center align-items-center mt-3">
                                    <span className="fw-bold">Giao dịch sẽ kết thúc sau</span>
                                    <span className="bg-teal-500 text-white px-2 mx-1 rounded">{minutes}</span>
                                    <span>:</span>
                                    <span className="bg-teal-500 text-white px-2 mx-1 rounded">{seconds < 10 ? `0${seconds}` : seconds}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}