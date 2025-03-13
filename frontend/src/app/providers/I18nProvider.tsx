"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { NextIntlClientProvider } from "next-intl";

interface I18nContextProps {
  locale: string;
  changeLanguage: (lang: string) => void;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

// Define a type for the messages
interface Messages {
  [key: string]: string | Messages; // Allows nested translations
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>(() => {
    return typeof window !== "undefined" ? localStorage.getItem("locale") || "en" : "en";
  });

  const [messages, setMessages] = useState<Messages | null>(null); // Use `Messages` type

  useEffect(() => {
    async function loadMessages() {
      try {
        const translations = await import(`../../../public/locales/${locale}/common.json`);
        console.log("Loaded translations:", translations.default); // Debugging
        setMessages({ common: translations.default });
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    }
    loadMessages();
  }, [locale]);

  const changeLanguage = (lang: string) => {
    setLocale(lang);
    localStorage.setItem("locale", lang);
  };

  if (!messages) return <p></p>;

  return (
    <I18nContext.Provider value={{ locale, changeLanguage }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </I18nContext.Provider>
  );
}
