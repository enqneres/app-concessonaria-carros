"use client"

import { useState, useEffect } from "react"
import { Car, Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CarCard } from "@/components/car-card"
import { CarFilters } from "@/components/car-filters"
import { SearchBar } from "@/components/search-bar"
import { useCarSearch } from "@/hooks/use-car-search"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(true)
  const { cars, filters, updateFilters, clearFilters, filteredCount } = useCarSearch()
  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get("search")
    const brand = searchParams.get("brand")
    const maxPrice = searchParams.get("maxPrice")

    if (search || brand || maxPrice) {
      updateFilters({
        searchTerm: search || "",
        brands: brand ? [brand] : [],
        priceRange: maxPrice ? [0, Number.parseInt(maxPrice)] : [0, 200000],
      })
    }
  }, [searchParams, updateFilters])

  const handleSearch = (searchTerm: string, brand: string, maxPrice: string) => {
    updateFilters({
      searchTerm,
      brands: brand ? [brand] : [],
      priceRange: maxPrice ? [0, Number.parseInt(maxPrice)] : [0, 200000],
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-serif font-bold text-primary">AutoMax</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/carros" className="text-primary font-medium">
                Catálogo
              </Link>
              <Link href="/favoritos" className="text-foreground hover:text-primary transition-colors">
                Favoritos
              </Link>
              <Link href="/comparar" className="text-foreground hover:text-primary transition-colors">
                Comparar
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Vender
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Financiar
              </a>
              <Button variant="outline">Entrar</Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} compact />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">Catálogo de Carros</h2>
            <p className="text-muted-foreground">
              {filteredCount} de {cars.length + (8 - cars.length)} carros encontrados
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Sort */}
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Menor preço</SelectItem>
                <SelectItem value="price-desc">Maior preço</SelectItem>
                <SelectItem value="year-desc">Mais novo</SelectItem>
                <SelectItem value="year-asc">Mais antigo</SelectItem>
                <SelectItem value="mileage-asc">Menor quilometragem</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Toggle Filters */}
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-full md:w-80 mb-8 md:mb-0">
              <CarFilters
                filters={filters}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
                resultCount={filteredCount}
              />
            </div>
          )}

          {/* Cars Grid */}
          <div className="flex-1">
            {cars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum carro encontrado com os filtros selecionados.</p>
                <Button onClick={clearFilters} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                  }`}
                >
                  {cars.map((car) => (
                    <CarCard key={car.id} {...car} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" disabled>
                      Anterior
                    </Button>
                    <Button variant="default">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">Próximo</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
