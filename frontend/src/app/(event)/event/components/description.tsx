'use client';

import { useState } from "react";
import React from "react";
import { useTranslations } from "next-intl";


interface DescriptionProps {
    description: string;
}

const cleanDescriptionHTML = (html: string) => {
    return html.replace(/<img[^>]*>/g, "") // Remove all <img> tags
               .replace(/<\/?h3[^>]*>/g, ""); // Remove all <h3> tags
  };

export default function Description({ description }: DescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
     const t = useTranslations("common");

    return (
        <div className="flex justify-center mt-8 ml-2">
            <div className="w-full md:w-5/6">
                <h2 className="text-xl md:text-2xl font-bold">{t("desciption") || "Fallback Text"}</h2>
                <div 
                    className={`mt-2 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-24'}`}
                    style={{ lineHeight: "1.6" }} 
                >
                    <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: cleanDescriptionHTML(description) }}
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
