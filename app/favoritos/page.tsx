"use client"

import { useFavorites } from "@/hooks/use-favorites"
import { CarCard } from "@/components/car-card"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from database
const allCars = [
  {
    id: "1",
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    price: 85000,
    mileage: 45000,
    fuel: "Flex",
    transmission: "Automático",
    image: "/toyota-corolla-2020.png",
  },
  {
    id: "2",
    brand: "Honda",
    model: "Civic",
    year: 2019,
    price: 78000,
    mileage: 52000,
    fuel: "Flex",
    transmission: "Manual",
    image: "/honda-civic-2019.png",
  },
  // Add more cars as needed
]

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  const favoriteCars = allCars.filter((car) => favorites.includes(car.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            <h1 className="text-3xl font-bold">Meus Favoritos</h1>
          </div>
        </div>

        {favoriteCars.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Nenhum carro favoritado ainda</h2>
            <p className="text-gray-500 mb-6">Explore nosso catálogo e adicione carros aos seus favoritos</p>
            <Link href="/carros">
              <Button>Ver Catálogo</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCars.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                brand={car.brand}
                model={car.model}
                year={car.year}
                price={car.price}
                mileage={car.mileage}
                fuel={car.fuel}
                transmission={car.transmission}
                image={car.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
