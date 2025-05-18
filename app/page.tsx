"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CurrencyConverter } from "@/components/currency-converter"
import { FavoritesList } from "@/components/favorites-list"
import { HistoryList } from "@/components/history-list"
import { TopBar } from "@/components/top-bar"

export default function Home() {
  const searchParams = useSearchParams()
  const [fromCurrency, setFromCurrency] = useState<string | null>(null)
  const [toCurrency, setToCurrency] = useState<string | null>(null)

  useEffect(() => {
    const from = searchParams.get("from")
    const to = searchParams.get("to")

    if (from) setFromCurrency(from)
    if (to) setToCurrency(to)
  }, [searchParams])

  return (
    <>
      <TopBar />
      <main className="container mx-auto p-4 max-w-4xl pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <CurrencyConverter initialFrom={fromCurrency} initialTo={toCurrency} />
          </div>
          <div className="space-y-6">
            <FavoritesList />
            <HistoryList className="mt-6" />
          </div>
        </div>
      </main>
    </>
  )
}
