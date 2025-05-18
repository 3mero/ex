"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function SettingsPanel({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  return (
    <Card className={`${className} custom-card shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          {t("settings.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t("settings.theme")}</h3>
          <RadioGroup
            defaultValue={theme}
            onValueChange={(value) => setTheme(value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="light" id="theme-light" />
              <Label htmlFor="theme-light" className="flex items-center">
                <Sun className="h-4 w-4 mr-2" />
                {t("settings.theme.light")}
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label htmlFor="theme-dark" className="flex items-center">
                <Moon className="h-4 w-4 mr-2" />
                {t("settings.theme.dark")}
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="system" id="theme-system" />
              <Label htmlFor="theme-system">{t("settings.theme.system")}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">{t("settings.language")}</h3>
          <RadioGroup
            defaultValue={language}
            onValueChange={(value) => setLanguage(value as "ar" | "en")}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="ar" id="lang-ar" />
              <Label htmlFor="lang-ar" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {t("settings.language.ar")}
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="en" id="lang-en" />
              <Label htmlFor="lang-en" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {t("settings.language.en")}
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
