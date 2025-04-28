
"use client";

/* Package Application */
import 'tailwindcss/tailwind.css';
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ArrowLeft } from "lucide-react"

export default function PdfViewerPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [originName, setOriginName] = useState<string | null>("");

    useEffect(() => {
        setIsClient(true);

        // Gọi API lấy đường dẫn file PDF hiện tại
        setPdfUrl("https://raw.githubusercontent.com/huethanh-2805/term-evebox/main/Phuong_thuc_thanh_toan.pdf")
    }, []);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Nút thay đổi content -> call api để upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Tạo URL cho file PDF mới
            const fileUrl = URL.createObjectURL(file);
            setPdfUrl(fileUrl);

            setOriginName(file.name);
            const maxLength = 25;    // Giới hạn tên file hiển thị (giới hạn 30 ký tự)
            const truncatedFileName = file.name.length > maxLength ? `${file.name.substring(0, maxLength)}...` : file.name;
            setFileName(truncatedFileName); 
        }
    };

    return isClient ? (
        <div className="px-10">
            {/* Nút thay đổi content */}
            <div className="change-content-btn mb-6 mt-6">
                <label title={originName || "Chọn file PDF"} htmlFor="pdf-upload" className="bg-[#51DACF] text-[#0C4762] px-6 py-3 rounded-lg cursor-pointer hover:bg-[#085a73] hover:text-white transition-colors duration-200">
                    {fileName ? `Đã chọn file: ${fileName}` : "Chọn File PDF"}
                </label>
                <input className="hidden" id="pdf-upload" type="file" accept=".pdf" onChange={handleFileChange} />
            </div>

            {pdfUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
                    <div style={{ height: "100vh" }}>
                        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                    </div>
                </Worker>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    ) : (
        <p>Loading...</p>
    );
}
