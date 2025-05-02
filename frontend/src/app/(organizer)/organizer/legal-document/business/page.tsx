
"use client";

import Sidebar from '../../components/sidebar';

import 'tailwindcss/tailwind.css';
import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function PdfViewerPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return isClient ? (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64 bg-gray-900 text-white">
                <Sidebar/>
            </div>
            <div className="flex-1">
                <h1 className=" text-2xl font-bold text-[#0C4762] ml-6 mt-6">Quản lý báo cáo</h1>
                <div className="border-t-2 border-[#0C4762] mt-2"></div>

                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
                    <div style={{ height: "100vh" }}>
                        <Viewer fileUrl="/pdf/example.pdf" plugins={[defaultLayoutPluginInstance]} />
                    </div>
                </Worker>
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
}
