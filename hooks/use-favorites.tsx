"use client"

import { useState, useEffect } from "react"

export interface FavoritePair {
  id: string
  fromCurrency: string
  toCurrency: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePair[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error)
        setFavorites([])
      }
    }
  }, [])

  const saveFavorites = (newFavorites: FavoritePair[]) => {
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setFavorites(newFavorites)
  }

  const addFavorite = (pair: FavoritePair) => {
    if (!isFavorite(pair.id)) {
      const newFavorites = [...favorites, pair]
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      setFavorites(newFavorites)

      // إضافة تأكيد بصري للحفظ (اختياري)
      if (typeof window !== "undefined") {
        const event = new CustomEvent("favoriteSaved", { detail: pair })
        window.dispatchEvent(event)
      }
    }
  }

  const removeFavorite = (id: string) => {
    saveFavorites(favorites.filter((favorite) => favorite.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some((favorite) => favorite.id === id)
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
