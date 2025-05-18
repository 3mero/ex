"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Clock, Trash } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useConversionHistory } from "@/hooks/use-conversion-history"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { ar, enUS } from "date-fns/locale"

export function HistoryList({ className }: { className?: string }) {
  const { t, language } = useLanguage()
  const { history, clearHistory } = useConversionHistory()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "PPpp", {
      locale: language === "ar" ? ar : enUS,
    }).replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632 + 48)) // تحويل الأرقام العربية إلى لاتينية
  }

  return (
    <Card className={`${className} custom-card shadow-lg`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          {t("history.title")}
        </CardTitle>
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            title={t("history.clear")}
            className="hover:bg-primary/20"
          >
            <Trash className="h-4 w-4 mr-2" />
            {t("history.clear")}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {history.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">{t("history.empty")}</div>
          ) : (
            <div className="space-y-4">
              {history.map((record) => (
                <div key={record.id} className="p-3 rounded-md border bg-card hover:bg-primary/5 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="font-medium">{record.fromCurrency}</div>
                      <ArrowLeftRight className="mx-2 h-4 w-4 text-muted-foreground" />
                      <div className="font-medium">{record.toCurrency}</div>
                    </div>
                    <div className="text-xs text-muted-foreground number">{formatDate(record.timestamp)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold number">{record.amount.toFixed(2)}</span>
                      <span className="text-sm ml-1">{record.fromCurrency}</span>
                    </div>
                    <div className="text-sm">=</div>
                    <div>
                      <span className="text-lg font-bold number">{record.result.toFixed(2)}</span>
                      <span className="text-sm ml-1">{record.toCurrency}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 text-with-numbers">
                    <span>{language === "ar" ? "سعر الصرف:" : "Rate:"}</span>{" "}
                    <span className="number">
                      1 {record.fromCurrency} = {record.rate.toFixed(4)} {record.toCurrency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
