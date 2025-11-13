import { Car, Shield, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-serif font-bold text-primary">AutoMax</h1>
            </div>
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

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Encontre o Carro dos Seus Sonhos
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Carros usados com qualidade garantida e os melhores preços da cidade
          </p>

          {/* Search Bar */}
          <SearchBar />
        </div>
      </section>

      {/* Brand Logos */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">Marcas Oficiais</h3>
          <div className="flex justify-center items-center space-x-8 md:space-x-12 opacity-60">
            <img src="/toyota-logo.png" alt="Toyota" className="h-10" />
            <img src="/honda-logo.png" alt="Honda" className="h-10" />
            <img src="/volkswagen-logo.jpg" alt="Volkswagen" className="h-10" />
            <img src="/ford-oval-logo.png" alt="Ford" className="h-10" />
            <img src="/chevrolet-logo.png" alt="Chevrolet" className="h-10" />
            <img src="/logo-fiat.jpg" alt="Fiat" className="h-10" />
            <img src="/mitsu.png" alt="Mitsubishi" className="h-10" />
            <img src="/renault.png" alt="Renault" className="h-10" />
            <img src="/hundai.png" alt="Hyndai" className="h-10" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold text-center mb-12">Categorias</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "Hatches", image: "/hatchback-car-category.jpg" },
              { name: "Picapes", image: "/pickup-truck-category.jpg" },
              { name: "Sedans", image: "/sedan-car-category.jpg" },
              { name: "SUVs", image: "/suv-car-category.jpg" },
            ].map((category) => (
              <Card key={category.name} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-center">{category.name}</h4>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-serif font-bold">Carros em Destaque</h3>
            <Link href="/carros">
              <Button variant="outline">Ver Todos os Carros</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={`/used-car-.jpg?height=200&width=300&query=used car ${i} for sale`}
                    alt={`Carro ${i}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Honda Civic 2020</h4>
                    <p className="text-sm text-muted-foreground mb-2">1.5 Turbo CVT</p>
                    <p className="text-2xl font-bold text-primary mb-2">R$ 89.900</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <span>45.000 km</span>
                      <span className="mx-2">•</span>
                      <span>2020</span>
                      <span className="mx-2">•</span>
                      <span>Flex</span>
                    </div>
                    <Link href={`/carros/${i}`}>
                      <Button className="w-full bg-transparent" variant="outline">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold text-center mb-12">Por que Escolher a AutoMax?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Garantia Total</h4>
              <p className="text-muted-foreground">
                Todos os carros passam por inspeção rigorosa com garantia de 6 meses
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Atendimento Especializado</h4>
              <p className="text-muted-foreground">Equipe experiente para te ajudar a encontrar o carro ideal</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Melhor Preço</h4>
              <p className="text-muted-foreground">Preços justos e condições especiais de financiamento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6" />
                <h4 className="text-xl font-serif font-bold">AutoMax</h4>
              </div>
              <p className="text-primary-foreground/80">
                Sua concessionária de confiança há mais de 15 anos no mercado.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Comprar</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carros Usados
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Financiamento
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Seguro Auto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Vender</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Venda seu Carro
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Avaliação Online
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentação
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contato</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>(11) 9999-9999</li>
                <li>contato@automax.com.br</li>
                <li>Rua das Flores, 123 - São Paulo</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 AutoMax. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
