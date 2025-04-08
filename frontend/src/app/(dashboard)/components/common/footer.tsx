"use client"

import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("common");
    return (
      <footer className="w-[100vw] bg-sky-900 text-white py-8 sm:py-12 relative left-[calc(-50vw+50%)]">
        {/* Newsletter Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">EveBox</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-2 px-4">
            <input 
              type="email" 
              placeholder={t("emailHint")}
              className="flex-1 px-4 py-2 rounded-md text-gray-800 w-full sm:w-auto"
            />
            <button className="bg-teal-200 text-teal-950 px-4 sm:px-6 py-2 rounded-md hover:bg-teal-100 whitespace-nowrap w-full sm:w-auto">
              {t("newsBtn")}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
          <a href="#" className="no-underline	text-white over:text-teal-200"> {t("homepageTitle")}</a>
          <a href="#" className="no-underline	text-white hover:text-teal-200">{t("introTitle")}</a>
          <a href="#" className="no-underline	text-white hover:text-teal-200">{t("serviceTitle")}</a>
          <a href="#" className="no-underline	text-white hover:text-teal-200">{t("contactTitle")}</a>
          <a href="#" className="no-underline	text-white hover:text-teal-200">{t("qaTitle")}</a>
        </div>

        {/* Divider and Bottom Section */}
        <div className="border-t-2 border-slate-400">
          <div className="max-w-6xl mx-auto px-4 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-6">
                <a href="#" className="no-underline	text-white hover:text-teal-200">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="no-underline	text-white hover:text-teal-200">
                  <Instagram size={20} />
                </a>
                <a href="#" className="no-underline	text-white hover:text-teal-200">
                  <Facebook size={20} />
                </a>
              </div>
              <div className="text-xs sm:text-sm">
                Non Copyrighted © 2024 Upload by EveBox
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;