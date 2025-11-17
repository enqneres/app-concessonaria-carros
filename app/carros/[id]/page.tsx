"use client"

import {
  Car,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Shield,
  Star,
  GitCompare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FinancingCalculator } from "@/components/financing-calculator"
import { useFavorites } from "@/hooks/use-favorites"
import { useComparison } from "@/hooks/use-comparison"
import Link from "next/link"
import { mockCars } from "@/hooks/use-car-search"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToComparison, isInComparison } = useComparison()

  /** Buscar carro pelo ID */
  const car = mockCars.find((c) => c.id === params.id)

  if (!car) {
    return (
      <div className="p-10 text-center text-xl">
        Carro não encontrado 😕
      </div>
    )
  }

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no ${car.brand} ${car.model} ${car.year} por R$ ${car.price.toLocaleString(
      "pt-BR"
    )}.`
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${car.brand} ${car.model}`,
        text: `Veja este veículo: ${car.brand} ${car.model}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado!")
    }
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
              <Link href="/carros" className="text-foreground hover:text-primary transition-colors">
                Catálogo
              </Link>
              <Link href="/favoritos" className="text-foreground hover:text-primary transition-colors">
                Favoritos
              </Link>
              <Link href="/comparar" className="text-foreground hover:text-primary transition-colors">
                Comparar
              </Link>
              <Button variant="outline">Entrar</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/carros" className="hover:text-primary">
            Carros
          </Link>
          <span className="mx-2">/</span>
          <span>
            {car.brand} {car.model}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Title and Price */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">
                  {car.brand} {car.model}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {car.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="w-4 h-4" />
                    {car.mileage.toLocaleString("pt-BR")} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    {car.fuel}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-right">
                <div className="text-3xl font-bold text-primary mb-2">R$ {car.price.toLocaleString("pt-BR")}</div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => toggleFavorite(car.id)}>
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite(car.id) ? "fill-red-500 text-red-500" : ""}`} />
                    {isFavorite(car.id) ? "Favoritado" : "Favoritar"}
                  </Button>

                  <Button variant="outline" onClick={() => addToComparison(car.id)} disabled={isInComparison(car.id)}>
                    <GitCompare className={`w-4 h-4 mr-2 ${isInComparison(car.id) ? "text-cyan-600" : ""}`} />
                    {isInComparison(car.id) ? "Na Comparação" : "Comparar"}
                  </Button>

                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-2">
                  {/* Foto principal */}
                  <img
                    src={car.images?.[0] || car.image}
                    alt="Foto principal"
                    className="col-span-2 w-full h-80 object-cover rounded-t-lg"
                  />

                  {/* Miniaturas */}
                  {car.images?.slice(1)?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Foto ${index + 2}`}
                      className="w-full h-32 object-cover"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Car Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Veículo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Detail label="Marca" value={car.brand} />
                  <Detail label="Modelo" value={car.model} />
                  <Detail label="Ano" value={car.year} />
                  <Detail label="Cor" value={car.color} />
                  <Detail label="Combustível" value={car.fuel} />
                  <Detail label="Câmbio" value={car.transmission} />
                  <Detail label="Motor" value={car.engine} />
                  <Detail label="Portas" value={car.doors} />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {car.features && (
              <Card>
                <CardHeader>
                  <CardTitle>Equipamentos e Opcionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {car.features.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Financing Calculator */}
            <FinancingCalculator carPrice={car.price} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Entre em Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600" onClick={handleWhatsApp}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar
                </Button>
              </CardContent>
            </Card>

            {/* Warranty */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Garantias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Garantia de 6 meses • Revisões em dia • Inspeção completa
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <span className="text-sm text-muted-foreground">{label}</span>
      <p className="font-medium">{value}</p>
    </div>
  )
}