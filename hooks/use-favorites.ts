"use client"

import { useState, useEffect } from "react"

export interface Car {
  id: string
  marca: string
  modelo: string
  ano: number
  preco: number
  km: number
  combustivel: string
  cambio: string
  cor: string
  imagem: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("car-favorites")
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const addToFavorites = (carId: string) => {
    const newFavorites = [...favorites, carId]
    setFavorites(newFavorites)
    localStorage.setItem("car-favorites", JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (carId: string) => {
    const newFavorites = favorites.filter((id) => id !== carId)
    setFavorites(newFavorites)
    localStorage.setItem("car-favorites", JSON.stringify(newFavorites))
  }

  const toggleFavorite = (carId: string) => {
    if (favorites.includes(carId)) {
      removeFromFavorites(carId)
    } else {
      addToFavorites(carId)
    }
  }

  const isFavorite = (carId: string) => favorites.includes(carId)

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  }
}
