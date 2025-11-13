"use client"

import { useState, useMemo } from "react"

export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  fuel: string
  transmission: string
  color: string
  doors: number
  engine: string
  image: string
  featured?: boolean
}

export interface SearchFilters {
  searchTerm: string
  brands: string[]
  priceRange: [number, number]
  yearRange: [number, number]
  fuelTypes: string[]
  transmission: string
  sortBy: string
}

const mockCars: Car[] = [
  {
    id: "1",
    brand: "Honda",
    model: "Civic",
    year: 2020,
    price: 89900,
    mileage: 45000,
    fuel: "Flex",
    transmission: "CVT",
    color: "Prata",
    doors: 4,
    engine: "1.5 Turbo",
    image: "/used-car-.jpg?height=200&width=300&query=Honda Civic 2020 silver",
    featured: true,
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    price: 95000,
    mileage: 32000,
    fuel: "Flex",
    transmission: "CVT",
    color: "Branco",
    doors: 4,
    engine: "2.0",
    image: "/used-car-.jpg?height=200&width=300&query=Toyota Corolla 2021 white",
  },
  {
    id: "3",
    brand: "Volkswagen",
    model: "Jetta",
    year: 2019,
    price: 75000,
    mileage: 58000,
    fuel: "Flex",
    transmission: "Automático",
    color: "Preto",
    doors: 4,
    engine: "1.4 TSI",
    image: "/used-car-.jpg?height=200&width=300&query=Volkswagen Jetta 2019 black",
  },
  {
    id: "4",
    brand: "Ford",
    model: "Focus",
    year: 2018,
    price: 65000,
    mileage: 72000,
    fuel: "Flex",
    transmission: "Manual",
    color: "Azul",
    doors: 4,
    engine: "2.0",
    image: "/used-car-.jpg?height=200&width=300&query=Ford Focus 2018 blue",
  },
  {
    id: "5",
    brand: "Chevrolet",
    model: "Cruze",
    year: 2020,
    price: 82000,
    mileage: 38000,
    fuel: "Flex",
    transmission: "Automático",
    color: "Vermelho",
    doors: 4,
    engine: "1.4 Turbo",
    image: "/used-car-.jpg?height=200&width=300&query=Chevrolet Cruze 2020 red",
    featured: true,
  },
  {
    id: "6",
    brand: "Hyundai",
    model: "Elantra",
    year: 2021,
    price: 88000,
    mileage: 28000,
    fuel: "Flex",
    transmission: "Automático",
    color: "Cinza",
    doors: 4,
    engine: "2.0",
    image: "/used-car-.jpg?height=200&width=300&query=Hyundai Elantra 2021 gray",
  },
  {
    id: "7",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 125000,
    mileage: 15000,
    fuel: "Híbrido",
    transmission: "CVT",
    color: "Branco",
    doors: 4,
    engine: "2.5 Híbrido",
    image: "/used-car-.jpg?height=200&width=300&query=Toyota Camry 2022 hybrid white",
    featured: true,
  },
  {
    id: "8",
    brand: "BMW",
    model: "320i",
    year: 2019,
    price: 145000,
    mileage: 42000,
    fuel: "Gasolina",
    transmission: "Automático",
    color: "Preto",
    doors: 4,
    engine: "2.0 Turbo",
    image: "/used-car-.jpg?height=200&width=300&query=BMW 320i 2019 black",
  },
]

export function useCarSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    brands: [],
    priceRange: [0, 200000],
    yearRange: [2000, 2024],
    fuelTypes: [],
    transmission: "",
    sortBy: "price-asc",
  })

  const filteredCars = useMemo(() => {
    let result = [...mockCars]

    // Text search
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      result = result.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          `${car.brand} ${car.model}`.toLowerCase().includes(searchLower),
      )
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter((car) => filters.brands.includes(car.brand))
    }

    // Price range filter
    result = result.filter((car) => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1])

    // Year range filter
    result = result.filter((car) => car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1])

    // Fuel type filter
    if (filters.fuelTypes.length > 0) {
      result = result.filter((car) => filters.fuelTypes.includes(car.fuel))
    }

    // Transmission filter
    if (filters.transmission) {
      result = result.filter((car) => car.transmission === filters.transmission)
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "year-desc":
        result.sort((a, b) => b.year - a.year)
        break
      case "year-asc":
        result.sort((a, b) => a.year - b.year)
        break
      case "mileage-asc":
        result.sort((a, b) => a.mileage - b.mileage)
        break
      default:
        break
    }

    return result
  }, [filters])

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      brands: [],
      priceRange: [0, 200000],
      yearRange: [2000, 2024],
      fuelTypes: [],
      transmission: "",
      sortBy: "price-asc",
    })
  }

  return {
    cars: filteredCars,
    filters,
    updateFilters,
    clearFilters,
    totalCars: mockCars.length,
    filteredCount: filteredCars.length,
  }
}
