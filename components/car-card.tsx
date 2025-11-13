"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, Phone, GitCompare } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/hooks/use-favorites"
import { useComparison } from "@/hooks/use-comparison"

interface CarCardProps {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  fuel: string
  transmission: string
  image: string
  featured?: boolean
}

export function CarCard({
  id,
  brand,
  model,
  year,
  price,
  mileage,
  fuel,
  transmission,
  image,
  featured = false,
}: CarCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToComparison, isInComparison } = useComparison()

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no ${brand} ${model} ${year} por R$ ${price.toLocaleString("pt-BR")}. Poderia me dar mais informações?`
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={image || "/placeholder.svg"}
            alt={`${brand} ${model} ${year}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Destaque</Badge>}
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={() => addToComparison(id)}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              disabled={isInComparison(id)}
            >
              <GitCompare className={`w-4 h-4 ${isInComparison(id) ? "text-cyan-600" : ""}`} />
            </button>
            <button
              onClick={() => toggleFavorite(id)}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFavorite(id) ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-lg">
              {brand} {model}
            </h4>
            <span className="text-sm text-muted-foreground">{year}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {transmission} • {fuel}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">R$ {price.toLocaleString("pt-BR")}</span>
            <span className="text-sm text-muted-foreground">{mileage.toLocaleString("pt-BR")} km</span>
          </div>

          <div className="flex gap-2">
            <Link href={`/carros/${id}`} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </Link>
            <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={handleWhatsApp}>
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
