"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, Filter, MoreHorizontal, Car } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCarSearch } from "@/hooks/use-car-search"
import Link from "next/link"

export default function AdminCarsPage() {
  const { cars } = useCarSearch()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Gerenciar Carros</h1>
          <p className="text-muted-foreground">Gerencie o estoque de veículos da concessionária</p>
        </div>
        <Link href="/admin/carros/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Carro
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por marca, modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cars Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Estoque de Veículos ({filteredCars.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={`${car.brand} ${car.model}`}
                  className="w-20 h-16 object-cover rounded-md"
                />

                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-semibold">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {car.year} • {car.fuel}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-primary">R$ {car.price.toLocaleString("pt-BR")}</p>
                    <p className="text-sm text-muted-foreground">{car.mileage.toLocaleString("pt-BR")} km</p>
                  </div>

                  <div>
                    <p className="text-sm">{car.transmission}</p>
                    <p className="text-sm text-muted-foreground">{car.color}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {car.featured && <Badge variant="secondary">Destaque</Badge>}
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Disponível
                    </Badge>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Nenhum carro encontrado" : "Nenhum carro cadastrado"}
              </p>
              <Link href="/admin/carros/novo">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Carro
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
