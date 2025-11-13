"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface SearchBarProps {
  onSearch?: (searchTerm: string, brand: string, maxPrice: string) => void
  compact?: boolean
}

export function SearchBar({ onSearch, compact = false }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [maxPrice, setMaxPrice] = useState("all")
  const router = useRouter()

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm, selectedBrand, maxPrice)
    } else {
      // Navigate to catalog with search params
      const params = new URLSearchParams()
      if (searchTerm) params.set("search", searchTerm)
      if (selectedBrand !== "all") params.set("brand", selectedBrand)
      if (maxPrice !== "all") params.set("maxPrice", maxPrice)

      router.push(`/carros?${params.toString()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  if (compact) {
    return (
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar marca, modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">O que você procura?</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Ex: Honda Civic, Toyota..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Marca</label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as marcas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as marcas</SelectItem>
              <SelectItem value="Toyota">Toyota</SelectItem>
              <SelectItem value="Honda">Honda</SelectItem>
              <SelectItem value="Volkswagen">Volkswagen</SelectItem>
              <SelectItem value="Ford">Ford</SelectItem>
              <SelectItem value="Chevrolet">Chevrolet</SelectItem>
              <SelectItem value="Hyundai">Hyundai</SelectItem>
              <SelectItem value="BMW">BMW</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Preço até</label>
          <Select value={maxPrice} onValueChange={setMaxPrice}>
            <SelectTrigger>
              <SelectValue placeholder="Qualquer preço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer preço</SelectItem>
              <SelectItem value="30000">R$ 30.000</SelectItem>
              <SelectItem value="50000">R$ 50.000</SelectItem>
              <SelectItem value="80000">R$ 80.000</SelectItem>
              <SelectItem value="100000">R$ 100.000</SelectItem>
              <SelectItem value="150000">R$ 150.000</SelectItem>
              <SelectItem value="200000">R$ 200.000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full h-12 bg-primary hover:bg-primary/90">
            <Search className="w-4 h-4 mr-2" />
            Buscar Carros
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center text-sm text-muted-foreground">
        <MapPin className="w-4 h-4 mr-1" />
        <span>São Paulo, SP - Alterar localização</span>
      </div>
    </div>
  )
}
