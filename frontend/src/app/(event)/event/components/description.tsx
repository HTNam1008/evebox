'use client';

import { useState } from "react";
import React from "react";

interface DescriptionProps {
    description: string;
}

export default function Description({ description }: DescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex justify-center mt-8 ml-2">
            <div className="w-full md:w-5/6">
                <h2 className="text-xl md:text-2xl font-bold px-2">Mô tả</h2>
                <div
                    className={`mt-2 overflow-hidden event-description transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-24'}`}
                    style={{ lineHeight: "1.6" }}
                >
                    <div
                        className="prose max-w-none px-2 text-gray-800"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>
                <div
                    className="d-flex justify-content-center div-more cursor-pointer mt-2"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <i className="bi bi-chevron-up"></i>
                    ) : (
                        <i className="bi bi-chevron-down"></i>
                    )}
                </div>
            </div>
        </div>
    );
}
