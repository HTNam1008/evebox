"use client";

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import { Divider } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';

/* Package Application */
import Navigation from '../common/navigation';
import FormInfoPaymentClient from './components/formInfoPayment';
import { PaymentForm } from '../../libs/interface/paymentForm.interface';
import toast from 'react-hot-toast';
import createApiClient from '@/services/apiClient';
import { BaseApiResponse } from '@/types/BaseApiResponse';

export default function InformationPaymentClient() {
    const params = useParams();
    const eventId = parseInt(params?.id?.toString() || "");
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
    const [paymentForm, setPaymentForm] = useState<PaymentForm>({
        id: "",
        accName: "",
        accNum: "0",
        bankName: "",
        bankBranch: "",
        typeBusiness: "Cá nhân",
        perName: "",
        perAddress: "",
        taxCode: "",
        companyName: "",
        companyAddress: "",
        companyTaxCode: "",
    });
    const router = useRouter();
    const [step] = useState(5);
    const [btnValidate5, setBtnValidte5] = useState("");

    const processPaymentForm = async (paymentForm: PaymentForm, eventId?: number) => {
        try {
            console.log("Processing Payment Information:", paymentForm);
    
            const { id, accName, accNum, bankName, bankBranch, typeBusiness, perName, perAddress, taxCode, companyName, companyAddress, companyTaxCode } = paymentForm;
    
            // Validate required fields
            if (!accName || !accNum || !bankName || !bankBranch || !typeBusiness ) {
                toast.error("Vui lòng nhập đầy đủ thông tin tài khoản!");
                return null;
            }

            if (typeBusiness=="Cá nhân" && (!perName || !perAddress || !taxCode)) {
                toast.error("Vui lòng nhập đầy đủ thông tin tài khoản!");
                return null;
            }

            if (typeBusiness!="Cá nhân" && (!companyName || !companyAddress || !companyTaxCode)) {
                toast.error("Vui lòng nhập đầy đủ thông tin tài khoản!");
                return null;
            }

    
            // Prepare payload
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const payload: any = {
                accountName: accName,
                accountNumber: accNum,
                bankName,
                branch: bankBranch,
                businessType: typeBusiness === "Cá nhân" ? 1 : 2,
                fullName: typeBusiness === "Cá nhân" ? perName : companyName,
                address: typeBusiness === "Cá nhân" ? perAddress : companyAddress,
                taxCode: typeBusiness === "Cá nhân" ? taxCode : companyTaxCode,
            };
    
            let response;
            if (id) {
                // Update existing record via PUT request (exclude eventId)
                response = await apiClient.put<BaseApiResponse>(`/api/org/payment/${id}`, payload);
            } else {
                // Create a new record via POST request (include eventId)
                payload.eventId = eventId;
                response = await apiClient.post<BaseApiResponse>(`/api/org/payment`, payload);
            }
    
            if (response.data) {
                toast.success("Thông tin thanh toán đã được lưu thành công!");
                console.log("Response:", response.data);
                return response.data;
            } else {
                toast.error(`Lỗi khi lưu: ${response.statusText}`);
                return null;
            }
    
        } catch (error) {
            console.error("API Error:", error);
            toast.error("Có lỗi xảy ra khi lưu thông tin thanh toán!");
            return null;
        }
    };

    const handleSave = async () => {
        setBtnValidte5("Save");
        const result = await processPaymentForm(paymentForm, eventId);
        if (!result) {
            setBtnValidte5(""); // Reset button if there's an error
        }
    }

    const handleContinue = async () => {
        setBtnValidte5("Continue");
        const result = await processPaymentForm(paymentForm, eventId);
        if (!result) {
            setBtnValidte5(""); // Reset button if there's an error
        }
    }


    const handleNextStep = () => {
        router.push(`/organizer/events`);
    };


    return (
        <>
            <div className="flex flex-col items-center justify-center p-10 relative">
                <span className="text-3xl font-semibold mb-6">Thông tin thanh toán</span>
                <div className="w-full flex justify-center">
                    <ol className="flex space-x-6">
                        <Navigation step={step} />
                        <div className="flex gap-4 mt-4 mb-6">
                            <button className="text-xs w-18 border-2 border-[#0C4762] text-[#0C4762] font-bold py-2 px-4 rounded bg-white hover:bg-[#0C4762] hover:text-white transition-all"
                                type="submit" form="pay-form" onClick={handleSave}
                            >
                                Lưu
                            </button>
                        </div>

                        <div className="flex gap-4 mt-4 mb-6">
                            <button className="text-xs w-30 border-2 border-[#51DACF] text-[#0C4762] font-bold py-2 px-4 rounded bg-[#51DACF] hover:bg-[#0C4762] hover:border-[#0C4762] hover:text-white transition-all"
                                type="submit" form="pay-form" onClick={handleContinue}>
                                Tiếp tục
                            </button>
                        </div>
                    </ol>
                </div>

                <Divider />
            </div>

            <div className="flex justify-center">
                <FormInfoPaymentClient onNextStep={handleNextStep}  paymentForm={paymentForm} 
                   setPaymentForm={setPaymentForm}  btnValidate5={btnValidate5}/>
            </div>
        </>
    );
}
