"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Language = "ar" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  ar: {
    "app.title": "محول العملات",
    "converter.amount": "المبلغ",
    "converter.from": "من",
    "converter.to": "إلى",
    "converter.convert": "تحويل",
    "converter.result": "النتيجة",
    "favorites.title": "المفضلة",
    "favorites.add": "إضافة إلى المفضلة",
    "favorites.remove": "إزالة من المفضلة",
    "favorites.empty": "لا توجد عملات مفضلة",
    "history.title": "السجل",
    "history.clear": "مسح السجل",
    "history.empty": "لا يوجد سجل للتحويلات",
    "settings.title": "الإعدادات",
    "settings.theme": "المظهر",
    "settings.language": "اللغة",
    "settings.theme.light": "فاتح",
    "settings.theme.dark": "داكن",
    "settings.theme.system": "النظام",
    "settings.language.ar": "العربية",
    "settings.language.en": "الإنجليزية",
    currencyConverter: "محول العملات",
    realTimeExchangeRates: "أسعار الصرف في الوقت الحقيقي",
    fromCurrency: "من العملة",
    toCurrency: "إلى العملة",
    amount: "المبلغ",
    swapCurrencies: "تبديل العملات",
    convert: "تحويل",
    converting: "جاري التحويل",
    addToFavorites: "إضافة إلى المفضلة",
    removeFromFavorites: "إزالة من المفضلة",
    exchangeRate: "سعر الصرف",
    lastUpdated: "آخر تحديث",
    inWords: "بالكلمات",
    dataSource: "مصدر البيانات",
    dataSourceInfo: "البيانات مقدمة من ExchangeRatesAPI",
    search: "بحث",
    noResults: "لا توجد نتائج",
  },
  en: {
    "app.title": "Currency Converter",
    "converter.amount": "Amount",
    "converter.from": "From",
    "converter.to": "To",
    "converter.convert": "Convert",
    "converter.result": "Result",
    "favorites.title": "Favorites",
    "favorites.add": "Add to Favorites",
    "favorites.remove": "Remove from Favorites",
    "favorites.empty": "No favorite currencies",
    "history.title": "History",
    "history.clear": "Clear History",
    "history.empty": "No conversion history",
    "settings.title": "Settings",
    "settings.theme": "Theme",
    "settings.language": "Language",
    "settings.theme.light": "Light",
    "settings.theme.dark": "Dark",
    "settings.theme.system": "System",
    "settings.language.ar": "Arabic",
    "settings.language.en": "English",
    currencyConverter: "Currency Converter",
    realTimeExchangeRates: "Real-time Exchange Rates",
    fromCurrency: "From Currency",
    toCurrency: "To Currency",
    amount: "Amount",
    swapCurrencies: "Swap Currencies",
    convert: "Convert",
    converting: "Converting",
    addToFavorites: "Add to Favorites",
    removeFromFavorites: "Remove from Favorites",
    exchangeRate: "Exchange Rate",
    lastUpdated: "Last Updated",
    inWords: "In Words",
    dataSource: "Data Source",
    dataSourceInfo: "Data provided by ExchangeRatesAPI",
    search: "Search",
    noResults: "No results",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ar",
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
