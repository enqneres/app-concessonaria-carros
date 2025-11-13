"use client"

import { useState, useEffect } from "react"

export function useComparison() {
  const [comparison, setComparison] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("car-comparison")
    if (stored) {
      setComparison(JSON.parse(stored))
    }
  }, [])

  const addToComparison = (carId: string) => {
    if (comparison.length >= 3) {
      alert("Você pode comparar no máximo 3 carros")
      return
    }
    const newComparison = [...comparison, carId]
    setComparison(newComparison)
    localStorage.setItem("car-comparison", JSON.stringify(newComparison))
  }

  const removeFromComparison = (carId: string) => {
    const newComparison = comparison.filter((id) => id !== carId)
    setComparison(newComparison)
    localStorage.setItem("car-comparison", JSON.stringify(newComparison))
  }

  const clearComparison = () => {
    setComparison([])
    localStorage.removeItem("car-comparison")
  }

  const isInComparison = (carId: string) => comparison.includes(carId)

  return {
    comparison,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
  }
}
