"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Star, Trash } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useFavorites } from "@/hooks/use-favorites"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

export function FavoritesList({ className }: { className?: string }) {
  const { t } = useLanguage()
  const { favorites, removeFavorite } = useFavorites()
  const router = useRouter()

  const handleFavoritePairClick = (fromCurrency: string, toCurrency: string) => {
    // We'll use a URL with query parameters to set the currencies
    // This will reload the page with the selected currencies
    router.push(`/?from=${fromCurrency}&to=${toCurrency}`)
  }

  return (
    <Card className={`${className} custom-card shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
        <CardTitle className="flex items-center">
          <Star className="mr-2 h-5 w-5 text-yellow-400" />
          {t("favorites.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          {favorites.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">{t("favorites.empty")}</div>
          ) : (
            <div className="space-y-2">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-primary/10 cursor-pointer transition-colors"
                  onClick={() => handleFavoritePairClick(favorite.fromCurrency, favorite.toCurrency)}
                >
                  <div className="flex items-center">
                    <div className="font-medium">{favorite.fromCurrency}</div>
                    <ArrowLeftRight className="mx-2 h-4 w-4 text-muted-foreground" />
                    <div className="font-medium">{favorite.toCurrency}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent triggering the parent onClick
                      removeFavorite(favorite.id)
                    }}
                    title={t("favorites.remove")}
                    className="hover:bg-primary/20"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
