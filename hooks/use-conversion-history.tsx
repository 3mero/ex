"use client"

import { useState, useEffect } from "react"

export interface ConversionRecord {
  id: string
  fromCurrency: string
  toCurrency: string
  amount: number
  result: number
  rate: number
  timestamp: string
}

export function useConversionHistory() {
  const [history, setHistory] = useState<ConversionRecord[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error("Failed to parse history from localStorage", error)
        setHistory([])
      }
    }
  }, [])

  const saveHistory = (newHistory: ConversionRecord[]) => {
    localStorage.setItem("conversionHistory", JSON.stringify(newHistory))
    setHistory(newHistory)
  }

  const addToHistory = (record: ConversionRecord) => {
    // Keep only the last 7 records instead of 10
    const updatedHistory = [record, ...history].slice(0, 7)
    saveHistory(updatedHistory)
  }

  const clearHistory = () => {
    saveHistory([])
  }

  return {
    history,
    addToHistory,
    clearHistory,
  }
}
