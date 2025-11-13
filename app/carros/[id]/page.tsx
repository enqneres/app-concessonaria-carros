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

// Mock car data
const carData = {
  id: "1",
  brand: "Honda",
  model: "Civic",
  version: "1.5 Turbo CVT",
  year: 2020,
  price: 89900,
  mileage: 45000,
  fuel: "Flex",
  transmission: "CVT",
  color: "Prata",
  doors: 4,
  engine: "1.5 Turbo",
  images: [
    "/used-car-.jpg?height=400&width=600&query=Honda Civic 2020 silver front view",
    "/used-car-.jpg?height=400&width=600&query=Honda Civic 2020 silver side view",
    "/used-car-.jpg?height=400&width=600&query=Honda Civic 2020 silver interior",
    "/used-car-.jpg?height=400&width=600&query=Honda Civic 2020 silver rear view",
  ],
  features: [
    "Ar condicionado digital",
    "Central multimídia",
    "Câmera de ré",
    "Sensores de estacionamento",
    "Piloto automático",
    "Bancos em couro",
    "Rodas de liga leve",
    "Faróis de LED",
  ],
  description:
    "Honda Civic 2020 em excelente estado de conservação. Único dono, todas as revisões em dia na concessionária. Carro muito bem cuidado, sem detalhes.",
  seller: {
    name: "AutoMax Concessionária",
    phone: "(11) 9999-9999",
    whatsapp: "(11) 9999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP",
  },
}

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToComparison, isInComparison } = useComparison()

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no ${carData.brand} ${carData.model} ${carData.version} ${carData.year} por R$ ${carData.price.toLocaleString("pt-BR")}. Poderia me dar mais informações?`
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${carData.brand} ${carData.model} ${carData.year}`,
          text: `Confira este ${carData.brand} ${carData.model} por R$ ${carData.price.toLocaleString("pt-BR")}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Erro ao compartilhar:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
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
            {carData.brand} {carData.model}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Title and Price */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">
                  {carData.brand} {carData.model} {carData.version}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {carData.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="w-4 h-4" />
                    {carData.mileage.toLocaleString("pt-BR")} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    {carData.fuel}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-3xl font-bold text-primary mb-2">R$ {carData.price.toLocaleString("pt-BR")}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleFavorite(carData.id)}>
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite(carData.id) ? "fill-red-500 text-red-500" : ""}`} />
                    {isFavorite(carData.id) ? "Favoritado" : "Favoritar"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addToComparison(carData.id)}
                    disabled={isInComparison(carData.id)}
                  >
                    <GitCompare className={`w-4 h-4 mr-2 ${isInComparison(carData.id) ? "text-cyan-600" : ""}`} />
                    {isInComparison(carData.id) ? "Na Comparação" : "Comparar"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
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
                  <img
                    src={carData.images[0] || "/placeholder.svg"}
                    alt="Foto principal"
                    className="col-span-2 w-full h-80 object-cover rounded-t-lg"
                  />
                  {carData.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
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
                  <div>
                    <span className="text-sm text-muted-foreground">Marca</span>
                    <p className="font-medium">{carData.brand}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Modelo</span>
                    <p className="font-medium">{carData.model}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Ano</span>
                    <p className="font-medium">{carData.year}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Cor</span>
                    <p className="font-medium">{carData.color}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Combustível</span>
                    <p className="font-medium">{carData.fuel}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Câmbio</span>
                    <p className="font-medium">{carData.transmission}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Motor</span>
                    <p className="font-medium">{carData.engine}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Portas</span>
                    <p className="font-medium">{carData.doors}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Equipamentos e Opcionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {carData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financing Calculator */}
            <FinancingCalculator carPrice={carData.price} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Entre em Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{carData.seller.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    {carData.seller.address}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar: {carData.seller.phone}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Financing */}
            <Card>
              <CardHeader>
                <CardTitle>Financiamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Entrada (30%)</span>
                    <span className="font-medium">R$ 26.970</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">48x de</span>
                    <span className="font-medium text-primary">R$ 1.456</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Simular Financiamento
                  </Button>
                </div>
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
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span>6 meses de garantia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span>Inspeção de 150 pontos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span>Documentação em dia</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
