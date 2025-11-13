"use client"

import { useComparison } from "@/hooks/use-comparison"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitCompare, ArrowLeft, X } from "lucide-react"
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
    engine: "2.0 16V",
    doors: 4,
    color: "Prata",
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
    engine: "2.0 16V",
    doors: 4,
    color: "Branco",
  },
]

export default function ComparisonPage() {
  const { comparison, removeFromComparison, clearComparison } = useComparison()

  const comparisonCars = allCars.filter((car) => comparison.includes(car.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <GitCompare className="h-6 w-6 text-cyan-600" />
              <h1 className="text-3xl font-bold">Comparar Carros</h1>
            </div>
          </div>
          {comparisonCars.length > 0 && (
            <Button variant="outline" onClick={clearComparison}>
              Limpar Comparação
            </Button>
          )}
        </div>

        {comparisonCars.length === 0 ? (
          <div className="text-center py-12">
            <GitCompare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Nenhum carro para comparar</h2>
            <p className="text-gray-500 mb-6">Adicione carros à comparação para ver as diferenças lado a lado</p>
            <Link href="/carros">
              <Button>Ver Catálogo</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonCars.map((car) => (
              <Card key={car.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => removeFromComparison(car.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardHeader className="pb-2">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <CardTitle className="text-lg">
                    {car.brand} {car.model} {car.year}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-2xl font-bold text-primary">R$ {car.price.toLocaleString("pt-BR")}</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ano:</span>
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">KM:</span>
                      <span className="font-medium">{car.mileage.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Combustível:</span>
                      <span className="font-medium">{car.fuel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Câmbio:</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Motor:</span>
                      <span className="font-medium">{car.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Portas:</span>
                      <span className="font-medium">{car.doors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cor:</span>
                      <span className="font-medium">{car.color}</span>
                    </div>
                  </div>
                  <Link href={`/carros/${car.id}`}>
                    <Button className="w-full mt-4">Ver Detalhes</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
