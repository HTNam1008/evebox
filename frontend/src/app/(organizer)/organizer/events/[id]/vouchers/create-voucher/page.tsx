// app/page.tsx
"use client";
import { useState } from "react";
import CardSelection from "./components/cardSelection";
import BasicInfo from "./components/basicInfo";
import VoucherSettings from "./components/voucherSetting";
import ApplyScope from "./components/applyScope";
import SidebarOrganizer from "../../components/sidebarOrganizer";
import { ArrowLeft } from "lucide-react";

export default function Home() {
    const [voucherType, setVoucherType] = useState("single");

    return (
        <main>
            <div className="flex min-h-screen bg-gray-100">
                <div className="w-64 bg-gray-900 text-white">
                    <SidebarOrganizer />
                </div>
                <div className="flex-1 p-6">
                    <div className="flex items-center gap-2">
                        <ArrowLeft size={20} className="cursor-pointer hover:text-teal-400 transition" />
                        <span className="text-lg font-bold text-[#0C4762]">Tạo voucher</span>
                    </div>
                    <div className="max-w-4xl mx-auto p-6 space-y-6">
                        <CardSelection voucherType={voucherType} setVoucherType={setVoucherType} />
                        <BasicInfo voucherType={voucherType} />
                        <VoucherSettings voucherType={voucherType} />
                        <ApplyScope />
                    </div>
                </div>
            </div>
        </main>
    );
}