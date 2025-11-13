"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"
import type { SearchFilters } from "@/hooks/use-car-search"

interface CarFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: Partial<SearchFilters>) => void
  onClearFilters: () => void
  resultCount: number
}

export function CarFilters({ filters, onFiltersChange, onClearFilters, resultCount }: CarFiltersProps) {
  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)
    onFiltersChange({ brands: newBrands })
  }

  const handleFuelChange = (fuel: string, checked: boolean) => {
    const newFuels = checked ? [...filters.fuelTypes, fuel] : filters.fuelTypes.filter((f) => f !== fuel)
    onFiltersChange({ fuelTypes: newFuels })
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </div>
          <span className="text-sm font-normal text-muted-foreground">{resultCount} carros</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brand Filter */}
        <div>
          <h4 className="font-medium mb-3">Marca</h4>
          <div className="space-y-2">
            {["Toyota", "Honda", "Volkswagen", "Ford", "Chevrolet", "Hyundai", "BMW"].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <label htmlFor={brand} className="text-sm cursor-pointer">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Faixa de Preço</h4>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ priceRange: value as [number, number] })}
              max={200000}
              min={0}
              step={5000}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>R$ {filters.priceRange[0].toLocaleString("pt-BR")}</span>
              <span>R$ {filters.priceRange[1].toLocaleString("pt-BR")}</span>
            </div>
          </div>
        </div>

        {/* Year Range */}
        <div>
          <h4 className="font-medium mb-3">Ano</h4>
          <div className="px-2">
            <Slider
              value={filters.yearRange}
              onValueChange={(value) => onFiltersChange({ yearRange: value as [number, number] })}
              max={2024}
              min={2000}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <h4 className="font-medium mb-3">Combustível</h4>
          <div className="space-y-2">
            {["Flex", "Gasolina", "Etanol", "Diesel", "Híbrido"].map((fuel) => (
              <div key={fuel} className="flex items-center space-x-2">
                <Checkbox
                  id={fuel}
                  checked={filters.fuelTypes.includes(fuel)}
                  onCheckedChange={(checked) => handleFuelChange(fuel, checked as boolean)}
                />
                <label htmlFor={fuel} className="text-sm cursor-pointer">
                  {fuel}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <h4 className="font-medium mb-3">Câmbio</h4>
          <Select value={filters.transmission} onValueChange={(value) => onFiltersChange({ transmission: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o câmbio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="automatic">Automático</SelectItem>
              <SelectItem value="cvt">CVT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={onClearFilters} variant="outline" className="flex-1 bg-transparent">
            <X className="w-4 h-4 mr-2" />
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
