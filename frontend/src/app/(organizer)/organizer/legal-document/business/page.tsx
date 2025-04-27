
"use client";

/* Package Application */
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ArrowLeft } from "lucide-react"

/* Package System */
import Sidebar from '../../components/sidebar';

export default function PdfViewerPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    // const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);

        // Gọi API lấy đường dẫn file PDF hiện tại
        // fetch('/api/get-current-pdf')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setPdfUrl(data.url);
        //     });
    }, []);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const fileUrl = URL.createObjectURL(file);
    //         setPdfUrl(fileUrl);
    //     }
    // };

    return isClient ? (
        <div>
            <div className="flex items-center space-x-2">
                <ArrowLeft onClick={() => router.back()} size={30} className="text-[#0C4762] cursor-pointer hover:opacity-80 transition-opacity duration-200" />
                <h1 className=" text-2xl font-bold text-[#0C4762]">Danh mục hàng hóa, dịch vụ cấm kinh doanh</h1>
            </div>

            <div className="border-t-2 border-[#0C4762] mt-2 mb-6"></div>

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
                <div style={{ height: "100vh" }}>
                    <Viewer fileUrl="/pdf/example.pdf" plugins={[defaultLayoutPluginInstance]} />
                </div>
            </Worker>
        </div>
    ) : (
        <p>Loading...</p>
    );
}
