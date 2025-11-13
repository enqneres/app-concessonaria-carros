"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, DollarSign } from "lucide-react"

interface FinancingCalculatorProps {
  carPrice: number
}

export function FinancingCalculator({ carPrice }: FinancingCalculatorProps) {
  const [downPayment, setDownPayment] = useState(carPrice * 0.2)
  const [months, setMonths] = useState(48)
  const [interestRate, setInterestRate] = useState(1.2)
  const [result, setResult] = useState<{
    monthlyPayment: number
    totalAmount: number
    totalInterest: number
  } | null>(null)

  const calculateFinancing = () => {
    const principal = carPrice - downPayment
    const monthlyRate = interestRate / 100
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalAmount = monthlyPayment * months + downPayment
    const totalInterest = totalAmount - carPrice

    setResult({
      monthlyPayment,
      totalAmount,
      totalInterest,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Simulador de Financiamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="car-price">Valor do Carro</Label>
            <Input
              id="car-price"
              type="text"
              value={carPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              disabled
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="down-payment">Entrada</Label>
            <Input
              id="down-payment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              min={0}
              max={carPrice}
            />
          </div>
          <div>
            <Label htmlFor="months">Prazo (meses)</Label>
            <Input
              id="months"
              type="number"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              min={12}
              max={84}
            />
          </div>
          <div>
            <Label htmlFor="interest-rate">Taxa de Juros (% a.m.)</Label>
            <Input
              id="interest-rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min={0.5}
              max={5}
            />
          </div>
        </div>

        <Button onClick={calculateFinancing} className="w-full">
          <DollarSign className="h-4 w-4 mr-2" />
          Calcular Financiamento
        </Button>

        {result && (
          <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="font-semibold text-cyan-800 mb-3">Resultado da Simulação</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Parcela Mensal</p>
                <p className="text-xl font-bold text-cyan-800">
                  {result.monthlyPayment.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Valor Total</p>
                <p className="text-lg font-semibold">
                  {result.totalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Total de Juros</p>
                <p className="text-lg font-semibold text-amber-600">
                  {result.totalInterest.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
