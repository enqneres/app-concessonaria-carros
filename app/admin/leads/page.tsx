"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Phone, Mail, Eye, Filter, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockLeads = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    car: "Honda Civic 2020",
    carId: "1",
    status: "Novo",
    source: "Site",
    createdAt: "2024-01-15T10:30:00Z",
    notes: "Interessado em financiamento",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
    car: "Toyota Corolla 2021",
    carId: "2",
    status: "Contatado",
    source: "WhatsApp",
    createdAt: "2024-01-15T09:15:00Z",
    notes: "Quer agendar test drive",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    phone: "(11) 77777-7777",
    car: "Volkswagen Jetta 2019",
    carId: "3",
    status: "Interessado",
    source: "Site",
    createdAt: "2024-01-14T16:45:00Z",
    notes: "Perguntou sobre troca",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana@email.com",
    phone: "(11) 66666-6666",
    car: "Ford Focus 2018",
    carId: "4",
    status: "Negociando",
    source: "Telefone",
    createdAt: "2024-01-14T14:20:00Z",
    notes: "Proposta de R$ 60.000",
  },
]

export default function AdminLeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.car.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Novo":
        return "bg-blue-100 text-blue-800"
      case "Contatado":
        return "bg-yellow-100 text-yellow-800"
      case "Interessado":
        return "bg-green-100 text-green-800"
      case "Negociando":
        return "bg-purple-100 text-purple-800"
      case "Vendido":
        return "bg-green-100 text-green-800"
      case "Perdido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Leads</h1>
          <p className="text-muted-foreground">Gerencie os contatos interessados nos veículos</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou carro..."
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{mockLeads.filter((l) => l.status === "Novo").length}</p>
              <p className="text-sm text-muted-foreground">Novos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {mockLeads.filter((l) => l.status === "Contatado").length}
              </p>
              <p className="text-sm text-muted-foreground">Contatados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockLeads.filter((l) => l.status === "Interessado").length}
              </p>
              <p className="text-sm text-muted-foreground">Interessados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {mockLeads.filter((l) => l.status === "Negociando").length}
              </p>
              <p className="text-sm text-muted-foreground">Negociando</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <p className="font-semibold">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    <p className="text-sm text-muted-foreground">{lead.phone}</p>
                  </div>

                  <div>
                    <p className="font-medium">{lead.car}</p>
                    <p className="text-sm text-muted-foreground">Fonte: {lead.source}</p>
                  </div>

                  <div>
                    <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                  </div>

                  <div>
                    <p className="text-sm">{formatDate(lead.createdAt)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">{lead.notes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
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
                      <DropdownMenuItem>Marcar como Contatado</DropdownMenuItem>
                      <DropdownMenuItem>Marcar como Interessado</DropdownMenuItem>
                      <DropdownMenuItem>Marcar como Vendido</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
