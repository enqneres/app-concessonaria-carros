"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Users, TrendingUp, DollarSign, Eye, Phone, Plus } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total de Carros",
    value: "127",
    change: "+12%",
    changeType: "positive" as const,
    icon: Car,
  },
  {
    title: "Leads do Mês",
    value: "89",
    change: "+23%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Vendas do Mês",
    value: "15",
    change: "+8%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Receita do Mês",
    value: "R$ 1.2M",
    change: "+15%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
]

const recentLeads = [
  {
    id: 1,
    name: "João Silva",
    phone: "(11) 99999-9999",
    car: "Honda Civic 2020",
    status: "Novo",
    time: "2 min atrás",
  },
  {
    id: 2,
    name: "Maria Santos",
    phone: "(11) 88888-8888",
    car: "Toyota Corolla 2021",
    status: "Contatado",
    time: "15 min atrás",
  },
  {
    id: 3,
    name: "Pedro Costa",
    phone: "(11) 77777-7777",
    car: "Volkswagen Jetta 2019",
    status: "Interessado",
    time: "1 hora atrás",
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Novo carro adicionado",
    details: "Honda Civic 2020 - R$ 89.900",
    time: "10 min atrás",
  },
  {
    id: 2,
    action: "Lead convertido",
    details: "Maria Santos - Toyota Corolla",
    time: "30 min atrás",
  },
  {
    id: 3,
    action: "Preço atualizado",
    details: "Ford Focus 2018 - R$ 65.000",
    time: "1 hora atrás",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo ao painel administrativo da AutoMax</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/carros/novo">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Carro
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} vs mês anterior
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Leads Recentes</span>
              <Link href="/admin/leads">
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{lead.name}</p>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          lead.status === "Novo"
                            ? "bg-blue-100 text-blue-800"
                            : lead.status === "Contatado"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{lead.car}</p>
                    <p className="text-xs text-muted-foreground">{lead.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/carros/novo">
              <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                <Plus className="w-6 h-6" />
                <span>Adicionar Carro</span>
              </Button>
            </Link>
            <Link href="/admin/leads">
              <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                <Users className="w-6 h-6" />
                <span>Ver Leads</span>
              </Button>
            </Link>
            <Link href="/admin/relatorios">
              <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                <TrendingUp className="w-6 h-6" />
                <span>Relatórios</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
