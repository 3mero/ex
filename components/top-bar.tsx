"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function TopBar() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-lg">{t("app.title")}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{language === "ar" ? "English" : "العربية"}</span>
        </Button>
      </div>
    </div>
  )
}
